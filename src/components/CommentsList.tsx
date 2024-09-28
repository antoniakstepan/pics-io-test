import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../features/comments/commentsSlice";
import { RootState, AppDispatch } from "../store";
import AddCommentModal from "./AddCommentModal";
import useLocalStorage from "../hooks/useLocalStorage";
import { StyledBox, StyledButton, StyledList, StyledListItem } from "./style";
import DeleteCommentModal from "./DeleteCommentModal";

function CommentsList() {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.list);
  const status = useSelector((state: RootState) => state.comments.status);
  const [deleteState, setDeleteState] = useState({
    isOpen: false,
    id: "",
    comment: "",
  });
  const [storageNewComponent, setStorageNewComponent] = useLocalStorage<string>(
    "newComponent",
    ""
  );

  const [newComment, setNewComment] = useState<string>(
    storageNewComponent || ""
  );
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setStorageNewComponent("");
    setNewComment(""); // Clear the input field when closing the modal
  };

  const handleChangeComment = (value: string) => {
    setNewComment(value);
    setStorageNewComponent(value);
  };

  const handleOpenDeleteModal = (id: string, comment: string) => {
    setDeleteState({
      isOpen: true,
      id,
      comment,
    });
  };

  console.log("comments", comments);
  const handleCloseDeleteModal = () => {
    setDeleteState({
      isOpen: false,
      id: "",
      comment: "",
    });
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
        comment={comments.find((comment) => comment.body) || comments[0]}
      />
      <DeleteCommentModal
        open={deleteState.isOpen}
        onClose={handleCloseDeleteModal}
        id={deleteState.id}
        comment={deleteState.comment}
      />
      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <StyledList>
        {comments
          .slice()
          .filter((x) => x.body)
          .map((comment) => (
            <StyledListItem key={comment.id}>
              <ListItemText primary={comment.body} />
              <IconButton
                edge="end"
                onClick={() =>
                  handleOpenDeleteModal(String(comment.id), comment.body)
                }
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
