import type { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ErrorCode, mapErrorToResponse, reportError } from '@/lib/errors'
import type { Env } from '@/server/context'

type ErrorStatus = 400 | 401 | 403 | 404 | 409 | 429 | 500

function mapHttpStatusToErrorCode(status: number): (typeof ErrorCode)[keyof typeof ErrorCode] {
  if (status === 401) return ErrorCode.UNAUTHORIZED
  if (status === 403) return ErrorCode.FORBIDDEN
  if (status === 404) return ErrorCode.NOT_FOUND
  if (status === 409) return ErrorCode.CONFLICT
  if (status === 429) return ErrorCode.TOO_MANY_REQUESTS
  return ErrorCode.HTTP_ERROR
}

function isJsonContentType(contentType: string | null): boolean {
  return Boolean(contentType?.toLowerCase().includes('application/json'))
}

export function setupErrorHandlers(app: Hono<Env>): void {
  app.onError(async (err, c) => {
    const requestId = c.get('requestId')

    // Hono 框架内部异常（malformed JSON 等边界情况）
    if (err instanceof HTTPException) {
      if (err.status >= 500) {
        reportError(err, { requestId, httpStatus: err.status })
      }

      const response = err.getResponse()
      const contentType = response.headers.get('content-type')

      // 非 JSON：保留原始响应语义（含 headers / body），仅补齐 requestId
      if (!isJsonContentType(contentType)) {
        const headers = new Headers(response.headers)
        if (requestId) {
          headers.set('x-request-id', requestId)
        }

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        })
      }

      // JSON：返回统一错误结构，同时保留上游 headers（如 WWW-Authenticate/x-custom）
      const headers = new Headers(response.headers)
      headers.set('content-type', contentType || 'application/json; charset=utf-8')
      if (requestId) {
        headers.set('x-request-id', requestId)
      }

      return new Response(
        JSON.stringify({
          code: mapHttpStatusToErrorCode(err.status),
          message: err.status >= 500 ? '服务器内部错误' : err.message || '请求处理失败',
          requestId,
        }),
        {
          status: err.status as ErrorStatus,
          headers,
        }
      )
    }

    // AppError 及其子类 / 未知错误
    const errorResponse = mapErrorToResponse(err, requestId)
    return c.json(
      {
        code: errorResponse.code,
        message: errorResponse.message,
        details: errorResponse.details,
        requestId: errorResponse.requestId,
      },
      errorResponse.status as ErrorStatus
    )
  })

  app.notFound((c) => {
    return c.json(
      {
        code: ErrorCode.NOT_FOUND,
        message: `Route ${c.req.method} ${c.req.path} not found`,
        requestId: c.get('requestId'),
      },
      404
    )
  })
}
