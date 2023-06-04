import { combineReducers } from 'redux';
import issueReducer from './issueReducer';
import projectsReducer from './projectsReducer';
import assigneeReducer from './assigneeReducer';
import teamReducer from './teamReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  issue: issueReducer,
  projects: projectsReducer,
  assignee: assigneeReducer,
  team: teamReducer,
  user: userReducer,
});

export default rootReducer;
