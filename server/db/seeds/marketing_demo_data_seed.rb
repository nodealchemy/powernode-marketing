# frozen_string_literal: true

# Seeds clean, non-trading sample agents into the existing "Demo Company"
# account (whose admin user is demo@powernode.org). Used by the marketing
# screenshot capture script so /app/ai/agents and /app/ai/knowledge
# render with realistic but private-extension-leak-free content.
#
# Idempotent: find_or_create_by everywhere.
#
# Run via:
#   cd server && bundle exec rails runner \
#     "load Rails.root.join('../extensions/marketing/server/db/seeds/marketing_demo_data_seed.rb')"

demo_user = User.find_by(email: "demo@powernode.org")
raise "demo@powernode.org user not seeded — run base test_data seed first" unless demo_user

account = demo_user.account
puts "[marketing_demo] target account: #{account.name} (#{account.id.to_s[0, 8]})"

# 1) Provider — Demo Company needs an Ai::Provider to attach agents to.
#    Mirror the "Claude AI (Anthropic)" provider from comprehensive_ai_providers_seed
#    but scope it to Demo Company. Use Anthropic for now since most marketing
#    screenshots benefit from a recognizable model badge.
provider = account.ai_providers.find_or_create_by!(slug: "anthropic-claude") do |p|
  p.name = "Claude AI (Anthropic)"
  p.provider_type = "anthropic"
  p.api_base_url = "https://api.anthropic.com/v1"
  p.api_endpoint = "https://api.anthropic.com/v1/messages"
  p.is_active = true
  p.priority_order = 100
  p.supported_models = %w[claude-opus-4-7 claude-sonnet-4-6 claude-haiku-4-5]
  p.capabilities = %w[chat]
  p.metadata = { default_model: "claude-sonnet-4-6" }
  p.pricing_info = { input_per_1k_cents: 300, output_per_1k_cents: 1500 }
end
puts "[marketing_demo] provider: #{provider.name} (#{provider.slug})"

# 2) Demo agents — 9 distinct personas spanning the realistic operator surface.
#    Names + descriptions chosen so no private extension (trading, business)
#    leaks via the marketing screenshots.
DEMO_AGENTS = [
  {
    slug: "documentation-assistant",
    name: "Documentation Assistant",
    description: "Drafts technical docs, runbooks, and release notes from changesets and commit logs.",
    agent_type: "content_generator"
  },
  {
    slug: "code-reviewer",
    name: "Code Reviewer",
    description: "Reads PR diffs, suggests refactors, checks style + test coverage, flags risky changes.",
    agent_type: "code_assistant"
  },
  {
    slug: "incident-triager",
    name: "Incident Triager",
    description: "Classifies inbound alerts by severity, gathers relevant runbooks, drafts initial incident response.",
    agent_type: "monitor"
  },
  {
    slug: "customer-support-bot",
    name: "Customer Support Bot",
    description: "First-line response to operator questions; routes complex tickets to the right specialist.",
    agent_type: "assistant"
  },
  {
    slug: "data-analyst",
    name: "Data Analyst",
    description: "Generates SQL queries, summarizes dashboard metrics, explains trends in plain language.",
    agent_type: "data_analyst"
  },
  {
    slug: "release-coordinator",
    name: "Release Coordinator",
    description: "Tracks release readiness across services, blocks releases on failing checks, posts launch notes.",
    agent_type: "monitor"
  },
  {
    slug: "knowledge-curator",
    name: "Knowledge Curator",
    description: "Promotes high-quality learnings, resolves contradictions, prunes stale knowledge from the graph.",
    agent_type: "assistant"
  },
  {
    slug: "onboarding-guide",
    name: "Onboarding Guide",
    description: "Walks new team members through the platform; surfaces relevant docs at the right moment.",
    agent_type: "assistant"
  },
  {
    slug: "research-summarizer",
    name: "Research Summarizer",
    description: "Reads long-form technical material and produces structured summaries with key citations.",
    agent_type: "content_generator"
  }
]

DEMO_AGENTS.each do |spec|
  agent = account.ai_agents.find_or_create_by!(slug: spec[:slug]) do |a|
    a.name = spec[:name]
    a.description = spec[:description]
    a.agent_type = spec[:agent_type]
    a.status = "active"
    a.version = "1.0.0"
    a.creator = demo_user
    a.provider = provider
    a.mcp_metadata = {
      "model_config" => {
        "model_requirements" => { "tier" => "reasoning" },
        "temperature" => 0.7,
        "max_tokens" => 4096
      }
    }
    a.metadata = {
      "source" => "marketing_demo_data_seed",
      "demo" => true
    }
  end
  puts "[marketing_demo]   ✓ #{agent.name} (#{agent.agent_type})"
end

# 3) Sample knowledge entries — populates /app/ai/knowledge so the Contexts
#    tab + Knowledge Graph tab render with realistic content. Uses the
#    Knowledge model directly (the SharedKnowledge service-level model).
#    If the Knowledge constant is unavailable, skip rather than error.
KNOWLEDGE_ENTRIES = [
  {
    title: "REST API response convention",
    content: "All endpoints wrap responses in `{ success, data, error, meta }`. " \
             "Use render_success(data: ...) and render_error(message, status) helpers; " \
             "never return raw objects. Pagination metadata always lives at meta.pagination.",
    content_type: "reference",
    tags: %w[api conventions backend]
  },
  {
    title: "React component pattern: composition over props drilling",
    content: "Prefer compound components + context providers over passing 5+ props through " \
             "intermediate layers. Pattern: <Card>{children}</Card> with <Card.Header>, " \
             "<Card.Body>, <Card.Footer> + a CardContext for shared state.",
    content_type: "guide",
    tags: %w[react frontend patterns]
  },
  {
    title: "Knowledge graph edge type taxonomy",
    content: "Standard edge types in the platform KG: contains, defines, calls, imports, " \
             "inherits, depends_on, uses, related_to, part_of. Use existing types before " \
             "introducing custom ones. Custom edge types require a memo to keep the schema " \
             "navigable.",
    content_type: "reference",
    tags: %w[knowledge-graph schema]
  },
  {
    title: "Onboarding new operators: first 90 minutes",
    content: "Sequence: (1) log in + change password (15m); (2) walk through Fleet Dashboard " \
             "with a buddy (15m); (3) provision a single QEMU instance via the tutorial (30m); " \
             "(4) approve their first autonomy proposal (15m); (5) review the kill-switch " \
             "procedure (15m). Most stick after the first provision.",
    content_type: "procedure",
    tags: %w[onboarding operator]
  },
  {
    title: "Compound learning lifecycle",
    content: "Learnings start at importance_score=0.5, decay 2% per day untouched. Each " \
             "reinforcement adds 0.05. After 3 matching learnings on the same pattern, the " \
             "system auto-evolves a new skill. Contradictions block the new skill until " \
             "resolved via resolve_contradiction.",
    content_type: "reference",
    tags: %w[learnings autonomy]
  },
  {
    title: "Permission system: frontend vs backend",
    content: "Frontend ALWAYS checks `currentUser?.permissions?.includes('foo.bar')`. " \
             "Backend uses `current_user.has_permission?('foo.bar')`. NEVER check roles in " \
             "the frontend — role objects aren't sent to the client. Common bug: copy-pasting " \
             "backend role checks into a React component.",
    content_type: "best_practice",
    tags: %w[permissions security frontend backend]
  },
  {
    title: "Release announcement template",
    content: "Subject: [PNODE] vX.Y.Z released — <one-line highlight>\n\nBody:\n- What changed\n" \
             "- Operator-visible impact\n- Migration / rollback steps\n- Known issues\n- Credits",
    content_type: "guide",
    tags: %w[release-management communication]
  },
  {
    title: "Reviewing AI agent proposals: what to look for",
    content: "Three checks: (1) Does the proposed action match what the agent's intervention " \
             "policy claims to gate? (2) Is the blast radius bounded to a single account / " \
             "instance / module? (3) Has a similar action been auto-approved recently — " \
             "and did it succeed? If any check fails, reject with reason; the autonomy " \
             "reasoner uses your feedback.",
    content_type: "procedure",
    tags: %w[autonomy review operator]
  }
]

if defined?(Knowledge)
  KNOWLEDGE_ENTRIES.each do |spec|
    entry = Knowledge.find_or_create_by!(account: account, title: spec[:title]) do |k|
      k.content = spec[:content]
      k.content_type = spec[:content_type] if k.respond_to?(:content_type=)
      k.author = demo_user if k.respond_to?(:author=)
      k.created_by = demo_user if k.respond_to?(:created_by=)
      k.tags = spec[:tags] if k.respond_to?(:tags=)
      k.status = "published" if k.respond_to?(:status=)
      k.quality_score = 0.85 if k.respond_to?(:quality_score=)
    end
    puts "[marketing_demo]   ✓ knowledge: #{entry.title}"
  end
else
  puts "[marketing_demo]   (Knowledge model not loaded — skipping knowledge entries)"
end

# 4) Per-agent persistent contexts + sample context entries.
#    Populates /app/ai/knowledge → Contexts tab so the Knowledge page
#    renders meaningful cards (each PersistentContext shows as a card
#    with its entry count, name, and agent association).
puts
puts "[marketing_demo] seeding persistent contexts + entries..."

memory_recipes = [
  {
    suffix: "Reference Memory",
    memory_type: "factual",
    entries: [
      { content: "Operator preferred approval workflow: notify + 4h timeout for medium-severity actions, immediate approval for low-severity." },
      { content: "Known-good provider for Anthropic API: claude-sonnet-4-6 is balanced cost/quality; opus-4-7 for code-heavy tasks; haiku-4-5 for high-volume summarization." },
      { content: "Production deployment window: Tuesday–Thursday, 14:00–17:00 UTC. Friday deploys require operator sign-off + on-call confirmation." }
    ]
  },
  {
    suffix: "Working Memory",
    memory_type: "experiential",
    entries: [
      { content: "Last 5 tasks averaged 2.3s response time. Recent spike to 12s correlated with knowledge graph cold start after deploy." },
      { content: "Operator feedback on task output last week: 4 confirms, 1 reject. Reject was a code review that missed a permission check — added to checklist." },
      { content: "Successfully completed a release-readiness audit on 2026-05-15: 18 services green, 2 yellow (pending test runs), 0 red." }
    ]
  }
]

context_count = 0
entry_count = 0
account.ai_agents.where(metadata: { source: "marketing_demo_data_seed", demo: true }).each do |agent|
  memory_recipes.each do |recipe|
    name = "#{agent.name} #{recipe[:suffix]}"
    pc = Ai::PersistentContext.find_or_create_by!(
      account_id: account.id,
      ai_agent_id: agent.id,
      name: name
    ) do |p|
      p.context_id = "mem_#{SecureRandom.hex(12)}"
      p.context_type = "agent_memory"
      p.scope = "agent"
      p.description = "#{recipe[:memory_type].capitalize} memory pool for #{agent.name}"
      p.retention_policy = { max_entries: 10_000 }
      p.created_by_user_id = demo_user.id if p.respond_to?(:created_by_user_id=)
    end
    context_count += 1

    recipe[:entries].each_with_index do |entry_spec, i|
      Ai::ContextEntry.find_or_create_by!(
        ai_agent_id: agent.id,
        ai_persistent_context_id: pc.id,
        entry_key: "#{recipe[:memory_type][0, 3]}_#{agent.slug.gsub(/-/, '_')}_#{i}"
      ) do |e|
        e.content_text = entry_spec[:content]
        e.content = { text: entry_spec[:content] }
        e.entry_type = "memory"
        e.memory_type = recipe[:memory_type]
        e.importance_score = 0.55 + (rand * 0.30)
        e.source_type = "agent_output"
        e.confidence_score = 0.70 + (rand * 0.25)
        e.created_by_user_id = demo_user.id if e.respond_to?(:created_by_user_id=)
      end
      entry_count += 1
    end

    # Update entry_count cache on the PersistentContext
    cnt = Ai::ContextEntry.where(ai_persistent_context_id: pc.id).count
    pc.update_column(:entry_count, cnt) if pc.has_attribute?(:entry_count)
  end
end
puts "[marketing_demo]   ✓ #{context_count} persistent contexts, #{entry_count} context entries"

puts
puts "[marketing_demo] DONE — Demo Company now has #{account.ai_agents.count} agents, " \
     "#{Ai::PersistentContext.where(account: account).count} persistent contexts, " \
     "#{Ai::ContextEntry.joins(:ai_agent).where(ai_agents: { account_id: account.id }).count rescue 'n/a'} context entries"
