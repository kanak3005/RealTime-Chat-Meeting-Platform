//Purpose: Phase 0 ka walking skeleton, ab ek proper page. Teen cheezein check karta hai: frontend chal raha hai, API /api/health ka jawab de rahi hai, aur Socket.IO connect hokar system:ping ka ack deta hai. "Check again" button sab dobara chalata hai. Server band ho to ye saaf error dikhata hai, jo debugging mein kaam aata hai.
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import api from "../api/axios";
import Button from "../components/ui/Button.jsx";
import { Spinner } from "../components/ui/Loader.jsx";
import Logo from "../components/ui/Logo.jsx";
import { EVENTS } from "../socket/events";
import { socket } from "../socket/socket";

const PING_TIMEOUT = 3000;
const PENDING = { status: "checking", detail: "" };
const FRONTEND = { status: "ok", detail: "The React app is running." };

async function checkApi() {
  try {
    await api.get("/health");
    return {
      status: "ok",
      detail: `Server replied at ${import.meta.env.VITE_API_URL}/health`,
    };
  } catch (error) {
    return { status: "error", detail: error.message };
  }
}

function checkSocket() {
  return new Promise((resolve) => {
    const startedAt = performance.now();

    const finish = (result) => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleError);
      resolve(result);
    };

    const handleConnect = () => {
      socket.timeout(PING_TIMEOUT).emit(EVENTS.SYSTEM_PING, (error) => {
        if (error) {
          finish({
            status: "error",
            detail: "Connected, but the server did not reply to the ping.",
          });
          return;
        }
        const elapsed = Math.round(performance.now() - startedAt);
        finish({
          status: "ok",
          detail: `Connected and got a ping reply in ${elapsed} ms.`,
        });
      });
    };

    const handleError = (error) => {
      socket.disconnect();
      finish({ status: "error", detail: `Cannot connect: ${error.message}` });
    };

    socket.once("connect", handleConnect);
    socket.once("connect_error", handleError);
    socket.connect();
  });
}

function StatusIcon({ status }) {
  if (status === "checking") {
    return <Spinner size={20} className="text-charcoal/50" />;
  }
  if (status === "ok") {
    return <CheckCircle2 size={20} aria-hidden="true" className="text-lagoon" />;
  }
  return <AlertCircle size={20} aria-hidden="true" className="text-terracotta" />;
}

function StatusRow({ label, check }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-sand bg-white p-4">
      <span className="mt-0.5 shrink-0">
        <StatusIcon status={check.status} />
      </span>
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="break-words text-sm text-charcoal/70">
          {check.detail || "Checking..."}
        </p>
      </div>
    </li>
  );
}

export default function SystemCheck() {
  const [api_, setApiResult] = useState(PENDING);
  const [socketResult, setSocketResult] = useState(PENDING);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    let ignore = false;

    checkApi().then((result) => {
      if (!ignore) setApiResult(result);
    });
    checkSocket().then((result) => {
      if (!ignore) setSocketResult(result);
    });

    return () => {
      ignore = true;
      socket.disconnect();
    };
  }, [runId]);

  const recheck = () => {
    setApiResult(PENDING);
    setSocketResult(PENDING);
    setRunId((id) => id + 1);
  };

  return (
    <div className="mx-auto min-h-dvh max-w-xl px-4 py-8 sm:px-6">
      <Logo />

      <h1 className="mt-10 font-display text-3xl font-semibold tracking-tight">
        System check
      </h1>
      <p className="mt-2 text-charcoal/70">
        Confirms that the frontend, the API and Socket.IO can talk to each
        other.
      </p>

      <ul aria-live="polite" className="mt-6 space-y-3">
        <StatusRow label="Frontend" check={FRONTEND} />
        <StatusRow label="API (REST)" check={api_} />
        <StatusRow label="Socket.IO" check={socketResult} />
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button icon={RefreshCw} onClick={recheck}>
          Check again
        </Button>
        <Button to="/" variant="outline">
          Back to home
        </Button>
      </div>
    </div>
  );
}