//Purpose: Toast notifications ka state sambhalta hai. Har toast 4 second mein khud hat jata hai, 
// aur ek saath maximum 3 toasts dikhte hain. Dikhane ka kaam ToastContainer karega, jo Batch 3 mein aayega (toasts aur onDismiss props lega).


import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ToastContainer from "../components/ui/ToastContainer.jsx";
import { ToastContext } from "./toastContext.js";

const DURATION = 4000;
const MAX_VISIBLE = 3;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (type, message) => {
      nextId.current += 1;
      const id = nextId.current;

      setToasts((current) => [
        ...current.slice(-(MAX_VISIBLE - 1)),
        { id, type, message },
      ]);
      timers.current.set(id, setTimeout(() => dismiss(id), DURATION));
    },
    [dismiss]
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach((timer) => clearTimeout(timer));
  }, []);

  const value = useMemo(
    () => ({
      success: (message) => show("success", message),
      error: (message) => show("error", message),
      info: (message) => show("info", message),
      dismiss,
    }),
    [show, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

