import { Dialog, DialogTitle, Button, Typography } from "@mui/material";
import React from "react";
import {
  StyledDialogActions,
  StyledDeleteButton,
  StyledDialogContent,
} from "./style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteComment } from "../features/comments/commentsSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
  comment: string;
};
function DeleteCommentModal({ onClose, open, id, comment }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteComment = (id: string) => {
    console.log("ssa");
    dispatch(deleteComment(Number(id)));
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete comment</DialogTitle>
      <StyledDialogContent>
        Are you sure you want to delete this comment? <br />
        <Typography variant="body2" sx={{ fontWeight: 600, paddingTop: "8px" }}>
          {comment}
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose} color="info">
          Cancel
        </Button>
        <StyledDeleteButton onClick={() => handleDeleteComment(id)}>
          Delete
        </StyledDeleteButton>
      </StyledDialogActions>
    </Dialog>
  );
}

export default DeleteCommentModal;
