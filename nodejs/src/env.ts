import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
};
