import React, { useState, useRef, useEffect } from "react";
import { Brain, Play, Square, Send } from "lucide-react";
import { INTERVIEW_QUESTIONS, AI_ACKS, AI_FOLLOWUPS_SHORT, computeInterviewReport } from "../utils/mockData.js";

export default function InterviewPage({ t, dark, onFinish }) {
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  function startInterview() {
    setStarted(true);
    setQIndex(0);
    setAnswers([]);
    setMessages([
      { role: "ai", text: "Hi! I'm your AI interviewer today. This will feel like a real HR conversation — take your time and answer naturally." },
      { role: "ai", text: INTERVIEW_QUESTIONS[0] }
    ]);
  }

  function submitAnswer() {
    if (!input.trim()) return;
    const answerText = input.trim();
    setMessages((m) => [...m, { role: "user", text: answerText }]);
    setAnswers((a) => [...a, { question: INTERVIEW_QUESTIONS[qIndex], answer: answerText }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const ack = AI_ACKS[(qIndex + answerText.length) % AI_ACKS.length];
      let aiMsgs = [{ role: "ai", text: ack }];

      if (answerText.split(" ").length < 8) {
        aiMsgs.push({ role: "ai", text: AI_FOLLOWUPS_SHORT[qIndex % AI_FOLLOWUPS_SHORT.length] });
      }

      const nextIndex = qIndex + 1;
      if (nextIndex < INTERVIEW_QUESTIONS.length) {
        aiMsgs.push({ role: "ai", text: INTERVIEW_QUESTIONS[nextIndex] });
        setQIndex(nextIndex);
      } else {
        aiMsgs.push({ role: "ai", text: "That wraps up all my questions — great job! You can end the interview now to see your full report." });
      }
      setMessages((m) => [...m, ...aiMsgs]);
      setThinking(false);
    }, 700 + Math.random() * 500);
  }

  function endInterview() {
    const report = computeInterviewReport(answers);
    onFinish(report);
  }

  const progress = Math.min(100, Math.round((answers.length / INTERVIEW_QUESTIONS.length) * 100));

  if (!started) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className={`rounded-2xl p-8 text-center ${t.card}`}>
          <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 ${t.accentSoft}`}>
            <Brain size={26} className="text-amber-500" />
          </div>
          <h2 className={`text-xl font-bold ${t.text}`}>AI HR Interview Simulation</h2>
          <p className={`text-sm mt-2 mb-6 ${t.textMuted} max-w-md mx-auto`}>
            You'll be asked {INTERVIEW_QUESTIONS.length} realistic HR & behavioral questions. Answer naturally in the chat —
            the AI will respond, ask follow-ups, and score you at the end.
          </p>
          <button onClick={startInterview} className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm ${t.btnPrimary}`}>
            <Play size={16} />
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto flex flex-col h-[calc(100vh-73px)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 mr-4">
          <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-slate-200"}`}>
            <div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className={`text-xs mt-1 ${t.textMuted}`}>
            Question {Math.min(qIndex + 1, INTERVIEW_QUESTIONS.length)} of {INTERVIEW_QUESTIONS.length}
          </p>
        </div>
        <button
          onClick={endInterview}
          disabled={answers.length === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold ${t.dangerBg} disabled:opacity-40`}
        >
          <Square size={13} />
          End Interview
        </button>
      </div>

      <div ref={scrollRef} className={`flex-1 overflow-y-auto rounded-2xl p-4 space-y-3 ${t.card}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user" ? t.chatUser : t.chatAI
              } ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className={`px-4 py-2.5 rounded-2xl text-sm ${t.chatAI} rounded-bl-sm`}>
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitAnswer();
            }
          }}
          placeholder="Type your answer..."
          rows={2}
          className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none resize-none ${t.inputBg}`}
        />
        <button onClick={submitAnswer} disabled={!input.trim()} className={`p-3.5 rounded-xl ${t.btnPrimary} disabled:opacity-40`}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
