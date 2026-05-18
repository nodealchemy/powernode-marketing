# Screenshots TODO — Phase B2 F1

Operator-side task: capture the screenshots referenced in the
[`AUDIT_2026-05-17.md`](./AUDIT_2026-05-17.md) §6 asset gap list, then
wire them into the marketing pages.

Phase B2 left placeholders in the marketing copy (no `<img>` tags yet
since the asset captures need a running platform). This doc lists what
to capture so a maintainer can execute the F1 option from the audit.

## Required captures

| Asset | Where to capture from | Where to embed |
|-------|------------------------|----------------|
| **Fleet Dashboard** with active event feed + correlation chain | `/app/system/fleet` while a smoke or training session is running | FeaturesPage — beside "Fleet management" card |
| **Template Composer** with a multi-module template in flight | `/app/system/templates/compose` after adding 3+ modules | FeaturesPage — beside "MCP-native runtime" or new section |
| **SDWAN UI** showing a peer with VIP failover + route policies | `/app/system/sdwan/networks/<id>` | FeaturesPage — beside "SDWAN + WireGuard mesh" card |
| **Boot Replay viewer** showing a smoke boot timeline | `/app/system/instances/<id>/boot-replay` | FeaturesPage — beside "Compound learning loop" or new "Operator UX" section |
| **AI Concierge chat** with the system extension agent answering an operational question | `/app/ai/concierge` | HomePage hero or new "Talk to it" section |
| **Knowledge graph visualizer** showing a small subgraph (~20 nodes) | `/app/ai/knowledge-graph` (if shipped) or `platform.get_subgraph` output rendered separately | HomePage above-fold or FeaturesPage near "Knowledge graph context" card |

## Capture recommendations

- **Resolution**: 1920×1080 or 1440×900 (16:9 aspect for OG card friendliness)
- **Theme**: light + dark variants (the platform supports both; both look polished)
- **Format**: WebP (smaller) with PNG fallback
- **Location**: commit to `extensions/marketing/frontend/public/screenshots/` so they're served from the marketing site's static assets
- **Naming**: `<feature>-<theme>.{webp,png}` e.g. `fleet-dashboard-dark.webp`

## After capturing

For each screenshot, add an `<img>` tag with appropriate `alt`,
responsive `width`/`height`, and `loading="lazy"`. Pattern:

```tsx
<img
  src="/screenshots/fleet-dashboard-dark.webp"
  alt="Powernode Fleet Dashboard with live event feed and correlation chain"
  className="rounded-2xl border border-theme shadow-lg w-full"
  width={1920}
  height={1080}
  loading="lazy"
/>
```

Then update [`AUDIT_2026-05-17.md`](./AUDIT_2026-05-17.md) §6 asset gap
list to mark these as shipped, and tick the F1 option in the menu.

## OG card

The default `og-card.png` referenced in `frontend/public/index.html` is
not yet committed. Either:

- Design a static OG card at 1200×630 with the Powernode logo + tagline,
  commit to `frontend/public/og-card.png`
- Or generate one programmatically per-page (out of B2 scope)

Until then, social previews will fall back to no image — still functional
but less visually engaging.
