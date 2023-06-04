import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useDataFetching from "../../hooks/useDataFetching";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Delete } from "@mui/icons-material";
import { CURRENT_USER_URL } from "../../api/apiUrls";
const CommentSection = (id) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { isLoading: areCommentsLoading } = useDataFetching(
    `/comment/task/${id.id}`
  );
  const { data: currentUser, isLoading: isUserLoading } =
    useDataFetching(CURRENT_USER_URL); // Assuming the currently logged-in user is available

  const fetchComments = () => {
    axios
      .get(`/comment/task/${id.id}`)
      .then((response) => {
        const fetchedComments = response.data;
        // Sort comments by createdDate in descending order
        const sortedComments = fetchedComments.sort((a, b) => {
          const dateA = new Date(a.createdDate);
          const dateB = new Date(b.createdDate);
          return dateB - dateA;
        });
        setComments(sortedComments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };
  useEffect(() => {
    // Fetch comments initially
    fetchComments();
  }, []);
  // Function to handle comment submission
  const handleSubmit = (a) => {
    
    const newComment = {
      content: comment,
      taskId: id.id,
    };

    axios.post("/comment/create", newComment);
    fetchComments();
  };
  const handleDeleteComment = (commentId) => {
    axios
      .delete(`/comment/${commentId}`)
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };
  return (
    <Box>
      <Typography variant="h2">Comments</Typography>
      <Box
        sx={{
          marginBottom: "1rem",
          width: "50%",
          backgroundColor: colors.grey[900],
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
        <Button variant="contained"  disabled={!comment} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      {comments.map((comment) => (
        <Box
          key={comment.commentId}
          sx={{
            marginBottom: "1rem",
            width: "50%",
            backgroundColor: colors.grey[900],
            padding: "20px 30px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:"space-between",
              marginBottom: "0.5rem",
            }}
          >
            <Box>
              <Typography variant="h4" style={{ marginRight: "0.5rem" }}>
                {comment.author.firstName} {comment.author.lastName}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {comment.createdDate}
              </Typography>
            </Box>
            {((currentUser?.id && currentUser.id === comment?.author.id) ||
              (currentUser?.roles &&
                currentUser.roles.some(
                  (role) => role.name === "SUPERADMIN"
                ))) && (
              <IconButton
                onClick={() => handleDeleteComment(comment.commentId)}
                size="small"
              >
                <Delete />
              </IconButton>
            )}
          </Box>
          <Typography variant="h5">{comment.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};
export default CommentSection;
