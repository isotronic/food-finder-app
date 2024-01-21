import * as React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function MainNavBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);

  function handleOpenMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorElement(null);
  }

  function handleAuth() {
    setAuth((prevState) => !prevState);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <RestaurantIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Food Finder
          </Typography>
          {(auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElement}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElement)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                {/* <MenuItem onClick={handleAuth}>Logout</MenuItem> */}
              </Menu>
            </div>
          )) || (
            <Button color="inherit" onClick={handleAuth}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
