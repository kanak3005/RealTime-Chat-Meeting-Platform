const STEPS = [
  {
    title: "Create a meeting",
    description:
      "Give it a name and start right away, or schedule it for later.",
  },
  {
    title: "Share the code",
    description:
      "Every meeting gets a short code like abc-defg-hij. Send it to anyone.",
  },
  {
    title: "Join and talk",
    description:
      "Enter the code, allow your camera and mic, and you are in the room.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
    >
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        How it works
      </h2>
      <p className="mt-3 max-w-2xl text-charcoal/75">
        Three steps from nothing to a live call.
      </p>

      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta font-display text-xl font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">
              {step.title}
            </h3>
            <p className="mt-1.5 text-charcoal/70">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
//Purpose: 3 steps ka section: meeting banao, code share karo, join karo. <ol> (numbered list) use hui hai, kyunki steps ka order matter karta hai. Section par id="how-it-works" hai.