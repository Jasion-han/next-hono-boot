import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'NextHonoBoot - 全栈后台管理平台',
  description: 'NextHonoBoot 是一个基于 Next.js 和 Hono 的全栈后台管理平台模板',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
