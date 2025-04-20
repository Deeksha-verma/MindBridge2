import axios from 'axios';

// Create a base axios instance
const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Questionnaire API calls
// export const questionnaireAPI = {
//   submitQuestionnaire: async (data) => {
//     const response = await api.post('/questionnaires', data);
//     return response.data;
//   },
  
//   getResults: async () => {
//     const response = await api.get('/questionnaires');
//     return response.data;
//   },
  
//   getResultsByType: async (type) => {
//     const response = await api.get(`/questionnaires/type/${type}`);
//     return response.data;
//   }
// };

export default api;