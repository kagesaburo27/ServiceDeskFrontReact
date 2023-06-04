import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../../theme";
import BarChart from "../../components/datalayer/BarChart";

import Header from "../../components/Header";

import { Button } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { useState } from "react";
import moment from "moment";
import useDataFetching from "../../hooks/useDataFetching";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { PROJECTS_URL } from "../../api/apiUrls";
import SelectForm from "../../components/reusable/SelectForm";
import { useForm } from "react-hook-form";
const Statistics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [affectedCount, setAffectedCount] = useState(0);
  const [start, setStartDate] = useState(moment("2000/01/01"));
  const [selectedProjectId, setSelectedProjectId] = useState([]);
  const [end, setEndDate] = useState(moment());
  const st = start.format("YYYY/MM/DD");
  const en = end.format("YYYY/MM/DD");
  const { data: projects, isLoading: areProjectsLoading } =
    useDataFetching(PROJECTS_URL);
  const projectIds = projects?.map((project) => project?.projectId);
  const projectIdString = projectIds?.join(",");
  const url = `/statistics/tasks?start=${st}&end=${en}&projectId=${projectIdString}`;
  const urlAffected = `/statistics/affected?start=${st}&end=${en}&projectId=${projectIdString}`;
  const [apiAddress, setApiAddress] = useState(url);
  const [apiAddressAffected, setApiAddressAffected] = useState(urlAffected);
  const { data: data, isLoading: isLoading } = useDataFetching(apiAddress);
  const { data: affected, isLoading: isAffectedLoading } =
    useDataFetching(apiAddressAffected);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    setApiAddress(url);
    setApiAddressAffected(urlAffected);
  }, [url, urlAffected]);
  const onSubmit = async (values) => {
    console.log(values);
    
    const st = moment(moment(start)).format("YYYY/MM/DD");
    const en = moment(moment(end)).format("YYYY/MM/DD");
    const selectedProjects = values.projectId;
    console.log(selectedProjects);
    const selectedProjectIdString = selectedProjects?.join(",");
    const url = `/statistics/tasks?start=${st}&end=${en}&projectId=${selectedProjectIdString}`;
    const url2 = `/statistics/affected?start=${st}&end=${en}&projectId=${selectedProjectIdString}`;
    setApiAddress(url);
    setApiAddressAffected(url2);
  };
  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);
  
  useEffect(() => {
    if (affected) {
      setAffectedCount(affected);
    }
  }, [affected]);

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId.length > 0 ? projectId : "");
    setValue("projectId", projectId);
  };
  const renderStatusCards = () => {
    console.log(rows);
    return rows.map((row) => (
      <Card
        key={row.id}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
          width: "220px",
          height: "120px",
          backgroundColor: colors.blueAccent[900],
        }}
      >
        <CardContent>
          <Box>
            <Box mb={2} display="flex" justifyContent="space-between">
              <Typography variant="h2" align="left">
                {row.count}
              </Typography>
              <img
                src={`../../assets/icons/${row.name}.svg`}
                height="30px"
                width="30px"
              />
            </Box>
            <Typography variant="h5" align="center">
              TOTAL ISSUES {row.name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ));
  };
  return (
    <Box
      m="20px"
      sx={{
        "& .MuiDataGrid-toolbarContainer button": {
          color: colors.textPrimary[200],
          fontFamily: "Mada, sans-serif",
        },
      }}
    >
      <Box>
        <Header title="Statistics" subtitle="Statistics" />
        <Box display="flex" flexDirection="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="space-between">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="From"
                  fullWidth
                  value={start}
                  onChange={(newDate) => setStartDate(moment(newDate))}
                
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Until"
                  fullWidth
                  value={end}
                  onChange={(newDate) => setEndDate(moment(newDate))}
                />
              </LocalizationProvider>
            </Box>
            <SelectForm
              onChange={handleProjectChange}
              id="projectId"
              {...register("projectId")}
              label="Project"
              itemName="title"
              itemId="projectId"
              control={control}
              defaultValue={projectIds}
              data={projects}
              multiple
            />
            <Button
              size="large"
              variant="contained"
              color="secondary"
              type="submit"
            >
              Find
            </Button>
          </form>
        </Box>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: 2,
            width: "220px",
            height: "120px",
            backgroundColor: colors.blueAccent[900],
          }}
        >
          <CardContent>
            <Box>
              <Box mb={2} display="flex" justifyContent="space-between">
                <Typography variant="h2" align="left">
                {affectedCount}
                </Typography>
              </Box>
              <Typography variant="h5" align="center">
                TOTAL USERS AFFECTED
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {renderStatusCards()}
      </Box>

      <Box sx={{ height: 400 }}>
        <BarChart data={rows} />
      </Box>
    </Box>
  );
};

export default Statistics;
