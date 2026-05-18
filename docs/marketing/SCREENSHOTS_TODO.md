# Screenshots TODO — Phase B2 F1

Status (2026-05-17): **3 of 6 captures shipped** to `frontend/public/screenshots/`
and wired into the marketing site via [`scripts/capture-marketing-screenshots.js`](../../../../scripts/capture-marketing-screenshots.js).

| Asset | Status | Where it landed |
|-------|--------|------------------|
| Fleet Dashboard | ✅ shipped | FeaturesPage "See it in action" |
| Template Composer | ✅ shipped | FeaturesPage "See it in action" |
| SDWAN topology | ✅ shipped | FeaturesPage "See it in action" |
| Knowledge Graph | ⛔ **blocked on data hygiene** — dev DB contains private trading-extension contexts ("Trading Session Analyst Experiential Memory"). Re-capture after seeding a clean demo account. |
| AI Agents | ⛔ **blocked on data hygiene** — dev DB contains "Daily P&L Coordinator" (trading-leaking agent name). Re-capture after seeding a clean demo account. |
| Boot Replay viewer | TODO — needs a recorded boot session in the dev DB |
| AI Concierge panel | TODO — panel is rendered on-demand inside other pages; capture script needs to click the open trigger first |
| OG card (1200×630) | TODO — referenced in `frontend/public/index.html`; needs design + commit |

## Re-running the capture script

```sh
node scripts/capture-marketing-screenshots.js
```

Defaults to `http://localhost:3001` (the systemd-managed frontend dev server).
Override with `POWERNODE_BASE_URL=...`. Admin credentials default to the
seeded `admin@powernode.org` user; override with `POWERNODE_ADMIN_EMAIL`
and `POWERNODE_ADMIN_PASSWORD` env vars.

## Private-extension safety

Before adding any operator-UX page to `CAPTURES` in the script, verify the
page does NOT render data from private extensions (trading, business).
The current dev DB has trading-related agent names + memory contexts that
must not appear in marketing assets per
`feedback_no_private_extension_names_in_public_docs`.

If a page mixes useful operator content with private-extension data,
either:
1. Seed a clean demo account first (preferred — gets re-usable demo data
   for all future captures)
2. Crop the screenshot post-capture to exclude private content
3. Skip the page from the public marketing site (current approach for
   Knowledge + AI Agents)

## What we deliberately don't capture for marketing

## Already-shipped captures (rerun with the script)

| Asset | Route | Embedded at |
|-------|-------|-------------|
| Fleet Dashboard | `/app/system/fleet` | FeaturesPage — "See it in action" |
| Template Composer | `/app/system/templates/compose` | FeaturesPage — "See it in action" |
| SDWAN Topology | `/app/system/sdwan` | FeaturesPage — "See it in action" |
| Marketing HomePage (for social shares) | `/` | Not embedded; available at `/screenshots/marketing-homepage.png` for OG/social use |
| Marketing FeaturesPage (for social shares) | `/features` | Not embedded; available at `/screenshots/marketing-features.png` |
| Marketing PricingPage (for social shares) | `/pricing` | Not embedded; available at `/screenshots/marketing-pricing.png` |

## Still-TODO captures

| Asset | Where to capture from | Where to embed | Blocker |
|-------|------------------------|----------------|---------|
| **Knowledge graph visualizer** (~20-node subgraph) | `/app/ai/knowledge` → Knowledge Graph tab | HomePage above-fold or FeaturesPage near "Knowledge graph context" card | Seed a clean demo account (no trading data) |
| **AI Agents overview** | `/app/ai/agents` | FeaturesPage near "Compound learning loop" | Seed a clean demo account |
| **Boot Replay viewer** with a smoke boot timeline | `/app/system/instances/<id>/boot-replay` | FeaturesPage near "Fleet substrate" card | Boot replay needs a recorded smoke session in DB |
| **AI Concierge chat** with the system extension agent answering an operational question | Open Concierge panel from any `/app/system/*` page | HomePage hero or new "Talk to it" section | Capture script needs to click the panel open trigger first |

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
