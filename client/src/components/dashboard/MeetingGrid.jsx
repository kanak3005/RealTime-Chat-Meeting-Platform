//Purpose: Meetings ki poori list.
//  Ye chaar state sambhalta hai: loading (spinner), 
// error (message), empty (friendly block) aur data (cards ka grid). 
// Code copy karna aur "room later phase mein aayega" wala toast bhi yahin hai. Phase 3 mein sirf handleOpen badlega, 
// jo meeting room par navigate karega.

import { AlertCircle, Video } from "lucide-react";
import useToast from "../../hooks/useToast.js";
import { copyToClipboard } from "../../utils/clipboard";
import EmptyState from "../ui/EmptyState.jsx";
import Loader from "../ui/Loader.jsx";
import MeetingCard from "./MeetingCard.jsx";

export default function MeetingGrid({
  meetings,
  loading,
  error,
  emptyTitle = "No meetings here yet",
  emptyDescription = "Meetings you create or join will show up here.",
  emptyAction,
}) {
  const toast = useToast();

  const handleCopy = async (meeting) => {
    const copied = await copyToClipboard(meeting.meetingCode);
    if (copied) {
      toast.success("Meeting code copied");
    } else {
      toast.error("Could not copy. Please copy the code manually.");
    }
  };

  const handleOpen = () => {
    toast.info("The meeting room arrives in a later phase");
  };

  if (loading) return <Loader label="Loading meetings..." />;

  if (error) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Could not load meetings"
        description={error}
      />
    );
  }

  if (!meetings.length) {
    return (
      <EmptyState
        icon={Video}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {meetings.map((meeting) => (
        <li key={meeting.id} className="flex">
          <MeetingCard
            meeting={meeting}
            onOpen={handleOpen}
            onCopy={handleCopy}
          />
        </li>
      ))}
    </ul>
  );
}