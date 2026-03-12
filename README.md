# NextHonoBoot

> 基于 Next.js + Hono 的全栈后台管理平台模板，适合作为你自己的业务管理系统起点。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Hono](https://img.shields.io/badge/Hono-orange?logo=hono)](https://hono.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)

## 项目简介

NextHonoBoot 以「前后端一体 + 类型安全 + 后台基础能力完备」为目标，内置认证、权限、日志、审计、配置和 CRUD 扩展能力，方便快速搭建自己的管理平台。

## 主要能力

- 服务端会话认证、RBAC 权限（菜单/按钮）
- 请求级上下文、结构化日志、审计日志
- CRUD 路由工厂 + React Query Hooks 工厂
- MySQL + Drizzle ORM 类型安全数据层
- 统一错误处理 + OpenTelemetry 接入（可选）
- Docker 化部署与运行时环境校验

## 技术栈

- Frontend: Next.js App Router、React 19、Mantine 7、@tanstack/react-query、Zustand
- Backend: Hono、Drizzle ORM、MySQL2、Zod
- Tooling: Biome、pnpm、Docker

## 快速开始

### 1) 安装依赖

```bash
pnpm install
```

### 2) 配置环境变量

优先检查并修改以下变量：

- `DATABASE_URL`
- `DATABASE_MAX_CONNECTIONS`
- `DATABASE_IDLE_TIMEOUT`
- `DATABASE_CONNECT_TIMEOUT`
- `AUTO_DB_MIGRATE`
- `AUTO_DB_SEED`
- `SESSION_COOKIE_NAME`
- `SESSION_TTL_DAYS`
- `NODE_ENV`

推荐做法：

- 开发环境使用 `.env.development`
- 生产环境使用 `.env.production.local`
- 不要在仓库中提交真实数据库密码和生产密钥

### 3) 初始化数据库

```bash
pnpm db:push
pnpm db:seed
```

### 4) 启动开发环境

```bash
pnpm dev
```

### 默认账号（初始化种子）

| 账号  | 密码         | 角色       |
| ----- | ------------ | ---------- |
| admin | ChangeMe123! | 系统管理员 |

首次登录后请立即修改默认密码。

## 内置模块

- 认证：`/api/auth`
- 管理员：`/api/admins`
- 角色：`/api/roles`
- 菜单：`/api/menus`
- 操作日志：`/api/operation-logs`
- 系统配置：`/api/configs`

## 常用命令

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm db:generate
pnpm db:push
pnpm db:migrate
pnpm db:studio
pnpm db:seed
```

## Docker

```bash
docker build -t next-hono-boot:latest .
docker compose up -d
docker compose logs -f app
```

## 文档索引

- [00-AI 开发指引](./docs/00-AI开发指引.md)
- [01-项目概览](./docs/01-项目概览.md)
- [02-目录结构](./docs/02-目录结构.md)
- [03-架构设计](./docs/03-架构设计.md)
- [04-数据库设计](./docs/04-数据库设计.md)
- [05-服务端开发](./docs/05-服务端开发.md)
- [06-客户端开发](./docs/06-客户端开发.md)
- [07-认证与权限](./docs/07-认证与权限.md)
- [08-错误处理](./docs/08-错误处理.md)
- [09-新增模块指南](./docs/09-新增模块指南.md)
- [10-部署与运维](./docs/10-部署与运维.md)
