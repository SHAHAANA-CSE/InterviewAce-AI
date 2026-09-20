import React, { useState, useRef } from "react";
import { Upload, Sparkles, CheckCircle2, AlertCircle, Layers, PenLine, ListChecks, Target, ChevronRight } from "lucide-react";
import { generateResumeAnalysis, generateATSResult } from "../utils/mockData.js";

export default function ResumeAnalyzerPage({ t, onAnalyzed, resumeAnalysis, setView }) {
  const [fileName, setFileName] = useState(resumeAnalysis?.fileName || "");
  const [analyzing, setAnalyzing] = useState(false);
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = [".pdf", ".docx"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!validTypes.includes(ext)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    setFileName(file.name);
  }

  function analyze() {
    if (!fileName) return;
    setAnalyzing(true);
    setTimeout(() => {
      const analysis = generateResumeAnalysis(fileName);
      const ats = generateATSResult(fileName);
      onAnalyzed(analysis, ats);
      setAnalyzing(false);
    }, 1300);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className={`rounded-2xl p-6 mb-6 ${t.card}`}>
        <h2 className={`text-lg font-bold mb-1 ${t.text}`}>Resume Analyzer</h2>
        <p className={`text-sm mb-5 ${t.textMuted}`}>Upload your resume as a PDF or DOCX to get instant AI feedback.</p>

        <div className={`border-2 border-dashed rounded-2xl p-8 text-center ${t.border}`}>
          <Upload size={26} className="mx-auto text-amber-500 mb-3" />
          <p className={`text-sm font-medium ${t.text}`}>{fileName || "Drag & drop or click to upload"}</p>
          <p className={`text-xs mt-1 ${t.textMuted}`}>PDF or DOCX, up to 5MB</p>
          <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFile} />
          <button onClick={() => fileRef.current.click()} className={`mt-4 px-5 py-2 rounded-lg text-sm ${t.btnSecondary}`}>
            Choose File
          </button>
        </div>

        <button
          onClick={analyze}
          disabled={!fileName || analyzing}
          className={`mt-5 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm ${t.btnPrimary} disabled:opacity-50`}
        >
          {analyzing ? (
            "Analyzing resume..."
          ) : (
            <>
              <Sparkles size={15} />
              Analyze Resume
            </>
          )}
        </button>
      </div>

      {resumeAnalysis && !analyzing && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
                <CheckCircle2 size={17} className="text-emerald-500" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {resumeAnalysis.strengths.map((s, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
                    <span className="text-emerald-500">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
                <AlertCircle size={17} className="text-amber-500" />
                Weaknesses
              </h3>
              <ul className="space-y-2">
                {resumeAnalysis.weaknesses.map((s, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
                    <span className="text-amber-500">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`rounded-2xl p-5 ${t.card}`}>
            <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
              <Layers size={17} className="text-amber-500" />
              Missing Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeAnalysis.missingSkills.map((s, i) => (
                <span key={i} className={`text-xs px-3 py-1.5 rounded-full ${t.warnBg}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
                <PenLine size={17} className="text-amber-500" />
                Grammar Suggestions
              </h3>
              <ul className="space-y-2">
                {resumeAnalysis.grammarSuggestions.map((s, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
                    <span className="text-amber-500">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <h3 className={`font-semibold flex items-center gap-2 mb-3 ${t.text}`}>
                <ListChecks size={17} className="text-amber-500" />
                Formatting Suggestions
              </h3>
              <ul className="space-y-2">
                {resumeAnalysis.formattingSuggestions.map((s, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${t.textMuted}`}>
                    <span className="text-amber-500">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={() => setView("ats")} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm ${t.btnPrimary}`}>
            <Target size={15} />
            View ATS Score <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
