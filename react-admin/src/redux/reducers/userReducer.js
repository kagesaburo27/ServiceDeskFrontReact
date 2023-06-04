import {
    SET_USER,
    SET_CURRENT_USER,
    EDIT_USER,
    SET_AVATAR,
  } from "../actions/userActions";
  
  const initialState = {
    user: null,
    currentUser: null,
    avatarUrl: "",
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };
      case SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.payload,
        };
      case EDIT_USER:
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
          currentUser: {
            ...state.currentUser,
            ...action.payload,
          },
        };
      case SET_AVATAR:
        return {
          ...state,
          avatarUrl: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  