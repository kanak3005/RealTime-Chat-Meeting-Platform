//Purpose: Backend ke bina dashboard bharne ke liye nakli user aur meetings. Dates "ab se kitne ghante pehle/baad" ke hisaab se banti hain, isliye data kabhi purana nahi dikhta.

const HOUR = 60 * 60 * 1000;
const at = (hoursFromNow) =>
  new Date(Date.now() + hoursFromNow * HOUR).toISOString();

export const mockUser = {
  id: "u-1",
  name: "Kanak",
  email: "kanak@example.com",
};

const host = { id: mockUser.id, name: mockUser.name };
const aarav = { id: "u-2", name: "Aarav Mehta" };
const riya = { id: "u-3", name: "Riya Kapoor" };
const neha = { id: "u-4", name: "Neha Iyer" };
const kabir = { id: "u-5", name: "Kabir Singh" };

export const mockMeetings = [
  {
    id: "m-1",
    title: "Design review: onboarding flow",
    meetingCode: "abc-defg-hij",
    status: "live",
    host,
    participants: [host, aarav, riya],
    scheduledAt: null,
    startedAt: at(-0.5),
    endedAt: null,
    durationMinutes: 0,
    createdAt: at(-0.5),
  },
  {
    id: "m-2",
    title: "Weekly standup",
    meetingCode: "sta-ndup-dai",
    status: "scheduled",
    host,
    participants: [],
    scheduledAt: at(3),
    startedAt: null,
    endedAt: null,
    durationMinutes: 0,
    createdAt: at(-20),
  },
  {
    id: "m-3",
    title: "Client kickoff call",
    meetingCode: "cli-entc-all",
    status: "scheduled",
    host,
    participants: [],
    scheduledAt: at(26),
    startedAt: null,
    endedAt: null,
    durationMinutes: 0,
    createdAt: at(-30),
  },
  {
    id: "m-4",
    title: "Sprint planning",
    meetingCode: "pla-nwee-kly",
    status: "ended",
    host,
    participants: [host, aarav, neha, kabir],
    scheduledAt: null,
    startedAt: at(-27),
    endedAt: at(-26),
    durationMinutes: 58,
    createdAt: at(-27),
  },
  {
    id: "m-5",
    title: "Budget sync",
    meetingCode: "bud-gets-ync",
    status: "ended",
    host,
    participants: [host, riya],
    scheduledAt: null,
    startedAt: at(-51),
    endedAt: at(-50),
    durationMinutes: 35,
    createdAt: at(-51),
  },
  {
    id: "m-6",
    title: "Interview: frontend role",
    meetingCode: "int-ervi-ewx",
    status: "ended",
    host,
    participants: [host, kabir],
    scheduledAt: null,
    startedAt: at(-121),
    endedAt: at(-120),
    durationMinutes: 47,
    createdAt: at(-121),
  },
];