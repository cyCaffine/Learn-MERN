import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveIcon from "@mui/icons-material/Remove";
// import  AppBar from "../components/AppBar";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [sourceNames, setSourceNames] = useState([""]);
  const [addedSources, setAddedSources] = useState([]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleAddSource = () => {
    setShowInput(true);
  };

  const handleSourceNameChange = (index, value) => {
    const newSourceNames = [...sourceNames];
    newSourceNames[index] = value;
    setSourceNames(newSourceNames);
  };

  const handleAddMoreSources = () => {
    setSourceNames([...sourceNames, ""]);
  };

  const handleRemoveSource = (index) => {
    const newSourceNames = [...sourceNames];
    newSourceNames.splice(index, 1);
    setSourceNames(newSourceNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/add/addSources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to save sources");
      }

      const newSources = sourceNames.filter((name) => name.trim() !== "");
      setAddedSources([...addedSources, ...newSources]);

      console.log("Sources saved successfully");
    } catch (error) {
      console.error("Error saving sources:", error.message);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:8000/add/addSources", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to save sources");
  //     }

  //     console.log("Sources saved successfully");
  //   } catch (error) {
  //     console.error("Error saving sources:", error.message);
  //   }
  // };

  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       <ListItem key="Add Sources" disablePadding>
  //         <ListItemButton onClick={handleAddSource}>
  //           <ListItemIcon>
  //             <AddIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="Add Sources" />
  //         </ListItemButton>
  //       </ListItem>
  //       <ListItem key="View Sources" disablePadding>
  //         <ListItemButton>
  //           <ListItemIcon>
  //             <MailIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="View Sources" />
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //     <Divider />
  //   </div>
  // );

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="Add Sources" disablePadding>
          <ListItemButton onClick={handleAddSource}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Sources" />
          </ListItemButton>
        </ListItem>
        <ListItem key="View Sources" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="View Sources" />
          </ListItemButton>
        </ListItem>
        {addedSources.map((source, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <MailIcon /> */}</ListItemIcon>
              <ListItemText primary={source} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {/* <AppBar /> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              DashBoard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <form onSubmit={handleSubmit}>
            {showInput && (
              <>
                {sourceNames.map((name, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                  >
                    <TextField
                      label={`Source Name ${index + 1}`}
                      value={name}
                      onChange={(e) =>
                        handleSourceNameChange(index, e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              color="secondary"
                              onClick={() => handleRemoveSource(index)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              color="primary"
                              onClick={handleAddMoreSources}
                            >
                              <AddIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <button type="submit">Submit</button>
                </Box>
              </>
            )}
          </form>
        </Box>
      </Box>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
