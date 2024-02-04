import { useState } from "react";
import { Alert, Box, Container } from "@mui/material";
import UserProfileForm from "../components/UserProfileForm";
import UserLocationPreference from "../components/UserLocationPreference";
import UserSearchPreference from "../components/UserSearchPreference";

export default function Settings() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  return (
    <Container maxWidth="md">
      {errorMessage && (
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
      <UserProfileForm setErrorMessage={setErrorMessage} />
      <UserLocationPreference setErrorMessage={setErrorMessage} />
      <UserSearchPreference setErrorMessage={setErrorMessage} />
    </Container>
  );
}
