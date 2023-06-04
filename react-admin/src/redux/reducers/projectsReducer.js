import {
  SET_PROJECTS,
  SET_LOADING,
  SET_SEARCH_TEXT,
  SET_FILTERED_PROJECTS,
} from "../actions/projectsActions";

const initialState = {
  projects: [],
  filteredProjects: [],
  isLoading: false,
  searchText: "",
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    case SET_FILTERED_PROJECTS:
      return {
        ...state,
        filteredProjects: action.payload,
      };
    default:
      return state;
  }
};

export default projectsReducer;
