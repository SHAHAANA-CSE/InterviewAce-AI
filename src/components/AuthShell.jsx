import React from "react";
import { Sparkles, Sun, Moon } from "lucide-react";

export default function AuthShell({ t, dark, setDark, children, tagline }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F1729] text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center">
            <Sparkles size={18} className="text-[#0B1220]" />
          </div>
          <span className="font-bold text-lg tracking-tight">InterviewAce AI</span>
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Walk into every interview already prepared.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">{tagline}</p>
          <div className="mt-8 flex gap-6 text-sm text-slate-400">
            <div>
              <div className="text-2xl font-bold text-amber-400">50k+</div>
              mock interviews run
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">4.8/5</div>
              average rating
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">92%</div>
              felt more confident
            </div>
          </div>
        </div>
        <div className="relative z-10 text-xs text-slate-500">© 2026 InterviewAce AI — a demo product experience.</div>
      </div>
      <div className={`w-full lg:w-1/2 flex flex-col ${t.pageBg}`}>
        <div className="flex justify-end p-6">
          <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg ${t.btnSecondary}`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
