import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import API from '../../config/axios';
import { saveUserToken, destroyUserToken } from '../../helpers/jwtLocalStorage';
interface ValidationErrors {  
    errorMessage: string;  
    field_errors: Record<string, string>;
}

export const login = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await API.post('/auth/login',{ email, password });
            if(response.data.accessToken) {
                saveUserToken(response.data)
            }
            return {
                username: response.data.username as string
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
                return thunkAPI.rejectWithValue(err.message);
            } else {
                console.log('aaa', err)
                return thunkAPI.rejectWithValue('Unknow failure');
            }
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
            const response = await API.post('/users', { username, email, password});
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

export const googleSignIn = createAsyncThunk('auth/google', async({idToken}: {idToken: string}, thunkAPI) =>{
    try {
        const response = await API.post('/auth/google', { idToken });
        if(response.data.accessToken) {
            saveUserToken(response.data)
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
})

export const logout = createAsyncThunk('auth/logout', () => {
    destroyUserToken();
});
