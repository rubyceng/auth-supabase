import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { loginHandler, refreshHandler, registerHandler } from './handlers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.send('Auth Gateway is OK'));

// Routers
app.post('/auth/login', loginHandler);
app.post('/auth/register', registerHandler);
app.post('/auth/refresh', refreshHandler);

app.listen(PORT, () => {
  console.log(`🚀 Auth Gateway running on http://localhost:${PORT}`);
});
