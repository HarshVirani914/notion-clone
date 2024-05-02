import { createSlice } from "@reduxjs/toolkit";

export interface Page {
  _id: string;
  userId: string;
  name: string;
  documents: any[];
  isTrashed: boolean;
  createdAt: string;
}

const initialState: {
  pages: Page[];
} = {
  pages: [],
};

export const pageSlice = createSlice({
  name: "page",
  initialState: initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    addPage: (state, action) => {
      state.pages = [action.payload, ...state.pages];
    },
    updatePage: (state, action) => {
      state.pages = state.pages.map((d) =>
        d._id !== action.payload._id ? d : action.payload
      );
    },
    deletePage: (state, action) => {
      state.pages = state.pages.filter((d) => d._id !== action.payload._id);
    },
  },
});

export const { setPages, addPage, updatePage, deletePage } = pageSlice.actions;

export default pageSlice.reducer;
