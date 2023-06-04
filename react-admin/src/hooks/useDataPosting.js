import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import Loading from "../components/reusable/loading/Loading"
const useDataPosting = (apiAddress, data) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.post(apiAddress, data);
        setData(response.data);
      } catch (err) {
        if (!err?.response) {
          console.log("No Server Response");
        } else {
          console.log("Login Failed");
        }
      }
      finally {
        setIsLoading(false); // Set isLoading to false after the request is complete
      }
    };
    fetchData();
  }, [apiAddress, data]);

  return {
    data,
    isLoading,
  };
};

export default useDataPosting;
