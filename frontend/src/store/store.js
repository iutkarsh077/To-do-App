import { configureStore } from '@reduxjs/toolkit';
import TaskSlice from './slices/index.js';
export const store = configureStore({
    reducer: {
        tasks: TaskSlice,
    }
})