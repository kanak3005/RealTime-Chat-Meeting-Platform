// /Purpose: Dates, duration aur naam ke initials ko UI ke liye format karta hai. Ye logic components ke andar nahi, yahan rehta hai.

const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDateTime = (value) => dateTimeFormatter.format(new Date(value));

export const formatDate = (value) => dateFormatter.format(new Date(value));

export function formatDuration(minutes) {
  if (!minutes || minutes < 1) return "Under a minute";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}