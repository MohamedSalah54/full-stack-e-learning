// types/lesson.ts
export enum LessonType {
  VIDEO = "VIDEO",
  ARTICLE = "ARTICLE",
  QUIZ = "QUIZ",
}

export interface Lesson {
  _id: string;
  sectionId: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  content?: string;
  duration?: number;
  order: number;
}
