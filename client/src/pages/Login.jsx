// /Purpose: Login form. Email aur password validate hote hain (validateLoginForm), phir 0.7 sec ka nakli delay, phir /dashboard. Har field ka error uske neeche dikhta hai, aur server wala error form ke upar inline.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import useToast from "../hooks/useToast.js";
import { sleep } from "../utils/sleep";
import { hasErrors, validateLoginForm } from "../utils/validation";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState({ email: "", password: "" });
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

    const found = validateLoginForm(values);
    setErrors(found);
    if (hasErrors(found)) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await sleep(700);
      navigate("/dashboard");
      toast.success("Welcome back");
    } catch (error) {
      setSubmitError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-charcoal/70">
        Log in to start or join a meeting.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
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
          placeholder="Your password"
          autoComplete="current-password"
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
          Log in
        </Button>
      </form>

      <p className="mt-4 rounded-xl bg-cream px-3 py-2 text-xs text-charcoal/70">
        Demo mode: any valid email and a password of 8 or more characters will
        work until the backend is connected.
      </p>

      <p className="mt-6 text-center text-sm text-charcoal/70">
        New to MeetSphere?{" "}
        <Link
          to="/register"
          className="font-semibold text-terracotta-dark hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}