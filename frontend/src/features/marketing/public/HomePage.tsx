import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert, Network, Workflow, Plug, ArrowRight, Star,
  Server, Globe,
} from 'lucide-react';

import { PublicPageContainer } from '@/shared/components/layout/PublicPageContainer';

import { WaitlistSignupForm } from './WaitlistSignupForm';

export const HomePage: React.FC = () => {
  return (
    <PublicPageContainer
      mainNav={[
        { label: 'Pricing', path: '/pricing' },
        { label: 'Features', path: '/features' },
      ]}
    >
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-theme-info-bg rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-theme-info-bg rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-theme-surface border border-theme">
            <span className="text-xs font-semibold text-theme-secondary tracking-wider uppercase">Open Source · MIT Licensed</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 text-theme-primary">
            Mission control for<br />
            <span className="text-theme-info-solid">
              AI agent fleets
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-theme-secondary max-w-3xl mx-auto leading-relaxed mb-12">
            The control plane your agents are missing. Knowledge graph, governance, swarm coordination — all open source.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-theme-info-solid hover:bg-theme-interactive-primary-hover text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              data-testid="hero-cta-cloud"
            >
              <span>Try the Cloud — Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/nodealchemy/powernode-system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-theme-surface hover:bg-theme-background-secondary text-theme-primary font-semibold rounded-xl border border-theme transition-all duration-200"
              data-testid="hero-cta-github"
            >
              <Star className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Value proposition cards */}
      <section className="py-24 bg-theme-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
              Built for what comes <em className="not-italic text-theme-info-solid">after</em> observability
            </h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto leading-relaxed">
              LangSmith, Langfuse, Phoenix — they show you what your agents <em>did</em>.
              Powernode is the layer that decides what they're <em>allowed to do next</em>.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200">
              <div className="w-12 h-12 mb-4 rounded-xl bg-theme-error-solid flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Kill switch + intervention policies</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Trust-scored agents with per-action approval chains, collusion detection, and platform-wide
                emergency halt. Audit trails for every decision.
              </p>
            </div>
            <div className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200">
              <div className="w-12 h-12 mb-4 rounded-xl bg-theme-info-solid flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Knowledge graph for context</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                91,000+ nodes of structured context (81,000+ edges), semantic navigation, blast-radius analysis.
                Your agents stop hallucinating; they look it up.
              </p>
            </div>
            <div className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200">
              <div className="w-12 h-12 mb-4 rounded-xl bg-theme-success-solid flex items-center justify-center">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Stigmergic coordination</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Agents leave pressure signals for each other to perceive. Multi-agent systems coordinate
                without explicit messaging or central scheduler.
              </p>
            </div>
            <div className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200">
              <div className="w-12 h-12 mb-4 rounded-xl bg-theme-warning-solid flex items-center justify-center">
                <Plug className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">MCP-native runtime</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                525 MCP tool actions across 60 tool classes out of the box. Permission-gated. Adapters for
                Claude Agent SDK, LangGraph, Mastra. Production-grade catalog.
              </p>
            </div>
            <div className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200">
              <div className="w-12 h-12 mb-4 rounded-xl bg-theme-info-solid flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Fleet substrate underneath</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Most agent platforms stop at the conversation. Powernode goes all the way down — bare-metal, VM,
                and container lifecycle. Multi-arch initramfs, Cosign + SLSA L3+ supply chain, SDWAN overlay.
              </p>
            </div>
            <div className="p-8 bg-theme-background rounded-2xl border border-theme hover:border-theme-info-solid transition-all duration-200">
              <div className="w-12 h-12 mb-4 rounded-xl bg-theme-success-solid flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Federation, built in</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Spawn a fully-federated child platform in one click. Sovereign auth, per-peer data residency,
                WORM audit shipping, multi-hop migration chains. Multi-region SaaS without the platform tax.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spawn a platform — federation story */}
      <section className="py-24 bg-theme-background-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
              Spawn a fully-federated platform in <em className="not-italic text-theme-info-solid">one click</em>
            </h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto leading-relaxed">
              Most platforms make you stand each region up by hand. Pick a spawn mode, click Spawn — the child
              boots already federated with the parent. No out-of-band token exchange ritual.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-theme-background rounded-xl border border-theme">
              <div className="text-xs font-semibold text-theme-info-solid tracking-wider uppercase mb-2">Mode 1</div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Managed child</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Parent retains operator-scope grant on the child (read/write/admin, 365-day TTL). Single-pane
                administration. Child operator can revoke any time — "emancipation" downgrades to peer.
              </p>
            </div>
            <div className="p-6 bg-theme-background rounded-xl border border-theme">
              <div className="text-xs font-semibold text-theme-info-solid tracking-wider uppercase mb-2">Mode 2</div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">Autonomous peer</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Provisioning convenience without ongoing privilege. Once the handshake completes, both
                platforms are equal peers — no auto-grants. For partner platforms, customer deployments.
              </p>
            </div>
            <div className="p-6 bg-theme-background rounded-xl border border-theme">
              <div className="text-xs font-semibold text-theme-info-solid tracking-wider uppercase mb-2">Mode 3</div>
              <h3 className="text-xl font-bold text-theme-primary mb-3">HA cluster member</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Child runs a Postgres physical replication slot streaming from the parent's primary. Horizontal
                scale + warm standby. Failover preserves federation state because the data <em>is</em> the same.
              </p>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-theme-tertiary max-w-2xl mx-auto leading-relaxed">
            Plus P9.x guarantees: schema-version negotiation, per-peer WORM audit shipping, data residency
            enforcement at federation-aware boundaries, and multi-hop migration chains with operator gates at
            each hop.
          </p>
        </div>
      </section>

      {/* Self-host vs Cloud */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Self-host the OSS, or use our Cloud
          </h2>
          <p className="text-xl text-theme-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Same code, two deployments. The OSS gives you the same powernode we run; the Cloud gives you our ops.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-theme-surface rounded-2xl border border-theme shadow-md">
              <div className="text-sm font-semibold text-theme-tertiary tracking-wider uppercase mb-2">Free Forever</div>
              <h3 className="text-2xl font-bold text-theme-primary mb-4">Self-host</h3>
              <p className="text-theme-secondary leading-relaxed mb-6">
                Run powernode on your own infrastructure. Full feature parity with the Cloud. MIT-licensed,
                community-supported. Bring your own ops.
              </p>
              <a
                href="https://github.com/nodealchemy/powernode-system"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-theme-info-solid font-semibold hover:underline"
              >
                <span>View on GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="p-8 bg-theme-info-bg rounded-2xl border-2 border-theme-info-solid shadow-md">
              <div className="text-sm font-semibold text-theme-info-solid tracking-wider uppercase mb-2">Free → Pro → Team</div>
              <h3 className="text-2xl font-bold text-theme-primary mb-4">Cloud</h3>
              <p className="text-theme-secondary leading-relaxed mb-6">
                We operate it. Multi-tenancy, premium support, enterprise SSO, compliance snapshots,
                cross-region federation. Free tier for evaluation.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center space-x-2 text-theme-info-solid font-semibold hover:underline"
              >
                <span>View pricing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-theme-background-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Get the launch newsletter
          </h2>
          <p className="text-xl text-theme-secondary mb-8 leading-relaxed">
            Cloud is opening for early access. Get the launch announcement plus monthly updates on
            what's shipping in the open-source release.
          </p>
          <WaitlistSignupForm source="homepage" />
        </div>
      </section>
    </PublicPageContainer>
  );
};
