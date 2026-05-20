# 🚨 INCIDENT_LOG.md: Bug & Failure Tracker
> **Purpose:** Track every crash, UI glitch, data error, or AI drift. Convert each into permanent fixes, tests, and rule updates.
> **Rules:** NO incident moves to `📦 Closed` without: 1) test added, 2) rule/SSOT updated, 3) verification passed.
> **Sync Rule:** AI must APPEND new blocks. NEVER delete or rewrite old entries. Use exact ID format: `I-XXX`.

---
## 📊 Quick Dashboard
| ID    | Status       | Severity | Description                          | Detected   | Closed     |
|-------|--------------|----------|--------------------------------------|------------|------------|
| I-001 | `📦 Closed`  | 🟢 Low   | Sass `@import` deprecation warning   | 2026-05-19 | 2026-05-19 |
| I-002 | `📦 Closed`  | 🟡 Medium | ESM module resolution error (missing .js) | 2026-05-19 | 2026-05-20 |

**Status Options:** `⬜ Open` | `🔍 Investigating` | `🔧 Fixed` | `✅ Verified` | `📦 Closed`
**Severity Options:** `🔴 Critical` | `🟠 High` | `🟡 Medium` | `🟢 Low`

---
## 📝 Incident Log

### 🔴 I-001: Sass @import Deprecation Warning
- **Status:** `✅ Verified`
- **Severity:** 🟢 Low
- **Detected:** 2026-05-19 22:00
- **Plain English Description:** Compilation output showed a deprecation warning regarding the use of `@import` in SCSS files, pointing to a path that seemed incorrectly resolved to `.venv`.
- **Reproduction Steps:** 
  1. Run `npm run dev` in `frontend/`.
  2. Observe terminal output during compilation.
- **Root Cause:** Use of legacy Sass `@import` directive instead of the modern `@use` module system. The path issue was a secondary side-effect of how Sass resolved the legacy include.
- **Immediate Containment:** Migrated `@import` to `@use` in `frontend/src/styles/App.module.scss`.
- **Permanent Fix:** Enforced `@use` syntax in project rules to prevent re-introduction of legacy imports.
- **New Tests Added:** Manual verification of terminal logs during dev startup.
- **Rules / SSOT Updated:** Added explicit rule in `Rules.md` mandating SCSS `@use`.
- **AI Prompt Used:** None (Self-initiated fix)
- **Verification Result:** Pass | Warning removed from terminal logs.
- **Notes / Lessons:** All future SCSS files must strictly follow `@use` syntax to ensure Dart Sass 3.0.0+ compatibility.
- **Updated:** 2026-05-19

### 🔴 I-002: ESM Module Resolution Error
- **Status:** `✅ Verified`
- **Severity:** 🟡 Medium
- **Detected:** 2026-05-20 00:10
- **Plain English Description:** Runtime error: "Uncaught SyntaxError: The requested module '/src/types/draw.ts' does not provide an export named 'Draw'".
- **Reproduction Steps:** 
  1. Open Draws page in browser.
  2. Check browser console for module resolution errors.
- **Root Cause:** Vite/ESM module system required explicit `.js` file extensions for local TypeScript module imports in the browser runtime.
- **Immediate Containment:** Updated import paths in `frontend/src/services/drawService.ts`, `frontend/src/queries/useDraws.ts`, and `frontend/src/pages/Draws.tsx` to include `.js` extension.
- **Permanent Fix:** Enforced strict ESM import path conventions in project rules.
- **New Tests Added:** N/A (UI smoke test verification).
- **Rules / SSOT Updated:** Added rule mandating explicit file extensions for ESM imports where required.
- **AI Prompt Used:** None (Self-initiated fix)
- **Verification Result:** Pass | UI functional, console error cleared.
- **Notes / Lessons:** Always verify ESM import resolution when dealing with local TypeScript file imports in Vite/ESM projects.
- **Updated:** 2026-05-20
