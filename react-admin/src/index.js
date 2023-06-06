import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import FAQ from "./scenes/faq";
import Login from "./login";
import Issues from "./scenes/issues";
import Calendar from "./scenes/calendar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ViewIssueDetails from "./scenes/issues/ViewIssueDetails";
import PersistLogin from "./components/PersistLogin";
import Statistics from "./scenes/statistics";
import UserPage from "./scenes/cabinet/userPage";
import EditIssue from "./scenes/issues/EditIssue";
import Projects from "./scenes/projects";
import ViewProjectDetails from "./scenes/projects/ViewProjectDetails";
import CreateUser from "./scenes/team/CreateUser";
import API from "./scenes/API";
import EditProject from "./scenes/projects/EditProject";
import EditPage from "./scenes/cabinet/EditPage";
import SearchResultsPage from "./scenes/global/SearchResultsPage"
import { Provider } from "react-redux";
import store from './redux/store/store';
const ROLES = {
  U: "USER",
  M: "MODERATOR",
  A: "ADMIN",
  S: "SUPERADMIN",
};
const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    path: "/",
    children: [
      {
        element: <RequireAuth allowedRoles={[ROLES.U]} />,
        children: [
          {
            path: "/",
            element: <App />,
            children: [
              {
                path:"/search-results/:query",
                element: <SearchResultsPage/> 
              },
              {
                
                path: "profile",
                element: <UserPage />,
              },
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "team",
                element: <Team />,
              },
              {
                path: "user/add",
                element: <CreateUser />,
              },
              {
                path: "user/:id",
                element: <UserPage />,
              },
              {
                path: "user/:id/edit",
                element: <EditPage />,
              },
              {
                path: "issues",
                element: <Issues />,
              },
              {
                path: "issue/:id",
                element: <ViewIssueDetails />,
              },
              {
                path: "issue/:id/edit",
                element: <EditIssue />,
              },
              {
                path: "projects",
                element: <Projects />,
              },
              {
                path: "project/:id",
                element: <ViewProjectDetails />,
              },
              {
                path: "project/:id/edit",
                element: <EditProject />,
              },
              {
                path: "faq",
                element: <FAQ />,
              },
              {
                path: "api",
                element: <API />,
              },
              {
                path: "calendar",
                element: <Calendar />,
              },
              {
                path: "statistics",
                element: <Statistics />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
         <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
