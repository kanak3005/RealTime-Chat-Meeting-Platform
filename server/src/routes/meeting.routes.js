import { Router } from "express";
import { create, list, join, getById, leave, end } from "../controllers/meeting.controller.js";
import {
  validateCreateMeeting,
  validateJoinMeeting,
  validateMeetingId,
} from "../validators/meeting.validator.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/", list);
router.post("/", validateCreateMeeting, create);
router.post("/join", validateJoinMeeting, join);
router.get("/:id", validateMeetingId, getById);
router.post("/:id/leave", validateMeetingId, leave);
router.post("/:id/end", validateMeetingId, end);

export default router;