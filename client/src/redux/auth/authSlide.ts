import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from '../../services/auth.service';
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string;}, thunkAPI) => {
      try {
        const data = await AuthService.login(email, password);
        return data;
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

const initialState = {
    checking: true,
    logged: false,
    username: null,
}

interface AuthState {
    checking: boolean;
    username?: string;
    logged: boolean;
}

type AuthAction =
    | { username: string }

    

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled,(state, action) => {
                state.username = action.payload.username;
                state.checking = false;
                state.logged = true;
            })
        // checkingFinish: (state) => {
        //     ...state,
        //     checking: false,
        //     logged: true
        // },
        // logout: () => {
        //     checking: true
        //     logged: false
        // }
    }
});

export default authSlice.reducer;