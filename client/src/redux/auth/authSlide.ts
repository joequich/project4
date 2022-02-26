import { createSlice, isAnyOf, SerializedError } from '@reduxjs/toolkit';
import { getUser } from '../../helpers/jwtLocalStorage';
import { fetchAuthGoogleSignIn, fetchAuthLogin, authLogout, fetchAuthRegister } from './authAction';
interface AuthState {
    isSuccess: boolean;
    username: string | null;
    isChecking: boolean;
    isError: boolean;
    error: ErrorPayload | SerializedError;
}

interface IErrors {
    value: string;
    reason: string;
}
interface ErrorPayload {
    status: number;
    message: string;
    errors?: IErrors[];
}

const user = getUser();

const initialState = user
    ? { isChecking: false, isSuccess: true, username: user, isError: false, error: { message: ''} }
    : { isChecking: false, isSuccess: false, username: null, isError: false, error: { message: ''} };

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isChecking = false;
            state.isSuccess = false;
            state.isError = false;
            // state.error =
            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAuthRegister.pending, (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addCase(fetchAuthRegister.fulfilled, (state: AuthState) => {
            state.isChecking = false;
            state.isSuccess = true;
        });
        builder.addCase(fetchAuthRegister.rejected, (state: AuthState, action) => {
            state.isChecking = false;
            state.isError = true;
            if (action.payload) {        
                state.error = action.payload as ErrorPayload
            } else {        
                state.error = action.error
            }
        });
        builder.addCase(authLogout.pending, (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addCase(authLogout.fulfilled, (state: AuthState) => {
            state.isChecking = false;
            state.isSuccess = false;
            state.username = null;
        });
        builder.addMatcher(isAnyOf(fetchAuthLogin.pending, fetchAuthGoogleSignIn.pending), (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addMatcher(isAnyOf(fetchAuthLogin.fulfilled, fetchAuthGoogleSignIn.fulfilled), (state: AuthState, action) => {
            state.username = action.payload.username;
            state.isChecking = false;
            state.isSuccess = true;
        });
        builder.addMatcher(isAnyOf(fetchAuthLogin.rejected, fetchAuthGoogleSignIn.rejected), (state: AuthState, action) => {
            state.isChecking = false;
            state.isError = true;
            if (action.payload) {        
                state.error = action.payload as ErrorPayload
            } else {        
                state.error = action.error
            }
        });
    },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
