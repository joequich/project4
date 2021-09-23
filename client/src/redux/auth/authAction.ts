import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:7000/api'
});

interface ValidationErrors {  
    errorMessage: string  
    field_errors: Record<string, string>
}

export const login = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await client.post('/auth/login',{ email, password });
            if(response.data.accessToken) {
                localStorage.setItem('p4_user', JSON.stringify(response.data))
            }
            return response.data;

        } catch (err: any) {
            let error: AxiosError<ValidationErrors> = err; // cast the error for access    
            if (!error.response) {      throw err    }
            console.log('actions', error.response.data)
        return thunkAPI.rejectWithValue(error.response.data);
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
            // const data = await AuthService.register(username, email, password);
            // return data;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return thunkAPI.rejectWithValue(error.message);
            } else {
                console.log('Unknown failure');
                return thunkAPI.rejectWithValue('Unknown failure');
            }
        }
    }
)
