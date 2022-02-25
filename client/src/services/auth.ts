import API from "../config/axios";

export const login = (email: string, password: string) => {
    return API.post('/auth/login',{ email, password });
}

export const loginWithGoogle = (token: string) => {
    return API.post('/auth/google',{ idToken: token });
}

export const register = (username: string, email: string, password: string) => {
    return API.post('/users', { username, email, password});
}

