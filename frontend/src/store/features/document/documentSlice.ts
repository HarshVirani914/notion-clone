import { createSlice } from "@reduxjs/toolkit";

export const documentSlice = createSlice({
  name: "document",
  initialState: {
    documents: [],
    document: {}
  },
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    setDocument: (state, action) => {
      state.document = action.payload;
    }
  }
})

export const { setDocuments, setDocument } = documentSlice.actions;

export default documentSlice.reducer;