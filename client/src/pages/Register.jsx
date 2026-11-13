//Purpose: Sign-up form: naam, email, password. Login jaisi hi structure hai, bas teen fields aur validateRegisterForm. Password ke neeche hint hai ("At least 8 characters"), jo error aane par error message se replace ho jata hai (Input ka kaam).
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import useToast from "../hooks/useToast.js";
import { sleep } from "../utils/sleep";
import { hasErrors, validateRegisterForm } from "../utils/validation";

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validateRegisterForm(values);
    setErrors(found);
    if (hasErrors(found)) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await sleep(700);
      navigate("/dashboard");
      toast.success("Account created. Welcome to MeetSphere");
    } catch (error) {
      setSubmitError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-charcoal/70">
        It takes less than a minute.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <Input
          label="Full name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Kanak Sharma"
          autoComplete="name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          hint="At least 8 characters"
          placeholder="Choose a password"
          autoComplete="new-password"
        />

        {submitError && (
          <p
            role="alert"
            className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta-dark"
          >
            {submitError}
          </p>
        )}

        <Button type="submit" loading={submitting} className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-4 rounded-xl bg-cream px-3 py-2 text-xs text-charcoal/70">
        Demo mode: no account is saved yet. The backend arrives in the next
        phases.
      </p>

      <p className="mt-6 text-center text-sm text-charcoal/70">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-terracotta-dark hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}