import { combineReducers } from "redux";
import projectReducer from "./projectSlice";
import tasksReducer from "./tasksSlice";
import projectsReducer from "./projectsSlices";
import taskReducer from "./taskSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
 project: projectReducer,
 task: taskReducer,
 tasks: tasksReducer,
 projects: projectsReducer,
 auth: authReducer,
 user: userReducer,
});

export default rootReducer;
export type Rootstate = ReturnType<typeof rootReducer>;
