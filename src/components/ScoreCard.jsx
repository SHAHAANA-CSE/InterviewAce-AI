import React from "react";

export default function ScoreCard({ t, label, value, icon: Icon }) {
  return (
    <div className={`rounded-2xl p-5 ${t.card}`}>
      <div className="flex items-center justify-between">
        <Icon size={18} className="text-amber-500" />
        <span className={`text-2xl font-bold ${t.text}`}>
          {value}
          <span className={`text-xs font-normal ${t.textMuted}`}>/100</span>
        </span>
      </div>
      <p className={`text-xs mt-2 ${t.textMuted}`}>{label}</p>
      <div className="h-1.5 rounded-full mt-2 overflow-hidden bg-slate-500/10">
        <div className="h-full bg-amber-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
