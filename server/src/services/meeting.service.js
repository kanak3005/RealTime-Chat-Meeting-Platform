import mongoose from "mongoose";
import Meeting, { MEETING_STATUS } from "../models/Meeting.js";
import ApiError from "../utils/ApiError.js";
import { generateMeetingCode, normalizeMeetingCode } from "../utils/meetingCode.js";
import { toMeetingResponse } from "../utils/meetingResponse.js";

const { SCHEDULED, LIVE, ENDED } = MEETING_STATUS;

const STATUS_ORDER = [LIVE, SCHEDULED, ENDED];
const POPULATE_FIELDS = [
  { path: "host", select: "name" },
  { path: "participants.user", select: "name" },
];

const DEFAULT_TITLE = "Untitled meeting";
const MAX_CODE_ATTEMPTS = 5;
const SCHEDULE_GRACE_MS = 60 * 1000;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const ACTIVE_PARTICIPANT_COUNT = {
  $size: {
    $filter: {
      input: "$participants",
      cond: { $eq: [{ $ifNull: ["$$this.leftAt", null] }, null] },
    },
  },
};

const roomHasSpace = (limit) => ({ $expr: { $lt: [ACTIVE_PARTICIPANT_COUNT, limit] } });

const isSameId = (a, b) => String(a) === String(b);
const isHost = (meeting, userId) => isSameId(meeting.host, userId);
const isParticipant = (meeting, userId) =>
  meeting.participants.some((participant) => isSameId(participant.user, userId));

const findMeetingOrThrow = async (filter, message = "Meeting not found") => {
  const meeting = await Meeting.findOne(filter);

  if (!meeting) {
    throw ApiError.notFound(message);
  }

  return meeting;
};

const assertCanAccess = (meeting, userId) => {
  if (!isHost(meeting, userId) && !isParticipant(meeting, userId)) {
    throw ApiError.forbidden("You do not have access to this meeting");
  }
};

const getMeetingResponse = async (meetingId) => {
  const meeting = await Meeting.findById(meetingId).populate(POPULATE_FIELDS);
  return toMeetingResponse(meeting);
};

const parseScheduledAt = (value) => {
  if (value === undefined || value === null || value === "") return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw ApiError.badRequest("Please enter a valid date", [
      { field: "scheduledAt", message: "Scheduled time is not a valid date" },
    ]);
  }

  if (date.getTime() < Date.now() - SCHEDULE_GRACE_MS) {
    throw ApiError.badRequest("Scheduled time must be in the future", [
      { field: "scheduledAt", message: "Scheduled time cannot be in the past" },
    ]);
  }

  return date;
};

const createWithUniqueCode = async (data) => {
  for (let attempt = 1; attempt <= MAX_CODE_ATTEMPTS; attempt += 1) {
    try {
      return await Meeting.create({ ...data, meetingCode: generateMeetingCode() });
    } catch (error) {
      const isCodeCollision = error.code === 11000 && error.keyPattern?.meetingCode;

      if (!isCodeCollision) throw error;
    }
  }

  throw new ApiError(500, "Could not generate a meeting code. Please try again.");
};

const takeSeat = async ({ meetingId, userId, limit }) => {
  const now = new Date();
  const live = { _id: meetingId, status: LIVE };

  const attempts = [
    {
      filter: { ...live, participants: { $elemMatch: { user: userId, leftAt: null } } },
      update: { $set: { "participants.$.joinedAt": now } },
    },
    {
      filter: { ...live, participants: { $elemMatch: { user: userId } }, ...roomHasSpace(limit) },
      update: { $set: { "participants.$.joinedAt": now, "participants.$.leftAt": null } },
    },
    {
      filter: { ...live, "participants.user": { $ne: userId }, ...roomHasSpace(limit) },
      update: { $push: { participants: { user: userId, joinedAt: now, leftAt: null } } },
    },
  ];

  for (const { filter, update } of attempts) {
    const result = await Meeting.updateOne(filter, update);

    if (result.matchedCount > 0) return;
  }

  const current = await Meeting.findById(meetingId).select("status");

  if (current?.status !== LIVE) {
    throw ApiError.badRequest("This meeting has already ended");
  }

  throw ApiError.conflict(`This meeting is full (maximum ${limit} participants)`);
};

const toPositiveInt = (value, fallback) => {
  const number = Number.parseInt(value, 10);
  return Number.isInteger(number) && number > 0 ? number : fallback;
};

const normalizePagination = (page, limit) => ({
  page: toPositiveInt(page, 1),
  limit: Math.min(toPositiveInt(limit, DEFAULT_LIMIT), MAX_LIMIT),
});

const buildListFilter = (userId, status) => {
  const id = new mongoose.Types.ObjectId(String(userId));
  const filter = { $or: [{ host: id }, { "participants.user": id }] };

  if (status && status !== "all") {
    if (!STATUS_ORDER.includes(status)) {
      throw ApiError.badRequest("Invalid status filter", [
        { field: "status", message: `Status must be one of: all, ${STATUS_ORDER.join(", ")}` },
      ]);
    }

    filter.status = status;
  }

  return filter;
};

export const createMeeting = async ({ hostId, title, scheduledAt }) => {
  const scheduledDate = parseScheduledAt(scheduledAt);
  const startsNow = scheduledDate === null;

  const meeting = await createWithUniqueCode({
    title: title?.trim() || DEFAULT_TITLE,
    host: hostId,
    status: startsNow ? LIVE : SCHEDULED,
    scheduledAt: scheduledDate,
    startedAt: startsNow ? new Date() : null,
  });

  return getMeetingResponse(meeting._id);
};

export const joinMeeting = async ({ userId, code }) => {
  const meeting = await findMeetingOrThrow(
    { meetingCode: normalizeMeetingCode(code) },
    "No meeting found with this code"
  );

  if (meeting.status === ENDED) {
    throw ApiError.badRequest("This meeting has already ended");
  }

  if (meeting.status === SCHEDULED) {
    if (!isHost(meeting, userId)) {
      throw ApiError.badRequest("The host has not started this meeting yet");
    }

    await Meeting.updateOne(
      { _id: meeting._id, status: SCHEDULED },
      { $set: { status: LIVE, startedAt: new Date() } }
    );
  }

  await takeSeat({ meetingId: meeting._id, userId, limit: meeting.maxParticipants });

  return getMeetingResponse(meeting._id);
};

export const getMeetingForUser = async ({ meetingId, userId }) => {
  const meeting = await findMeetingOrThrow({ _id: meetingId });
  assertCanAccess(meeting, userId);

  return getMeetingResponse(meeting._id);
};

export const listMeetingsForUser = async ({ userId, status, page, limit }) => {
  const filter = buildListFilter(userId, status);
  const pagination = normalizePagination(page, limit);

  const [total, rows] = await Promise.all([
    Meeting.countDocuments(filter),
    Meeting.aggregate([
      { $match: filter },
      { $addFields: { statusRank: { $indexOfArray: [STATUS_ORDER, "$status"] } } },
      { $sort: { statusRank: 1, createdAt: -1, _id: -1 } },
      { $skip: (pagination.page - 1) * pagination.limit },
      { $limit: pagination.limit },
    ]),
  ]);

  const meetings = await Meeting.populate(rows, POPULATE_FIELDS);

  return {
    meetings: meetings.map(toMeetingResponse),
    pagination: { ...pagination, total, totalPages: Math.ceil(total / pagination.limit) },
  };
};

export const leaveMeeting = async ({ meetingId, userId }) => {
  const meeting = await findMeetingOrThrow({ _id: meetingId });
  assertCanAccess(meeting, userId);

  await Meeting.updateOne(
    { _id: meeting._id, participants: { $elemMatch: { user: userId, leftAt: null } } },
    { $set: { "participants.$.leftAt": new Date() } }
  );

  return getMeetingResponse(meeting._id);
};

export const endMeeting = async ({ meetingId, userId }) => {
  const meeting = await findMeetingOrThrow({ _id: meetingId });

  if (!isHost(meeting, userId)) {
    throw ApiError.forbidden("Only the host can end this meeting");
  }

  const now = new Date();
  const result = await Meeting.updateOne(
    { _id: meeting._id, status: { $ne: ENDED } },
    { $set: { status: ENDED, endedAt: now, "participants.$[open].leftAt": now } },
    { arrayFilters: [{ "open.leftAt": null }] }
  );

  if (result.matchedCount === 0) {
    throw ApiError.badRequest("This meeting has already ended");
  }

  return getMeetingResponse(meeting._id);
};