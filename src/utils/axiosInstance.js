import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // তোমার সার্ভার
  // পরে Vercel এ ডিপ্লয় করলে এখানে লিঙ্ক দিবি
});

// Request Interceptor (লোডিং দেখানোর জন্য পরে ব্যবহার করবি)
axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`; // পরে JWT দিলে
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (এরর হ্যান্ডলিং + Toast)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;