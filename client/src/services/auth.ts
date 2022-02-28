import API from "../config/axios";
import { IAuthService } from "../interfaces/Auth";

const AuthService: IAuthService = {
    login: async(email: string, password: string) => {
        return API.post('/auth/login',{ email, password })
            .then(response => response.data);
    },
    loginWithGoogle: async(token: string) => {
        return API.post('/auth/google',{ idToken: token })
            .then(response => response.data);
    },
    register: async(username: string, email: string, password: string) => {
        return API.post('/users', { username, email, password})
        .then(response => response.data);
    },
    refreshToken: async() => {
        return API.post('/auth/refresh-token')
        .then(response => response.data);
    }
}

export default AuthService;