import React from "react";
import { ArrowLeft, Award, TrendingUp, MessageSquareText, CheckCircle2, AlertCircle, Sparkles, RotateCcw } from "lucide-react";
import ScoreCard from "../components/ScoreCard.jsx";

export default function InterviewReportPage({ t, report, setView }) {
  if (!report) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className={t.textMuted}>No interview report yet.</p>
        <button onClick={() => setView("interview")} className={`mt-4 px-5 py-2.5 rounded-lg text-sm ${t.btnPrimary}`}>
          Start an interview
        </button>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <button onClick={() => setView("interview")} className={`p-2 rounded-lg ${t.btnSecondary}`}>
          <ArrowLeft size={16} />
        </button>
        <h2 className={`text-xl font-bold ${t.text}`}>Interview Report</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <ScoreCard t={t} label="Overall Score" value={report.score} icon={Award} />
        <ScoreCard t={t} label="Confidence" value={report.confidence} icon={TrendingUp} />
        <ScoreCard t={t} label="Communication" value={report.communication} icon={MessageSquareText} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className={`rounded-2xl p-5 ${t.card}`}>
          <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
            <CheckCircle2 size={17} className="text-emerald-500" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {report.strengths.map((s, i) => (
              <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
                <span className="text-emerald-500 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-2xl p-5 ${t.card}`}>
          <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
            <AlertCircle size={17} className="text-amber-500" />
            Areas to Improve
          </h3>
          <ul className="space-y-2">
            {report.weaknesses.map((s, i) => (
              <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
                <span className="text-amber-500 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`rounded-2xl p-5 mb-4 ${t.card}`}>
        <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
          <Sparkles size={17} className="text-amber-500" />
          Suggestions to Improve
        </h3>
        <ul className="space-y-2">
          {report.suggestions.map((s, i) => (
            <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
              <span className="text-amber-500 mt-0.5">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-2xl p-5 mb-6 ${t.card}`}>
        <h3 className={`font-semibold mb-3 ${t.text}`}>Transcript ({report.questionsAnswered} answered)</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {report.answers.map((a, i) => (
            <div key={i} className="text-sm">
              <p className={`font-medium ${t.text}`}>
                Q{i + 1}. {a.question}
              </p>
              <p className={`${t.textMuted} mt-0.5`}>{a.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setView("interview")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm ${t.btnPrimary}`}>
        <RotateCcw size={15} />
        Retake Interview
      </button>
    </div>
  );
}
