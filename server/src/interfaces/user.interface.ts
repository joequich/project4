export interface IUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
  birthdate?: Date;
  image?: string;
  role?: string;
  status?: boolean;
  google?: boolean;
  validPassword?: (password: string) => boolean;
}