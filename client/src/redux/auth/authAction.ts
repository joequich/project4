import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
interface ValidationErrors {  
    errorMessage: string;  
    field_errors: Record<string, string>;
}

const client = axios.create({
    baseURL: 'http://localhost:7000/api'
});

export const login = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await client.post('/auth/login',{ email, password });
            if(response.data.accessToken) {
                localStorage.setItem('p4_user', JSON.stringify({
                    ...response.data,
                    token_init_date: new Date().getTime()
                }));
            }
            return {
                username: response.data.username as string
            }

        } catch (err: any) {
            let error: AxiosError<ValidationErrors> = err; // cast the error for access    
            if (!error.response) {      throw err    }
            // console.log('actions', error.response.data)
        return thunkAPI.rejectWithValue(err.response.data);
    }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ( 
        { username, email, password }: {username: string; email: string, password: string},
        thunkAPI    
    ) => {
        try {
            const response = await client.post('/users', { username, email, password});
            return {
                username: response.data.user.username as string
            }
        } catch (err: any) {
            let error: AxiosError<ValidationErrors> = err; // cast the error for access    
            if (!error.response) {      throw err    }
            // console.log('actions', error.response.data)
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const logout = createAsyncThunk('auth/logout', () => {
    localStorage.removeItem("p4_user");
});
