import React from "react";
import { Menu, Sun, Moon } from "lucide-react";

const TITLES = {
  dashboard: "Dashboard",
  interview: "AI HR Interview",
  "interview-report": "Interview Report",
  resume: "Resume Analyzer",
  ats: "ATS Score",
  roadmap: "Learning Roadmap",
  settings: "Settings"
};

export default function TopBar({ t, dark, setDark, user, setSidebarOpen, view }) {
  return (
    <header className={`flex items-center justify-between px-5 py-4 ${t.topBarBg} sticky top-0 z-30`}>
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} className={t.text} />
        </button>
        <h1 className={`font-semibold text-lg ${t.text}`}>{TITLES[view] || "InterviewAce AI"}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg ${t.btnSecondary}`}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-3">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#0B1220] font-bold text-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className={`text-sm font-medium ${t.text}`}>{user.name.split(" ")[0]}</span>
        </div>
      </div>
    </header>
  );
}
