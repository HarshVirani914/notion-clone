import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  currentUser: null | Record<string, any>;
} = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
