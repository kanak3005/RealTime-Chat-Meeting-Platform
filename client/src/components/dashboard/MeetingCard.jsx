//Purpose: Ek meeting ka card. Status badge
//  (Live / Scheduled / Ended), meeting code ke saath copy button,
//  title, time, participants ke avatars aur ek action button. Ye sirf dikhata hai.
//  Click par kya hoga, ye onOpen aur onCopy se MeetingGrid tay karta hai.

import { Clock, Copy } from "lucide-react";
import { cn } from "../../utils/cn";
import {
  formatDate,
  formatDateTime,
  formatDuration,
} from "../../utils/format";
import Avatar from "../ui/Avatar.jsx";
import Button from "../ui/Button.jsx";

const MAX_AVATARS = 3;

const STATUS = {
  live: {
    label: "Live",
    badge: "bg-lagoon/15 text-lagoon-dark",
    dot: "animate-pulse bg-lagoon",
    action: "Join now",
    variant: "primary",
  },
  scheduled: {
    label: "Scheduled",
    badge: "bg-marigold/25 text-charcoal",
    dot: "bg-marigold",
    action: "Open",
    variant: "outline",
  },
  ended: {
    label: "Ended",
    badge: "bg-sand text-charcoal/80",
    dot: "bg-charcoal/40",
    action: "View details",
    variant: "outline",
  },
};

function describeTime(meeting) {
  if (meeting.status === "live") {
    return `Started ${formatDateTime(meeting.startedAt)}`;
  }
  if (meeting.status === "scheduled") {
    return `Starts ${formatDateTime(meeting.scheduledAt)}`;
  }
  return `${formatDate(meeting.endedAt)} · ${formatDuration(meeting.durationMinutes)}`;
}

function Participants({ participants }) {
  if (!participants.length) {
    return (
      <span className="text-sm text-charcoal/60">No one has joined yet</span>
    );
  }

  const visible = participants.slice(0, MAX_AVATARS);
  const extra = participants.length - visible.length;
  const total = participants.length;

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {visible.map((person) => (
          <Avatar
            key={person.id}
            name={person.name}
            size="sm"
            className="ring-2 ring-white"
          />
        ))}
      </div>
      <span className="text-sm text-charcoal/70">
        {extra > 0 ? `+${extra} more` : `${total} ${total === 1 ? "person" : "people"}`}
      </span>
    </div>
  );
}

export default function MeetingCard({ meeting, onOpen, onCopy }) {
  const status = STATUS[meeting.status] ?? STATUS.ended;

  return (
    <article className="flex w-full flex-col rounded-2xl border border-sand bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            status.badge
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-1.5 w-1.5 rounded-full", status.dot)}
          />
          {status.label}
        </span>

        <button
          type="button"
          onClick={() => onCopy(meeting)}
          aria-label={`Copy meeting code ${meeting.meetingCode}`}
          className="-mr-2 flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-charcoal/70 transition-colors hover:bg-cream hover:text-charcoal"
        >
          <span className="font-mono text-sm">{meeting.meetingCode}</span>
          <Copy size={14} aria-hidden="true" />
        </button>
      </div>

      <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug">
        {meeting.title}
      </h3>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-charcoal/70">
        <Clock size={14} aria-hidden="true" />
        {describeTime(meeting)}
      </p>

      <div className="mt-4 flex flex-1 flex-wrap items-end justify-between gap-3">
        <Participants participants={meeting.participants} />
        <Button
          size="sm"
          variant={status.variant}
          onClick={() => onOpen(meeting)}
        >
          {status.action}
        </Button>
      </div>
    </article>
  );
}