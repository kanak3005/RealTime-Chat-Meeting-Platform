import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(//Interceptor ek function hai jo Axios ke request ya response ko beech mein check/modify kar sakta hai.
  (response) => response,
  (error) => {
    const message =
     error.response?.data?.message || //: Agar server ne error response bheja hai toh uska message lo.
      (error.request //Request gayi, lekin response nahi mila.
        ? "Cannot reach the server. Check your connection."
        : "Something went wrong. Please try again.");

    const normalized = new Error(message);
    normalized.status = error.response?.status ?? 0; //?? 0 ka matlab: status undefined/null hai toh 0 use karo.
    // return Promise.reject(normalized);/Promise.reject(normalized) error ko aage .catch() tak bhejta hai.
  }
);

export const unwrap = (key) => (response) =>
  key ? response.data.data[key] : response.data.data;

export default api;
//Purpose: Ye poori frontend application ka common HTTP client hai.
// Suppose tumhare backend ka server http://localhost:5000 par run kar raha hai. Frontend ko backend se login, register, meetings etc. ka data lena hai.
// Har jagah axios.get() ya axios.post() ki complete configuration likhne ke bajaye hum ek common Axios instance banate hain.