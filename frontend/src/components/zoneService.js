
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getZones = async () => {
  const response = await axios.get(`${API}/displayall`);
  return response.data;
};

export const getZoneById = async (id) => {
  const response = await axios.get(`${API}/display/${id}`);
  return response.data;
};

export const addZone = async (zone) => {
  const response = await axios.post(`${API}/add`, zone);
  return response.data;
};

export const updateZone = async (id, zone) => {
  const response = await axios.put(`${API}/update/${id}`, zone);
  return response.data;
};

export const deleteZone = async (id) => {
  const response = await axios.delete(`${API}/delete/${id}`);
  return response.data;
};
