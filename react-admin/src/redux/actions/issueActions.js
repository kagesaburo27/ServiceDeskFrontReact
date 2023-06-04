import { CREATE_TASK_URL, TASKS_URL } from "../../api/apiUrls";
import axiosPrivate from "../../api/axios";
import { CREATE_USER_URL } from "../../api/apiUrls";

export const setLoading = (isLoading) => {
  return {
    type: 'SET_LOADING',
    payload: isLoading,
  };
};
export const setFilteredIssues = (issues) => {
  return {
    type: 'SET_FILTERED_ISSUES',
    payload: issues,
  };
};

export const fetchIssues = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axiosPrivate
      .get(TASKS_URL)
      .then((response) => {
        dispatch({
          type: 'FETCH_ISSUES',
          payload: response.data,
        });
        dispatch(setFilteredIssues(response.data));
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const createTask = (taskData) => {
  return async(dispatch) => {
    dispatch(setLoading(true));
    return axiosPrivate
      .post(CREATE_TASK_URL, taskData)
      .then((response) => {
        dispatch({
          type: 'CREATE_TASK',
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        // Handle error
        throw error;
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  
}
export const fetchIssue = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axiosPrivate
      .get(`/task/${id}`)
      .then((response) => {
        dispatch({
          type: 'FETCH_ISSUE',
          payload: response.data,
        });
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
