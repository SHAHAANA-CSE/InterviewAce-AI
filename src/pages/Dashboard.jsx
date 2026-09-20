import React from "react";
import { MessageSquareText, FileText, Target, Map, Award, ChevronRight } from "lucide-react";

export default function Dashboard({ t, user, setView, lastInterviewReport, resumeAnalysis, atsResult, roadmap }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const cards = [
    { id: "interview", title: "AI HR Interview", desc: "Practice a realistic mock interview with adaptive AI questions.", icon: MessageSquareText, cta: "Start interview" },
    { id: "resume", title: "Resume Analyzer", desc: "Upload your resume for instant strengths & weaknesses feedback.", icon: FileText, cta: "Analyze resume" },
    { id: "ats", title: "ATS Score", desc: "See how well your resume matches real job description keywords.", icon: Target, cta: "Check ATS score" },
    { id: "roadmap", title: "Learning Roadmap", desc: "Get a personalized prep plan based on your dream company.", icon: Map, cta: "Build roadmap" }
  ];

  const stats = [
    { label: "Last interview score", value: lastInterviewReport ? `${lastInterviewReport.score}/100` : "—", icon: Award },
    { label: "Resume analyzed", value: resumeAnalysis ? "Yes" : "Not yet", icon: FileText },
    { label: "ATS score", value: atsResult ? `${atsResult.score}/100` : "—", icon: Target },
    { label: "Roadmap weeks", value: roadmap ? `${roadmap.weeks.length}` : "—", icon: Map }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className={`rounded-2xl p-6 mb-6 ${t.card}`}>
        <p className={`text-sm ${t.textMuted}`}>{greeting},</p>
        <h2 className={`text-2xl font-bold ${t.text}`}>Welcome back, {user.name.split(" ")[0]} 👋</h2>
        <p className={`text-sm mt-1 ${t.textMuted}`}>Here's a snapshot of your interview prep journey.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`rounded-xl p-4 ${t.card}`}>
              <Icon size={18} className="text-amber-500 mb-2" />
              <p className={`text-xl font-bold ${t.text}`}>{s.value}</p>
              <p className={`text-xs ${t.textMuted}`}>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.id} className={`rounded-2xl p-5 transition ${t.card} ${t.cardHover}`}>
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.accentSoft}`}>
                  <Icon size={19} className="text-amber-500" />
                </div>
              </div>
              <h3 className={`font-semibold mt-3 ${t.text}`}>{c.title}</h3>
              <p className={`text-sm mt-1 mb-4 ${t.textMuted}`}>{c.desc}</p>
              <button onClick={() => setView(c.id)} className={`flex items-center gap-1.5 text-sm font-semibold ${t.accent}`}>
                {c.cta} <ChevronRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
