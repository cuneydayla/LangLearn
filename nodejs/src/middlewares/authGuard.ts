import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export interface AuthedRequest extends Request {
  user?: { id: string; email: string };
}

export function authGuard(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  const hdr = req.headers.authorization;
  const token = hdr?.startsWith('Bearer ') ? hdr.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const d = jwt.verify(token, env.JWT_ACCESS_SECRET) as any;
    req.user = { id: d.sub, email: d.email };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
