import { Dialog, DialogTitle, Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addComment, Comment } from "../features/comments/commentsSlice";
import {
  StyledDialogContent,
  StyledTextField,
  StyledDialogActions,
  StyledButton,
} from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  newComment: string;
  onChangeComment: (value: string) => void;
  comment: Comment;
};

function AddCommentModal({
  onClose,
  open,
  onChangeComment,
  newComment,
  comment,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newComment.trim()) {
      console.log("comment", comment);
      const commentData = {
        body: newComment,
        postId: comment.postId,
        userId: comment.user.id,
      };
      dispatch(addComment(commentData));
      onChangeComment("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a New Comment</DialogTitle>
      <StyledDialogContent>
        <StyledTextField
          value={newComment}
          onChange={(e) => onChangeComment(e.target.value)}
          label="New Comment"
          fullWidth
          required
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose} color="info">
          Cancel
        </Button>
        <StyledButton onClick={handleAddComment} disabled={!newComment}>
          Add
        </StyledButton>
      </StyledDialogActions>
    </Dialog>
  );
}

export default AddCommentModal;
