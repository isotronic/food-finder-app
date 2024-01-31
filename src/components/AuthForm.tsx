import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationFormValues } from "../utils/types";
import { createUser, loginUser } from "../utils/firebase/auth";
import { getErrorMessage } from "../utils/error-handler";

const defaultFormValues = { displayName: "", email: "", password: "" } as AuthenticationFormValues;

export default function AuthForm({ authMethod }: { authMethod: string | undefined }) {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormValues);

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { displayName, email, password } = formFields;

    if (authMethod === "register") {
      try {
        const user = await createUser({ displayName, email, password });
        if (user) navigate("/");
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    } else {
      try {
        const user = await loginUser({ email, password });
        if (user) navigate("/");
      } catch (error) {
        console.log(getErrorMessage(error));
      }
    }
  }
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        {authMethod === "register" ? "Register" : "Login"}
      </Typography>
      <form onSubmit={submitHandler}>
        {authMethod === "register" && (
          <TextField
            fullWidth
            name="displayName"
            label="Your Name"
            type="text"
            value={formFields.displayName}
            onChange={changeHandler}
            sx={{ my: 1 }}
          />
        )}
        <TextField
          fullWidth
          required
          name="email"
          label="Email Address"
          type="email"
          value={formFields.email}
          onChange={changeHandler}
          sx={{ my: 1 }}
        />
        <TextField
          fullWidth
          required
          name="password"
          label="Password"
          type="password"
          value={formFields.password}
          onChange={changeHandler}
          sx={{ my: 1 }}
        />
        <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
          <Button variant="contained" type="submit">
            {authMethod}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
