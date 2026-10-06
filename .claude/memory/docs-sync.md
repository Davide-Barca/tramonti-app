---
name: docs-sync
description: Keep AGENTS.md (top priority), README.md and .claude/memory updated whenever files, tooling or conventions change
metadata:
  type: feedback
---

When adding/changing files, folders, tooling, scripts or conventions, update in the same change:

1. `AGENTS.md`: **highest priority**. Canonical rules file read by every AI agent (Claude via root `CLAUDE.md` → `@AGENTS.md`, plus Codex/Cursor/others). Project rules go **below** the `<!-- END:nextjs-agent-rules -->` marker; never edit the managed block (`next dev` rewrites only that block and keeps the rest).
2. `README.md`: human-facing setup/scripts/structure.
3. `.claude/memory/`: decisions + `project-status.md`, index in `MEMORY.md`.
4. `.claude/components/`: one doc per component (purpose, when to use, how), created/updated with every new or changed component; index in its README (user request 2026-10-06).
5. `.claude/design/`: design system docs (tokens, components, sections, patterns, checklist) whenever styling or UI building blocks change.

**Why:** User stressed (2026-10-04) that AI agents read AGENTS.md, so it must get the most attention; memory is shared across machines via git.
**How to apply:** New rule or convention → AGENTS.md first, then README/memory. Memory holds decisions/status/gotchas; AGENTS.md holds the rules. Avoid contradicting them. See [[project-status]].
