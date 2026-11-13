export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Fake delay. Phase 3 tak login aur mock API ko real network jaisa feel dene ke liye use hota hai.