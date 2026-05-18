import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert, Network, Workflow, Plug, Server, Lock,
  Activity, GitBranch, Cpu, Zap, ArrowRight,
  Globe, HardDrive, Bug, Search,
} from 'lucide-react';

import { PublicPageContainer } from '@/shared/components/layout/PublicPageContainer';

interface Feature {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ShieldAlert className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-danger',
    title: 'Kill switch + intervention policies',
    description: 'Trust-scored agents with per-action approval chains, collusion detection, and platform-wide emergency halt. Audit trails for every decision.',
  },
  {
    icon: <Network className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-info',
    title: 'Knowledge graph context',
    description: '91,000+ nodes of structured context with 81,000+ edges. Semantic navigation, blast-radius analysis, feature hub linking. Your agents stop hallucinating; they look it up.',
  },
  {
    icon: <Workflow className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-success',
    title: 'Stigmergic coordination',
    description: 'Agents leave pressure signals on a shared bus for other agents (or other extensions) to perceive. Multi-agent systems coordinate without scheduler or messaging — and cross-domain throttling falls out for free.',
  },
  {
    icon: <Plug className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-warning',
    title: 'MCP-native runtime',
    description: '525 MCP tool actions across 60 tool classes out of the box. Permission-gated. Adapters for Claude Agent SDK, LangGraph, Mastra. Production-grade catalog.',
  },
  {
    icon: <Server className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-info',
    title: 'Fleet management',
    description: 'Bare-metal, VM, and container lifecycle. Multi-arch boot (amd64 + arm64). Pre-warmed instance pools with atomic claim. Cosign + SLSA L3+ signed module supply chain.',
  },
  {
    icon: <Lock className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-danger',
    title: 'mTLS + Vault PKI',
    description: 'Internal CA with mTLS enrollment, automatic certificate rotation, OCI image verification with cosign + fs-verity. Zero-trust between agents.',
  },
  {
    icon: <Activity className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-success',
    title: 'Compound learning loop',
    description: 'System gets better over time. Auto-evolves a new skill after 3 matching learnings. Built-in decay, reinforcement, contradiction resolution. Every operator confirm/reject feeds back into the autonomy reasoner.',
  },
  {
    icon: <GitBranch className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-info',
    title: 'GitOps drift detection',
    description: 'Declare fleet state in fleet.yaml; reconciler opens an approval proposal per diff. Auto-apply for trusted repos. Drift back-pressure when reality diverges from git source-of-truth.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-warning',
    title: 'Ralph loops',
    description: 'Sidekiq-style autonomous task execution for agents. Schedule recurring duty cycles, perceive signals, take actions, log decisions.',
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-success',
    title: 'SDWAN + WireGuard mesh',
    description: 'First-class virtual IPs, iBGP/FRR routing, JSONB route policies, federation peers, access grants. Tailscale UX with FRR routing depth.',
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-info',
    title: 'Multi-region federation',
    description: 'Spawn a fully-federated child platform in one click — pick managed-child, autonomous-peer, or HA cluster-member mode. Sovereign auth, per-peer data residency enforcement, WORM audit shipping, multi-hop migration chains with operator gates at each hop.',
  },
  {
    icon: <HardDrive className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-warning',
    title: 'Disk image CI publication',
    description: 'Custom OS images become a git push. Multi-arch (amd64 + arm64) initramfs + composefs + 6 artifact families (iPXE, raw, ISO, qcow2, OCI). Cosign-signed via Sigstore Fulcio, retention-managed, autonomous-agent promoted.',
  },
  {
    icon: <Bug className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-danger',
    title: 'Honeypot canaries',
    description: 'Decoy modules with fake credentials and tempting ports. Any access fires honeypot.access_attempted → high-severity escalation through the standard intervention policy. Security defense in depth, out of the box.',
  },
  {
    icon: <Search className="w-6 h-6 text-white" />,
    iconBg: 'bg-theme-info',
    title: 'Codebase intelligence MCP',
    description: '14 MCP tools for semantic code search over 91,000+ KG nodes: blast-radius analysis, identifier search, file skeleton extraction, dead code detection. Agents navigate large codebases without hallucinating.',
  },
];

export const FeaturesPage: React.FC = () => {
  return (
    <PublicPageContainer
      title="Features"
      description="Everything you need to run a production AI agent fleet — control, coordination, governance, and the infrastructure to host it."
      mainNav={[
        { label: 'Pricing', path: '/pricing' },
        { label: 'Features', path: '/features' },
      ]}
    >
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(feature => (
              <div
                key={feature.title}
                className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200"
              >
                <div className={`w-12 h-12 mb-4 rounded-xl ${feature.iconBg} flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-theme-primary mb-3">{feature.title}</h3>
                <p className="text-theme-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See it in action — operator-UX screenshots */}
      <section className="py-16 bg-theme-background-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
              See it in action
            </h2>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
              Operator surfaces captured live from a running platform.
            </p>
          </div>
          <div className="space-y-12">
            <figure>
              <img
                src="/screenshots/fleet-dashboard.png"
                alt="Powernode Fleet Dashboard showing live signal counts, dispatch pipeline, and a streaming event feed with correlation chains"
                className="rounded-2xl border border-theme shadow-2xl w-full"
                width={1920}
                height={1080}
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-theme-tertiary text-center">
                <strong className="text-theme-secondary">Fleet Dashboard</strong> — live event feed with severity badges, dispatch pipeline counters, correlation chain inspector. The autonomy decision loop, made observable.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/screenshots/template-composer.png"
                alt="Powernode Template Composer showing a module catalog on the left and an empty composition panel on the right ready for drag-and-drop"
                className="rounded-2xl border border-theme shadow-2xl w-full"
                width={1920}
                height={1080}
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-theme-tertiary text-center">
                <strong className="text-theme-secondary">Template Composer</strong> — drag modules from the catalog into a composition. Conflict detection + footprint estimate live as you compose.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/screenshots/sdwan-overview.png"
                alt="Powernode SDWAN topology view showing a network of federated peers with active bridges and route policies"
                className="rounded-2xl border border-theme shadow-2xl w-full"
                width={1920}
                height={1080}
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-theme-tertiary text-center">
                <strong className="text-theme-secondary">SDWAN Topology</strong> — IPv6 overlay networks, iBGP routing, cross-instance federation, per-network peer + firewall + VIP + port-mapping drill-down.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/screenshots/ai-agents.png"
                alt="Powernode AI Agents page showing a list of 9 active agents with their provider, model, status, and last run timestamp"
                className="rounded-2xl border border-theme shadow-2xl w-full"
                width={1920}
                height={1080}
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-theme-tertiary text-center">
                <strong className="text-theme-secondary">AI Agents</strong> — fleet of agents with per-agent trust score, model + provider, last-run telemetry. Filter by type, status, or last-run window; drill down per agent for cards, autonomy posture, and community sharing.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/screenshots/ai-knowledge.png"
                alt="Powernode Knowledge page showing agent memory pools (Working Memory + Reference Memory) for each agent, with entry counts and size"
                className="rounded-2xl border border-theme shadow-2xl w-full"
                width={1920}
                height={1080}
                loading="lazy"
              />
              <figcaption className="mt-3 text-sm text-theme-tertiary text-center">
                <strong className="text-theme-secondary">Knowledge</strong> — per-agent persistent contexts (working + reference memory), RAG knowledge bases, the platform-wide knowledge graph, memory tiers, and compound learning all in one place.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Three-tier architecture pillars */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
              Three tiers, one platform
            </h2>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
              Most agent platforms ship the top tier. Powernode ships all three, integrated.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-theme-background rounded-2xl border border-theme">
              <div className="text-xs font-semibold text-theme-info-solid tracking-wider uppercase mb-3">Tier 1</div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Operator + AI surface</h3>
              <ul className="text-sm text-theme-secondary space-y-2 leading-relaxed">
                <li>• Template Composer, Fleet Dashboard, Module Detail</li>
                <li>• MCP server (525 tool actions, 60 classes)</li>
                <li>• REST API (operator + worker + node mTLS surfaces)</li>
                <li>• 17 ActionCable channels for live UI updates</li>
              </ul>
            </div>
            <div className="p-6 bg-theme-background rounded-2xl border border-theme">
              <div className="text-xs font-semibold text-theme-info-solid tracking-wider uppercase mb-3">Tier 2</div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Control plane (Rails 8)</h3>
              <ul className="text-sm text-theme-secondary space-y-2 leading-relaxed">
                <li>• 460+ models across agents, knowledge, fleet</li>
                <li>• Fleet Autonomy + Decision Engine + Intervention Policies</li>
                <li>• Internal CA + Vault PKI + mTLS enrollment</li>
                <li>• GitOps reconciler with declarative fleet.yaml</li>
              </ul>
            </div>
            <div className="p-6 bg-theme-background rounded-2xl border border-theme">
              <div className="text-xs font-semibold text-theme-info-solid tracking-wider uppercase mb-3">Tier 3</div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">On-node runtime</h3>
              <ul className="text-sm text-theme-secondary space-y-2 leading-relaxed">
                <li>• Go agent (~20MB static binary, 23 packages)</li>
                <li>• Multi-arch initramfs (amd64 + arm64, 6 artifact families)</li>
                <li>• composefs + overlayfs + fs-verity rootfs</li>
                <li>• Heartbeat + task lease + module fetch + cert rotation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with observability platforms */}
      <section className="py-16 bg-theme-background-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
              How we compare to observability platforms
            </h2>
            <p className="text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
              LangSmith, Langfuse, and Phoenix show you what agents <em>did</em>. Powernode decides what they're
              <em> allowed to do next</em> — and runs the infrastructure underneath.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-theme-background rounded-2xl overflow-hidden border border-theme">
              <thead>
                <tr className="bg-theme-surface border-b border-theme">
                  <th className="px-4 py-3 text-left font-semibold text-theme-primary">Capability</th>
                  <th className="px-4 py-3 text-center font-semibold text-theme-primary">Observability platforms</th>
                  <th className="px-4 py-3 text-center font-semibold text-theme-info-solid">Powernode</th>
                </tr>
              </thead>
              <tbody className="text-theme-secondary">
                {[
                  ['Trace agent decisions', '✓', '✓'],
                  ['Knowledge graph for context', '—', '91k+ nodes, 81k+ edges'],
                  ['Multi-agent coordination', '—', 'Stigmergic signal bus'],
                  ['Approval workflow per action', '—', 'Intervention policies + kill switch'],
                  ['Trust scoring + auto-evolve skills', '—', 'Compound learning loop'],
                  ['MCP-native runtime', 'partial', '525 tools / 60 classes'],
                  ['Fleet management (VM / bare-metal)', '—', 'System extension'],
                  ['SDWAN overlay (iBGP/FRR)', '—', 'Slice 9 shipped'],
                  ['Multi-region federation', '—', 'P9.x — sovereign auth, residency, audit'],
                  ['Spawn a child platform', '—', 'One click; managed/peer/cluster modes'],
                ].map(([cap, them, us], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-theme-background' : 'bg-theme-surface'}>
                    <td className="px-4 py-3 font-medium text-theme-primary">{cap}</td>
                    <td className="px-4 py-3 text-center text-theme-tertiary">{them}</td>
                    <td className="px-4 py-3 text-center text-theme-success-solid font-medium">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-xs text-theme-tertiary max-w-3xl mx-auto leading-relaxed">
            We use the same observability platforms ourselves for trace inspection. Powernode is what runs
            after the trace is reviewed — the control layer that gates what the next decision is allowed to be.
          </p>
        </div>
      </section>

      <section className="py-16 bg-theme-background-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Want to see it work?
          </h2>
          <p className="text-lg text-theme-secondary mb-8 leading-relaxed">
            Try the managed Cloud free, or self-host the OSS today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/plans"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-theme-info hover:bg-theme-interactive-primary-hover text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Try the Cloud — Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/nodealchemy/powernode-system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-theme-surface hover:bg-theme-background text-theme-primary font-semibold rounded-xl border border-theme transition-all duration-200"
            >
              <span>View on GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PublicPageContainer>
  );
};
