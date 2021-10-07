import { createSlice, isAnyOf, SerializedError } from '@reduxjs/toolkit';
import { googleSignIn, login, logout, register } from './authAction';
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

const user = JSON.parse(localStorage.getItem('p4_user') || 'null');

const initialState = user
    ? { isChecking: false, isSuccess: true, username: user.username, isError: false, error: { message: ''} }
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
        builder.addCase(register.pending, (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addCase(register.fulfilled, (state: AuthState) => {
            state.isChecking = false;
            state.isSuccess = true;
        });
        builder.addCase(register.rejected, (state: AuthState, action) => {
            state.isChecking = false;
            state.isError = true;
            if (action.payload) {        
                state.error = action.payload as ErrorPayload
            } else {        
                state.error = action.error
            }
        });
        builder.addCase(logout.pending, (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addCase(logout.fulfilled, (state: AuthState) => {
            state.isChecking = false;
            state.isSuccess = false;
            state.username = null;
        });
        builder.addMatcher(isAnyOf(login.pending, googleSignIn.pending), (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addMatcher(isAnyOf(login.fulfilled, googleSignIn.fulfilled), (state: AuthState, action) => {
            state.username = action.payload.username;
            state.isChecking = false;
            state.isSuccess = true;
        });
        builder.addMatcher(isAnyOf(login.rejected, googleSignIn.rejected), (state: AuthState, action) => {
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
