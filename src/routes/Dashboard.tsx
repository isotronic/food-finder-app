import { Box, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 6 }}>
        <Typography variant="h5" align="center" sx={{ my: 4 }}>
          Hello {user?.displayName}
        </Typography>
      </Box>
    </Container>
  );
}
