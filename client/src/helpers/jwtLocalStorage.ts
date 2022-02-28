import { IAuthResponse } from "../interfaces/Auth";

const P4_TOKEN_KEY = "p4_token";
const P4_USER_KEY = "p4_user";

export const getUser = (): string | null => {
    return JSON.parse(window.localStorage.getItem(P4_USER_KEY) || 'null');
};

export const getToken = (): string | null => {
    return JSON.parse(window.localStorage.getItem(P4_TOKEN_KEY) || 'null');
};

export const saveUserToken = (loginRes: IAuthResponse): void => {
    window.localStorage.setItem(P4_TOKEN_KEY, JSON.stringify(loginRes.accessToken));
    window.localStorage.setItem(P4_USER_KEY, JSON.stringify(loginRes.username));
};

export const destroyUserToken = (): void => {
    window.localStorage.removeItem(P4_TOKEN_KEY);
    window.localStorage.removeItem(P4_USER_KEY);
};

export const updateToken = (refreshToken: string): void => {
    window.localStorage.removeItem(P4_TOKEN_KEY);
    window.localStorage.setItem(P4_TOKEN_KEY, JSON.stringify(refreshToken));
};