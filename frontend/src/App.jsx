
import { useCallback, useEffect, useState } from "react";

import {
  Container,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Box,
  Button
} from "@mui/material";

import { Refresh } from "@mui/icons-material";

import Navbar from "./components/Navbar";
import ZoneForm from "./components/ZoneForm";
import ZoneTable from "./components/ZoneTable";

import {
  getZones,
  addZone,
  updateZone,
  deleteZone
} from "./components/zoneService";

import "./App.css";
import "./components/style.css";

const initialForm = {
  cropName: "",
  zoneName: "",
  squareMeters: "",
  enabled: true
};

export default function App() {
  const [zones, setZones] = useState([]);
  const [form, setForm] = useState({ ...initialForm });
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Fetch all irrigation zones
  const loadZones = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getZones();

      setZones(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Failed to load zones:", err);

      setError(
        err.response?.data?.message ||
          "Could not load zones. Check your backend and API URL."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadZones();
  }, [loadZones]);

  // Reset the form
  const resetForm = () => {
    setForm({ ...initialForm });
    setEditId(null);
  };

  // Add or update a zone
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.cropName.trim() || !form.zoneName.trim()) {
      setError("Crop name and zone name are required.");
      return;
    }

    if (
      form.squareMeters === "" ||
      !Number.isFinite(Number(form.squareMeters)) ||
      Number(form.squareMeters) < 0
    ) {
      setError(
        "Area must be a valid number greater than or equal to zero."
      );
      return;
    }

    const payload = {
      cropName: form.cropName.trim(),
      zoneName: form.zoneName.trim(),
      squareMeters: Number(form.squareMeters),
      enabled: form.enabled
    };

    setSaving(true);

    try {
      if (editId !== null) {
        await updateZone(editId, payload);
        setNotice("Zone updated successfully!");
      } else {
        await addZone(payload);
        setNotice("Zone added successfully!");
      }

      resetForm();
      await loadZones();
    } catch (err) {
      console.error("Failed to save zone:", err);

      const data = err.response?.data;

      const validationMessage =
        data && typeof data === "object"
          ? Object.values(data).find(
              (value) => typeof value === "string"
            )
          : null;

      setError(
        validationMessage ||
          (typeof data === "string" ? data : null) ||
          data?.message ||
          "Could not save the zone. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Load selected zone into the form for editing
  const handleEdit = (zone) => {
    setEditId(zone.id);

    setForm({
      cropName: zone.cropName ?? "",
      zoneName: zone.zoneName ?? "",
      squareMeters: zone.squareMeters ?? "",
      enabled: zone.enabled ?? false
    });

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Delete a zone
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this irrigation zone?"
    );

    if (!confirmed) return;

    setError("");

    try {
      await deleteZone(id);

      if (editId === id) {
        resetForm();
      }

      setNotice("Zone deleted successfully!");

      await loadZones();
    } catch (err) {
      console.error("Failed to delete zone:", err);

      setError(
        err.response?.data?.message ||
          "Could not delete the zone. Please try again."
      );
    }
  };

  // Cancel editing and clear the form
  const handleCancel = () => {
    resetForm();
    setError("");
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" className="page-container">
        {/* Page heading */}
        <Box className="page-heading">
          <Box>
            <Typography variant="h4" fontWeight={800}>
              Manage Irrigation Zones
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Manage your crops and irrigation zones in one place.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadZones}
            disabled={loading || saving}
          >
            Refresh
          </Button>
        </Box>

        {/* Error message */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* Add and edit form */}
        <ZoneForm
          form={form}
          setForm={setForm}
          editId={editId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          saving={saving}
        />

        {/* Zones table */}
        {loading ? (
          <Box className="loading-state">
            <CircularProgress color="success" />

            <Typography color="text.secondary">
              Loading irrigation zones...
            </Typography>
          </Box>
        ) : (
          <ZoneTable
            zones={zones}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Footer */}
        <Typography className="footer-text">
          SmartIrrigationZone · Smart farming starts here.
        </Typography>
      </Container>

      {/* Success notification */}
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3000}
        onClose={() => setNotice("")}
        message={notice}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      />
    </>
  );
}
