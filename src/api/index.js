import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers['x-auth-token'] = token;
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ── Cars ──────────────────────────────────────────────────────────────────────
export const getCars = () => api.get('/cars');
export const createCar = (data) => api.post('/cars', data);
export const updateCar = (id, data) => api.put(`/cars/${id}`, data);
export const deleteCar = (id) => api.delete(`/cars/${id}`);

// ── Reviews ───────────────────────────────────────────────────────────────────
export const getReviews = () => api.get('/reviews');
export const createReview = (data) => api.post('/reviews', data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// ── Booking ───────────────────────────────────────────────────────────────────
export const submitBooking = (data) => api.post('/booking', data);

// ── Dynamic form data ─────────────────────────────────────────────────────────
export const getAddresses = () => api.get('/addresses');
export const createAddress = (data) => api.post('/addresses', data);
export const deleteAddress = (id) => api.delete(`/addresses/${id}`);

export const getSeats = () => api.get('/seats');
export const createSeat = (data) => api.post('/seats', data);
export const deleteSeat = (id) => api.delete(`/seats/${id}`);

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminLogin = (credentials) => api.post('/admin/login', credentials);

export default api;
