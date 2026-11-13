//Purpose: Nakli backend. Memory mein meetings rakhta hai aur meetingsApi jaisa hi interface deta hai (list, getById, create, join, leave, end). sleep se network delay dikhta hai, taaki loading states test ho sakein. Page refresh par data reset ho jata hai.
import { sleep } from "../utils/sleep";
import { generateMeetingCode, normalizeMeetingCode } from "../utils/meetingCode";
import { mockMeetings, mockUser } from "./mockData";

const LATENCY = 400;
const STATUS_ORDER = { live: 0, scheduled: 1, ended: 2 };

let meetings = [...mockMeetings];

const clone = (value) => structuredClone(value);

function fail(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function findById(id) {
  const meeting = meetings.find((item) => item.id === id);
  if (!meeting) throw fail("Meeting not found", 404);
  return meeting;
}

const bySortOrder = (a, b) =>
  STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
  new Date(b.createdAt) - new Date(a.createdAt);

export const meetingsApi = {
  async list({ status } = {}) {
    await sleep(LATENCY);
    const filtered =
      status && status !== "all"
        ? meetings.filter((meeting) => meeting.status === status)
        : meetings;
    return clone([...filtered].sort(bySortOrder));
  },

  async getById(id) {
    await sleep(LATENCY);
    return clone(findById(id));
  },

  async create({ title, scheduledAt }) {
    await sleep(LATENCY);
    const now = new Date().toISOString();
    const host = { id: mockUser.id, name: mockUser.name };
    const isScheduled = Boolean(scheduledAt);

    const meeting = {
      id: `m-${Date.now()}`,
      title: title.trim(),
      meetingCode: generateMeetingCode(),
      status: isScheduled ? "scheduled" : "live",
      host,
      participants: isScheduled ? [] : [host],
      scheduledAt: scheduledAt || null,
      startedAt: isScheduled ? null : now,
      endedAt: null,
      durationMinutes: 0,
      createdAt: now,
    };

    meetings = [meeting, ...meetings];
    return clone(meeting);
  },

  async join(code) {
    await sleep(LATENCY);
    const normalized = normalizeMeetingCode(code);
    const meeting = meetings.find((item) => item.meetingCode === normalized);

    if (!meeting) throw fail("No meeting found with this code", 404);
    if (meeting.status === "ended") {
      throw fail("This meeting has already ended", 400);
    }
    return clone(meeting);
  },

  async leave() {
    await sleep(LATENCY);
    return null;
  },

  async end(id) {
    await sleep(LATENCY);
    const meeting = findById(id);
    const endedAt = new Date();

    meeting.status = "ended";
    meeting.endedAt = endedAt.toISOString();
    meeting.durationMinutes = meeting.startedAt
      ? Math.max(1, Math.round((endedAt - new Date(meeting.startedAt)) / 60000))
      : 0;

    return clone(meeting);
  },
};