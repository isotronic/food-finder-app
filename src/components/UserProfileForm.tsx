import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { firebaseAuth, updateDisplayName } from "../utils/firebase-auth";
import { getErrorMessage } from "../utils/error-handler";

export default function UserProfileForm() {
  const user = firebaseAuth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName);

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
      <Typography variant="h5" align="center" sx={{ my: 4 }}>
        Profile settings
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          fullWidth
          disabled
          name="email"
          label="Email Address"
          type="email"
          value={user!.email!}
        />
        <TextField
          fullWidth
          name="displayName"
          label="Display Name"
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
