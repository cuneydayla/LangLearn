import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './env';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/courses.routes';
import meRoutes from './routes/me.routes';

export const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cors({ origin: env.CORS_ORIGIN }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/me', meRoutes);
