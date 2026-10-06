# tramonti-app

Project memory lives in `.claude/memory/` (one fact per file, index in `MEMORY.md`).
Save new project memories/decisions there — not in the global `~/.claude/projects/.../memory/` folder — and add a pointer line to `.claude/memory/MEMORY.md`.
`.claude/memory/` is committed to git on purpose: memory is shared across all clients/machines. Never gitignore it. Only `.claude/settings.local.json` stays local (gitignored).

Design system docs live in `.claude/design/`: read them before building or styling public-site components, sections or pages, and update them in the same change.
Component docs live in `.claude/components/` (one file per component, index in its `README.md`): read a component's doc before using or changing it; create/update it with every component change.

@design/README.md
@components/README.md
@memory/MEMORY.md
@memory/tramonti-rebuild-stack.md
@memory/seo-rules-frontend.md
@memory/tooling-testing.md
@memory/code-structure.md
@memory/public-routes.md
@memory/styling.md
@memory/home-page.md
@memory/project-status.md
@memory/docs-sync.md
@memory/component-docs.md
@memory/no-commit-proposals.md
@memory/caveman-replies.md
