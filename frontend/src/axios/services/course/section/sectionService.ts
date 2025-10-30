import API from "@/axios/API/api";
import { Section } from "@/types/section";



// جلب كل الـ sections
export const getSections = async (): Promise<Section[]> => {
  const res = await API.get("/section");
  return res.data.data;
};

// إنشاء section جديد
export const createSectionApi = async (
  section: Omit<Section, "_id">
): Promise<Section> => {
  const res = await API.post("/section", section);
  return res.data.data;
};


export const getSectionsByCourseApi = async (courseId: string) => {
  const res = await API.get(`/section/course/${courseId}`);
  return res.data.data; 
};
