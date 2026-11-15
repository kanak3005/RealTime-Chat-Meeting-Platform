import "./env.js";

const DEFAULT_MAX_PARTICIPANTS = 25;
const MIN_ALLOWED = 2;
const MAX_ALLOWED = 100;

const parseMaxParticipants = (raw) => {
  if (raw === undefined || raw.trim() === "") return DEFAULT_MAX_PARTICIPANTS;

  const value = Number(raw);

  if (!Number.isInteger(value) || value < MIN_ALLOWED || value > MAX_ALLOWED) {
    throw new Error(
      `MAX_PARTICIPANTS_PER_MEETING must be a whole number between ${MIN_ALLOWED} and ${MAX_ALLOWED}`
    );
  }

  return value;
};

export const meetingConfig = Object.freeze({
  maxParticipants: parseMaxParticipants(process.env.MAX_PARTICIPANTS_PER_MEETING),
});