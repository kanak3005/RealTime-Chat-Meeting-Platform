//Purpose: Auth ke saare endpoints ek jagah. Components kabhi seedha axios nahi bulate, sirf authApi bulate hain. Phase 3 mein Login/Register isi ko use karenge.


import api, { unwrap } from "./axios";

export const authApi = {
  register: (payload) =>
    api.post("/auth/register", payload).then(unwrap("user")),

  login: (payload) => api.post("/auth/login", payload).then(unwrap("user")),

  logout: () => api.post("/auth/logout").then(() => null),

  me: () => api.get("/auth/me").then(unwrap("user")),
};