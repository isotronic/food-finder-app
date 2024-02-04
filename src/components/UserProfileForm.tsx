import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { firebaseAuth, updateDisplayName } from "../utils/firebase/auth";
import { getErrorMessage } from "../utils/error-handler";

export default function UserProfileForm({
  setErrorMessage,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email || "");
        setDisplayName(user.displayName || "");
      } else {
        setEmail("");
        setDisplayName("");
      }
    });

    return () => unsubscribe();
  }, []);

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (displayName) {
      try {
        await updateDisplayName(displayName);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      }
    } else {
      setErrorMessage("No display name set");
    }
  }

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" sx={{ my: 4 }}>
        Profile settings
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          fullWidth
          disabled
          name="email"
          label="Email Address"
          type="email"
          value={email}
        />
        <TextField
          fullWidth
          name="displayName"
          label="Your Name"
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          sx={{ my: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Save Profile
          </Button>
        </Box>
      </form>
    </Box>
  );
}
