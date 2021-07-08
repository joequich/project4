import { Document } from "mongoose";
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


export interface IUserService {
  create: (data: IUser) => Promise<IUser & Document>;
  list: (from: number, limit: number) => Promise<{
    users: (IUser & Document)[];
    total: number;
  }>;
  readById: (id: string) => Promise<(IUser & Document) | null>
  getUserByEmail: (email: string) => Promise<(IUser & Document) | null>;
  updateById: (id: string, data: IPutUser | IPatchUser) => Promise<(IUser & Document) | null>;
  deleteById: (id: string) => Promise<(IUser & Document) | null>;
}