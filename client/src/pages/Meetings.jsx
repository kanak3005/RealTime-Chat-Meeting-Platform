//Purpose: Saari meetings ki list, filter ke saath (All, Live, Scheduled, Ended). Filter badalne par useMeetings naye status se dobara fetch karta hai. Mobile par filter buttons horizontally scroll hote hain. Har filter ka apna empty message hai.

import { useState } from "react";
import { Keyboard, Video } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import MeetingGrid from "../components/dashboard/MeetingGrid.jsx";
import Button from "../components/ui/Button.jsx";
import useMeetings from "../hooks/useMeetings.js";
import { cn } from "../utils/cn";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "scheduled", label: "Scheduled" },
  { value: "ended", label: "Ended" },
];

export default function Meetings() {
  const { openCreate, openJoin, refreshKey } = useOutletContext();
  const [status, setStatus] = useState("all");
  const { meetings, loading, error } = useMeetings({ status, refreshKey });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Meetings
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button icon={Video} onClick={openCreate}>
            New meeting
          </Button>
          <Button variant="outline" icon={Keyboard} onClick={openJoin}>
            Join with code
          </Button>
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter meetings by status"
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatus(filter.value)}
            aria-pressed={status === filter.value}
            className={cn(
              "min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors",
              status === filter.value
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-sand bg-white text-charcoal/80 hover:bg-cream"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <MeetingGrid
        meetings={meetings}
        loading={loading}
        error={error}
        emptyTitle={
          status === "all" ? "No meetings yet" : `No ${status} meetings`
        }
        emptyDescription={
          status === "all"
            ? "Create your first meeting and share the code."
            : "Try another filter, or create a new meeting."
        }
        emptyAction={
          <Button icon={Video} onClick={openCreate}>
            New meeting
          </Button>
        }
      />
    </div>
  );
}