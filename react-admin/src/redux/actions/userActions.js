import { CURRENT_USER_IMAGE_URL, CURRENT_USER_URL } from "../../api/apiUrls";
import axios from "../../api/axios";

// Action types
export const SET_USER = "SET_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const EDIT_USER = "EDIT_USER";
export const SET_AVATAR = "SET_AVATAR";
export const GET_AVATAR = "GET_AVATAR";

// Action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  payload: currentUser,
});

export const editUser = (updatedData) => ({
  type: EDIT_USER,
  payload: updatedData,
});

export const setAvatar = (avatarUrl) => ({
  type: SET_AVATAR,
  payload: avatarUrl,
});
export const getAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(CURRENT_USER_IMAGE_URL);
      dispatch(setAvatar(response.data));
    } catch (error) {
      // Handle error
    }
  };
};


// Async action creator to get user data
export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      dispatch(setUser(response.data));
    } catch (error) {
      // Handle error
    }
  };
};

// Async action creator to get current user data
export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(CURRENT_USER_URL);
      dispatch(setCurrentUser(response.data));
    } catch (error) {
      // Handle error
    }
  };
};

// Async action creator to edit user data
export const editUserData = (userId, updatedData) => {
  return async (dispatch) => {
    try {
      await axios.put(`/user/${userId}`, updatedData);
      dispatch(editUser(updatedData));
    } catch (error) {
      // Handle error
    }
  };
};

// Async action creator to get user avatar
export const getUserAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(CURRENT_USER_IMAGE_URL);
      dispatch(setAvatar(response.data.url));
    } catch (error) {
      // Handle error
    }
  };
};

// Async action creator to set user avatar
export const setUserAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      await axios.post("/image/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh the user's image
      const { data: refreshedUser } = await axios.get(CURRENT_USER_IMAGE_URL);
      const userAvatarUrl = refreshedUser.url;

      dispatch(setAvatar(userAvatarUrl));
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };
};
