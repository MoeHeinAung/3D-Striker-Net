# 🚨 incident-log-template.md: Bug & Failure Tracker
> **Purpose:** Track every crash, UI glitch, data error, or AI drift. Convert each into permanent fixes, tests, and rule updates.
> **Rules:** NO incident moves to `📦 Closed` without: 1) test added, 2) rule/SSOT updated, 3) verification passed.
> **Sync Rule:** AI must APPEND new blocks. NEVER delete or rewrite old entries. Use exact ID format: `I-XXX`.

---
## 📊 Quick Dashboard
| ID    | Status       | Severity | Description                          | Detected   | Closed     |
|-------|--------------|----------|--------------------------------------|------------|------------|
| I-XXX | [Status]     | [Sev]    | [Short Description]                  | YYYY-MM-DD |            |

**Status Options:** `⬜ Open` | `🔍 Investigating` | `🔧 Fixed` | `✅ Verified` | `📦 Closed`
**Severity Options:** `🔴 Critical` | `🟠 High` | `🟡 Medium` | `🟢 Low`

---
## 📝 Incident Log

### 🔴 I-XXX: [Short, Plain-English Title]
- **Status:** `⬜ Open`
- **Severity:** [🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low]
- **Detected:** `YYYY-MM-DD HH:MM`
- **Plain English Description:** `[What broke? What did you see?]`
- **Reproduction Steps:** 
  1. `[Step 1]`
  2. `[Step 2]`
  3. `[Step 3]`
- **Root Cause:** `[Technical explanation + why it happened. Reference violated Rules/SSOT.]`
- **Immediate Containment:** `[Temporary fix or rollback steps to stop the issue.]`
- **Permanent Fix:** `[Detailed code/config changes implemented.]`
- **New Tests Added:** `[List of files/tests added to prevent regression.]`
- **Rules / SSOT Updated:** `[References to Rules.md or SSOT.md updates.]`
- **AI Prompt Used:** `prompts/[prompt-name].md`
- **Verification Result:** `[Pass/Fail] | [Log evidence or manual check confirmation]`
- **Notes / Lessons:** `[Prevention strategies for the future.]`
- **Updated:** YYYY-MM-DD
