import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import AuthProvider from "./context/AuthProvider";
import Root from "./routes/Root";
import Search from "./routes/Search";
import Auth from "./routes/Auth";
import Error from "./routes/Error";
import Dashboard from "./routes/Dashboard";
import Settings from "./routes/Settings";

import theme from "./theme";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Search /> },
      { path: "/auth/:authMethod", element: <Auth /> },
      { path: "/user/dashboard", element: <Dashboard /> },
      { path: "/user/settings", element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
