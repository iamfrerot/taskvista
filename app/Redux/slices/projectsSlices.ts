import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
 __v: number;
 _id: string;
 category: string;
 completion: number;
 createdAt: string;
 deadline: string;
 description: string;
 document: string;
 endDate: string;
 image: string;
 name: string;
 notifications: boolean;
 priority: "Low" | "Normal" | "High";
 startDate: string;
 status: "todo" | "in-progress" | "done";
 updatedAt: string;
 teamLead: string;
}
interface ProjectState {
 projects: Project[];
}
const initialState: ProjectState = {
 projects: [],
};
const projectsSlice = createSlice({
 name: "projects",
 initialState,
 reducers: {
  setProjects: (state, action: PayloadAction<Project[]>) => {
   state.projects = action.payload;
  },
  updateCurrentProjectStatus: (
   state,
   action: PayloadAction<{ projectId: string; status: Project["status"] }>
  ) => {
   const { projectId, status } = action.payload;
   const projectIndex = state.projects.findIndex(
    (project) => project._id === projectId
   );
   if (projectIndex !== -1) {
    state.projects[projectIndex].status = status;
   }
  },
  addProjectToFront: (state, action: PayloadAction<Project>) => {
   state.projects.unshift(action.payload);
  },
 },
});

export const { setProjects, updateCurrentProjectStatus, addProjectToFront } =
 projectsSlice.actions;
export default projectsSlice.reducer;
