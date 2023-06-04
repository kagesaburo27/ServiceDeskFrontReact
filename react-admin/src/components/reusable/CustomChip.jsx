import React from "react";
import { Chip, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
  QuestionMarkRounded as QuestionMarkRoundedIcon,
  TaskAltRounded as TaskAltRoundedIcon,
  BugReportRounded as BugReportRoundedIcon,
  ArrowCircleDownRounded as ArrowCircleDownRoundedIcon,
  PriorityHighRounded as PriorityHighRoundedIcon,
  BlockRounded as BlockRoundedIcon,
  KeyboardCapslockRounded as KeyboardCapslockRoundedIcon,
} from "@mui/icons-material";

const CustomChip = ({ label, borderRadius, width, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let icon;
  let color;

  if (type === "priority") {
    if (label === "LOW") {
      color = "success";
      icon = <ArrowCircleDownRoundedIcon />;
    } else if (label === "MEDIUM") {
      color = "warning";
      icon = <KeyboardCapslockRoundedIcon />;
    } else if (label === "HIGH") {
      color = "error";
      icon = <PriorityHighRoundedIcon />;
    } else if (label === "BLOCKER") {
      color = "default";
      icon = <BlockRoundedIcon />;
    }

    return (
      <Chip
        icon={icon}
        label={label}
        sx={{ width: { width } }}
        color={color}
        style={{
          backgroundColor: colors.main,
          color: colors.contrastText,
        }}
      />
    );
  } else if (type === "status") {
    if (label === "ACTIVE" || label === "RESTORED") {
      color = "info";
    } else if (label === "AVAILABLE") {
      color = "primary";
    } else if (label === "RETEST") {
      color = "secondary";
    } else if (label === "RAISED") {
      color = "warning";
    } else if (label === "SOLVED") {
      color = "success";
    }

    return (
      <Chip
        label={label}
        color={color}
        style={{
          backgroundColor: colors.main,
          color: colors.contrastText,
        }}
      />
    );
  } else {
    // For other instances (e.g., taskType)
    if (label === "QUESTION") {
      icon = <QuestionMarkRoundedIcon />;
    } else if (label === "TASK") {
      icon = <TaskAltRoundedIcon />;
    } else if (label === "BUG") {
      icon = <BugReportRoundedIcon />;
    }

    return <Chip icon={icon} label={label} />;
  }
};

export default CustomChip;
