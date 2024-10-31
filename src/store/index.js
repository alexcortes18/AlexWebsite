import { configureStore } from "@reduxjs/toolkit";
import aboutMeSlice from "./aboutme-slice";

const store = configureStore({
    reducer: { aboutme: aboutMeSlice.reducer }
})

export default store;