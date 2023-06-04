const initialState = {
  assignees: [],
  isAssigneesLoading: false,
};

const assigneeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ASSIGNEES":
      return {
        ...state,
        assignees: action.payload,
      };
    case "SET_ASSIGNEES_LOADING":
      return {
        ...state,
        isAssigneesLoading: action.payload,
      };
    case "FETCH_ASSIGNEES_SUCCESS":
      return {
        ...state,
        assignees: action.payload, // update the assignees state property
      };
    default:
      return state;
  }
};

export default assigneeReducer;
