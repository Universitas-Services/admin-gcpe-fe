import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Instancia pública (sin token)
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Instancia privada (con interceptores para auth)
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — preparado para inyectar token
api.interceptors.request.use(
  (config) => {
    // TODO: Obtener token del store y adjuntarlo al header
    // const token = useAuthStore.getState().accessToken;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor — preparado para lógica de refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: Implementar lógica de refresh token
    // const originalRequest = error.config;
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   // Intentar refresh del token
    // }
    return Promise.reject(error);
  }
);

export default api;
