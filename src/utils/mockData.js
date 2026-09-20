/* Mock data pools + mock "AI" logic. Replace the functions in this file with
   real API calls to swap in a genuine backend / LLM provider later. */

export const INTERVIEW_QUESTIONS = [
  "Tell me a little about yourself and your professional background.",
  "Why are you interested in this role, and what draws you to our company?",
  "Can you describe a challenging project you worked on and how you handled it?",
  "Tell me about a time you disagreed with a teammate or manager. How did you resolve it?",
  "What would you say is your greatest strength, and how does it help you at work?",
  "What's an area you're actively trying to improve?",
  "Where do you see yourself professionally in the next three years?",
  "Do you have any questions for us before we wrap up?"
];

export const AI_ACKS = [
  "Thanks for sharing that — I can see you've put real thought into it.",
  "That's a solid answer. I like how you framed the outcome.",
  "Good context — that helps me understand your approach.",
  "Appreciate the detail there, that's useful to know.",
  "Interesting — that shows good self-awareness.",
  "Got it, thanks. That gives me a clearer picture of your experience."
];

export const AI_FOLLOWUPS_SHORT = [
  "Could you expand on that a little more, maybe with a specific example?",
  "Can you walk me through a concrete situation where that applied?"
];

export const STRENGTHS_POOL = [
  "Clear and structured communication", "Strong ownership of outcomes",
  "Good use of concrete examples", "Calm under pressure",
  "Demonstrates collaborative mindset", "Shows growth-oriented thinking",
  "Confident articulation of achievements", "Good balance of technical and soft skills"
];

export const WEAKNESSES_POOL = [
  "Answers could be more concise", "Could quantify achievements more (numbers, %)",
  "Occasionally trails off before reaching a conclusion", "Could show more curiosity about the role",
  "Body-language/tone cues suggest some nervousness", "Could tie answers back to the job description more directly"
];

export const SUGGESTIONS_POOL = [
  "Use the STAR method (Situation, Task, Action, Result) to structure behavioral answers.",
  "Practice trimming answers to under 90 seconds to stay focused.",
  "Prepare 2–3 quantified achievements you can drop into any answer.",
  "Research the company's recent news so you can tailor your 'why us' answer.",
  "Record yourself answering out loud to catch filler words like 'um' and 'like'.",
  "Prepare two thoughtful questions to ask the interviewer at the end."
];

export const RESUME_STRENGTHS = [
  "Clear reverse-chronological structure that's easy to scan",
  "Strong action verbs used throughout (led, built, optimized)",
  "Consistent formatting and section hierarchy",
  "Relevant technical skills are visible early on the page",
  "Quantified impact in several bullet points"
];

export const RESUME_WEAKNESSES = [
  "Summary section is generic and could be tailored per role",
  "Some bullet points describe duties instead of outcomes",
  "Resume is slightly dense — could use more white space",
  "Skills section mixes tools and soft skills together",
  "No links to portfolio, GitHub, or LinkedIn"
];

export const MISSING_SKILLS_POOL = [
  "SQL", "Cloud (AWS/GCP/Azure)", "Agile/Scrum", "Data Visualization",
  "CI/CD", "Stakeholder Management", "A/B Testing", "REST APIs"
];

export const GRAMMAR_SUGGESTIONS = [
  "Keep verb tense consistent — past roles should stay in past tense throughout.",
  "Avoid starting multiple bullets in a row with the same verb.",
  "Remove first-person pronouns ('I', 'my') — resumes read better without them.",
  "Watch for double spacing after periods and inconsistent bullet punctuation."
];

export const FORMATTING_SUGGESTIONS = [
  "Keep margins between 0.5–1 inch for better ATS parsing.",
  "Use a single-column layout — multi-column resumes often break ATS parsers.",
  "Stick to one font family and 2 font sizes maximum for consistency.",
  "Save and submit as a .docx or text-based PDF, not a scanned image."
];

export const JD_KEYWORDS = [
  "Communication", "Leadership", "Problem Solving", "SQL", "Python", "Project Management",
  "Data Analysis", "Stakeholder Management", "Agile", "Cloud Computing", "Team Collaboration",
  "Presentation Skills"
];

export const COMPANY_ROADMAPS = {
  google: { focus: "Data structures & algorithms depth, Googleyness & Leadership, system design at scale" },
  amazon: { focus: "Leadership Principles behavioral depth, bar-raiser style STAR answers, scalable systems" },
  microsoft: { focus: "Growth mindset framing, collaborative problem solving, coding fundamentals" },
  meta: { focus: "Execution speed, impact-driven behavioral stories, product sense" },
  default: { focus: "Core fundamentals, structured behavioral storytelling, and role-specific technical depth" }
};

export function randPick(arr, n) {
  const copy = [...arr];
  const out = [];
  n = Math.min(n, copy.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

export function seededRange(seed, min, max) {
  const x = Math.sin(seed * 999) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(frac * (max - min + 1)) + min;
}

export function computeInterviewReport(answers) {
  const totalWords = answers.reduce((sum, a) => sum + a.answer.split(" ").length, 0);
  const avgWords = answers.length ? totalWords / answers.length : 0;
  let base = 60;
  base += Math.min(20, avgWords * 0.6);
  base += Math.min(10, answers.length * 1.2);
  const score = Math.max(45, Math.min(97, Math.round(base + seededRange(totalWords, -5, 5))));

  const confidence = Math.max(50, Math.min(98, Math.round(score + seededRange(totalWords + 1, -8, 6))));
  const communication = Math.max(50, Math.min(98, Math.round(score + seededRange(totalWords + 2, -6, 8))));

  return {
    score,
    confidence,
    communication,
    questionsAnswered: answers.length,
    strengths: randPick(STRENGTHS_POOL, 3),
    weaknesses: randPick(WEAKNESSES_POOL, 3),
    suggestions: randPick(SUGGESTIONS_POOL, 4),
    answers
  };
}

export function generateResumeAnalysis(fileName) {
  return {
    fileName,
    strengths: randPick(RESUME_STRENGTHS, 3),
    weaknesses: randPick(RESUME_WEAKNESSES, 3),
    missingSkills: randPick(MISSING_SKILLS_POOL, 4),
    grammarSuggestions: randPick(GRAMMAR_SUGGESTIONS, 3),
    formattingSuggestions: randPick(FORMATTING_SUGGESTIONS, 3)
  };
}

export function generateATSResult(fileName) {
  const matched = JD_KEYWORDS.filter(() => Math.random() > 0.4);
  const missing = JD_KEYWORDS.filter((k) => !matched.includes(k));
  const score = Math.max(48, Math.min(94, Math.round((matched.length / JD_KEYWORDS.length) * 100)));
  return {
    fileName,
    score,
    matched,
    missing,
    suggestions: [
      "Mirror exact keyword phrasing from the job description where truthful.",
      "Add a dedicated 'Skills' section listing tools and technologies.",
      "Quantify results with metrics to strengthen keyword context.",
      "Avoid tables/graphics that ATS parsers may skip over."
    ]
  };
}

export function generateRoadmap({ company, level, time }) {
  const key = Object.keys(COMPANY_ROADMAPS).find((k) => company.toLowerCase().includes(k)) || "default";
  const profile = COMPANY_ROADMAPS[key];
  const weekCount = time.startsWith("<5") ? 8 : time.startsWith("5-10") ? 6 : 4;

  const topicPool = [
    "Resume & LinkedIn optimization", "Core fundamentals refresher", "Behavioral storytelling (STAR method)",
    "Company research & culture deep-dive", "Mock HR interview practice", "Technical/domain deep-dive",
    "System design or case-study practice", "Salary negotiation prep", "Mock final-round simulation",
    "Rest, review & confidence building"
  ];
  const levelAdjust =
    level === "Beginner"
      ? "Start slow and build foundations before adding mock interviews."
      : level === "Advanced"
      ? "Focus heavily on mock interviews and edge-case scenarios."
      : "Balance fundamentals with regular mock practice.";

  const weeks = Array.from({ length: weekCount }).map((_, i) => ({
    week: i + 1,
    title: topicPool[i % topicPool.length],
    tasks: randPick(
      [
        "Complete 1 mock HR interview and review the report",
        `Read 2 articles about ${company}'s recent news`,
        "Practice 5 behavioral questions using STAR",
        "Refine resume bullet points with metrics",
        "Do a timed practice session (45 min)",
        "Review ATS score and fix missing keywords",
        "Watch 1 interview-prep video and take notes",
        "Do a peer or self-recorded mock interview"
      ],
      3
    )
  }));

  return { company, level, time, focus: profile.focus, weeks, adjust: levelAdjust };
}
