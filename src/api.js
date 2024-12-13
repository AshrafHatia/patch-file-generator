import axios from "axios";

const API_BASE = "http://localhost:8000";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${API_BASE}/upload`, formData);
  return response.data;
};

export const lockFile = async (filePath) => {
  const response = await axios.post(`${API_BASE}/lock`, { file_path: filePath });
  return response.data;
};

export const compareFile = async (file, lockedPath) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("locked_path", lockedPath);
  const response = await axios.post(`${API_BASE}/compare`, formData);
  return response.data;
};
