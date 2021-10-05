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


export interface IUsersService {
  create: (data: IUser) => Promise<IUser>;
  list: (from: number, limit: number) => Promise<{
    users: IUser[];
    total: number;
  }>;
  readById: (id: string) => Promise<(IUser) | null>
  getUserByEmail: (email: string) => Promise<(IUser) | null>;
  getUserCredentialsByEmail: (email: string) => Promise<(IUser) | null>;
  updateById: (id: string, data: IPutUser | IPatchUser) => Promise<(IUser) | null>;
  deleteById: (id: string) => Promise<({id:string, deleted: boolean}) | null>;
}