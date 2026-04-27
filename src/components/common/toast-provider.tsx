"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type ToastType = "success" | "error";
type ToastState = { message: string; type: ToastType } | null;

const ToastContext = createContext<{ showToast: (message: string, type?: ToastType) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);

  const value = useMemo(
    () => ({
      showToast: (message: string, type: ToastType = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2200);
      },
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div className={`fixed bottom-5 right-5 z-50 rounded-lg px-4 py-3 text-sm text-white shadow ${toast.type === "success" ? "bg-emerald-700" : "bg-red-600"}`}>
          {toast.message}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
