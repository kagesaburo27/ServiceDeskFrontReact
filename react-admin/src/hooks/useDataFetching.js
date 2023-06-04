import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import Loading from "../components/reusable/loading/Loading"
const useDataFetching = (apiAddress) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(apiAddress);
        setData(response.data);
      } catch (err) {
        if (!err?.response) {
          console.log("No Server Response");
        } else {
          console.log(err.response);
        }
      }
      finally {
        setIsLoading(false); // Set isLoading to false after the request is complete
      }
    };
    fetchData();
  }, [apiAddress]);

  return {
    data,
    isLoading,
  };
};

export default useDataFetching;
