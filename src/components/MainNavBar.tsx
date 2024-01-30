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
import { logoutUser } from "../utils/firebase-auth";
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Restaurant sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Food Finder
          </Typography>
          {(user && (
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
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
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
