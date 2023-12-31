import {configureStore} from "@reduxjs/toolkit";
import weatherReduce from "./weatherSlice.js";
export default configureStore({
    reducer: {
        weather: weatherReduce
    }
})