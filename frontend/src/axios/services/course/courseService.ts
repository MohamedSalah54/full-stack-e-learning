import { Course } from "@/types/course";
import API from "../../API/api";
import { AxiosResponse } from "axios";

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await API.get("/course");
  return response.data.data; 
};
export const uploadThumbnail = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createCourse = (data: {
  title: string;
  description: string;
  image: { secure_url: string; public_id: string };
  category: string;
  level: string;
  language: string;
  price: number;
  isPublished?: boolean;
}) => API.post("/course", data);


export const getAllCourses = () => API.get("/courses");

export const getCourseById = (id: string) => API.get(`/courses/${id}`);


export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<Course> => {
  const response = await API.put(`/course/${id}`, courseData);
  return response.data.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await API.delete(`/course/${id}`);
};

export const getInstructorCourseCount = async (
  instructorId: string
): Promise<number> => {
  const { data } = await API.get(`/course/instructor/${instructorId}/count`);
  return data.coursesCount; 
};
