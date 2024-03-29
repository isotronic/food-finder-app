import { Alert, Box, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import UserSearchHistory from "../components/UserSearchHistory";
import HeaderSEO from "../components/HeaderSEO";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  return (
    <>
      <HeaderSEO
        title="Dashboard"
        description="User dashboard containing your search history and other data."
      />
      <Container maxWidth="md">
        {errorMessage && (
          <Box sx={{ my: 4 }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
        <Box sx={{ my: 6 }}>
          <Typography variant="h5" align="center" sx={{ my: 4 }}>
            Hi {user?.displayName || "there"}, check out your previous searches below
          </Typography>
          <UserSearchHistory setErrorMessage={setErrorMessage} />
        </Box>
      </Container>
    </>
  );
}
