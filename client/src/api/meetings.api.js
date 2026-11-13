//Purpose: Meetings ke saare endpoints. Iske method names aur return shapes mock/mockApi.js ke bilkul same hain, isliye Phase 3 mein sirf import path badalna hai.
import api, { unwrap } from "./axios";

export const meetingsApi = {
  list: (params) =>
    api.get("/meetings", { params }).then(unwrap("meetings")),

  getById: (id) => api.get(`/meetings/${id}`).then(unwrap("meeting")),

  create: (payload) => api.post("/meetings", payload).then(unwrap("meeting")),

  join: (code) => api.post("/meetings/join", { code }).then(unwrap("meeting")),

  leave: (id) => api.post(`/meetings/${id}/leave`).then(() => null),

  end: (id) => api.post(`/meetings/${id}/end`).then(unwrap("meeting")),
};