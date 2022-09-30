import { configureStore } from '@reduxjs/toolkit'
import rangeSlice from "./slice/rangeSlice";

export default configureStore({
    reducer: {
        range: rangeSlice

    }
})

