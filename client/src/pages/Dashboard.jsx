//Purpose: Dashboard ka Home. User ke naam se greeting, do ActionCards (New meeting, Join with code) aur pehli 3 meetings. "View all" se poori list wala page khulta hai. Modals aur refreshKey DashboardLayout se useOutletContext() ke zariye aate hain.
import { Keyboard, Video } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import ActionCard from "../components/dashboard/ActionCard.jsx";
import MeetingGrid from "../components/dashboard/MeetingGrid.jsx";
import Button from "../components/ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import useMeetings from "../hooks/useMeetings.js";

const RECENT_COUNT = 3;

export default function Dashboard() {
  const { user } = useAuth();
  const { openCreate, openJoin, refreshKey } = useOutletContext();
  const { meetings, loading, error } = useMeetings({ refreshKey });

  const firstName = user.name.split(" ")[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Hi, {firstName}
        </h1>
        <p className="mt-1 text-charcoal/70">
          Start a meeting or join one with a code.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ActionCard
          icon={Video}
          title="New meeting"
          description="Start now or schedule for later"
          onClick={openCreate}
        />
        <ActionCard
          icon={Keyboard}
          tone="lagoon"
          title="Join with code"
          description="Enter a code like abc-defg-hij"
          onClick={openJoin}
        />
      </div>

      <section aria-labelledby="your-meetings">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="your-meetings"
            className="font-display text-xl font-semibold"
          >
            Your meetings
          </h2>
          <Button to="/dashboard/meetings" variant="ghost" size="sm">
            View all
          </Button>
        </div>

        <MeetingGrid
          meetings={meetings.slice(0, RECENT_COUNT)}
          loading={loading}
          error={error}
          emptyTitle="No meetings yet"
          emptyDescription="Create your first meeting and share the code."
          emptyAction={
            <Button icon={Video} onClick={openCreate}>
              New meeting
            </Button>
          }
        />
      </section>
    </div>
  );
}