import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { loginHandler, refreshHandler, registerHandler } from './handlers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 基础中间件
app.use(helmet());
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => res.send('Auth Gateway is OK'));

// 认证路由
app.post('/auth/login', loginHandler);
app.post('/auth/register', registerHandler);
app.post('/auth/refresh', refreshHandler);

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 Auth Gateway running on http://localhost:${PORT}`);
});
