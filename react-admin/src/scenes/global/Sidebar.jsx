import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import HomeOutlinedIcons from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcons from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcons from "@mui/icons-material/ContactsOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CalendarTodayOutlinedIcons from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcons from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcons from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcons from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcons from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcons from "@mui/icons-material/MenuOutlined";
import { useRef } from "react";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import useDataFetching from "../../hooks/useDataFetching";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import Loading from "../../components/reusable/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setAvatar } from "../../redux/actions/userActions";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: resp, isLoading: isRespLoading } =
    useDataFetching("/user/current");
  const { data: photo, isLoading: isPhotoLoading } =
    useDataFetching("/image/my");
  useEffect(() => {
    if (resp) {
      dispatch(setCurrentUser(resp));
    }
  }, [resp, dispatch]);
  // useEffect(() => {
  //   if (photo) {
  //     dispatch(setAvatar(photo.url));
  //   }
  // }, [photo, dispatch]);
  const { currentUser, avatarUrl } = useSelector((state) => state.user);
  useEffect(() => {
    if (avatarUrl) {
      setPhotoUrl(avatarUrl);
    } else {
      setPhotoUrl(photo.url); // Set the default avatar URL or any other fallback URL
    }
  }, [avatarUrl, photo]);
  return (
    <Box
      sx={{
        top: "0",
        bottom: "0",
        position: "fixed",
        zIndex: "101",
        boxShadow: "2",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: [colors.primary[2], "!important"].join(" "),
        },
        "& .pro-menu-item.active": {
          color: [colors.primary[1], "!important"].join(" "),
          borderLeftColor: [colors.primary[1], "!important"].join(" "),
          borderLeftStyle: "solid",
          borderLeftWidth: "5px",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <ClickAwayListener
          onClickAway={() =>
            !isCollapsed ? setIsCollapsed(!isCollapsed) : undefined
          }
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcons /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <img
                    width="150px"
                    height="100px"
                    src="../../assets/default-monochrome.svg"
                  />
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcons />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {isPhotoLoading ? (
                    <Skeleton variant="circular" width={100} height={100} />
                  ) : (
                    <>
                      
                      <img
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        src={ photoUrl }
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                      />
                      <Link to={`/user/${currentUser?.id}`} />
                    </>
                  )}
                </Box>
                <Box textAlign="center" m="0 10%">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {isRespLoading ? <Skeleton /> : currentUser?.username}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {isRespLoading ? <Skeleton /> : currentUser?.email}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box>
              <Item
                title={t("sidebar.dashboard")}
                to="dashboard"
                icon={<HomeOutlinedIcons />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={t("sidebar.manageTeam")}
                to="team"
                icon={<PeopleOutlinedIcons />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={t("sidebar.issuesList")}
                to="issues"
                icon={<ContactsOutlinedIcons />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={t("sidebar.projects")}
                to="projects"
                icon={<RotateLeftIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={t("sidebar.calendar")}
                to="calendar"
                icon={<CalendarTodayOutlinedIcons />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={t("sidebar.faqPage")}
                to="faq"
                icon={<HelpOutlinedIcons />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="API"
                to="api"
                icon={<ApiRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                {t("sidebar.statistics")}
              </Typography>
              <Item
                title={t("sidebar.statistics")}
                to="statistics"
                icon={<BarChartOutlinedIcons />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ClickAwayListener>
      </ProSidebar>
    </Box>
  );
};
export default Sidebar;
