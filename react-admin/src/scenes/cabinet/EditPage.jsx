import { useState } from "react";
import { Box, TextField, Button, Avatar, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "../../api/axios";

const EditPage = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make API request to update user information
    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("phone", phone);
      const response = await axios.put("/user/update", formData);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity("error");
    }
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box m={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
        <Button type="submit">Save</Button>
      </form>
      <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPage;
