
import {
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Box
} from "@mui/material";

import { Add, Save, Close } from "@mui/icons-material";

export default function ZoneForm({
  form,
  setForm,
  editId,
  onSubmit,
  onCancel,
  saving
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  return (
    <Paper className="form-card" elevation={0}>
      <Box className="section-heading">
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {editId !== null ? "Update Zone" : "Add New Zone"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Enter the crop and irrigation zone details.
          </Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Crop Name"
            name="cropName"
            placeholder="e.g. Rice"
            value={form.cropName}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Zone Name"
            name="zoneName"
            placeholder="e.g. North Field"
            value={form.zoneName}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Area (Square Meters)"
            name="squareMeters"
            type="number"
            placeholder="e.g. 500"
            value={form.squareMeters}
            onChange={handleChange}
            required
            fullWidth
            slotProps={{
              htmlInput: { min: 0, step: "any" }
            }}
          />

          <Box className="enabled-row">
            <Box>
              <Typography fontWeight={600}>
                Enable Zone
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {form.enabled
                  ? "This zone is enabled."
                  : "This zone is disabled."}
              </Typography>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={form.enabled}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      enabled: e.target.checked
                    }))
                  }
                  color="success"
                />
              }
              label={form.enabled ? "Enabled" : "Disabled"}
              labelPlacement="start"
            />
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button
              type="submit"
              variant="contained"
              startIcon={editId !== null ? <Save /> : <Add />}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editId !== null
                  ? "Update Zone"
                  : "Add Zone"}
            </Button>

            {editId !== null && (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Close />}
                onClick={onCancel}
                disabled={saving}
              >
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
