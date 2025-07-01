import React from "react";
import { Button, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./SideBar"; // same Sidebar you're using in desktop

const MobileFilterDrawer = ({ open, onClose, filters, onFilterChange }) => {
  return (
    <>
     <Drawer
  anchor="right"
  open={open}
  onClose={onClose}
  sx={{
    '& .MuiDrawer-paper': {
      width: '70vw', // or 100% if needed
      maxWidth: 400,
      padding: '1rem',
      marginTop:'7%'
    },
  }}
>
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // borderBottom: "1px solid #ccc",
        // paddingBottom: "0.5rem",
      }}
    >
      {/* <h3 style={{ margin: 0 ,color:'red'}}>Filters</h3> */}
      <IconButton onClick={onClose}>
        <CloseIcon sx={{ color: "black" }} />
      </IconButton>
    </div>

    <Sidebar filters={filters} onFilterChange={onFilterChange} />
  </div>
</Drawer>

    </>
  );
};

export default MobileFilterDrawer;
