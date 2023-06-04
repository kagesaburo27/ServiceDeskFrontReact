import { GET_ASSIGNEES_URL } from "../../api/apiUrls";
import axiosPrivate from "../../api/axios";
import { setLoading, setFilteredIssues } from "../actions/issueActions";

// Import the assignee actions
import {
  fetchAssignees,
  setAssigneesLoading,
} from "../actions/assigneeActions";

const initialState = {
  issues: [],
  filteredIssues: [],
  isLoading: false,
  issue: null, // Add issue property to hold single issue information
};
const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ISSUES":
      return {
        ...state,
        issues: action.payload,
        filteredIssues: action.payload,
      };
    case "SET_FILTERED_ISSUES":
      return {
        ...state,
        filteredIssues: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    // Add assignee actions
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
    case "CREATE_TASK":
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case "FETCH_ISSUE": // Add new case for fetching a single issue
      return {
        ...state,
        issue: action.payload,
      };
    default:
      return state;
  }
};

export default issueReducer;
