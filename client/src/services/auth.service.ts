import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:7000/api'
});

const login = async(email: string, password: string) => {
    try {
        const response = await client.post('/auth/login',{ email, password });
        if(response.data.accessToken) {
            localStorage.setItem('p4_user', JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        if (error instanceof Error)
            throw new Error(error.message)
    }
}

// const login = (email: string, password: string) => {
//     return client.post('/auth/login',{ email, password })
//         .then( response => {
//             if(response.data.accessToken) 
//                 localStorage.setItem('p4_user', JSON.stringify(response.data));

//             return response.data;
//         });
// }

const register = async (username: string, email: string, password: string) => {
    try {
        const response = await client.post('/users/', { username, email, password })
    } catch (error) {
        if (error instanceof Error)
            throw new Error(error.message)
    }
}

const authService = {
    login,
    register
}

export default authService;