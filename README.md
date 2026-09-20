# InterviewAce AI

A fully mock, client-side interview prep app: AI HR interview simulator, resume analyzer,
ATS scoring, and a personalized learning roadmap. No backend required — auth and all data
are simulated with `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173).

## Notes

- Authentication is mock only: accounts are stored in the browser's `localStorage` under
  the `iace_users` key. Do not use real passwords.
- All AI responses (interview questions/feedback, resume analysis, ATS scoring, roadmap
  generation) are simulated with deterministic/randomized mock logic in `src/utils/mockData.js`.
  Swap in real API calls there to connect a real backend or LLM provider later.
- Theme preference and session persist across refreshes via `localStorage`.
