import API from "@/axios/API/api";
import { Lesson } from "@/types/lesson";

export const createLessonApi = async (data: Omit<Lesson, "_id">): Promise<Lesson> => {
  const response = await API.post("/lesson", data);
  return response.data.data;
};

export const getLessonsBySection = async (sectionId: string): Promise<Lesson[]> => {
  const response = await API.get(`/lesson/section/${sectionId}`);
  return response.data.data;
};
