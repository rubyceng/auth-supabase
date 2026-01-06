# Auth Supabase

一个基于 [Supabase](https://supabase.com/) 的轻量级认证库，提供开箱即用的认证服务封装，支持快速构建轻量化认证网关。支持 Node.js 项目快速引入。提供不同框架的插件化扩展。

## 特性

- 🔐 封装 Supabase Auth 核心功能（登录、注册、刷新令牌）
- 📦 Monorepo 结构，灵活引用
- 🧩 插件化扩展，支持不同框架的集成

**现有框架包支持**

`@rubyceng/nest-supabase-auth`：为 NestJS 应用提供完整的 Supabase 认证集成，包括模块配置、认证守卫和用户装饰器。

---

## 📦 Packages

### `@rubyceng/auth-supabase`（核心包）

提供与框架无关的 Supabase 认证核心服务，适用于任何 Node.js 项目。

**安装**

```bash
npm install @rubyceng/auth-supabase
```

**主要导出**

| 导出项                    | 说明                                                   |
| ------------------------- | ------------------------------------------------------ |
| `SupabaseClientFactory`   | Supabase 客户端单例工厂，用于创建和复用 SupabaseClient |
| `SupabaseAuthCoreService` | 认证服务类，封装登录、注册、刷新令牌等方法             |

**使用示例**

```typescript
import { SupabaseAuthCoreService } from '@rubyceng/auth-supabase';

const authService = new SupabaseAuthCoreService({
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  supabaseOptions: {},
});

// 用户登录
const { user, session, error } = await authService.login('user@example.com', 'password');

// 用户注册
const result = await authService.register('newuser@example.com', 'password');

// 刷新令牌
const refreshed = await authService.refreshToken(session.refresh_token);
```

---

### `@rubyceng/nest-supabase-auth`（NestJS 集成包）

为 NestJS 应用提供完整的 Supabase 认证集成，包括模块配置、认证守卫和用户装饰器。

**安装**

```bash
npm install @rubyceng/nest-supabase-auth
```

**主要导出**

| 导出项               | 说明                                                 |
| -------------------- | ---------------------------------------------------- |
| `SupabaseAuthModule` | NestJS 动态模块，通过 `forRoot()` 配置 Supabase 连接 |
| `SupabaseAuthGuard`  | 认证守卫，验证 Bearer Token 并注入用户信息到请求对象 |
| `CurrentUser`        | 参数装饰器，用于在控制器中获取当前登录用户           |

**使用示例**

1. **模块配置**

```typescript
import { Module } from '@nestjs/common';
import { SupabaseAuthModule } from '@rubyceng/nest-supabase-auth';

@Module({
  imports: [
    SupabaseAuthModule.forRoot({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    }),
  ],
})
export class AppModule {}
```

2. **保护路由**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser, SupabaseAuthGuard } from '@rubyceng/nest-supabase-auth';

@Controller('profile')
@UseGuards(SupabaseAuthGuard)
export class ProfileController {
  @Get()
  getProfile(@CurrentUser() user: any) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
```

---

## 🧾 目标功能

- [x] 用户登录
- [x] 用户注册
- [x] 刷新令牌
- [x] 健康检查
- [x] NestJS 扩展支持
- [ ] 无状态 JWT 令牌认证
- [ ] realtime 用户状态推送
- [ ] 缓存支持
- [ ] 限流支持
- [ ] 其他补充

---

## 🚀 快速开始

### 环境准备

1. 克隆项目并安装依赖：

```bash
git clone https://github.com/rubyceng/auth-supabase.git
cd auth-supabase
pnpm install
```

2. 构建所有包：

```bash
pnpm -r build
```

---

## 📂 Examples

项目提供了两个示例应用，分别演示使用核心包快速构建 API 网关和使用 NestJS 集成包构建业务 API 进行认证的方式。

### `auth-gateway`（Express 网关示例）

基于 Express 的认证网关服务，使用 `@rubyceng/auth-supabase` 核心包实现登录、注册和刷新令牌接口。

**启动步骤**

创建一个 supabase 项目，执行 `sql/init.sql` 中的语句对数据库进行初始化。

```bash
cd examples/auth-gateway

# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 Supabase 配置：
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_ANON_KEY=your-anon-key

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

**API 端点**

| 方法 | 路径             | 说明     |
| ---- | ---------------- | -------- |
| POST | `/auth/login`    | 用户登录 |
| POST | `/auth/register` | 用户注册 |
| POST | `/auth/refresh`  | 刷新令牌 |
| GET  | `/health`        | 健康检查 |

---

### `api`（NestJS API 示例）

基于 NestJS 的业务 API 服务，使用 `@rubyceng/nest-supabase-auth` 包实现受保护的 API 端点。

**启动步骤**

```bash
cd examples/api

# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 Supabase 配置：
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_ANON_KEY=your-anon-key

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm start
```

**API 端点**

| 方法 | 路径      | 说明                                   |
| ---- | --------- | -------------------------------------- |
| GET  | `/orders` | 获取订单列表（需要 Bearer Token 认证） |

**请求示例**

```bash
curl -X GET http://localhost:4000/orders \
  -H "Authorization: Bearer <your-access-token>"
```

---

## 📁 项目结构

```
auth-supabase/
├── packages/
│   ├── core/                    # @rubyceng/auth-supabase 核心包
│   │   └── src/
│   │       ├── client.ts        # Supabase 客户端工厂
│   │       ├── supabase.service.ts  # 认证服务
│   │       └── interface/       # 类型定义
│   └── nest-auth/               # @rubyceng/nest-supabase-auth NestJS 包
│       └── src/
│           ├── auth.module.ts   # NestJS 模块
│           ├── auth.guard.ts    # 认证守卫
│           └── user.decorator.ts # 用户装饰器
├── examples/
│   ├── auth-gateway/            # Express 认证网关示例
│   └── api/                     # NestJS API 示例
└── package.json
```

---

## 📄 License

ISC
