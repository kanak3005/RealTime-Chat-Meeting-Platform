import Button from "../components/ui/Button.jsx";
import Logo from "../components/ui/Logo.jsx";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="px-4 py-5 sm:px-6">
        <Logo />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16 text-center">
        <p className="font-display text-7xl font-semibold text-terracotta">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          This page does not exist
        </h1>
        <p className="mt-2 max-w-sm text-charcoal/70">
          The link may be broken, or the page may have moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Go to home</Button>
          <Button to="/dashboard" variant="outline">
            Open dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
// /Purpose: Galat URL par 404 page. Logo, message aur do buttons (Home, Dashboard). Router ka path="*" isi ko dikhata hai.