import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "../../api/axios";
import useDataFetching from "../../hooks/useDataFetching";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const CommentSection = (id) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [comment, setComment] = useState("");
  const { data: comments, isLoading: areCommentsLoading } = useDataFetching(
    `/comment/task/${id.id}`
  );

  // Function to handle comment submission
  const handleSubmit = () => {
    const newComment = {
      content: comment,
      taskId: id.id,
    };

    axios.post("/comment/create", newComment);
  };

  return (
    <Box>
      <Typography variant="h2">Comments</Typography>
      <Box
        sx={{
          marginBottom: "1rem",
          width: "50%",
          backgroundColor: colors.primary[100],
          padding: "20px 30px",
          borderRadius: "10px",
        }}
      >
        <TextField
          label="Add a comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          margin="normal"
          sx={{ width: "100%" }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      {comments.map((comment) => (
        <Box
          key={comment.commentId}
          sx={{
            marginBottom: "1rem",
            width: "50%",
            backgroundColor: colors.primary[100],
            padding: "20px 30px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <Typography variant="h4" style={{ marginRight: "0.5rem" }}>
              {comment.author.firstName} {comment.author.lastName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {comment.createdDate}
            </Typography>
          </Box>
          <Typography variant="h5">{comment.content}</Typography>
          {/* Add any other comment details you want to display */}
        </Box>
      ))}
    </Box>
  );
};
export default CommentSection;
