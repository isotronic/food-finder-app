import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, Restaurant } from "@mui/icons-material";
import { AuthContext } from "../context/AuthProvider";
import { logoutUser } from "../utils/firebase/auth";
import { getErrorMessage } from "../utils/error-handler";

export default function MainNavBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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

  async function logoutHandler() {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.log(`Error while logging out: ${getErrorMessage(error)}`);
    }

    setUserMenuAnchor(null);
  }
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Restaurant sx={{ mr: 1, color: "white", verticalAlign: "middle" }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ mr: 12, textDecoration: "none", color: "white", verticalAlign: "middle" }}
            >
              Food Finder
            </Typography>
          </Box>
          <Button component={RouterLink} to="/" sx={{ color: "white" }}>
            Search
          </Button>
          {(user && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="user-menu-appbar"
                aria-haspopup="menu"
                onClick={openUserMenuHandler}
                sx={{ color: "white", justifyContent: "flex-end" }}
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
                <MenuItem
                  onClick={closeUserMenuHandler}
                  component={RouterLink}
                  to="/user/dashboard"
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={closeUserMenuHandler} component={RouterLink} to="/user/settings">
                  Settings
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          )) || (
            <>
              <Button
                sx={{ color: "white", justifyContent: "flex-end" }}
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
                <MenuItem onClick={closeAuthMenuHandler} component={RouterLink} to="/auth/login">
                  Login
                </MenuItem>
                <MenuItem onClick={closeAuthMenuHandler} component={RouterLink} to="/auth/register">
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
