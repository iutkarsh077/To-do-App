import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        email: "Profile",
        todos: null,
    }

export const TaskSlice = createSlice({
        name: "task",
        initialState,
        reducers: {
            addTask: (state, action) => {
                state.email = action.payload.email;
                state.todos = action.payload.todos;
              },
        }
    })

    export const {addTask} = TaskSlice.actions;
    export default TaskSlice.reducer;
