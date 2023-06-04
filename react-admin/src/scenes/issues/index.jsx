import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Modal } from "@mui/material";
import { useState } from "react";
import Create from "./create";
import { useNavigate } from "react-router-dom";
import useDataFetching from "../../hooks/useDataFetching";
import { TASKS_URL } from "../../api/apiUrls";
import Loading from "../../components/reusable/loading/Loading";
import SearchBar from "../../components/reusable/SearchBar";
import CustomChip from "../../components/reusable/CustomChip";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { fetchIssues } from "../../redux/actions/issueActions"; // Import action creator

const Issues = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    dispatch(fetchIssues()); // Dispatch the fetchIssues action on component mount
  }, [dispatch]);

  const navigate = useNavigate();
  const { filteredIssues, isLoading } = useSelector((state) => state.issue); // Get the required state from Redux store

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (param, event) => {
    navigate(`/issue/${param?.row.taskId}`, { state: { rows: param.row } });
    console.log("Row:");
    console.log(param.row);
    console.log(event);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = filteredIssues.filter((row) => {
    const title = row.title.toLowerCase();
    const description = row.description.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || description.includes(query);
  });

  const columns = [
    { field: "taskId", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,

      cellClassName: "name-column--cell",
    },
    {
      field: "taskPriority",
      headerName: "Priority",
      valueGetter: ({ value }) => {
        let name = value ? value.name : "";
        return name;
      },
      flex: 0.5,
      renderCell: ({ row: { taskPriority } }) => {
        return (
          <CustomChip
          
          label={taskPriority?.name}
          borderRadius="4px"
          type="priority"
        />
        );
      },
    },
    {
      field: "taskType",
      headerName: "Type",
      
      flex: 0.5,
      renderCell: ({ row: { taskType } }) => {
       return ( <CustomChip label={taskType?.name} borderRadius="4px" />)
      },
      valueGetter: ({ value }) => {
        let name = value ? value.name : "";
        return name;
      },
    },
    {
      field: "createdDate",
      headerName: "Created on",
      flex: 0.5,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      flex: 0.5,
    },
    {
      field: "project",
      headerName: "Project",
      valueGetter: ({ value }) => {
        let name = value ? value.title : "";
        return name;
      },
      flex: 0.4,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 0.5,
      valueGetter: ({ value }) => {
        let name = value ? value.username : "";
        return name;
      },
    },
    {
      field: "taskStatus",
      headerName: "Status",
      valueGetter: ({ value }) => {
        let name = value ? value.name : "";
        return name;
      },
      renderCell: ({ row: { taskStatus } }) => {
        return (<CustomChip label={taskStatus?.name} type="status" />)
      },
      flex: 0.5,
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Header title="Issues" subtitle="Managing the issues" />
        <Box display="flex" flexDirection="row">
            <SearchBar
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ backgroundColor: colors.primary[1] }}
          >
            Create new task
          </Button>
        </Box>
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "createdDate", sort: "desc" }],
            },
          }}
          m="0 10px"
          onRowClick={handleRowClick}
          loading={isLoading}
           loadingOverlay={<Loading />} 
          getRowId={(row) => row.taskId}
          rows={filteredRows}
          columns={columns}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Create />
      </Modal>
    </Box>
  );
};

export default Issues;
