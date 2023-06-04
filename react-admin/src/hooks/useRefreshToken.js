import axios from "../api/axios";
import { useEffect } from "react";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      await axios.post("/auth/refreshtoken", null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle the error case
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return refresh;
};

export default useRefreshToken;
