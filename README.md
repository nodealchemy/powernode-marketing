# Powernode Marketing Extension

Marketing campaigns, content calendar, email lists, social media management, and campaign analytics — wired into the [Powernode platform](https://github.com/nodealchemy/powernode-platform) via the extension contract.

This repository is mounted into the platform as a submodule at `extensions/marketing/`. It can be developed independently — the platform consumes it via the standard extension contract.

---

## What this extension provides

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
