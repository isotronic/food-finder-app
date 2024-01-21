import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Outlet } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="https://github.com/isotronic">
        Joseph Bouqdib
      </Link>
    </Typography>
  );
}

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
