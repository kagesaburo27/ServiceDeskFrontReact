import { PROJECTS_URL } from "../../api/apiUrls";
import { axiosPrivate } from "../../api/axios";

// Action types
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_LOADING = "SET_LOADING";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const SET_FILTERED_PROJECTS = "SET_FILTERED_PROJECTS";

// Action creators
export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setSearchText = (searchText) => ({
  type: SET_SEARCH_TEXT,
  payload: searchText,
});

export const setFilteredProjects = (filteredProjects) => ({
  type: SET_FILTERED_PROJECTS,
  payload: filteredProjects,
});

// Async action creator to fetch projects data
export const fetchProjects = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axiosPrivate.get(PROJECTS_URL);
      dispatch(setProjects(response.data));
      dispatch(setFilteredProjects(response.data));
    } catch (error) {
      // Handle error
    }

    dispatch(setLoading(false));
  };
};

// Action creator to filter projects based on search text
export const filterProjects = (searchText, projects) => {
  return (dispatch) => {
    const filteredProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchText.toLowerCase()) ||
        project.description.toLowerCase().includes(searchText.toLowerCase())
    );
    dispatch(setFilteredProjects(filteredProjects));
  };
};

// Action creator to set search text
export const setSearchFilter = (searchText) => {
  return (dispatch) => {
    dispatch(setSearchText(searchText));
  };
};
export const fetchProject = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axiosPrivate
      .get(`/project/${id}`)
      .then((response) => {
        dispatch({
          type: 'FETCH_PROJECT',
          payload: response.data,
        });
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    }}