import React, { useState } from "react";
import { User, Sun, Moon, LogOut } from "lucide-react";
import FieldError from "../components/FieldError.jsx";
import { validatePhone } from "../utils/validation.js";

export default function SettingsPage({ t, dark, setDark, user, setUser, onLogout, showToast }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [errors, setErrors] = useState({});

  function saveProfile() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!validatePhone(phone)) errs.phone = "Enter a valid phone number.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setUser({ ...user, name: name.trim(), phone: phone.trim() });
    showToast("Profile updated successfully.");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div className={`rounded-2xl p-6 ${t.card}`}>
        <h3 className={`font-semibold mb-4 flex items-center gap-2 ${t.text}`}>
          <User size={18} className="text-amber-500" />
          Profile
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={`text-sm font-medium ${t.text}`}>Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={`w-full mt-1 px-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`} />
            <FieldError msg={errors.name} />
          </div>
          <div>
            <label className={`text-sm font-medium ${t.text}`}>Email</label>
            <input value={user.email} disabled className={`w-full mt-1 px-3 py-2.5 rounded-lg text-sm outline-none opacity-60 ${t.inputBg}`} />
          </div>
          <div>
            <label className={`text-sm font-medium ${t.text}`}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full mt-1 px-3 py-2.5 rounded-lg text-sm outline-none ${t.inputBg}`} />
            <FieldError msg={errors.phone} />
          </div>
        </div>
        <button onClick={saveProfile} className={`mt-4 px-5 py-2.5 rounded-lg text-sm ${t.btnPrimary}`}>
          Save changes
        </button>
      </div>

      <div className={`rounded-2xl p-6 ${t.card}`}>
        <h3 className={`font-semibold mb-4 flex items-center gap-2 ${t.text}`}>
          <Sun size={18} className="text-amber-500" />
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${t.text}`}>Theme</p>
            <p className={`text-xs ${t.textMuted}`}>Switch between light and dark mode.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setDark(false)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm ${!dark ? t.btnPrimary : t.btnSecondary}`}>
              <Sun size={14} />
              Light
            </button>
            <button onClick={() => setDark(true)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm ${dark ? t.btnPrimary : t.btnSecondary}`}>
              <Moon size={14} />
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 ${t.card}`}>
        <h3 className={`font-semibold mb-1 ${t.text}`}>Session</h3>
        <p className={`text-xs mb-4 ${t.textMuted}`}>Log out of InterviewAce AI on this device.</p>
        <button onClick={onLogout} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm ${t.dangerBg} font-semibold`}>
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </div>
  );
}
