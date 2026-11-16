import { MEETING_STATUS } from "../models/Meeting.js";
import { meetingConfig } from "../config/meeting.js";

const MS_PER_MINUTE = 60 * 1000;

const toPerson = (user) => ({ id: String(user._id), name: user.name });

const getDurationMinutes = (startedAt, endedAt) => {
  if (!startedAt || !endedAt) return null;
  return Math.max(1, Math.round((endedAt - startedAt) / MS_PER_MINUTE));
};

const getVisibleParticipants = (meeting) => {
  const isLive = meeting.status === MEETING_STATUS.LIVE;

  return meeting.participants
    .filter((participant) => participant.user && (!isLive || !participant.leftAt))
    .map((participant) => toPerson(participant.user));
};

export const toMeetingResponse = (meeting) => ({
  id: String(meeting._id),
  title: meeting.title,
  meetingCode: meeting.meetingCode,
  status: meeting.status,
  host: meeting.host ? toPerson(meeting.host) : null,
  participants: getVisibleParticipants(meeting),
  maxParticipants: meeting.maxParticipants ?? meetingConfig.maxParticipants,
  scheduledAt: meeting.scheduledAt,
  startedAt: meeting.startedAt,
  endedAt: meeting.endedAt,
  durationMinutes: getDurationMinutes(meeting.startedAt, meeting.endedAt),
  createdAt: meeting.createdAt,
});