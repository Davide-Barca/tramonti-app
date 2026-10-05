---
name: no-commit-proposals
description: Never run or propose git commit commands unless the user explicitly asks; at most say a commit is advisable
metadata:
  type: feedback
---

Never run `git commit` or propose commit commands (tool calls, plans with a commit step, ready-to-paste commands) unless the user explicitly asks to commit. If a commit seems advisable, say so in one line and stop there.

**Why:** User rejected an unrequested commit on 2026-10-05: "I commit solo su mia richiesta, non propormi più comandi di commit."
**How to apply:** End a task with the changes left uncommitted. Exiting plan mode or "procedi" does not count as a request to commit. Rule also lives in AGENTS.md "Git". See [[project-status]].
