import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReduce from './auth/authSlide';

const store =  configureStore({
    reducer: {
        auth: authReduce
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;