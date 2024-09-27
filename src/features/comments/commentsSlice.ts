import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Comment {
  id: number;
  body: string;
}

interface CommentsState {
  list: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: CommentsState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch("https://dummyjson.com/comments");
    return response.json();
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.list.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.list = state.list.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.comments; // Assuming response has comments key
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
