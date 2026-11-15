import { randomInt } from "node:crypto";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

export const MEETING_CODE_REGEX = /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/;

const randomLetters = (count) =>
  Array.from({ length: count }, () => LETTERS[randomInt(LETTERS.length)]).join("");

export const generateMeetingCode = () =>
  `${randomLetters(3)}-${randomLetters(4)}-${randomLetters(3)}`;

export const normalizeMeetingCode = (code) => String(code).trim().toLowerCase();