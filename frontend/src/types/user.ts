export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  qualifications?: string[];
  skills?: string[];
  bio?: string;
  profilePicture?: {
    secure_url: string;
    public_id: string;
  };
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface ISignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export enum UserRoles {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  skills?: string[];
  qualifications?: string[];
  profilePicture?: {
    secure_url: string;
    public_id: string;
  };
}
