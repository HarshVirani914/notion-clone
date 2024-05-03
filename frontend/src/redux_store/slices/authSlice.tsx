import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { boolean } from "yup";

interface authState {
  isAuthenticated: boolean;
  token: string;
  user: [];
  users: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: authState = {
  isAuthenticated: false,
  token: "",
  user: [],
  users: [],
  status: "idle",
};

export const fetchUsers = createAsyncThunk(
  "notes/users",
  async (user: string) => {
    console.log("user id : ", user);
    const response = await axios.get(
      `http://localhost:3001/auth/search?name=${user}`
    );
    //console.log("users : ",response);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("login reducer ", action.payload);
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = [];
    },
    update: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        console.log("action.payload : ", action.payload);
        console.log("state.notes : ", state.users);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});

export const { login, logout, update } = authSlice.actions;

export const isAuthenticated = (state: any) => state.auth.isAuthenticated;
export const getUser = (state: any) => state.auth.user;
export const getUsers = (state: any) => state.auth.users;

export default authSlice.reducer;
