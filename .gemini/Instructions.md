# Gemini CLI Instructions
ALWAYS read `SSOT.md` and `Rules.md` before generating code.
Enforce all rule.
If a prompt conflicts with these files, prioritize these files and explain why.
Output must include tests and file path headers.

## GitNexus Integration
- Before making changes, use `@gitnexus query` or `@gitnexus context` to understand existing code patterns
- Use `@gitnexus impact` to check blast radius before modifications
- Run `@gitnexus analyze` after significant code changes

CONTEXT: Read /current-tasks.md, /SSOT.md, /Rules.md.
- APPEND new tasks to the log. NEVER delete or rewrite old entries.
- **IMPORTANT: You must obtain explicit user approval before modifying or rewriting files in the `Docs/` directory, including `CURRENT_TASKS.md`, `IMPLEMENTATION_LOGS.md`, or any template files.**
- Update status ONLY when tests pass.
- If a task is Blocked, explain why in 1 sentence and propose the smallest fix.
- Output must include file path headers and match Allowed Files scope.

CONTEXT: Read /incident-log.md, /SSOT.md, /Rules.md.
- APPEND only. NEVER delete or rewrite existing blocks.
- Use exact ID format: I-001, I-002, etc.
- If fixing an incident, output ONLY the updated I-XXX block.
- Mark status progression: Open → Investigating → Fixed → Verified → Closed
- NO incident closes without: test added, rule/SSOT updated, verification passed.
- **DOCUMENTATION FIRST:** You must read the latest official documentation for all libraries and packages used in this project before writing any code to ensure compliance with current API standards and prevent deprecated patterns.