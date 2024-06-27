import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
 _id: string;
 email: string;
 fullNames: string;
 phone: string;
 profile: string;
 role: string;
}

export interface UserState {
 user: User | null;
 userId: string | null;
}

const initialState: UserState = {
 user: null,
 userId: null,
};

const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  setUser(state, action: PayloadAction<{ user: User; userId: string }>) {
   state.user = action.payload.user;
   state.userId = action.payload.userId;
  },
  clearUser(state) {
   state.user = null;
   state.userId = null;
  },
 },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
