import ApiError from "../utils/ApiError.js";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

const isBlank = (value) => value === undefined || value === null || value === "";

const rejectIfAny = (errors) => {
  if (errors.length > 0) {
    throw ApiError.badRequest("Please check the highlighted fields", errors);
  }
};

export const validateCreateMeeting = (req, _res, next) => {
  const { title, scheduledAt } = req.body ?? {};
  const errors = [];

  if (!isBlank(title) && typeof title !== "string") {
    errors.push({ field: "title", message: "Title must be text" });
  }

  if (!isBlank(scheduledAt) && typeof scheduledAt !== "string") {
    errors.push({ field: "scheduledAt", message: "Scheduled time must be an ISO date string" });
  }

  rejectIfAny(errors);
  next();
};

export const validateJoinMeeting = (req, _res, next) => {
  const { code } = req.body ?? {};

  if (typeof code !== "string" || code.trim() === "") {
    rejectIfAny([{ field: "code", message: "Meeting code is required" }]);
  }

  next();
};

export const validateMeetingId = (req, _res, next) => {
  if (!OBJECT_ID_REGEX.test(req.params.id)) {
    throw ApiError.badRequest("Invalid meeting id");
  }

  next();
};