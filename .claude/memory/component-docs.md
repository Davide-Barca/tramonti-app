---
name: component-docs
description: Every component has an AI-agent doc in .claude/components/ (purpose, when to use, how); create/update it with every component change
metadata:
  type: feedback
---

User asked (2026-10-06) for a `.claude/components/` folder with one Markdown doc per component, telling AI agents what the component is for, when to use it and how to use it. Every new component or change to an existing one must create/update its doc in the same change.

- Layout mirrors the source: `site/ui/`, `site/sections/`, `site/layout/`, `shared/`, `admin/`, `routes/<route>/` (route-local `_components/`).
- Index + template in `.claude/components/README.md` (sections: Purpose, When to use, When not to use, Usage, Props, Rules and notes, Related).
- `.claude/design/components.md` / `sections.md` keep only the visual summary + recipes and link to these docs (no duplicated APIs).

**Why:** Agents must reuse components correctly without re-reading source each time.
**How to apply:** Rule lives in AGENTS.md ("Before you start", "Code organization", "Docs & memory sync"). Add/update the doc and the index row in the same change as the component. See [[docs-sync]], [[styling]].
