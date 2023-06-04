  import * as loadingAnimation from "./loadingAnimation.json"
  import Lottie from "lottie-react";
  import { Box } from "@mui/material";
  const Loading = () => {
    const style = {
      width:"100vw",
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
    };
  const loading = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box style={style}>
      <Lottie animationData={loadingAnimation}/> 
      </Box>
  )
  }
  export default Loading;