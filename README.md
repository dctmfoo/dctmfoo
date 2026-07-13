# Nagarajan Natarajan

Solutions architect building **agentic engineering workflows** — I run OpenAI Codex and Claude Code side-by-side, in parity, on real production codebases, and I've spent 20+ years deploying enterprise software into regulated industries (pharma, financial services, government, oil & gas).

Currently: Senior Principal Architect at OpenText Professional Services, where I embed with enterprise engineering teams on cloud, GenAI, and content-platform programs — increasingly with coding agents as first-class actors in delivery.

## Selected work

| Project | What it is |
|---|---|
| [intelli-expense](https://github.com/dctmfoo/intelli-expense) | On-device receipt scanning for iPhone + Mac (Apple **Foundation Models**) with a review-gated **agent import bridge** for Codex and Claude Code |
| [stepback](https://github.com/dctmfoo/stepback) | Hands-free workout routine builder & player (iPad/iPhone/Mac) with an **agent bridge** — ask your agent for a training week, it lands in the app, review-gated |
| [hanuman-dev](https://github.com/dctmfoo/hanuman-dev) | Multi-model plan→work→review orchestrator with dedicated **Codex** and **Claude Code** adapters |
| [openai-agents](https://github.com/dctmfoo/openai-agents) | Personal AI companion on the **OpenAI Agents SDK** (TypeScript) with deny-by-default tool policy gating |
| [workspace-bootstrap](https://github.com/dctmfoo/workspace-bootstrap) | Agent-governance scaffold: AGENTS.md/CLAUDE.md contracts, lifecycle hooks, session journals — for Codex and Claude Code |
| [doot-companion](https://github.com/dctmfoo/doot-companion) | Sanitized 215K-LoC personal AI companion snapshot with governed Codex/Claude Code contributors and 271 verified tests |
| [session-journal](https://github.com/dctmfoo/session-journal) | Installable continuity discipline with shared Claude Code/Codex hooks, agent-led adoption, secrets guard, and cross-platform tests |
| [simpalarm](https://github.com/dctmfoo/simpalarm) | Shipped macOS menu-bar alarm app, distributed via its own [Homebrew tap](https://github.com/dctmfoo/homebrew-simpalarm) |
| [project-context](https://github.com/dctmfoo/project-context) | Pattern for persistent, context-rich AI agent workspaces |

**Pattern: the agent write bridge.** Intelli-Expense and StepBack both ship the same pattern: a local folder-drop protocol that lets a coding agent (Codex / Claude Code) author in-app data — receipts, workouts, routines, weekly plans — behind explicit human review. The agent reads the app's manifest, extracts fields conversationally, and drops JSON commands into an app-owned inbox; the running app validates, persists, and syncs. Agents never touch the data store, and the protocol has no delete capability. Protocol docs: [intelli-expense/plugin](https://github.com/dctmfoo/intelli-expense/tree/main/plugin) · [stepback/plugin](https://github.com/dctmfoo/stepback/tree/main/plugin).

Two consumer apps on the App Store — [Gaurava](https://apps.apple.com/in/app/gaurava/id6775155354) (watchOS + widgets, localized in Hindi/Tamil/Telugu) and [withful: family moments](https://apps.apple.com/in/app/withful-family-moments/id6782300577) (available in 175 countries) — built end-to-end with agent workflows, including Codex's Build iOS Apps plugin. Most of my day-job work (enterprise Documentum/cloud deployments, agentic ops tooling, LLM fine-tuning POCs) lives in private repos.

Also active as [dctmfoo123](https://github.com/dctmfoo123).

📫 [LinkedIn](https://www.linkedin.com/in/Nagarajan-natarajan)
