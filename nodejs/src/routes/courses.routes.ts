import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authGuard, AuthedRequest } from '../middlewares/authGuard';

const r = Router();

r.get('/', async (_req, res) => {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      instructor: true,
      durationMin: true,
      difficulty: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(courses);
});

r.get('/:id', async (req, res) => {
  const c = await prisma.course.findUnique({
    where: { id: req.params.id },
    include: { lessons: { orderBy: { order: 'asc' } } },
  });
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

r.post('/:id/enroll', authGuard, async (req: AuthedRequest, res) => {
  const userId = req.user!.id;
  const courseId = req.params.id;
  try {
    const enr = await prisma.enrollment.create({ data: { userId, courseId } });
    await prisma.progress.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: {},
      create: {
        userId,
        courseId,
        completedLessons: 0,
        totalLessons: await prisma.lesson.count({ where: { courseId } }),
        quizScore: null,
      },
    });
    res.status(201).json(enr);
  } catch (e: any) {
    if (e.code === 'P2002')
      return res.status(409).json({ error: 'Already enrolled' });
    throw e;
  }
});

export default r;
