import axiosPrivate from "../../api/axios";
export const fetchAssignees = (projectId) => {
  return (dispatch) => {
    dispatch(setAssigneesLoading(true));
    axiosPrivate
      .get(`/userproject/project/${projectId}`)
      .then((response) => {
        dispatch({
          type: "FETCH_ASSIGNEES",
          payload: response.data,
        });
        dispatch(setAssigneesLoading(false));
      })
      .catch((error) => {
        // Handle error
      });
  };
};

export const setAssigneesLoading = (isLoading) => {
  return {
    type: "SET_ASSIGNEES_LOADING",
    payload: isLoading,
  };
};

  