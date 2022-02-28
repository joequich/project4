import { SerializedError } from "@reduxjs/toolkit";
import { IErrorPayload } from "./Errors";

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

export interface IAuthState {
    isSuccess: boolean;
    username: string | null;
    isChecking: boolean;
    isError: boolean;
    error: IErrorPayload | SerializedError;
}

export interface IAuthResponse {
    username: string;
    accessToken: string;
}

export interface IActionLoginResponse {
    username: string
}

export interface ILoginAttributes {
    email: string;
    password: string;
}
export interface IRegisterAttributes {
    username: string;
    email: string;
    password: string;
}

export interface IGoogleSignInAttributes {
    idToken: string;
}

export interface IAuthService {
    login: (email: string, password: string) => Promise<IAuthResponse>;
    loginWithGoogle: (token: string) => Promise<IAuthResponse>;
    register: (username: string, email: string, password: string) => Promise<IUser>;
    refreshToken: () => Promise<IAuthResponse>;
}