import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import Copyright from "../components/Copyright";

export default function Root() {
  return (
    <>
      <MainNavBar />
      <Outlet />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
