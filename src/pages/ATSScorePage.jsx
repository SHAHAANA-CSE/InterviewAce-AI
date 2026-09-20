import React from "react";
import { Target, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export default function ATSScorePage({ t, atsResult, setView }) {
  if (!atsResult) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <div className={`rounded-2xl p-8 ${t.card}`}>
          <Target size={28} className="mx-auto text-amber-500 mb-3" />
          <h2 className={`text-lg font-bold ${t.text}`}>No resume analyzed yet</h2>
          <p className={`text-sm mt-2 mb-5 ${t.textMuted}`}>Upload a resume first to generate your ATS compatibility score.</p>
          <button onClick={() => setView("resume")} className={`px-5 py-2.5 rounded-lg text-sm ${t.btnPrimary}`}>
            Go to Resume Analyzer
          </button>
        </div>
      </div>
    );
  }

  const scoreColor = atsResult.score >= 75 ? "text-emerald-500" : atsResult.score >= 55 ? "text-amber-500" : "text-rose-500";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className={`rounded-2xl p-6 mb-5 flex flex-col sm:flex-row items-center gap-6 ${t.card}`}>
        <div className="relative w-32 h-32 shrink-0">
          <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
            <path
              className="opacity-10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke="currentColor"
              className={scoreColor}
              strokeWidth="3"
              strokeDasharray={`${atsResult.score}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${t.text}`}>{atsResult.score}</span>
            <span className={`text-xs ${t.textMuted}`}>/ 100</span>
          </div>
        </div>
        <div>
          <h2 className={`text-lg font-bold ${t.text}`}>ATS Compatibility Score</h2>
          <p className={`text-sm mt-1 ${t.textMuted}`}>
            Based on <span className="font-medium">{atsResult.fileName}</span> matched against a sample job description's keywords.
          </p>
          <p className={`text-xs mt-2 ${t.textMuted}`}>
            {atsResult.matched.length} of {atsResult.matched.length + atsResult.missing.length} keywords matched
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className={`rounded-2xl p-5 ${t.card}`}>
          <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
            <CheckCircle2 size={17} className="text-emerald-500" />
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {atsResult.matched.map((k, i) => (
              <span key={i} className={`text-xs px-3 py-1.5 rounded-full ${t.successBg}`}>
                {k}
              </span>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl p-5 ${t.card}`}>
          <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
            <XCircle size={17} className="text-rose-500" />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {atsResult.missing.length ? (
              atsResult.missing.map((k, i) => (
                <span key={i} className={`text-xs px-3 py-1.5 rounded-full ${t.dangerBg}`}>
                  {k}
                </span>
              ))
            ) : (
              <span className={`text-sm ${t.textMuted}`}>None — great coverage!</span>
            )}
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-5 ${t.card}`}>
        <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
          <Sparkles size={17} className="text-amber-500" />
          Suggestions to Improve
        </h3>
        <ul className="space-y-2">
          {atsResult.suggestions.map((s, i) => (
            <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
              <span className="text-amber-500">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
