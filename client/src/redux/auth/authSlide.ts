import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { login } from './authAction';
interface AuthState {
    logged: boolean;
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
    ? { isChecking: false, logged: true, username: user.username, isError: false, error: { message: ''} }
    : { isChecking: false, logged: false, username: null, isError: false, error: { message: ''} };

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isChecking = false;
            state.logged = false;
            state.isError = false;
            // state.error =
            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state: AuthState) => {
            state.isChecking = true;
        });
        builder.addCase(login.fulfilled, (state: AuthState, action) => {
            state.username = action.payload.username;
            state.isChecking = false;
            state.logged = true;
        });
        builder.addCase(login.rejected, (state: AuthState, action) => {
            if (action.payload) {        
                state.error = action.payload as ErrorPayload
            } else {        
                state.error = action.error
            }
            state.isChecking = false;
            state.isError = true;
        });
    },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
