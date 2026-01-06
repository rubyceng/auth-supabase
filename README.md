# Auth Supabase

[中文文档](./README.cn.md)

A lightweight authentication library built on [Supabase](https://supabase.com/), providing out-of-the-box authentication service wrappers for rapidly building lightweight auth gateways. Designed for seamless integration with Node.js projects and offering plugin-based extensions for various frameworks.

## Features

- 🔐 Encapsulates Supabase Auth core functionality (login, register, refresh token)
- 📦 Monorepo architecture for flexible imports
- 🧩 Plugin-based extensions supporting various framework integrations

**Available Framework Packages**

`@rubyceng/nest-supabase-auth`: Provides complete Supabase authentication integration for NestJS applications, including module configuration, auth guards, and user decorators.

---

## 📦 Packages

### `@rubyceng/auth-supabase` (Core Package)

Provides framework-agnostic Supabase authentication core services, suitable for any Node.js project.

**Installation**

```bash
npm install @rubyceng/auth-supabase
```

**Exports**

| Export                    | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| `SupabaseClientFactory`   | Supabase client singleton factory for creating and reusing clients |
| `SupabaseAuthCoreService` | Authentication service class with login, register, and refresh     |

**Usage Example**

```typescript
import { SupabaseAuthCoreService } from '@rubyceng/auth-supabase';

const authService = new SupabaseAuthCoreService({
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-key',
  supabaseOptions: {},
});

// User login
const { user, session, error } = await authService.login('user@example.com', 'password');

// User registration
const result = await authService.register('newuser@example.com', 'password');

// Refresh token
const refreshed = await authService.refreshToken(session.refresh_token);
```

---

### `@rubyceng/nest-supabase-auth` (NestJS Integration)

Provides complete Supabase authentication integration for NestJS applications, including module configuration, auth guards, and user decorators.

**Installation**

```bash
npm install @rubyceng/nest-supabase-auth
```

**Exports**

| Export               | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `SupabaseAuthModule` | NestJS dynamic module, configure Supabase connection via `forRoot()` |
| `SupabaseAuthGuard`  | Auth guard that validates Bearer Token and injects user into request |
| `CurrentUser`        | Parameter decorator for retrieving the current authenticated user    |

**Usage Example**

1. **Module Configuration**

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

2. **Protecting Routes**

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

## 🧾 Roadmap

- [x] User login
- [x] User registration
- [x] Refresh token
- [x] Health check
- [x] NestJS extension support
- [ ] Stateless JWT token authentication
- [ ] Realtime user status push
- [ ] Caching support
- [ ] Rate limiting support
- [ ] Additional features

---

## 🚀 Getting Started

### Prerequisites

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/rubyceng/auth-supabase.git
cd auth-supabase
pnpm install
```

2. Build all packages:

```bash
pnpm -r build
```

---

## 📂 Examples

This project provides two example applications demonstrating how to quickly build an API gateway using the core package and how to build a business API with authentication using the NestJS integration package.

### `auth-gateway` (Express Gateway Example)

An Express-based authentication gateway service that uses the `@rubyceng/auth-supabase` core package to implement login, register, and token refresh endpoints.

**Getting Started**

Create a Supabase project and execute the statements in `sql/init.sql` to initialize the database.

```bash
cd examples/auth-gateway

# 1. Configure environment variables
cp .env.example .env
# Edit the .env file with your Supabase configuration:
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_ANON_KEY=your-anon-key

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

**API Endpoints**

| Method | Path             | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/login`    | User login    |
| POST   | `/auth/register` | User register |
| POST   | `/auth/refresh`  | Refresh token |
| GET    | `/health`        | Health check  |

---

### `api` (NestJS API Example)

A NestJS-based business API service that uses the `@rubyceng/nest-supabase-auth` package to implement protected API endpoints.

**Getting Started**

```bash
cd examples/api

# 1. Configure environment variables
cp .env.example .env
# Edit the .env file with your Supabase configuration:
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_ANON_KEY=your-anon-key

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm start
```

**API Endpoints**

| Method | Path      | Description                                 |
| ------ | --------- | ------------------------------------------- |
| GET    | `/orders` | Get order list (requires Bearer Token auth) |

**Request Example**

```bash
curl -X GET http://localhost:4000/orders \
  -H "Authorization: Bearer <your-access-token>"
```

---

## 📁 Project Structure

```
auth-supabase/
├── packages/
│   ├── core/                    # @rubyceng/auth-supabase core package
│   │   └── src/
│   │       ├── client.ts        # Supabase client factory
│   │       ├── supabase.service.ts  # Auth service
│   │       └── interface/       # Type definitions
│   └── nest-auth/               # @rubyceng/nest-supabase-auth NestJS package
│       └── src/
│           ├── auth.module.ts   # NestJS module
│           ├── auth.guard.ts    # Auth guard
│           └── user.decorator.ts # User decorator
├── examples/
│   ├── auth-gateway/            # Express auth gateway example
│   └── api/                     # NestJS API example
└── package.json
```

---

## 📄 License

ISC
