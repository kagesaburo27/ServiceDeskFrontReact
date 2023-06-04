import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useEffect } from "react";
import { useState } from "react";
import CheckAuth from "./CheckAuth";
import Loading from "./reusable/loading/Loading";
const RequireAuth = ({ allowedRoles }) => {
  const [auth, setAuth] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        const response = await CheckAuth();
        setAuth(response);
        console.log(!!response);
        if (!!response) {
          setAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(
          "Error occurred while fetching authentication status:",
          error
        );
        // Handle the error case
      } finally {
        setLoading(false);
      }
    };

    fetchAuthenticationStatus();
  }, []);
  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);

  if (loading) {
    // Show loading state while fetching authentication status
    return <Loading />;
  }

  if (!authenticated) {
    // Redirect or show unauthorized access message if not authenticated
    return <Navigate to="/login" />;
  }

  if (!auth?.roles?.some((role) => allowedRoles.includes(role))) {
    // Redirect or show unauthorized access message if the user's role is not allowed
    return <Navigate to="/" />;
  }

  // Render the protected content if authenticated and allowed
  return <Outlet />;
};

export default RequireAuth;
