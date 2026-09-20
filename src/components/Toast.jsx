import React from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function Toast({ toast, t }) {
  const icon =
    toast.type === "error" ? <XCircle size={18} /> :
    toast.type === "info" ? <AlertCircle size={18} /> :
    <CheckCircle2 size={18} />;
  const style = toast.type === "error" ? t.dangerBg : toast.type === "info" ? t.warnBg : t.successBg;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fadeIn">
      <div className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${style} text-sm font-medium`}>
        {icon}
        {toast.message}
      </div>
    </div>
  );
}
