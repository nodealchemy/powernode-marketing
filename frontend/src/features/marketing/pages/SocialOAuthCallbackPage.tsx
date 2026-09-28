import React, { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PageContainer } from '@/shared/components/layout/PageContainer';

/**
 * Landing page for the social-platform OAuth redirect (ConnectSocialModal.tsx
 * sends `redirect_uri: origin + '/app/marketing/social/callback'`). The
 * connect flow is manual-paste, not auto-capture: the provider redirects the
 * browser here with `?code=...` in the query string, and the operator copies
 * that code back into the "Connect Social Account" dialog. Without a route
 * here the browser landed on a blank pane after authorizing — the worst
 * failure mode, since nothing signals anything went wrong (nav-link-
 * reachability.test.ts, C15 F3).
 */
export const SocialOAuthCallbackPage: React.FC = () => {
  const code = useMemo(() => new URLSearchParams(window.location.search).get('code') ?? '', []);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/app' },
    { label: 'Marketing', href: '/app/marketing/campaigns' },
    { label: 'Social', href: '/app/marketing/social' },
    { label: 'Connect' },
  ];

  return (
    <PageContainer
      title="Connect Account"
      description="Copy the authorization code below and paste it into the Connect Social Account dialog to finish connecting the account."
      breadcrumbs={breadcrumbs}
    >
      {code ? (
        <div className="card-theme-elevated p-6 max-w-xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Authorization code</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-theme-surface px-3 py-2 text-sm text-theme-primary">
                {code}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-theme-secondary px-3 py-2 flex items-center gap-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <p className="text-sm text-theme-secondary">
            Return to the Social page, open Connect Account, and paste this code in to finish connecting.
          </p>
        </div>
      ) : (
        <div className="card-theme-elevated p-6 max-w-xl">
          <p className="text-sm text-theme-secondary">
            No authorization code was returned. Return to the Social page and try connecting the account again.
          </p>
        </div>
      )}
    </PageContainer>
  );
};
