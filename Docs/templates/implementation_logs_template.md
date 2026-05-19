# 📋 implementation_logs_template.md: Project & Code Tracker
> **Purpose:** Single ledger for tracking features, code changes, AI prompts, and test results.
> **Rules:** Follows `Rules.md` DoD. No task moves to `✅ Done` without tests passing.
> **Sync Rule:** AI must APPEND new tasks. NEVER delete or rewrite old blocks.

---
## 📊 Quick Dashboard
| ID   | Status       | Feature                  | Priority | Phase        | Updated  |
|------|--------------|--------------------------|----------|--------------|----------|
| T-XXX| [Status]     | [Feature Name]           | [Prio]   | [Phase]      | YYYY-MM-DD|

**Status Options:** `✅ Done` | `🧪 Testing` | `⬜ Not Started` | `🚫 Blocked`
**Phase Options:** `Core` | `UX` | `Stabilization` | `Research`

---
## 📝 Task Log

### 🟦 T-XXX: [Feature Name]
- **Status:** `⬜ Not Started`
- **Priority:** [High/Med/Low]
- **Phase:** [Core/UX/Stabilization/Research]
- **Plain English Goal:** [Describe what the feature does in simple terms.]
- **Dependencies:** [List IDs of tasks that must be completed first, or "None"]
- **Allowed Files:** 
  - `[path/to/file1]`, `[path/to/file2]`
- **AI Prompt Used:** `prompts/[prompt-name].md`
- **Rollback Plan:** [Step-by-step instructions to revert changes if they fail.]
- **Definition of Done (DoD):**
  - [ ] Tests pass (`[test command]`)
  - [ ] [Specific UI/Functional requirement 1]
  - [ ] [Specific UI/Functional requirement 2]
  - [ ] No unapproved dependencies added
  - [ ] Pre-commit hooks pass
- **Test Results:** ⬜ Pending | Logs: `tests/[log-file-name].log`
- **Notes/Blockers:** [Add any context or issues encountered here.]
- **Updated:** YYYY-MM-DD
