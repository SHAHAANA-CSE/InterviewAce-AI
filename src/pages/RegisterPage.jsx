import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import AuthShell from "../components/AuthShell.jsx";
import FieldError from "../components/FieldError.jsx";
import { loadUsers, saveUsers } from "../utils/storage.js";
import { validateEmail, validatePhone } from "../utils/validation.js";

export default function RegisterPage({ t, dark, setDark, onSwitch, onRegister, showToast }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    else if (form.name.trim().length < 2) errs.name = "Name looks too short.";
    if (!form.email) errs.email = "Email is required.";
    else if (!validateEmail(form.email)) errs.email = "Enter a valid email address.";
    if (!form.phone) errs.phone = "Phone number is required.";
    else if (!validatePhone(form.phone)) errs.phone = "Enter a valid phone number.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!form.confirm) errs.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setTimeout(() => {
      const users = loadUsers();
      if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
        setLoading(false);
        setErrors({ email: "An account with this email already exists." });
        showToast("Email already registered. Try logging in.", "error");
        return;
      }
      const newUser = { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), password: form.password };
      saveUsers([...users, newUser]);
      setLoading(false);
      onRegister(newUser);
    }, 600);
  }

  return (
    <AuthShell
      t={t}
      dark={dark}
      setDark={setDark}
      tagline="Create a free account to unlock mock HR interviews, resume analysis, ATS scoring, and a personalized learning roadmap."
    >
      <h2 className={`text-2xl font-bold mb-1 ${t.text}`}>Create your account</h2>
      <p className={`${t.textMuted} text-sm mb-6`}>It takes less than a minute.</p>
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Full name</label>
          <div className="relative mt-1">
            <User size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jane Doe"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
            />
          </div>
          <FieldError msg={errors.name} />
        </div>
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Email</label>
          <div className="relative mt-1">
            <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              type="email"
              placeholder="you@example.com"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
            />
          </div>
          <FieldError msg={errors.email} />
        </div>
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Phone number</label>
          <div className="relative mt-1">
            <Phone size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 555 123 4567"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
            />
          </div>
          <FieldError msg={errors.phone} />
        </div>
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Password</label>
          <div className="relative mt-1">
            <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="At least 6 characters"
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
        <div>
          <label className={`text-sm font-medium ${t.text}`}>Confirm password</label>
          <div className="relative mt-1">
            <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textFaint}`} />
            <input
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="Re-enter password"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`}
            />
          </div>
          <FieldError msg={errors.confirm} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-sm transition ${t.btnPrimary} disabled:opacity-60`}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className={`text-sm ${t.textMuted} mt-6 text-center`}>
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-amber-500 font-semibold hover:underline">
          Log in
        </button>
      </p>
    </AuthShell>
  );
}
