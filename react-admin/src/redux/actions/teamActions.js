// actions/teamActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosPrivate from '../../api/axios';
import { USERS_URL, USER_CURRENT_URL } from '../../api/apiUrls';

export const fetchAllUsers = createAsyncThunk('team/fetchAllUsers', async () => {
  const response = await axiosPrivate.get(USERS_URL);
  return response.data;
});

export const fetchCurrentUser = createAsyncThunk('team/fetchCurrentUser', async () => {
  const response = await axiosPrivate.get(USER_CURRENT_URL);
  return response.data;
});
