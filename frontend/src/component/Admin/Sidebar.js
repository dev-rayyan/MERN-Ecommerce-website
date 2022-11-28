import * as React from "react";
import "./sidebar.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  ExpandMore,
  PostAdd,
  Add,
  ImportExport,
  ListAlt,
  Dashboard,
  People,
  RateReview,
  CategoryRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: "#edf2f9",
  [`& .${treeItemClasses.content}`]: {
    color: "#edf2f9",
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{ display: "flex", alignItems: "center", px: 2, py: 1.5, pr: 0 }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />

          {labelText}
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function Sidebar() {
  return (
    <div className="sidebar">
      <TreeView
        aria-label="gmail"
        defaultExpanded={["2"]}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <Link to="/admin/dashboard">
          <StyledTreeItem
            color="#182330"
            bgColor="#edf2f9"
            nodeId="1"
            labelText="Dashboard"
            labelIcon={Dashboard}
          />
        </Link>
        <Link to="/admin/orders">
          <StyledTreeItem
            color="#182330"
            bgColor="#edf2f9"
            nodeId="2"
            labelText="Orders"
            labelIcon={ListAlt}
          />
        </Link>
        <StyledTreeItem
          color="#182330"
          bgColor="#edf2f9"
          nodeId="3"
          labelText="Products"
          labelIcon={ImportExport}
        >
          <Link to="/admin/products">
            <StyledTreeItem
              nodeId="7"
              labelText="All Products"
              labelIcon={PostAdd}
              color="#182330"
              bgColor="#edf2f9"
            />
          </Link>
          <Link to="/admin/product">
            <StyledTreeItem
              nodeId="8"
              labelText="Create New Product"
              labelIcon={Add}
              color="#182330"
              bgColor="#edf2f9"
            />
          </Link>
        </StyledTreeItem>
        <StyledTreeItem
          color="#182330"
          bgColor="#edf2f9"
          nodeId="3"
          labelText="Categories"
          labelIcon={CategoryRounded}
        >
          <Link to="/admin/products">
            <StyledTreeItem
              nodeId="7"
              labelText="All Categories"
              labelIcon={PostAdd}
              color="#182330"
              bgColor="#edf2f9"
            />
          </Link>
          <Link to="/admin/product">
            <StyledTreeItem
              nodeId="8"
              labelText="Create New Category"
              labelIcon={Add}
              color="#182330"
              bgColor="#edf2f9"
            />
          </Link>
        </StyledTreeItem>
        <Link to="/admin/users">
          <StyledTreeItem
            color="#182330"
            bgColor="#edf2f9"
            nodeId="4"
            labelText="Users"
            labelIcon={People}
          />
        </Link>
      </TreeView>
    </div>
  );
}
