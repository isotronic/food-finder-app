import { useState } from "react";
import { Alert, Box, Container } from "@mui/material";
import UserProfileForm from "../components/UserProfileForm";
import UserLocationPreference from "../components/UserLocationPreference";

export default function Settings() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  return (
    <Container maxWidth="sm">
      {errorMessage && (
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
      <UserProfileForm />
      <UserLocationPreference setErrorMessage={setErrorMessage} />
    </Container>
  );
}
