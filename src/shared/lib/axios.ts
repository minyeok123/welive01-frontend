import axios from 'axios';

export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const storedUrl = localStorage.getItem('apiBaseUrl');
    if (storedUrl && storedUrl.startsWith('http')) return storedUrl;
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

// 요청마다 최신 baseURL 사용 (localStorage 변경 반영)
axiosInstance.interceptors.request.use((config) => {
  config.baseURL = getBaseUrl();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshUrl = originalRequest.url?.includes('/auth/refresh');

    const isAuthUrl =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/signup') ||
      originalRequest.url?.includes('/auth/user/password');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshUrl && !isAuthUrl) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/auth/refresh');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 에러', refreshError);
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
