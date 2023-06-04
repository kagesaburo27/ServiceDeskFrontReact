import axiosPrivate from "../api/axios";
const CheckAuth = async () => {
    try {
      const response = await axiosPrivate.get("/auth/status");
      console.log(response.data)
      return response.data;
    } catch (error) {
      // Handle error
      console.log("Error checking authentication status:", error);
      return false;
    }
  };
  export default CheckAuth;