//Purpose: "New meeting" popup. Title zaroori hai, aur schedule time optional.
//  Time khali ho to meeting abhi live ho jati hai, bhara ho to scheduled banti hai. 
// Validation utils/validation.js se aati hai. Server error modal ke andar inline dikhta hai,
//  kyunki toast modal ke peeche chhup jata. Success par modal band hota hai aur uske baad toast aata hai.


import { useState } from "react";
import { meetingsApi } from "../../mock/mockApi";
import useToast from "../../hooks/useToast.js";
import { hasErrors, validateMeetingTitle } from "../../utils/validation";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Modal from "../ui/Modal.jsx";

function validate({ title, scheduledAt }) {
  const errors = {};
  const titleError = validateMeetingTitle(title);

  if (titleError) errors.title = titleError;
  if (scheduledAt && new Date(scheduledAt) <= new Date()) {
    errors.scheduledAt = "Pick a time in the future";
  }
  return errors;
}

function CreateMeetingForm({ onClose, onCreated }) {
  const toast = useToast();
  const [values, setValues] = useState({ title: "", scheduledAt: "" });
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

    const found = validate(values);
    setErrors(found);
    if (hasErrors(found)) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const meeting = await meetingsApi.create({
        title: values.title,
        scheduledAt: values.scheduledAt
          ? new Date(values.scheduledAt).toISOString()
          : undefined,
      });

      onCreated?.(meeting);
      onClose();
      toast.success(
        meeting.status === "live"
          ? `Meeting created. Code: ${meeting.meetingCode}`
          : "Meeting scheduled"
      );
    } catch (error) {
      setSubmitError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        label="Meeting title"
        name="title"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Weekly standup"
        maxLength={80}
        autoComplete="off"
        data-autofocus
      />

      <Input
        label="Schedule for later (optional)"
        name="scheduledAt"
        type="datetime-local"
        value={values.scheduledAt}
        onChange={handleChange}
        error={errors.scheduledAt}
        hint="Leave empty to start the meeting right now"
      />

      {submitError && (
        <p
          role="alert"
          className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta-dark"
        >
          {submitError}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {values.scheduledAt ? "Schedule meeting" : "Start meeting"}
        </Button>
      </div>
    </form>
  );
}

export default function CreateMeetingModal({ open, onClose, onCreated }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New meeting"
      description="Give it a name. Start right away or schedule it for later."
    >
      <CreateMeetingForm onClose={onClose} onCreated={onCreated} />
    </Modal>
  );
}
