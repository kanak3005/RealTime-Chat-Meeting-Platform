//Purpose: Meetings fetch karne ka reusable hook. 
// status badalne par ya refreshKey badalne par dobara fetch hota hai.
//  ignore flag purane request ka result discard karta hai, taaki tab tezi se badalne par galat data na dikhe. Ye abhi mockApi se import karta hai. Phase 3 swap point: 
// line 2 ko ../api/meetings.api bana dena.
import { useEffect, useState } from "react";
import { meetingsApi } from "../mock/mockApi";

export default function useMeetings({ status = "all", refreshKey = 0 } = {}) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError("");

    meetingsApi
      .list({ status })
      .then((data) => {
        if (!ignore) setMeetings(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [status, refreshKey]);

  return { meetings, loading, error };
}