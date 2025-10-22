import { create } from "zustand";
import { Lesson } from "@/types/lesson";
import { createLessonApi, getLessonsBySection } from "@/axios/services/course/section/lesson/lessonService";

interface LessonState {
  lessons: Lesson[];
  loading: boolean;
  fetchLessons: (sectionId: string) => Promise<void>;
  createLesson: (lesson: Omit<Lesson, "_id">) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set) => ({
  lessons: [],
  loading: false,

  fetchLessons: async (sectionId: string) => {
    set({ loading: true });
    try {
      const data = await getLessonsBySection(sectionId);
      set({ lessons: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch lessons", err);
      set({ loading: false });
    }
  },

  createLesson: async (lesson) => {
    try {
      const newLesson = await createLessonApi(lesson);
      set((state) => ({ lessons: [...state.lessons, newLesson] }));
    } catch (err) {
      console.error("Failed to create lesson", err);
    }
  },
}));
