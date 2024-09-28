import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Comment {
  id: number;
  body: string;
  postId: string;
  user: {
    id: string;
    username: string;
    fullName: string;
  };
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

// Fetch comments from API
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch("https://dummyjson.com/comments");
    const data = await response.json();
    return data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({
    body,
    postId,
    userId,
  }: {
    body: string;
    postId: string;
    userId: string;
  }) => {
    const response = await fetch("https://dummyjson.com/comments/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        postId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    const data = await response.json();
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: number) => {
    await fetch(`https://dummyjson.com/comments/${commentId}`, {
      method: "DELETE",
    });
    return commentId;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.unshift(action.payload); // Add new comment to the top
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
