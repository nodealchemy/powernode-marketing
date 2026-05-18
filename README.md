# Powernode Marketing Extension

Two distinct surfaces in one extension:

1. **Public-facing marketing site** — served from `frontend/src/features/marketing/public/`. The homepage, features, pricing, blog, and docs landing pages that visitors see at `powernode.org` (and that the [`docs/marketing/AUDIT_2026-05-17.md`](./docs/marketing/AUDIT_2026-05-17.md) audit covers).
2. **Marketing automation operator app** — campaign management, content calendar, email lists, social scheduling, analytics. Lives in `frontend/src/features/marketing/pages/` + `frontend/src/features/marketing/components/`. Used by marketing operators inside the platform.

Wired into the [Powernode platform](https://github.com/nodealchemy/powernode-platform) via the extension contract. This repository is mounted into the platform as a submodule at `extensions/marketing/`.

---

## What this extension provides

### Public-facing site

- **HomePage** — hero, value pillars, "Spawn a platform" federation section, self-host vs Cloud, waitlist
- **FeaturesPage** — 14 feature cards, three-tier architecture pillars, comparison vs observability platforms
- **PricingPage** — Free / Pro / Team / Enterprise tiers + FAQ
- **BlogIndexPage + BlogPostPage** — reads from `::Page` model where `meta_keywords` includes `"blog"`
- **DocsLandingPage** — curated entry points into the open-source documentation

### Marketing automation operator app

- **Campaign management** — plan, schedule, and track marketing campaigns across channels
- **Content calendar** — coordinate publication timelines for blog posts, emails, social posts
- **Email lists** — segment + manage subscriber lists with consent + preferences
- **Social media integration** — schedule posts, capture engagement metrics
- **Campaign analytics** — performance dashboards, attribution tracking, ROI metrics

---

## Requirements

A running Powernode platform installation. See the [parent platform repo](https://github.com/nodealchemy/powernode-platform) for installation instructions.

---

## Layout

```
extensions/marketing/
├── server/                 # Rails models, services, controllers, specs
├── frontend/               # React TypeScript surface
└── worker/                 # Sidekiq job classes
```

---

## License

MIT — see [LICENSE](./LICENSE). Code of Conduct: see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## Community

**Text channels**

- **GitHub issues** — [nodealchemy/powernode-marketing/issues](https://github.com/nodealchemy/powernode-marketing/issues) for bugs + feature requests
- **X / Twitter** — [@nodealchemy](https://x.com/nodealchemy) for general updates and informal questions

**Email**

- [contact@nodealchemy.com](mailto:contact@nodealchemy.com) — general inquiries
- [support@nodealchemy.com](mailto:support@nodealchemy.com) — technical support
- [sales@nodealchemy.com](mailto:sales@nodealchemy.com) — commercial + enterprise-tier inquiries
- [security@nodealchemy.com](mailto:security@nodealchemy.com) — security vulnerabilities; see [SECURITY.md](./SECURITY.md)
- [conduct@nodealchemy.com](mailto:conduct@nodealchemy.com) — Code of Conduct reports; see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

---

## Related

- [Powernode platform](https://github.com/nodealchemy/powernode-platform) — the parent platform that mounts this extension
- [Powernode system extension](https://github.com/nodealchemy/powernode-system) — node lifecycle + module composition + on-node agent
