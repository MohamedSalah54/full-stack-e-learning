
export interface Section {
  _id: string;
  courseId: string;
  title: string;
  order: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSection {
  title: string;
  courseName: string;
  order: string;
  description: string;
}
