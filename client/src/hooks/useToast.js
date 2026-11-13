//Purpose: Components mein const toast = useToast() likhkar toast.success("Saved") bulane ke liye. Agar Provider ke bahar use hua to saaf error deta hai.
import { useContext } from "react";
import { ToastContext } from "../context/toastContext.js";

export default function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return context;
}