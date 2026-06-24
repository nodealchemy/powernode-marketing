# Demo Video Script — 90 seconds

Production-ready script + storyboard for the Powernode launch demo video.
Optimized for embed on HomePage above-fold and social distribution (16:9,
captioned for autoplay-muted-by-default behavior).

**Target length:** 90 seconds (sweet spot for landing-page autoplay)
**Format:** 1920×1080 @ 30 fps, MP4 (H.264 + AAC), <15 MB
**Voiceover:** professional VO (script timed to ~140 wpm)
**Captions:** burnt-in subtitles + separate VTT for accessibility

## Storyboard

| Time | Visual | Voiceover | On-screen caption |
|------|--------|-----------|-------------------|
| 0:00–0:05 | Title card: "Powernode" logo + tagline fade in over dark gradient bg. Subtle particle effect suggesting "control plane". | "Your AI agents need more than a trace log." | — |
| 0:05–0:12 | Quick montage: LangSmith trace UI / Langfuse dashboard / Phoenix screenshot — each fading + dimming. | "Observability platforms show you what they did." | (3 logos fade in/out: LangSmith · Langfuse · Phoenix) |
| 0:12–0:18 | Sharp cut to Powernode kill-switch UI with a "halt all agents" button pulsing. | "Powernode decides what they're allowed to do next." | "Mission control for AI agent fleets" |
| 0:18–0:30 | Fleet Dashboard live event feed scrolling — events streaming in with severity badges, correlation chains expanding inline. Camera slowly zooms on a "honeypot.access_attempted" event escalating to operator approval. | "Every consequential action gates through an approval workflow you configure. Trust-scored agents. Kill switch. Correlation chains. Compound learning that gets better every cycle." | (caption flashes "525 MCP tools · 60 classes" then "91k+ KG nodes") |
| 0:30–0:45 | Knowledge Graph visualizer — 30-node subgraph laying out around a central "Account" node, edges animating in. Then semantic search box autocompletes "permission policy" → results pop up. | "A knowledge graph holds the structured context your agents need. Ninety-one thousand nodes, eighty-one thousand edges. Agents stop hallucinating — they look it up." | "Knowledge graph: 91k+ nodes" |
| 0:45–0:55 | Template Composer screen — operator drags `system-base` + `security-hardening` + `k3s-server` modules into a template. Footprint estimate updates in real-time. "Save Template" button glows. | "Compose templates visually. Conflict detection. Footprint estimates. One click to apply across a fleet." | "Template Composer" |
| 0:55–1:10 | Cut to a terminal showing `platform.system_sdwan_propose_federation_peer({...})` with the response. Then cut to a topology diagram with one peer becoming three peers across regions (Tokyo / London / New York). | "And the part nobody else does: spawn a fully-federated child platform in one click. Sovereign auth. Data residency enforcement. Multi-hop migration chains. Multi-region SaaS without the platform tax." | "Federation, built in" |
| 1:10–1:22 | Fleet substrate visual: stylized rack-of-servers + cloud-VM icons + container icons all wired to a central Powernode node. mTLS lock icons pulse. | "All on a fleet substrate that goes all the way down. Bare-metal, VM, container. Multi-arch initramfs. Cosign-signed supply chain. SDWAN overlay with iBGP routing." | "Fleet substrate underneath" |
| 1:22–1:30 | End card: Powernode logo, "Open source on GitHub" with star icon, URL `github.com/nodealchemy/powernode-platform`, and `powernode.org` CTA. Smooth fade out. | "Open source on day one. MIT-licensed. Self-host the OSS or use our managed Cloud. Visit powernode.org to get started." | "github.com/nodealchemy/powernode-platform" + "powernode.org" |

## Production notes

### Screen captures needed

These get captured live for inclusion (cross-reference [`SCREENSHOTS_TODO.md`](./SCREENSHOTS_TODO.md)):

- Fleet Dashboard with scrolling event feed (need recorded video clip, not just still)
- Knowledge Graph visualizer animation (need recorded clip showing pan/zoom + search)
- Template Composer drag-and-drop interaction (need recorded clip)
- Terminal recording of `platform.system_sdwan_propose_federation_peer` (use asciinema or terminalizer for a clean replay)

### Motion graphics

- Title card + end card: simple particle / gradient bg (use After Effects or Motion if available; CSS+canvas if budget-constrained)
- Federation topology animation: 2D animated map (Mapbox + animation overlay, OR pre-rendered SVG keyframes)
- Fleet substrate visual: vector icons (use Lucide stack since the marketing site already uses Lucide)

### Voiceover

- Recommend a calm, technical-confident voice — think "developer relations" not "ad voice"
- Pace: ~140 wpm (script timed to ~125 wpm to leave breathing room)
- Avoid hype-words ("revolutionary", "game-changing"); prefer specific numbers

### Soundtrack

- Minimal — low-key synth pad or ambient texture, ducked under VO
- 2026-era recommendations: Epidemic Sound or Artlist if licensed; otherwise commission a 90s loop

### Captions

- Burnt-in: 36px sans-serif, white with dark stroke, bottom-third positioning
- Style match: same font as marketing site (system-ui or whatever PublicPageContainer renders)
- Separate `.vtt` file for screen readers + YouTube auto-captions

## Variants to produce

| Variant | Duration | Where it lives |
|---------|----------|----------------|
| **Main 90s** | 1:30 | HomePage above-fold, YouTube, X |
| **30s social cut** | 0:30 | LinkedIn, X (autoplay limit), Instagram Reels |
| **15s hero loop** | 0:15 | HomePage hero background (silent, autoplay) — uses scenes from 0:18–0:33 |

## Distribution checklist

- [ ] Upload to YouTube (public, unlisted during dry-runs); pin to top of channel
- [ ] Embed on HomePage above-fold with `loading=lazy` + poster image
- [ ] Embed on FeaturesPage near "Three tiers, one platform" section
- [ ] Tweet thread launch with 30s cut + still frames as carousel
- [ ] LinkedIn post with 30s cut + the comparison table screenshot
- [ ] Submit to Show HN (Hacker News) on day-of-launch with HomePage URL
- [ ] Add `og:video` meta tag pointing at hosted MP4 for rich X/Slack previews

## Production timeline (rough)

| Phase | Effort |
|-------|--------|
| Final script approval | <1 day |
| Screen capture recordings (4 clips × ~30 min each w/ retakes) | ~3 hours |
| VO recording (1 take + 2 retakes) | ~1 hour booth time |
| Motion graphics (title/end cards + federation topology) | ~1 day |
| Editing + color + audio mix | ~2 days |
| 3 variant cuts | ~0.5 day |
| **Total** | **~5 working days from script lock** |

## Out of scope

- A/B testing with multiple openers (post-launch optimization)
- Localized VO (English-only at launch)
- Interactive demo (separate effort, not video)
- Customer testimonials (no customers yet; would be inauthentic)
- Animated explainer of stigmergic coordination (too abstract for 90s; reserve for a longer "how it works" video later)

## Related

- [`AUDIT_2026-05-17.md`](./AUDIT_2026-05-17.md) §6 asset gap list — what this video is meant to address
- [`SCREENSHOTS_TODO.md`](./SCREENSHOTS_TODO.md) — still captures needed (some overlap)
- HomePage hero — where the 15s loop lives
- FeaturesPage "Three tiers" section — where the main 90s embed lives
