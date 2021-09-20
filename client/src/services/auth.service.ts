import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:7000/api/auth'
});

const login = async(email: string, password: string) => {
    try {
        const response = await client.post('/login',{ email, password });
        if(response.data.accessToken) {
            localStorage.setItem('p4_user', JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        // console.log(error);
        if (error instanceof Error)
            throw new Error(error.message)
    }
}

const authService = {
    login
}

export default authService;