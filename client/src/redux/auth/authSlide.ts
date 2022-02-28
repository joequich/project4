import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IAuthState } from '../../interfaces/Auth';
import { IErrorPayload } from '../../interfaces/Errors';
import { getUser } from '../../helpers/jwtLocalStorage';
import { googleSignIn, login, logout, register } from './authAction';

const user = getUser();

const initialState: IAuthState = user
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
        builder.addCase(register.pending, (state) => {
            state.isChecking = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.isChecking = false;
            state.isSuccess = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isChecking = false;
            state.isError = true;
            if (action.payload) {        
                state.error = action.payload as IErrorPayload
            } else {        
                state.error = action.error
            }
        });
        builder.addCase(logout.pending, (state) => {
            state.isChecking = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isChecking = false;
            state.isSuccess = false;
            state.username = null;
        });
        builder.addMatcher(isAnyOf(login.pending, googleSignIn.pending), (state) => {
            state.isChecking = true;
        });
        builder.addMatcher(isAnyOf(login.fulfilled, googleSignIn.fulfilled), (state, action) => {
            state.username = action.payload.username;
            state.isChecking = false;
            state.isSuccess = true;
        });
        builder.addMatcher(isAnyOf(login.rejected, googleSignIn.rejected), (state, action) => {
            state.isChecking = false;
            state.isError = true;
            if (action.payload) {        
                state.error = action.payload as IErrorPayload
            } else {        
                state.error = action.error
            }
        });
    },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;