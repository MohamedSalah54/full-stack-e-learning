export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IImage {
  secure_url: string;
  public_id: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: IImage
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  }; 
  category: {
    _id: string;
    name: string;
  }; 
  level: CourseLevel;
  language: string;
  price: number;
  rating: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

