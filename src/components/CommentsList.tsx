import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  styled,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  fetchComments,
} from "../features/comments/commentsSlice";
import { RootState, AppDispatch } from "../store";
import AddCommentModal from "./AddCommentModal";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "16px",
  boxShadow: "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)", // Apply box shadow directly here
  // boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  marginBottom: theme.spacing(1),
}));

const StyledList = styled(List)(() => ({
  display: "flex",
  flexDirection: "column",
  rowGap: 24,
}));
function CommentsList() {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.list);
  const status = useSelector((state: RootState) => state.comments.status);
  const error = useSelector((state: RootState) => state.comments.error);
  const [newComment, setNewComment] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  const handleDeleteComment = (id: number) => {
    dispatch(deleteComment(id));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewComment(""); // Clear the input field when closing the modal
  };

  const handleChangeComment = (value: string) => {
    setNewComment(value);
  };
  return (
    <Container sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
      <StyledBox>
        <Typography variant="h3" gutterBottom>
          Comments
        </Typography>
        <StyledButton onClick={handleOpen}>Add Comment</StyledButton>
      </StyledBox>

      <AddCommentModal
        open={open}
        onClose={handleClose}
        newComment={newComment}
        onChangeComment={handleChangeComment}
      />
      {status === "loading" && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <StyledList>
        {comments
          .slice()
          .reverse()
          .map((comment) => (
            <StyledListItem key={comment.id}>
              <ListItemText primary={comment.body} />
              <IconButton
                edge="end"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <DeleteIcon />
              </IconButton>
            </StyledListItem>
          ))}
      </StyledList>
    </Container>
  );
}

export default CommentsList;
