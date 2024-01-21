import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import MainNavBar from "./components/MainNavBar";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <MainNavBar />
      <Container maxWidth="sm">
        <Box sx={{ my: 10 }}>
          <Typography variant="h4" align="center" paragraph>
            Oops...
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            An error occured. Please check your inputs and try again.
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Error message:{" "}
            <i>
              {isRouteErrorResponse(error)
                ? error.statusText || error.data?.message
                : "Unknown error message."}
            </i>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
