# 🚨 INCIDENT_LOG.md: Bug & Failure Tracker
> **Purpose:** Track every crash, UI glitch, data error, or AI drift. Convert each into permanent fixes, tests, and rule updates.
> **Rules:** NO incident moves to `📦 Closed` without: 1) test added, 2) rule/SSOT updated, 3) verification passed.
> **Sync Rule:** AI must APPEND new blocks. NEVER delete or rewrite old entries. Use exact ID format: `I-XXX`.

---
## 📊 Quick Dashboard
| ID    | Status       | Severity | Description                          | Detected   | Closed     |
|-------|--------------|----------|--------------------------------------|------------|------------|
| I-001 | `✅ Verified`  | 🟢 Low   | Sass `@import` deprecation warning   | 2026-05-19 | 2026-05-19 |

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
