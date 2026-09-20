import React from "react";
import {
  LayoutDashboard, MessageSquareText, FileText, Target, Map,
  Settings as SettingsIcon, LogOut, X, Sparkles
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "interview", label: "AI HR Interview", icon: MessageSquareText },
  { id: "resume", label: "Resume Analyzer", icon: FileText },
  { id: "ats", label: "ATS Score", icon: Target },
  { id: "roadmap", label: "Learning Roadmap", icon: Map },
  { id: "settings", label: "Settings", icon: SettingsIcon }
];

export default function Sidebar({ t, view, setView, user, onLogout, sidebarOpen, setSidebarOpen }) {
  const content = (
    <div className={`h-full w-64 flex flex-col ${t.sidebarBg}`}>
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-[#0B1220]" />
        </div>
        <span className={`font-bold ${t.text}`}>InterviewAce AI</span>
        <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X size={18} className={t.textMuted} />
        </button>
      </div>
      <nav className="flex-1 px-2 space-y-1 mt-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = view === item.id || (item.id === "interview" && view === "interview-report");
          return (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                active ? t.navActive : t.navIdle
              }`}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className={`m-3 p-3 rounded-xl ${t.card}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-[#0B1220] font-bold text-sm shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate ${t.text}`}>{user.name}</p>
            <p className={`text-xs truncate ${t.textMuted}`}>{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold ${t.btnSecondary}`}
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block shrink-0">{content}</div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full">{content}</div>
        </div>
      )}
    </>
  );
}
