import { Box, Typography, useTheme, Paper } from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../../theme";
import CircleIcon from "@mui/icons-material/Circle";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import { useState } from "react";

import Create from "./create";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  filterProjects,
  setSearchFilter,
} from "../../redux/actions/projectsActions";

const Projects = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const isModerator = currentUser?.roles?.some(
    (role) => role.name === "MODERATOR"
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const searchText = useSelector((state) => state.projects.searchText);
  const projects = useSelector((state) => state.projects.projects);
  const filteredProjects = useSelector(
    (state) => state.projects.filteredProjects
  );
  const isLoading = useSelector((state) => state.projects.isLoading);

  const handleClose = () => setOpen(false);
  const handleSearchInputChange = (e) => {
    dispatch(setSearchFilter(e.target.value));
  };

  const handleRowClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  useEffect(() => {
    dispatch(filterProjects(searchText, projects));
  }, [searchText, projects]);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Header title="Projects" subtitle="Managing the projects" />
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="15px"
            mr="10px"
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={searchText}
              onChange={handleSearchInputChange}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box m="40px 0 0 0" display="flex" flexWrap="wrap">
        {filteredProjects.map((project) => (
          <Paper
            height="200px"
            key={project.projectId}
            onClick={() => handleRowClick(project.projectId)}
            sx={{
              m: 2,
              width: "30%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: colors.primary[200],
              },
              backgroundColor: colors.primary[300],
              borderColor: colors.grey[800],
              borderRadius: "30px",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              height="30%"
              sx={{
                "&:hover": {
                  backgroundColor: colors.primary[100],
                },
                borderRadius: "30px 30px 0 0 ",
                p: 2,
                backgroundImage: [
                  "linear-gradient(135deg,",
                  colors.primary[1],
                  " 0%,",
                  colors.primary[2],
                  " 100%)",
                ].join(" "),
              }}
              alignItems="center"
            >
              <Typography sx={{ color: colors.primary[100] }} variant="h2">
                {project.title}
              </Typography>
            </Box>
            <Box sx={{ p: 2, m: 2 }}>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {project.description.substring(0, 150)}
                {project.description.length > 150 && "..."}
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography
                  variant="h4"
                  sx={{ color: colors.textPrimary[100] }}
                >
                  Admin: {project.admin.username}
                </Typography>
                <Button
                  variant="text"
                  onClick={() => handleRowClick(project.projectId)}
                >
                  Details
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
        {isModerator && (
          <Paper
            height="200px"
            onClick={handleOpen}
            sx={{
              opacity: 0.5,
              m: 2,
              width: "30%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: colors.primary[100],
                opacity: 1,
              },
              backgroundColor: colors.blueAccent[800],
              borderRadius: "30px",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              height="100%"
              sx={{
                borderRadius: "30px ",
                p: 2,
                backgroundImage: [
                  "linear-gradient(135deg,",
                  colors.primary[1],
                  " 0%,",
                  colors.primary[2],
                  " 100%)",
                ].join(" "),
              }}
              alignItems="center"
            >
              <Typography sx={{ color: colors.primary[100] }} variant="h1">
                +
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Create handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default Projects;
