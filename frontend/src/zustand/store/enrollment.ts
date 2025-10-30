import {
  createEnrollmentApi,
  deleteEnrollmentApi,
  fetchEnrollmentsByCourse,
  fetchEnrollmentsByUser,
} from "@/axios/services/enrollment/enrollment";
import { Course } from "@/types/course";
import { create } from "zustand";

export interface IEnrollment {
  _id: string;
  userId: string;
  courseId: Course;
  progress: number;
  isCompleted: boolean;
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
}

interface EnrollmentStore {
  enrollments: IEnrollment[];
  loading: boolean;
  error: string | null;
  getUserEnrollments: (userId: string) => Promise<void>;
  createEnrollment: (userId: string, courseId: string) => Promise<IEnrollment>;
  removeEnrollment: (enrollmentId: string) => Promise<void>;
  courseEnrollmentsCount: number;
  getCourseEnrollmentsCount: (courseId: string) => Promise<void>;
}

export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
  enrollments: [],
  loading: false,
  error: null,

  getUserEnrollments: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchEnrollmentsByUser(userId);
      set({ enrollments: res.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch enrollments",
        loading: false,
      });
    }
  },
  courseEnrollmentsCount: 0,

  getCourseEnrollmentsCount: async (courseId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetchEnrollmentsByCourse(courseId);
      const count = res?.data?.length || 0;
      set({ courseEnrollmentsCount: count, loading: false });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message || "Failed to fetch course enrollments",
        loading: false,
      });
    }
  },

  createEnrollment: async (userId: string, courseId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await createEnrollmentApi(userId, courseId);
      set((state) => ({
        enrollments: [...state.enrollments, res.data],
        loading: false,
      }));
      return res.data as IEnrollment;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create enrollment",
        loading: false,
      });
      throw err;
    }
  },
  removeEnrollment: async (enrollmentId: string) => {
    set({ loading: true, error: null });

    try {
      const res = await deleteEnrollmentApi(enrollmentId);

      set((state) => {
        const updated = state.enrollments.filter((enroll) => {
          const courseId =
            typeof enroll.courseId === "string"
              ? enroll.courseId
              : enroll.courseId._id;

          const shouldKeep =
            enroll._id !== enrollmentId && courseId !== enrollmentId;

          return shouldKeep;
        });

        return { enrollments: updated, loading: false };
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to remove enrollment",
        loading: false,
      });
    }
  },
}));
