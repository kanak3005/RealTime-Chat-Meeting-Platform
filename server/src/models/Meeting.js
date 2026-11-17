import mongoose from "mongoose";
import "./User.js";
import { MEETING_CODE_REGEX } from "../utils/meetingCode.js"; 
import { meetingConfig } from "../config/meeting.js"; // max participants per meeting iss file mein daal diye hai
export const MEETING_STATUS = Object.freeze({
  SCHEDULED: "scheduled",
  LIVE: "live",
  ENDED: "ended",
});

const participantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    joinedAt: { type: Date, default: Date.now },
    leftAt: { type: Date, default: null },
  },
  { _id: false }
);

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be longer than 100 characters"],
    },
    meetingCode: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [MEETING_CODE_REGEX, "Invalid meeting code format"],
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(MEETING_STATUS),
      default: MEETING_STATUS.SCHEDULED,
    },
    maxParticipants: {
      type: Number,
      min: [2, "A meeting must allow at least 2 participants"],
      validate: { validator: Number.isInteger, message: "Participant limit must be a whole number" },
      default: () => meetingConfig.maxParticipants,
    },
    scheduledAt: { type: Date, default: null },
    startedAt: { type: Date, default: null },
    endedAt: { type: Date, default: null },
    participants: { type: [participantSchema], default: [] },
  },
  { timestamps: true }
);

meetingSchema.index({ host: 1, createdAt: -1 });
meetingSchema.index({ "participants.user": 1, createdAt: -1 });

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;