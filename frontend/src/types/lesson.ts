export enum LessonType {
  VIDEO = "video",
  ARTICLE = "article",
  QUIZ = "quiz",
  ASSIGNMENT = "assignment",
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

export interface CreateLesson {
  sectionId: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  content?: string;
  duration?: number;
  order: number;
}


export interface AssignmentFormValues {
  title: string;
  description: string;
  deadline: string;      
  maxMarks: number;
  fileUploadAllowed: boolean;
}

export interface QuizFormValues {
  lessonId?: string;      
  title: string;
  description: string;
  timeLimit: number;
  totalMarks: number;
  passingScore: number;
}

export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER', 
}
export interface QuestionFormValues {
  questionText: string;
  type:QuestionType
  options?: string[];      
  correctAnswer: string;
  marks: number;
  explanation?: string;
}

export interface QuestionsFormValues {
  questions: QuestionFormValues[];
}
