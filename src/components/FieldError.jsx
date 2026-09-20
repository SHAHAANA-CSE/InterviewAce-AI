import React from "react";
import { AlertCircle } from "lucide-react";

export default function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} />
      {msg}
    </p>
  );
}
