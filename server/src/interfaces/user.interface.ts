export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  role?: string;
  status?: boolean;
  google?: boolean;
}

export interface IPutUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
  status: boolean;
  google: boolean;
}

export interface IPatchUser {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  image?: string;
  role?: string;
  status?: boolean;
  google?: boolean;
}