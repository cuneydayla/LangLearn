import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // clean tables (order matters because of FKs)
  await prisma.progressLesson.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // ---------- Courses ----------
  await prisma.course.createMany({
    data: [
      {
        title: 'Spanish A1 – Basics',
        description: 'Learn greetings, alphabet, and everyday expressions.',
        instructor: 'Ana García',
        durationMin: 180,
        difficulty: 'beginner',
      },
      {
        title: 'French A2 – Everyday Talk',
        description: 'Conversations, directions, and food vocabulary.',
        instructor: 'Louis Martin',
        durationMin: 220,
        difficulty: 'beginner',
      },
      {
        title: 'German B1 – Travel & Culture',
        description: 'Talk about hobbies, trips, and cultural traditions.',
        instructor: 'Clara Schmidt',
        durationMin: 240,
        difficulty: 'intermediate',
      },
      {
        title: 'Japanese N5 – Introduction to Hiragana & Katakana',
        description: 'Learn writing systems and polite expressions.',
        instructor: 'Yuki Tanaka',
        durationMin: 200,
        difficulty: 'beginner',
      },
      {
        title: 'Turkish A1 – Everyday Phrases',
        description: 'Speak basic Turkish for travel and simple communication.',
        instructor: 'Ahmet Mehmet',
        durationMin: 160,
        difficulty: 'beginner',
      },
      {
        title: 'English C1 – Business Communication',
        description:
          'Professional English for meetings, emails, and negotiations.',
        instructor: 'Sarah Collins',
        durationMin: 300,
        difficulty: 'advanced',
      },
    ],
  });

  const courses = await prisma.course.findMany();

  // attach lessons to each course
  for (const c of courses) {
    switch (c.title) {
      case 'Spanish A1 – Basics':
        await prisma.lesson.createMany({
          data: [
            {
              courseId: c.id,
              title: 'Greetings & Introductions',
              content: 'Hola! Cómo estás?',
              order: 1,
            },
            {
              courseId: c.id,
              title: 'Alphabet & Pronunciation',
              content: 'Alphabet and sounds.',
              order: 2,
            },
            {
              courseId: c.id,
              title: 'Numbers 1–100',
              content: 'Counting and basic usage.',
              order: 3,
            },
          ],
        });
        break;
      case 'French A2 – Everyday Talk':
        await prisma.lesson.createMany({
          data: [
            {
              courseId: c.id,
              title: 'At the Café',
              content: 'Commander un café…',
              order: 1,
            },
            {
              courseId: c.id,
              title: 'Asking for Directions',
              content: 'Où est…',
              order: 2,
            },
          ],
        });
        break;
      case 'German B1 – Travel & Culture':
        await prisma.lesson.createMany({
          data: [
            {
              courseId: c.id,
              title: 'Planning a Trip',
              content: 'Reiseziele besprechen…',
              order: 1,
            },
            {
              courseId: c.id,
              title: 'Cultural Traditions',
              content: 'Feste & Bräuche…',
              order: 2,
            },
          ],
        });
        break;
      case 'Japanese N5 – Introduction to Hiragana & Katakana':
        await prisma.lesson.createMany({
          data: [
            {
              courseId: c.id,
              title: 'Hiragana Basics',
              content: 'あ い う え お …',
              order: 1,
            },
            {
              courseId: c.id,
              title: 'Katakana Overview',
              content: 'ア イ ウ エ オ …',
              order: 2,
            },
            {
              courseId: c.id,
              title: 'Simple Sentences',
              content: 'これはペンです。',
              order: 3,
            },
          ],
        });
        break;
      case 'Turkish A1 – Everyday Phrases':
        await prisma.lesson.createMany({
          data: [
            {
              courseId: c.id,
              title: 'Introducing Yourself',
              content: 'Merhaba! Ben…',
              order: 1,
            },
            {
              courseId: c.id,
              title: 'Shopping',
              content: 'Kaç para?',
              order: 2,
            },
            {
              courseId: c.id,
              title: 'At the Restaurant',
              content: 'Sipariş vermek…',
              order: 3,
            },
          ],
        });
        break;
      case 'English C1 – Business Communication':
        await prisma.lesson.createMany({
          data: [
            {
              courseId: c.id,
              title: 'Formal Emails',
              content: 'Subject lines, tone, clarity.',
              order: 1,
            },
            {
              courseId: c.id,
              title: 'Negotiation Skills',
              content: 'Anchoring, concessions.',
              order: 2,
            },
            {
              courseId: c.id,
              title: 'Meetings & Presentations',
              content: 'Structuring talks.',
              order: 3,
            },
          ],
        });
        break;
    }
  }

  // ---------- Demo user ----------
  const passwordHash = await bcrypt.hash('demo1234', 10);
  const demo = await prisma.user.create({
    data: {
      email: 'demo@langlearn.dev',
      name: 'Demo User',
      passwordHash,
    },
  });

  // pick two courses to enroll the demo user
  const spanish = courses.find((c) => c.title.startsWith('Spanish'))!;
  const japanese = courses.find((c) => c.title.startsWith('Japanese'))!;

  // enroll
  await prisma.enrollment.createMany({
    data: [
      { userId: demo.id, courseId: spanish.id },
      { userId: demo.id, courseId: japanese.id },
    ],
  });

  // create progress rows
  const totalSpanishLessons = await prisma.lesson.count({
    where: { courseId: spanish.id },
  });
  const totalJapaneseLessons = await prisma.lesson.count({
    where: { courseId: japanese.id },
  });

  const prSpanish = await prisma.progress.create({
    data: {
      userId: demo.id,
      courseId: spanish.id,
      totalLessons: totalSpanishLessons,
      completedLessons: 0, // we'll update below after progressLesson seeding
      quizScore: null,
    },
  });

  const prJapanese = await prisma.progress.create({
    data: {
      userId: demo.id,
      courseId: japanese.id,
      totalLessons: totalJapaneseLessons,
      completedLessons: 0,
      quizScore: null,
    },
  });

  // mark some lessons as completed / scored
  const spanishLessons = await prisma.lesson.findMany({
    where: { courseId: spanish.id },
    orderBy: { order: 'asc' },
  });
  const japaneseLessons = await prisma.lesson.findMany({
    where: { courseId: japanese.id },
    orderBy: { order: 'asc' },
  });

  await prisma.progressLesson.createMany({
    data: [
      // Spanish: first 2 lessons done, scores on first
      {
        progressId: prSpanish.id,
        lessonId: spanishLessons[0].id,
        completed: true,
        score: 9,
        max: 10,
      },
      {
        progressId: prSpanish.id,
        lessonId: spanishLessons[1].id,
        completed: true,
        score: 8,
        max: 10,
      },
      {
        progressId: prSpanish.id,
        lessonId: spanishLessons[2].id,
        completed: false,
        score: null,
        max: null,
      },

      // Japanese: only first lesson done
      {
        progressId: prJapanese.id,
        lessonId: japaneseLessons[0].id,
        completed: true,
        score: 10,
        max: 10,
      },
      {
        progressId: prJapanese.id,
        lessonId: japaneseLessons[1].id,
        completed: false,
        score: null,
        max: null,
      },
      {
        progressId: prJapanese.id,
        lessonId: japaneseLessons[2].id,
        completed: false,
        score: null,
        max: null,
      },
    ],
  });

  // Update progress stats based on completed lessons
  const completedSpanish = await prisma.progressLesson.count({
    where: { progressId: prSpanish.id, completed: true },
  });
  const completedJapanese = await prisma.progressLesson.count({
    where: { progressId: prJapanese.id, completed: true },
  });

  await prisma.progress.update({
    where: { id: prSpanish.id },
    data: { completedLessons: completedSpanish },
  });

  await prisma.progress.update({
    where: { id: prJapanese.id },
    data: { completedLessons: completedJapanese },
  });

  function calcAvg(scores: { score: number | null; max: number | null }[]) {
    const valid = scores.filter((s) => s.score !== null && s.max !== null);
    if (!valid.length) return null;
    const sum = valid.reduce((acc, s) => acc + s.score! / s.max!, 0);
    return parseFloat(((sum / valid.length) * 100).toFixed(1)); // percent
  }

  const spanishScores = [
    { score: 9, max: 10 },
    { score: 8, max: 10 },
  ];
  const japaneseScores = [{ score: 10, max: 10 }];

  await prisma.progress.update({
    where: { id: prSpanish.id },
    data: { quizScore: calcAvg(spanishScores) },
  });

  await prisma.progress.update({
    where: { id: prJapanese.id },
    data: { quizScore: calcAvg(japaneseScores) },
  });

  console.log(
    '✅ Seeded courses, lessons, demo user, enrollments, and progress.'
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
