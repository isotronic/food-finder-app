import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import AuthProvider from "./context/AuthProvider";
import Root from "./routes/Root";
import Search from "./routes/Search";
import Auth from "./routes/Auth";
import ErrorPage from "./ErrorPage";

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
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Search /> },
      { path: "/auth/:authMethod", element: <Auth /> },
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
