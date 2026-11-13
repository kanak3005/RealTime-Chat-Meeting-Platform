//Purpose: Hero ke saath dikhne wali meeting room ki nakli tasveer: 4 video tiles, ek "speaking" tile, ek raised hand aur neeche control bar. Ye sirf sajawat hai, isliye poora aria-hidden hai aur koi asli button nahi hai. Screen reader ise skip kar deta hai.
import {
  Hand,
  MessageSquare,
  Mic,
  MonitorUp,
  PhoneOff,
  Video,
} from "lucide-react";
import { cn } from "../../utils/cn";
import Avatar from "../ui/Avatar.jsx";

const TILES = [
  { name: "Aarav Mehta", tone: "bg-lagoon/20", speaking: true },
  { name: "Riya Kapoor", tone: "bg-coral/20", raisedHand: true },
  { name: "Neha Iyer", tone: "bg-sage/35" },
  { name: "Kanak", tone: "bg-marigold/25", you: true },
];

const CONTROLS = [Mic, Video, MonitorUp, MessageSquare];

function Tile({ name, tone, speaking, raisedHand, you }) {
  return (
    <div
      className={cn(
        "relative flex aspect-video items-center justify-center rounded-xl",
        tone,
        speaking && "ring-2 ring-lagoon"
      )}
    >
      <Avatar name={name} size="lg" className="ring-2 ring-white" />

      {raisedHand && (
        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-marigold text-charcoal">
          <Hand size={14} />
        </span>
      )}

      <span className="absolute bottom-2 left-2 rounded-md bg-white/85 px-2 py-0.5 text-xs font-medium text-charcoal">
        {you ? "You" : name.split(" ")[0]}
      </span>
    </div>
  );
}

export default function MeetingPreview() {
  return (
    <div
      aria-hidden="true"
      className="rounded-3xl border border-sand bg-white p-3 shadow-card sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="font-display text-sm font-semibold">
          Design review
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lagoon/15 px-2.5 py-1 text-xs font-semibold text-lagoon-dark">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lagoon" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {TILES.map((tile) => (
          <Tile key={tile.name} {...tile} />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3">
        {CONTROLS.map((Icon, index) => (
          <span
            key={index}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-charcoal"
          >
            <Icon size={18} />
          </span>
        ))}
        <span className="flex h-10 w-14 items-center justify-center rounded-full bg-terracotta text-white">
          <PhoneOff size={18} />
        </span>
      </div>
    </div>
  );
}