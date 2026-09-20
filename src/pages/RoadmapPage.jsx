import React, { useState } from "react";
import { GraduationCap, Building2, Sparkles } from "lucide-react";
import { generateRoadmap } from "../utils/mockData.js";

export default function RoadmapPage({ t, roadmap, setRoadmap, showToast }) {
  const [company, setCompany] = useState(roadmap?.company || "");
  const [level, setLevel] = useState(roadmap?.level || "Intermediate");
  const [time, setTime] = useState(roadmap?.time || "5-10 hrs/week");
  const [generating, setGenerating] = useState(false);

  function generate() {
    if (!company.trim()) {
      showToast("Please enter your dream company.", "error");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const result = generateRoadmap({ company, level, time });
      setRoadmap(result);
      setGenerating(false);
      showToast("Your personalized roadmap is ready!");
    }, 1000);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className={`rounded-2xl p-6 mb-6 ${t.card}`}>
        <h2 className={`text-lg font-bold mb-1 flex items-center gap-2 ${t.text}`}>
          <GraduationCap size={20} className="text-amber-500" />
          Build Your Learning Roadmap
        </h2>
        <p className={`text-sm mb-5 ${t.textMuted}`}>Tell us about your goal and we'll generate a personalized prep plan.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={`text-sm font-medium ${t.text}`}>Dream company</label>
            <div className="relative mt-1">
              <Building2 size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Amazon..."
                className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
              />
            </div>
          </div>
          <div>
            <label className={`text-sm font-medium ${t.text}`}>Current skill level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={`w-full mt-1 px-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className={`text-sm font-medium ${t.text}`}>Available study time</label>
            <select value={time} onChange={(e) => setTime(e.target.value)} className={`w-full mt-1 px-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}>
              <option>&lt;5 hrs/week</option>
              <option>5-10 hrs/week</option>
              <option>10+ hrs/week</option>
            </select>
          </div>
        </div>

        <button onClick={generate} disabled={generating} className={`mt-5 flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm ${t.btnPrimary} disabled:opacity-60`}>
          {generating ? (
            "Generating roadmap..."
          ) : (
            <>
              <Sparkles size={15} />
              Generate Roadmap
            </>
          )}
        </button>
      </div>

      {roadmap && !generating && (
        <div>
          <div className={`rounded-2xl p-5 mb-4 ${t.card}`}>
            <p className={`text-sm ${t.textMuted}`}>
              Target: <span className={`font-semibold ${t.text}`}>{roadmap.company}</span> · {roadmap.level} · {roadmap.time}
            </p>
            <p className={`text-sm mt-2 ${t.textMuted}`}>
              <span className="font-semibold">Focus areas: </span>
              {roadmap.focus}
            </p>
            <p className={`text-sm mt-1 ${t.textMuted}`}>{roadmap.adjust}</p>
          </div>
          <div className="space-y-3">
            {roadmap.weeks.map((w) => (
              <div key={w.week} className={`rounded-xl p-4 flex gap-4 ${t.card}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${t.accentSoft} text-amber-600`}>
                  W{w.week}
                </div>
                <div>
                  <h4 className={`font-semibold text-sm ${t.text}`}>{w.title}</h4>
                  <ul className="mt-1.5 space-y-1">
                    {w.tasks.map((task, i) => (
                      <li key={i} className={`text-xs flex gap-1.5 ${t.textMuted}`}>
                        <span className="text-amber-500 mt-0.5">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
