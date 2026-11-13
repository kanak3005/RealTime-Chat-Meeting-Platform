//Purpose: Login, register aur create-meeting forms ki validation. Har function error message (string) return karta hai. Khali string ka matlab sab theek hai.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name = "") {
  const value = name.trim();
  if (!value) return "Name is required";
  if (value.length < 2) return "Name must be at least 2 characters";
  return "";
}

export function validateEmail(email = "") {
  const value = email.trim();
  if (!value) return "Email is required";
  if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address";
  return "";
}

export function validatePassword(password = "") {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
}

export function validateMeetingTitle(title = "") {
  const value = title.trim();
  if (!value) return "Meeting title is required";
  if (value.length > 80) return "Title must be 80 characters or less";
  return "";
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;

export function validateLoginForm({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!password) errors.password = "Password is required";
  return errors;
}

export function validateRegisterForm({ name, email, password }) {
  const errors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}