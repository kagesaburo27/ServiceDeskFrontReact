import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./scenes/global/Navbar";
import Sidebar from "./scenes/global/Sidebar";

import { Outlet } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import  AuthContext  from "./context/AuthProvider";
const App = () => {
  const [theme, colorMode] = useMode();
  const setAuth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <ColorModeContext.Provider value={colorMode}>
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Navbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
