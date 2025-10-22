import API from "@/axios/API/api";

export interface Section {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

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
