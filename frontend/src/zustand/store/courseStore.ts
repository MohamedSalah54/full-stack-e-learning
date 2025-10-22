// src/zustand/store/courseStore.ts
import { create } from "zustand";
import { Course } from "@/types/course";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourseCount,
} from "@/axios/services/course/courseService";

interface CourseState {
  count: number | null;
  fetchInstructorCourseCount: (instructorId: string) => Promise<void>;

  courses: Course[];
  loading: boolean;
  error: string | null;
  getCourses: () => Promise<void>;
  addCourse: (course: Partial<Course>) => Promise<void>;
  editCourse: (id: string, course: Partial<Course>) => Promise<void>;
  removeCourse: (id: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  count: null,
  courses: [],
  loading: false,
  error: null,

fetchInstructorCourseCount: async (instructorId: string) => {
    set({ loading: true, error: null });
    try {
      const count = await getInstructorCourseCount(instructorId);
      set({ count, loading: false });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to fetch course count",
      });
    }
  },

  getCourses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCourses();
      set({ courses: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addCourse: async (course) => {
    set({ loading: true, error: null });
    try {
      const newCourse = await createCourse(course);
      set({ courses: [...get().courses, newCourse], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  editCourse: async (id, course) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateCourse(id, course);
      set({
        courses: get().courses.map((c) => (c._id === id ? updated : c)),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  removeCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCourse(id);
      set({
        courses: get().courses.filter((c) => c._id !== id),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
