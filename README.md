# Profiles App

Vite + React + React-Bootstrap setup.

- Dev server: `npm run dev` (port 5173)
- UI: Shows a Bootstrap Alert with “Hello React”.

# Live

- Live: https://smp1993.github.io/profiles-app/
![Deploy](https://github.com/smp1993/profiles-app/actions/workflows/deploy.yml/badge.svg)

Build & Deploy
	•	Build: npm run build (outputs to dist/)
	•	Deploy: GitHub Actions → GitHub Pages (Source = GitHub Actions)
	•	Vite base (important for Pages): set in vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins:[react()], base:'/profiles-app/' })

Features
	•	Part 1: Vite + React + React-Bootstrap, “Hello React” alert.
	•	Part 2: CI/CD with GitHub Actions → auto deploy to Pages.
	•	Part 3: Components + props + .map() → cards for profiles.
	•	Part 4: Stateful likes with useState (no refresh).
	•	Part 5: Controlled form + validation (required, unique name).
	•	Part 6 (optional): Inline Edit/Delete on cards + simple table (filter & sort by name/likes).

Tech

Vite 7 · React 19 · React-Bootstrap/Bootstrap 5 · GitHub Actions/Pages

Key Commits
	•	Part 1 (Hello React): https://github.com/smp1993/profiles-app/commit/5f0c3ae184d9f9eadd9c4c03c58d24ebf2737f54
	•	Part 3 (components + map): https://github.com/smp1993/profiles-app/commit/b731e9a4559c361894d896df793cad39bb81bc7d
	•	Part 4 (stateful likes): https://github.com/smp1993/profiles-app/commit/6d363e1326de57dddc5a90855316e15d0833d822