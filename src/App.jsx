import React, { useState, useEffect } from "react";
import { THEME } from "./theme.js";
import { loadUsers, saveUsers, loadSession, saveSession, clearSession, THEME_KEY } from "./utils/storage.js";

import Toast from "./components/Toast.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import InterviewReportPage from "./pages/InterviewReportPage.jsx";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage.jsx";
import ATSScorePage from "./pages/ATSScorePage.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

export default function App() {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login"); // login | register
  const [view, setView] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // shared feature state (so pages can hand off data to each other)
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [atsResult, setAtsResult] = useState(null);
  const [lastInterviewReport, setLastInterviewReport] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) setDark(savedTheme === "dark");
    const email = loadSession();
    if (email) {
      const users = loadUsers();
      const found = users.find((u) => u.email === email);
      if (found) setUser(found);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }

  function handleLogout() {
    clearSession();
    setUser(null);
    setAuthView("login");
    setView("dashboard");
    showToast("You've been logged out.", "info");
  }

  const t = dark ? THEME.dark : THEME.light;

  if (!user) {
    return (
      <div className={`min-h-screen w-full ${t.pageBg} font-sans transition-colors`}>
        {toast && <Toast toast={toast} t={t} />}
        {authView === "login" ? (
          <LoginPage
            t={t}
            dark={dark}
            setDark={setDark}
            onSwitch={() => setAuthView("register")}
            onLogin={(u) => {
              setUser(u);
              saveSession(u.email);
              setView("dashboard");
              showToast(`Welcome back, ${u.name.split(" ")[0]}!`);
            }}
            showToast={showToast}
          />
        ) : (
          <RegisterPage
            t={t}
            dark={dark}
            setDark={setDark}
            onSwitch={() => setAuthView("login")}
            onRegister={(u) => {
              setUser(u);
              saveSession(u.email);
              setView("dashboard");
              showToast("Account created — welcome to InterviewAce AI!");
            }}
            showToast={showToast}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${t.pageBg} font-sans transition-colors`}>
      {toast && <Toast toast={toast} t={t} />}
      <div className="flex h-screen overflow-hidden">
        <Sidebar t={t} view={view} setView={setView} user={user} onLogout={handleLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar t={t} dark={dark} setDark={setDark} user={user} setSidebarOpen={setSidebarOpen} view={view} />
          <main className="flex-1 overflow-y-auto">
            {view === "dashboard" && (
              <Dashboard
                t={t}
                user={user}
                setView={setView}
                lastInterviewReport={lastInterviewReport}
                resumeAnalysis={resumeAnalysis}
                atsResult={atsResult}
                roadmap={roadmap}
              />
            )}
            {view === "interview" && (
              <InterviewPage
                t={t}
                dark={dark}
                onFinish={(report) => {
                  setLastInterviewReport(report);
                  setView("interview-report");
                }}
              />
            )}
            {view === "interview-report" && <InterviewReportPage t={t} report={lastInterviewReport} setView={setView} />}
            {view === "resume" && (
              <ResumeAnalyzerPage
                t={t}
                onAnalyzed={(res, ats) => {
                  setResumeAnalysis(res);
                  setAtsResult(ats);
                }}
                resumeAnalysis={resumeAnalysis}
                setView={setView}
              />
            )}
            {view === "ats" && <ATSScorePage t={t} atsResult={atsResult} setView={setView} />}
            {view === "roadmap" && <RoadmapPage t={t} roadmap={roadmap} setRoadmap={setRoadmap} showToast={showToast} />}
            {view === "settings" && (
              <SettingsPage
                t={t}
                dark={dark}
                setDark={setDark}
                user={user}
                setUser={(u) => {
                  setUser(u);
                  const users = loadUsers().map((x) => (x.email === u.email ? u : x));
                  saveUsers(users);
                }}
                onLogout={handleLogout}
                showToast={showToast}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
