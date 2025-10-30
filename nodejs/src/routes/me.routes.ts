// routes/me.routes.ts
import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authGuard, AuthedRequest } from '../middlewares/authGuard';

const r = Router();
r.use(authGuard);

r.get('/enrollments', async (req: AuthedRequest, res) => {
  const userId = req.user!.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          _count: { select: { lessons: true } },
          progresses: {
            where: { userId },
            select: {
              id: true,
              completedLessons: true,
              totalLessons: true,
              quizScore: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const payload = await Promise.all(
    enrollments.map(async (e) => {
      const p = e.course.progresses[0];
      const total =
        p?.totalLessons && p.totalLessons > 0
          ? p.totalLessons
          : e.course._count.lessons;
      let completed = p?.completedLessons ?? 0;
      if (p?.id && completed === 0) {
        completed = await prisma.progressLesson.count({
          where: { progressId: p.id, completed: true },
        });
      }

      return {
        id: e.id,
        createdAt: e.createdAt,
        course: {
          id: e.course.id,
          title: e.course.title,
          instructor: e.course.instructor,
          description: e.course.description,
          difficulty: e.course.difficulty,
        },
        progress: {
          totalLessons: total,
          completedLessons: completed,
          quizScore: p?.quizScore ?? null,
        },
      };
    })
  );

  res.json(payload);
});

export default r;
