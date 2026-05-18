# frozen_string_literal: true

# Seeds the public launch announcement blog post.
#
# The marketing blog reads from ::Page rows where meta_keywords includes
# "blog". This seed creates a single launch post; future posts follow the
# same pattern. Idempotent via find_or_create_by on slug.
#
# Run via:
#   cd server && bundle exec rails runner \
#     "load Rails.root.join('../extensions/marketing/server/db/seeds/launch_blog_post_seed.rb')"

author = User.joins(:account)
             .where(role: %w[owner super_admin admin])
             .order(:created_at)
             .first

raise "No admin user found — seed an admin first" unless author

slug = "powernode-launches-mission-control-for-ai-agent-fleets"

content = <<~MARKDOWN
  Today we're launching the Powernode public mirror on GitHub: open-source
  mission control for AI agent fleets.

  ## Why now

  Agent platforms have arrived. LangChain, AutoGen, CrewAI, Claude Agent
  SDK, LangGraph, Mastra — frameworks for building agents are everywhere.
  Observability tools followed: LangSmith, Langfuse, Phoenix show you what
  your agents did.

  We kept hitting the same wall: there's no layer that decides what agents
  are **allowed** to do next. That's what Powernode is.

  ## What's in the box

  A **control plane** for production AI agent fleets:

  - **Knowledge graph for context** — 91,000+ nodes, 81,000+ edges. Agents
    stop hallucinating; they look it up.
  - **MCP-native runtime** — 525 tool actions across 60 classes. Permission-gated.
  - **Stigmergic coordination** — agents leave pressure signals for each
    other to perceive. No scheduler, no message bus.
  - **Kill switch + intervention policies** — every consequential action
    can be gated through approval chains. Trust-scored agents.
  - **Compound learning loop** — system auto-evolves skills after recurring
    patterns. Built-in decay, reinforcement, contradiction resolution.

  And the part most people don't see coming: a **fleet substrate**
  underneath. Bare-metal, VM, and container lifecycle. Multi-arch
  initramfs. SDWAN overlay with iBGP/FRR. Cosign + SLSA L3+ signed
  module supply chain. The agent doesn't just run on infrastructure —
  it manages the infrastructure.

  ## The federation story

  The capability we're most excited about: spawning a fully-federated
  child platform in one click. Pick a mode (managed-child, autonomous-peer,
  HA cluster-member), the child boots already federated with the parent.
  No out-of-band token exchange ritual. Sovereign auth, per-peer data
  residency enforcement, WORM audit shipping, multi-hop migration chains
  with operator gates at each hop.

  Multi-region SaaS without the platform tax.

  ## Try it

  Two paths:

  - **Self-host the OSS** — full feature parity with the Cloud. MIT-licensed.
    Bring your own infrastructure and ops.
  - **Use the managed Cloud** — Free tier for evaluation. Pro at $49/mo.
    Premium support contracts available.

  Star us on [GitHub](https://github.com/nodealchemy/powernode-platform).
  Get on the launch waitlist for Cloud access updates. And tell us what
  you'd like to see next — the next quarter's roadmap is being assembled now.
MARKDOWN

excerpt = "Launching open-source mission control for AI agent fleets — knowledge graph, governance, swarm coordination, MCP-native runtime, and the fleet substrate underneath."

Page.find_or_create_by!(slug: slug) do |page|
  page.title = "Powernode launches: Mission control for AI agent fleets"
  page.content = content
  page.meta_description = excerpt
  page.meta_keywords = "blog, launch, announcement, ai agents, fleet management, mcp, open source"
  page.published_at = Time.zone.parse("2026-05-17 12:00:00")
  page.status = "published" if page.respond_to?(:status=)
  page.author_id = author.id
  page.account_id = author.account_id if page.respond_to?(:account_id=)
end

puts "[launch_blog_post_seed] OK — page slug=#{slug} present"
