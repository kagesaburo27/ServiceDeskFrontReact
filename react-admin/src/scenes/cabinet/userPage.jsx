import { Box, Typography, Avatar, IconButton, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useDataFetching from "../../hooks/useDataFetching";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Loading from "../../components/reusable/loading/Loading";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { getUser, setCurrentUser, setAvatar } from "../../redux/actions/userActions";
import axios from "../../api/axios";

const UserPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiAddress = `user/${id}`;
  const { data, isLoading } = useDataFetching(apiAddress);
  const [photoUrl, setPhotoUrl] = useState("");
  const { user, currentUser, avatarUrl } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const isCurrentUser = currentUser && currentUser.id === (user && user.id);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const profileData = [
    { title: "Username", value: data.username },
    { title: "Email", value: data.email },
    { title: "Birth", value: data.birth },
    { title: "Phone", value: data.phone },
  ];

  useEffect(() => {
    setPhotoUrl(avatarUrl);
  }, [avatarUrl]);

  const handleAvatarHover = () => {
    setIsHovered(true);
  };

  const handleAvatarLeave = () => {
    setIsHovered(false);
  };

  const uploadPhoto = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setIsUpdateLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post("/image/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Refresh the user's image
        const { data: refreshedUser } = await axios.get("/image/my");
        const userAvatarUrl = refreshedUser.url;

        // Update the user's avatar URL in the Redux state
        dispatch(setAvatar(userAvatarUrl));
        setIsUpdateLoading(false);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const handleEditButtonClick = () => {
    // Navigate to the edit page
  };

  useEffect(() => {
    dispatch(getUser(id)); // Dispatch the action to get user data
  }, [dispatch, id]);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box m="30px 50px">
      <Box
        sx={{
          backgroundImage: "url('../../assets/forest.jpeg')",
          padding: "20px 30px",
          borderRadius: "20px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Header title="User" subtitle="Welcome" />
          {isCurrentUser && (
            <IconButton onClick={handleEditButtonClick}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            padding: "10px",
            margin: "30px 50px",
            borderRadius: "5px",
          }}
        >
          {isUpdateLoading ? (
            <Skeleton
              variant="circular"
              width={150}
              height={150}
              marginRight="20px"
            />
          ) : (
            <label htmlFor="upload-avatar-input">
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={photoUrl}
                  alt="User Avatar"
                  sx={{
                    width: 150,
                    height: 150,
                    marginRight: "20px",
                    cursor: isCurrentUser ? "pointer" : "default",
                    position: "relative",
                  }}
                  onMouseEnter={handleAvatarHover}
                  onMouseLeave={handleAvatarLeave}
                >
                  {isCurrentUser && isHovered && (
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        backgroundColor: "#fff",
                      }}
                      onClick={uploadPhoto}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                  )}
                </Avatar>
              </Box>
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            id="upload-avatar-input"
            disabled={!isCurrentUser}
          />
          <Box
            padding="20px 30px"
            borderRadius="20px"
            backgroundColor={colors.primary[200]}
          >
            <Typography variant="h2">{`${data.firstName} ${data.lastName}`}</Typography>
            <Typography variant="h5">{data.email}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        {profileData.map((item) => (
          <Box
            key={item.title}
            sx={{
              m: 2,
              p: "10px 20px",
              backgroundColor: colors.blueAccent[900],
              borderRadius: "10px",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              {item.title}:
            </Typography>
            <Typography variant="body1" fontWeight="bold" fontSize={20}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserPage;
