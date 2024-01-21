import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#3fb566",
    },
    secondary: {
      main: "#ffa726",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#ED6C02",
    },
  },
});

export default theme;
