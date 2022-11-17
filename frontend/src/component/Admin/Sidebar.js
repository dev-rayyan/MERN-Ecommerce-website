import * as React from "react";
import "./sidebar.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
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
} from "@mui/icons-material";
import {Link} from "react-router-dom"

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color:'#e0e0e0',
  [`& .${treeItemClasses.content}`]: {
    color: '#e0e0e0',
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
        <Box sx={{ display: "flex", alignItems: "center", px: 2,py:1.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
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
        defaultExpanded={["3"]}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <Link to="/admin/dashboard">
        <StyledTreeItem color="#182330" bgColor="#e0e0e0" nodeId="1" labelText="Dashboard" labelIcon={Dashboard} />
        </Link>
        <Link to="/admin/orders">
        <StyledTreeItem color="#182330" bgColor="#e0e0e0" nodeId="2" labelText="Orders" labelIcon={ListAlt} />
        </Link>
        <StyledTreeItem color="#182330" bgColor="#e0e0e0" nodeId="3" labelText="Products" labelIcon={ImportExport}>
        <Link to="/admin/products">
          <StyledTreeItem
            nodeId="7"
            labelText="All Products"
            labelIcon={PostAdd}
            labelInfo="3,566"
            color="#182330" 
            bgColor="#e0e0e0"
          />
          </Link>
          <Link to="/admin/product">
          <StyledTreeItem
            nodeId="8"
            labelText="Create New Product"
            labelIcon={Add}
            labelInfo="733"
            color="#182330" 
            bgColor="#e0e0e0"
          /></Link>
        </StyledTreeItem>
        <Link to="/admin/users">
        <StyledTreeItem color="#182330" bgColor="#e0e0e0" nodeId="4" labelText="Users" labelIcon={People} />
        </Link>
      </TreeView>
    </div>
  );
}
