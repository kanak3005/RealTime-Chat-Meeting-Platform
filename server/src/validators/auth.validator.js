import ApiError from "../utils/ApiError.js";

const label = (field) => field.charAt(0).toUpperCase() + field.slice(1);

const requireStrings = (fields) => (req, _res, next) => {
  const body = req.body ?? {};

  const errors = fields
    .filter((field) => typeof body[field] !== "string" || body[field].trim() === "")
    .map((field) => ({ field, message: `${label(field)} is required` }));

  if (errors.length > 0) {
    throw ApiError.badRequest("Please fill in all required fields", errors);
  }

  next();
};

export const validateRegister = requireStrings(["name", "email", "password"]);
export const validateLogin = requireStrings(["email", "password"]);