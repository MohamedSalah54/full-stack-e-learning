import { create } from "zustand";
import {
  getSections,
  createSectionApi,
  getSectionsByCourseApi, // ← أضفنا دي
} from "@/axios/services/course/section/sectionService";
import { Section } from "@/types/section";

interface SectionState {
  sections: Section[];
  loading: boolean;
  error: string | null;

  fetchSections: () => Promise<void>;
  getSectionsByCourseId: (courseId: string) => Promise<void>; // ← أضفنا دي
  createSection: (section: Omit<Section, "_id">) => Promise<void>;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],
  loading: false,
  error: null,

  fetchSections: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getSections();
      set({ sections: data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch sections",
        loading: false,
      });
    }
  },

getSectionsByCourseId: async (courseId: string) => {
  set({ loading: true, error: null });
  try {
    const data = await getSectionsByCourseApi(courseId);
    set({ sections: data, loading: false });
  } catch (err: any) {
    set({
      error: err.response?.data?.message || "Failed to fetch sections by course",
      loading: false,
    });
  }
},



  createSection: async (section) => {
    set({ loading: true, error: null });
    try {
      const data = await createSectionApi(section);
      set((state) => ({
        sections: [...state.sections, data],
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create section",
        loading: false,
      });
    }
  },
}));
