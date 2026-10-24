
import {
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";

import { Edit, Delete, Grass } from "@mui/icons-material";

export default function ZoneTable({ zones, onEdit, onDelete }) {
  return (
    <Paper className="table-card" elevation={0}>
      <Box className="table-heading">
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Irrigation Zones
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {zones.length} {zones.length === 1 ? "zone" : "zones"} found
          </Typography>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Crop Name</TableCell>
              <TableCell>Zone Name</TableCell>
              <TableCell>Area (m²)</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id} hover>
                <TableCell>{zone.id}</TableCell>

                <TableCell>
                  <Box className="crop-cell">
                    <Box className="crop-icon">
                      <Grass />
                    </Box>
                    {zone.cropName}
                  </Box>
                </TableCell>

                <TableCell>{zone.zoneName}</TableCell>

                <TableCell>{zone.squareMeters ?? "—"}</TableCell>

                <TableCell>
                  <Chip
                    label={zone.enabled ? "Enabled" : "Disabled"}
                    color={zone.enabled ? "success" : "default"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Edit zone">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(zone)}
                      aria-label={`Edit zone ${zone.id}`}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete zone">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(zone.id)}
                      aria-label={`Delete zone ${zone.id}`}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {zones.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box className="empty-state">
                    <Grass sx={{ fontSize: 42 }} />
                    <Typography fontWeight={600}>
                      No irrigation zones yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add a new zone using the form above.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
