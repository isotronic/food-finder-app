import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { firebaseAuth, updateDisplayName } from "../utils/firebase/auth";
import { getErrorMessage } from "../utils/error-handler";

export default function UserProfileForm() {
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

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setDisplayName(event.target.value);
  }

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (displayName) {
      try {
        await updateDisplayName(displayName);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    } else {
      console.log("No display name set");
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
          onChange={changeHandler}
          sx={{ my: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
