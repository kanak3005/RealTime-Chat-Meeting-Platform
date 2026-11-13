//Purpose: Saare 8 components ek page par dikhata hai, plus ToastProvider, useToast aur Batch 2 ke context ko bhi test karta hai.

import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Plus, Video } from "lucide-react";
import "./index.css";
import ToastProvider from "./context/ToastProvider.jsx";
import useToast from "./hooks/useToast.js";
import Avatar from "./components/ui/Avatar.jsx";
import Button from "./components/ui/Button.jsx";
import EmptyState from "./components/ui/EmptyState.jsx";
import Input from "./components/ui/Input.jsx";
import Loader from "./components/ui/Loader.jsx";
import Logo from "./components/ui/Logo.jsx";
import Modal from "./components/ui/Modal.jsx";

const VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"];
const NAMES = ["Kanak Sharma", "Aarav Mehta", "Riya Kapoor", "Neha Iyer", "Kabir Singh"];

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Preview() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");

  const emailError = email && !email.includes("@") ? "Enter a valid email address" : "";

  const fakeSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <main className="mx-auto max-w-3xl space-y-10 p-6">
      <Logo to={null} />

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button icon={Plus} size="sm">Small + icon</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button loading={saving} onClick={fakeSave}>Click: loading</Button>
          <Button to="/preview.html" variant="outline">As link</Button>
        </div>
      </Section>

      <Section title="Avatars">
        <div className="flex items-center gap-3">
          {NAMES.map((name) => (
            <Avatar key={name} name={name} />
          ))}
          <Avatar name="Kanak Sharma" size="sm" />
          <Avatar name="Kanak Sharma" size="lg" />
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
            hint="Type without @ to see the error"
            placeholder="you@example.com"
          />
          <Input label="Password" type="password" placeholder="At least 8 characters" />
        </div>
      </Section>

      <Section title="Loader">
        <Loader label="Loading meetings..." className="py-6" />
      </Section>

      <Section title="Empty state">
        <EmptyState
          icon={Video}
          title="No meetings yet"
          description="Start your first meeting or join one with a code."
          action={<Button icon={Plus}>New meeting</Button>}
        />
      </Section>

      <Section title="Modal and toasts">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => toast.success("Meeting created")}>Success toast</Button>
          <Button variant="danger" onClick={() => toast.error("Something went wrong")}>Error toast</Button>
          <Button variant="outline" onClick={() => toast.info("Room arrives in a later phase")}>Info toast</Button>
        </div>
      </Section>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Join a meeting"
        description="Enter the code you were given."
      >
        <Input label="Meeting code" placeholder="abc-defg-hij" data-autofocus />
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Join</Button>
        </div>
      </Modal>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastProvider>
      <Preview />
    </ToastProvider>
  </BrowserRouter>
);