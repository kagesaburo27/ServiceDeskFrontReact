import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import Loading from "./reusable/loading/Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        // Refresh token successful
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    verifyRefreshToken();

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
  }, [isLoading, auth]);

  return (
    <>
      {isLoading ? (
      
          <Loading />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
