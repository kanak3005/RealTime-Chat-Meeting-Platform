//Purpose: 6 features ka grid. Data ek array mein hai aur UI usse map karti hai, to naya feature jodna ek line ka kaam hai. Icon ke rang literal class strings hain, kyunki Tailwind ko poori class names text mein chahiye. Section par id="features" hai.
import {
  Hand,
  History,
  MessageSquare,
  MonitorUp,
  Sparkles,
  Video,
} from "lucide-react";

const FEATURES = [
  {
    icon: Video,
    title: "Face-to-face video",
    description:
      "Audio and video go directly between participants, straight from the browser.",
    tone: "bg-terracotta/15 text-terracotta-dark",
  },
  {
    icon: MessageSquare,
    title: "Live chat",
    description:
      "Message everyone in the room without leaving the call. History stays saved.",
    tone: "bg-lagoon/15 text-lagoon-dark",
  },
  {
    icon: MonitorUp,
    title: "Screen sharing",
    description:
      "Share a window or your whole screen while the call keeps running.",
    tone: "bg-marigold/25 text-charcoal",
  },
  {
    icon: Hand,
    title: "Raise hand and reactions",
    description:
      "Show you want to speak, or react with an emoji, without interrupting anyone.",
    tone: "bg-sage/35 text-charcoal",
  },
  {
    icon: Sparkles,
    title: "AI meeting notes",
    description:
      "Get a transcript, a short summary and action items once the meeting ends.",
    tone: "bg-coral/20 text-terracotta-dark",
  },
  {
    icon: History,
    title: "Meeting history",
    description:
      "Every past meeting, its people and its notes, together in one place.",
    tone: "bg-lagoon/15 text-lagoon-dark",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-y border-sand/70 bg-cream/50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything a meeting needs
          </h2>
          <p className="mt-3 text-charcoal/75">
            No add-ons and no extra tools. One room for the call, the chat and
            the notes.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, tone }) => (
            <li
              key={title}
              className="rounded-2xl border border-sand bg-white p-6 shadow-card"
            >
              <span
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-charcoal/70">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}