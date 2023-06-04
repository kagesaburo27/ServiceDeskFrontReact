// reducers/teamReducer.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchCurrentUser } from '../actions/teamActions';

const initialState = {
  members: [],
  isLoading: false,
  error: null,
  currentUser: null,
  isCurrentUserLoading: false,
  currentUserError: null,
};

const teamReducer = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isCurrentUserLoading = true;
        state.currentUserError = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isCurrentUserLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isCurrentUserLoading = false;
        state.currentUserError = action.error.message;
      });
  },
});

export default teamReducer.reducer;
