import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
 __v: number;
 _id: string;
 createdAt: string;
 deadline: string;
 description: string;
 developers: string[];
 document: string;
 endDate: string;
 image: string;
 name: string;
 priority: string;
 project: string;
 startDate: string;
 status: "todo" | "in-progress" | "done";
 updatedAt: string;
}
interface TasksState {
 tasks: Task[];
}

const initialState: TasksState = {
 tasks: [],
};
const tasksSlice = createSlice({
 name: "tasks",
 initialState,
 reducers: {
  setTasks: (state, action: PayloadAction<Task[]>) => {
   state.tasks = action.payload;
  },
  addTaskToFront: (state, action: PayloadAction<Task>) => {
   state.tasks.unshift(action.payload);
  },
  updateCurrentTaskStatus: (
   state,
   action: PayloadAction<{ taskId: string; status: Task["status"] }>
  ) => {
   const { taskId, status } = action.payload;
   const taskIndex = state.tasks.findIndex((task) => task._id === taskId);
   if (taskIndex !== -1) {
    state.tasks[taskIndex].status = status;
   }
  },
 },
});

export const { setTasks, addTaskToFront, updateCurrentTaskStatus } =
 tasksSlice.actions;
export default tasksSlice.reducer;
