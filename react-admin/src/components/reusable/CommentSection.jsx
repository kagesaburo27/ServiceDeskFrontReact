import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CommentSection = ({ sprintId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now().toString(),
        text: newComment,
        sprintId,
      };
      setComments((prevComments) => [...prevComments, comment]);
      setNewComment("");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Add a Comment</Typography>
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={newComment}
        onChange={handleCommentChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>
        Add Comment
      </Button>
      <Box mt={4}>
        <Typography variant="h6">Comments</Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CommentSection;
