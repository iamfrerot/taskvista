import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "./tasksSlice";

interface TaskState {
 currentTask: Task | null;
}
const initialState: TaskState = {
 currentTask: null,
};
const taskSlice = createSlice({
 name: "task",
 initialState,
 reducers: {
  setCurrentTask: (state, action: PayloadAction<Task>) => {
   state.currentTask = action.payload;
  },
 },
});

export const { setCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;
