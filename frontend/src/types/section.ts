
// export interface Section {
//   _id?: string;
//   courseId: string;
//   title: string;
//   order: number;
//   description?: string;
// }
export interface Section {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}