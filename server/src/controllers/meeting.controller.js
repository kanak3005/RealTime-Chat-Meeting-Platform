import * as meetingService from "../services/meeting.service.js";
import { sendSuccess } from "../utils/response.js";

export const create = async (req, res) => {
  const { title, scheduledAt } = req.body ?? {};
  const meeting = await meetingService.createMeeting({
    hostId: req.user.id,
    title,
    scheduledAt,
  });

  sendSuccess(res, { meeting }, 201);
};

export const list = async (req, res) => {
  const { status, page, limit } = req.query;
  const result = await meetingService.listMeetingsForUser({
    userId: req.user.id,
    status,
    page,
    limit,
  });

  sendSuccess(res, result);
};

export const join = async (req, res) => {
  const meeting = await meetingService.joinMeeting({
    userId: req.user.id,
    code: req.body.code,
  });

  sendSuccess(res, { meeting });
};

export const getById = async (req, res) => {
  const meeting = await meetingService.getMeetingForUser({
    meetingId: req.params.id,
    userId: req.user.id,
  });

  sendSuccess(res, { meeting });
};

export const leave = async (req, res) => {
  const meeting = await meetingService.leaveMeeting({
    meetingId: req.params.id,
    userId: req.user.id,
  });

  sendSuccess(res, { meeting });
};

export const end = async (req, res) => {
  const meeting = await meetingService.endMeeting({
    meetingId: req.params.id,
    userId: req.user.id,
  });

  sendSuccess(res, { meeting });
};