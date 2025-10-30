export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  durationMin: number;
  difficulty: Difficulty;
}
export interface Lesson {
  id: string;
  title: string;
  content: any;
  order: number;
}
export interface CourseDetail extends Course {
  lessons: Lesson[];
}
