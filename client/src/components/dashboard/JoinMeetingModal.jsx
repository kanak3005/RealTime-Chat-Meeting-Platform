//Purpose: "Join with code" popup. Abhi ye sirf code ka format check karta hai (abc-defg-hij). abcdefghij type karo to dashes khud lag jate hain (normalizeMeetingCode). Sahi hone par modal band hota hai aur info toast aata hai. Asli join Phase 3 aur 5 mein judega.
import { useState } from "react";
import useToast from "../../hooks/useToast.js";
import {
  isValidMeetingCode,
  normalizeMeetingCode,
} from "../../utils/meetingCode";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Modal from "../ui/Modal.jsx";

function JoinMeetingForm({ onClose }) {
  const toast = useToast();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCode(event.target.value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!code.trim()) {
      setError("Meeting code is required");
      return;
    }

    const normalized = normalizeMeetingCode(code);
    if (!isValidMeetingCode(normalized)) {
      setError("Enter a code like abc-defg-hij");
      return;
    }

    onClose();
    toast.info(
      `Code ${normalized} looks good. The meeting room arrives in a later phase.`
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        label="Meeting code"
        name="code"
        value={code}
        onChange={handleChange}
        error={error}
        hint="Format: abc-defg-hij"
        placeholder="abc-defg-hij"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        data-autofocus
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="secondary">
          Join meeting
        </Button>
      </div>
    </form>
  );
}

export default function JoinMeetingModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Join with a code"
      description="Enter the meeting code someone shared with you."
    >
      <JoinMeetingForm onClose={onClose} />
    </Modal>
  );
}