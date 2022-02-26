import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { saveUserToken, destroyUserToken } from '../../helpers/jwtLocalStorage';
import { loginWithGoogle, login, register } from '../../services/auth';
interface ValidationErrors {  
    errorMessage: string;  
    field_errors: Record<string, string>;
}

export const fetchAuthLogin = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await login(email, password);
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
    }
);

export const fetchAuthRegister = createAsyncThunk(
    'auth/register',
    async ( 
        { username, email, password }: {username: string; email: string, password: string},
        thunkAPI    
    ) => {
        try {
            const response = await register(username, email, password);
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

export const fetchAuthGoogleSignIn = createAsyncThunk('auth/google', async({idToken}: {idToken: string}, thunkAPI) =>{
    try {
        const response = await loginWithGoogle(idToken);
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

export const authLogout = createAsyncThunk('auth/logout', () => {
    destroyUserToken();
});
