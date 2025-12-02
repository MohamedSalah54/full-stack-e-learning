
export interface WishlistCourse {
  _id: string;
  title: string;
  description: string;
  thumbnail?: { secure_url: string }; 
  price?: number | string;
  rating?: number;
  reviews?: number;
  lessons?: number;
  students?: number;
}


export interface WishlistItem {
  _id: string;
  userId: string;
  courseId: WishlistCourse;
  addedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  message: string;
  statusCode: number;
  data: WishlistItem[];
}

export interface WishlistData {
  userId: string;
  courseId: string;
}
