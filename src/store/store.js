import {configureStore} from "@reduxjs/toolkit";
import stockReducer from "../Reducer/stockSlice";

export const store=configureStore({
    reducer:{
        stockReducer
    }
})