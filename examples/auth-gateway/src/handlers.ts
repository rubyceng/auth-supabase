import { Request, Response } from 'express';
import { authService } from './services';

export const loginHandler = async (req: Request, res: Response) => {
  if (!req.body?.email || !req.body?.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const { email, password } = req.body;

  try {
    const { session, error } = await authService.login(email, password);

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    return res.json({
      access_token: session?.access_token,
      refresh_token: session?.refresh_token,
      user: session?.user,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const refreshHandler = async (req: Request, res: Response) => {
  if (!req.body?.refresh_token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  const { refresh_token } = req.body;

  const { session, error } = await authService.refreshToken(refresh_token);

  if (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  return res.json(session);
};

export const registerHandler = async (req: Request, res: Response) => {
  if (!req.body?.email || !req.body?.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const { email, password } = req.body;

  const { user, session, error } = await authService.register(email, password);

  if (error) {
    console.log('error::', error);

    return res.status(400).json({ message: error.message });
  }

  return res.json({ message: 'Registered successfully', user });
};
