import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project } from "./projectsSlices";

interface ProjectState {
 currentProject: Project | null;
}
const initialState: ProjectState = {
 currentProject: null,
};
const projectSlice = createSlice({
 name: "project",
 initialState,
 reducers: {
  setCurrentProject: (state, action: PayloadAction<Project>) => {
   state.currentProject = action.payload;
  },
 },
});

export const { setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
