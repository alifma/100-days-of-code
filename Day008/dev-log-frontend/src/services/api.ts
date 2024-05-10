import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

const API = axios.create({
  baseURL: "http://localhost:3000/api/",
});

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login and get the token
export const login = async (username: string, password: string) => {
  const response = await API.post("/auth/login", { username, password });
  return response.data;
};

// Login and remove the token
export const logout = () => {
  removeToken();
  return true;
};

// Create a log
export const createLog = async (logData: {
  datetime: string;
  project: string;
  log: string;
}) => {
  const response = await API.post("/logs", logData);
  return response.data;
};

// Fetch all logs
export const fetchLogs = async (
  page?: number,
  rowsPerPage?: number,
  search?: string
) => {
  try {
    const response = await API.get(
      `logs?projectName=${search}&page=${page}&limit=${rowsPerPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    throw error;
  }
};

// Update a log
export const updateLog = async (
  id: number,
  logData: { datetime: string; project: string; log: string }
) => {
  const response = await API.put(`/logs/${id}`, logData);
  return response.data;
};

// Delete a log
export const deleteLog = async (id: number) => {
  const response = await API.delete(`/logs/${id}`);
  return response.data;
};
export default API;
