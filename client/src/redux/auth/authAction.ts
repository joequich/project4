import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from '../../services/auth.service';

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string;}, thunkAPI) => {
      try {
        const data = await AuthService.login(email, password);
        return { user: data };
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