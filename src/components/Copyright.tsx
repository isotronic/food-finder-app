import { Link, Typography } from "@mui/material";

export default function Copyright() {
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
