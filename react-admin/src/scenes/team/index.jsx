import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridExportCsvOptions } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GridToolbar } from "@mui/x-data-grid";

import Loading from "../../components/reusable/loading/Loading";
import SearchBar from "../../components/reusable/SearchBar";

import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, fetchCurrentUser } from '../../redux/actions/teamActions';


const Team = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const members = useSelector((state) => state.team.members);
  const isLoading = useSelector((state) => state.team.isLoading);
  const currentUser = useSelector((state) => state.team.currentUser);
  const isCurrentUserLoading = useSelector((state) => state.team.isCurrentUserLoading);
  const isSuperAdmin = currentUser?.roles?.some((role) => role.name === 'SUPERADMIN');

  const filteredRows = members.filter((row) => {
    const firstName = row.firstName.toLowerCase();
    const lastName = row.lastName.toLowerCase();
    const username = row.username.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      username.includes(query)
    );
  });

  const handleRowClick = (param, event) => {
    navigate(`/user/${param?.row.id}`, { state: { rows: param.row } });
    console.log('Row:');
    console.log(param.row);
    console.log(event);
  };

  const getCellValueAsString = (params) => {
    const value = params.value;
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value ? String(value) : '';
  };

  const exportOptions = {
    fieldSeparator: ',',
    getCellValue: getCellValueAsString,
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
    },
    {
      field: 'birth',
      headerName: 'Date of birth',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      flex: 1,
    },
    {
      field: 'roles',
      headerName: 'Access Level',
      flex: 1,
      valueGetter: ({ value }) => {
        const sortedRoles = [...value].sort((a, b) => a.id - b.id);
        const roleName = sortedRoles[0] ? sortedRoles[0].name : '';
        return roleName;
      },
      renderCell: ({ row: { roles } }) => {
        const sortedRoles = [...roles].sort((a, b) => a.id - b.id);
        const role = sortedRoles[0];
        let icon = <AdminPanelSettingsOutlinedIcon />;
        let roleName = role ? role.name : '';

        if (roleName === 'ADMIN' || roleName === 'SUPERADMIN') {
          icon = <AdminPanelSettingsOutlinedIcon />;
        } else if (roleName === 'MODERATOR') {
          icon = <SecurityOutlinedIcon />;
        } else if (roleName === 'USER') {
          icon = <LockOpenOutlinedIcon />;
        }

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            backgroundColor={colors.primary[500]}
          >
            {icon}
            <Typography color={colors.textPrimary[200]} sx={{ ml: '5px' }}>
              {roleName}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Header title="Team" subtitle="Managing the Team Members" />
        <Box display="flex" flexDirection="row">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {isSuperAdmin && (
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.primary[1] }}
              component={Link}
              to="/user/add"
            >
              Add new member
            </Button>
          )}
        </Box>
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          onRowClick={handleRowClick}
          getRowId={(row) => row.id}
          slots={{
            toolbar: GridToolbar,
          }}
          // loading={isLoading || isCurrentUserLoading}
          // loadingOverlay={<Loading />}
          componentsProps={{ options: { exportOptions } }}
          rows={filteredRows}
          columns={columns}
          sx={{
            '& .MuiDataGrid-row:hover': {
              color: colors.blueAccent[500],
              border: 'none',
            },
            '@media print': {
              '.MuiDataGrid-main': {
                width: 'fit-content',
                height: 'fit-content',
                overflow: 'visible',
              },
            },
            boxShadow: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;
