import API from "@/axios/API/api";

export const fetchEnrollmentsByUser = async (userId: string) => {
  const res = await API.get(`/enrollments/user/${userId}`);
  return res.data;
};

export const fetchEnrollmentsByCourse = async (courseId: string) => {
  const res = await API.get(`/enrollments/course/${courseId}`);
  return res.data;
};


export const createEnrollmentApi = async (userId: string, courseId: string) => {
  const res = await API.post("/enrollments", { userId, courseId });
  return res.data;
};

export const deleteEnrollmentApi = async (enrollmentId: string) => {
  const res = await API.delete(`/enrollments/${enrollmentId}`);
  return res.data;
};

