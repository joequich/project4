import { createAsyncThunk } from '@reduxjs/toolkit';
import { IActionLoginResponse, IGoogleSignInAttributes, ILoginAttributes, IRegisterAttributes } from '../../interfaces/Auth';
import { IErrorPayload } from '../../interfaces/Errors';
import { saveUserToken, destroyUserToken } from '../../helpers/jwtLocalStorage';
import AuthService from '../../services/auth';


export const login = createAsyncThunk<
    IActionLoginResponse,
    ILoginAttributes,
    {
    rejectValue: IErrorPayload
    }
>('auth/login', async (credentials, thunkAPI) => {
    try {
        const { email, password } = credentials;
        const data = await AuthService.login(email, password);
        if(data.accessToken) {
            saveUserToken(data)
        }
        return {
            username: data.username
        }
    } catch (err: any) {
        if (!err.response) { throw err }
        return thunkAPI.rejectWithValue((err.response.data) as IErrorPayload);
    }
});

export const register = createAsyncThunk<
    IActionLoginResponse,
    IRegisterAttributes,
    {
        rejectValue: IErrorPayload
    }
>('auth/register', async (credentials, thunkAPI) => {
    try {
        const { username, email, password } = credentials;
        const data = await AuthService.register(username, email, password);
        return {
            username: data.username
        }
    } catch (err: any) {
        if (!err.response) { throw err }
        return thunkAPI.rejectWithValue((err.response.data) as IErrorPayload);
    }
}
)

export const googleSignIn = createAsyncThunk<
    IActionLoginResponse,
    IGoogleSignInAttributes,
    {
        rejectValue: IErrorPayload
    }
>('auth/google', async(credentials, thunkAPI) =>{
    try {
        const { idToken } = credentials;
        const data = await AuthService.loginWithGoogle(idToken);
        if(data.accessToken) {
            saveUserToken(data)
        }
        return {
            username: data.username
        }
    } catch (err: any) {
        if (!err.response) { throw err }
        return thunkAPI.rejectWithValue((err.response.data) as IErrorPayload);
    }
})

export const logout = createAsyncThunk('auth/logout', () => {
    destroyUserToken();
});