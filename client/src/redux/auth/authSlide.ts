import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './authAction';

const user = JSON.parse(localStorage.getItem('p4_user') || 'null');

const initialState = user
    ? { isChecking: false, logged: true, username: user.username, isError: false, error: '' }
    : { isChecking: false, logged: false, username: null, isError: false, error: '' };

type AuthAction = { username: string; message: string;}

interface AuthState {
    logged: boolean;
    username: string | null;
    isChecking: boolean;
    isError: boolean;
    error: string | undefined;
}

interface ErrorPayload {
    status: number;
    message: string;
    errors: Record<string, string>
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isChecking = false;
            state.logged = false;
            state.isError = false;
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
            const payload = action.payload as ErrorPayload;
            if (action.payload) {        
                state.error = payload.message
                if(payload.errors)
                    state.error =  JSON.stringify( payload.errors);
            } else {        
                state.error = action.error.message      
            }
            state.isChecking = false;
            state.isError = true;
        });
    },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
