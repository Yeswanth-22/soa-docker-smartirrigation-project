
import React from "react";
import ReactDOM from "react-dom/client";
import {
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";

import App from "./App";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#237a48",
      dark: "#185c34",
      light: "#e9f5ec"
    },
    success: {
      main: "#237a48"
    },
    background: {
      default: "#f5f8f5",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 10
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
