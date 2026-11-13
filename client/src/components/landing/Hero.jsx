//Purpose: Landing page ka pehla section. Bade screen par do column (text left, MeetingPreview right), mobile par ek ke neeche ek. "Get started" /register par aur "Log in" /login par jata hai. Heading sirf ek <h1> hai, jo page par ek hi baar honi chahiye.
import Button from "../ui/Button.jsx";
import MeetingPreview from "./MeetingPreview.jsx";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-sm font-medium text-terracotta-dark">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-terracotta"
          />
          Video, chat and notes in one room
        </p>

        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Video meetings that feel like a{" "}
          <span className="text-terracotta">conversation.</span>
        </h1>

        <p className="mt-5 max-w-lg text-lg text-charcoal/75">
          MeetSphere keeps everything for a meeting in one calm place. Create a
          room, share a short code, and start talking.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/register" size="lg">
            Get started
          </Button>
          <Button to="/login" variant="outline" size="lg">
            Log in
          </Button>
        </div>
      </div>

      <MeetingPreview />
    </section>
  );
}