import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthShell from "../components/AuthShell.jsx";
import FieldError from "../components/FieldError.jsx";
import { loadUsers, saveUsers } from "../utils/storage.js";
import { validateEmail } from "../utils/validation.js";

export default function LoginPage({ t, dark, setDark, onSwitch, onLogin, showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = "Email is required.";
    else if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setTimeout(() => {
      const users = loadUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        setLoading(false);
        showToast("No account found with that email. Try registering.", "error");
        return;
      }
      if (found.password !== password) {
        setLoading(false);
        showToast("Incorrect password. Please try again.", "error");
        return;
      }
      setLoading(false);
      onLogin(found);
    }, 500);
  }

  function useDemo() {
    const users = loadUsers();
    let demo = users.find((u) => u.email === "demo@interviewace.ai");
    if (!demo) {
      demo = { name: "Demo User", email: "demo@interviewace.ai", phone: "+1 555 0100", password: "demo1234" };
      saveUsers([...users, demo]);
    }
    setEmail(demo.email);
    setPassword(demo.password);
  }

  return (
    <AuthShell
      t={t}
      dark={dark}
      setDark={setDark}
      tagline="Practice realistic AI-led HR interviews, analyze your resume, track your ATS score, and follow a roadmap built around the role you actually want."
    >
      <h2 className={`text-2xl font-bold mb-1 ${t.text}`}>Welcome back</h2>
      <p className={`${t.textMuted} text-sm mb-6`}>Log in to continue your interview prep.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Email</label>
          <div className="relative mt-1">
            <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
            />
          </div>
          <FieldError msg={errors.email} />
        </div>
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Password</label>
          <div className="relative mt-1">
            <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full pl-9 pr-9 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.textFaint}`}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError msg={errors.password} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-sm transition ${t.btnPrimary} disabled:opacity-60`}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
        <button type="button" onClick={useDemo} className={`w-full py-2.5 rounded-lg text-sm transition ${t.btnSecondary}`}>
          Fill demo credentials
        </button>
      </form>
      <p className={`text-sm ${t.textMuted} mt-6 text-center`}>
        Don't have an account?{" "}
        <button onClick={onSwitch} className="text-amber-500 font-semibold hover:underline">
          Create one
        </button>
      </p>
    </AuthShell>
  );
}
