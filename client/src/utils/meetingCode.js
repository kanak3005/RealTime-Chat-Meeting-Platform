//Purpose: Meeting code ka format abc-defg-hij hai. Ye file code banati, check karti aur user ke type kiye hue code ko saaf karti hai. Agar user abcdefghij type kare, to dashes khud lag jaate hain.
const CODE_PATTERN = /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const randomLetters = (count) =>
  Array.from({ length: count }, () =>
    LETTERS.charAt(Math.floor(Math.random() * LETTERS.length))
  ).join("");

export const generateMeetingCode = () =>
  `${randomLetters(3)}-${randomLetters(4)}-${randomLetters(3)}`;

export function normalizeMeetingCode(value = "") {
  const letters = value.toLowerCase().replace(/[^a-z]/g, "");
  if (letters.length === 10) {
    return `${letters.slice(0, 3)}-${letters.slice(3, 7)}-${letters.slice(7)}`;
  }
  return value.trim().toLowerCase();
}

export const isValidMeetingCode = (value) => CODE_PATTERN.test(value);