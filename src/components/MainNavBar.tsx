import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

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
  const [auth, setAuth] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [authMenuAnchor, setAuthMenuAnchor] = useState<null | HTMLElement>(null);

  function openUserMenuHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setUserMenuAnchor(event.currentTarget);
  }

  function openAuthMenuHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setAuthMenuAnchor(event.currentTarget);
  }

  function closeUserMenuHandler() {
    setUserMenuAnchor(null);
  }

  function closeAuthMenuHandler() {
    setAuthMenuAnchor(null);
  }

  function authHandler() {
    setAuth((prevState) => !prevState);
    setUserMenuAnchor(null);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <RestaurantIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Food Finder
          </Typography>
          {(auth && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="user-menu-appbar"
                aria-haspopup="menu"
                onClick={openUserMenuHandler}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu-appbar"
                anchorEl={userMenuAnchor}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(userMenuAnchor)}
                onClose={closeUserMenuHandler}
              >
                <MenuItem onClick={closeUserMenuHandler}>Profile</MenuItem>
                <MenuItem onClick={closeUserMenuHandler}>My account</MenuItem>
                <MenuItem onClick={authHandler}>Logout</MenuItem>
              </Menu>
            </>
          )) || (
            <>
              <Button
                color="inherit"
                aria-controls="auth-menu-appbar"
                aria-haspopup="menu"
                onClick={openAuthMenuHandler}
              >
                Login
              </Button>
              <Menu
                id="auth-menu-appbar"
                anchorEl={authMenuAnchor}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(authMenuAnchor)}
                onClose={closeAuthMenuHandler}
              >
                <MenuItem component={RouterLink} to="/auth/login">
                  Login
                </MenuItem>
                <MenuItem component={RouterLink} to="/auth/register">
                  Register
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
