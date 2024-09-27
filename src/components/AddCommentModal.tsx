import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  styled,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addComment } from "../features/comments/commentsSlice";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  minWidth: "400px",
}));

const StyledTextField = styled(TextField)(() => ({
  marginTop: 6,
}));

type Props = {
  open: boolean;
  onClose: () => void;
  newComment: string;
  onChangeComment: (value: string) => void;
};

function AddCommentModal({
  onClose,
  open,
  onChangeComment,
  newComment,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(), // Unique ID for the comment
        body: newComment,
      };
      dispatch(addComment(comment));
      onChangeComment("");
      onClose(); // Close modal after adding the comment
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
      <DialogActions>
        <Button onClick={onClose} color="info">
          Cancel
        </Button>
        <StyledButton onClick={handleAddComment} disabled={!newComment}>
          Add
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddCommentModal;
