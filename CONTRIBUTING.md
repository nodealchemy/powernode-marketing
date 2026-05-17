# Contributing to the Powernode Marketing Extension

Thanks for your interest in improving this extension. This guide covers the development workflow, including the submodule layout that exists because this extension is consumed by the parent [Powernode platform](https://github.com/nodealchemy/powernode-platform).

## Submodule context

This repo is mounted into `powernode-platform` at `extensions/marketing/`. Most real-world testing requires the parent platform running so the Rails autoloader sees the extension's namespaces (`Marketing::*`, `Api::V1::Marketing::*`).

```
powernode-platform/                  ← parent (separate repo)
├── server/                          ← parent's Rails app
├── frontend/                        ← parent's React app
├── extensions/
│   └── marketing/                   ← THIS repo (submodule)
│       ├── server/                  ← extension's Rails models / services
│       ├── frontend/                ← extension's React components
│       └── worker/                  ← extension's Sidekiq jobs
```

## Setting up locally

```bash
# Clone the parent platform with submodules
git clone --recurse-submodules https://github.com/nodealchemy/powernode-platform.git
cd powernode-platform

# Or if already cloned without submodules:
git submodule update --init --recursive
```

## Running tests

```bash
# Backend rspec (run from the parent's server/ so the autoloader sees both)
cd /path/to/powernode-platform/server
bundle exec rspec ../extensions/marketing/server/spec/

# Frontend type-check
cd ../extensions/marketing/frontend
npx tsc --noEmit
```

## Committing

Always commit inside `extensions/marketing/` first, then update the parent's submodule pointer:

```bash
cd extensions/marketing
git checkout -b my-feature
# ... make changes ...
git add server/...
git commit -m "feat: add foo"
git push origin my-feature

# Then update the parent's submodule pointer:
cd ../..
git add extensions/marketing
git commit -m "chore(submodule): bump extensions/marketing → my-feature"
```

Conventional commit format (per the parent platform):
- `type(scope): description` — types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`
- Lowercase, no period

## Submitting a PR

Open the PR against this repo's `develop` branch. Once merged + tagged, the parent platform's submodule pointer is bumped in a follow-up PR there.

For non-trivial features, also open a tracking issue in the parent platform's repo so the parent team can coordinate testing across extensions.

## Reporting issues

For bugs in the extension itself: open issues here on GitHub. For bugs in the parent platform's integration with this extension: open in [powernode-platform](https://github.com/nodealchemy/powernode-platform).

## License

By contributing, you agree your contributions are licensed under MIT (see [LICENSE](./LICENSE)).
