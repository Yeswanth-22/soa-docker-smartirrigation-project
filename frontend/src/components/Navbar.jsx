
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Spa } from "@mui/icons-material";

export default function Navbar() {
  return (
    <AppBar position="static" className="navbar" elevation={0}>
      <Toolbar className="navbar-toolbar">
        <Box className="navbar-brand">
          <Box className="navbar-logo">
            <Spa />
          </Box>

          <Typography variant="h6" className="navbar-title">
            SmartIrrigationZone
          </Typography>
        </Box>

        <Typography className="navbar-subtitle">
          Smart Farming Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
