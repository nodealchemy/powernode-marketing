import { ComponentType, lazy } from 'react';
import { featureRegistry } from '@/shared/services/featureRegistry';

// Helper: widen the lazy-loaded module's default-export type from the concrete
// `FC<P>` it was authored as to the `ComponentType<unknown>` that
// `featureRegistry.FeatureRoute.component` expects. Every page is a different
// `FC<P>` but the registry stores them in one typed list, and `FC<{}>` does not
// satisfy `FC<unknown>` under React's strict prop variance. The cast happens
// here, once, instead of at every call site.
//
// Not generic over the props type: these loaders re-wrap a named export as
// `.then(m => ({ default: m.Named }))`, and inferring a type parameter through
// that re-wrap makes tsc resolve it to `never`.
const lazyPage = (
  loader: () => Promise<{ default: unknown }>
) => lazy(loader as () => Promise<{ default: ComponentType<unknown> }>);


// Lazy-loaded admin marketing page components (rendered inside /app/* via DashboardPage)
const MarketingCampaignsPage = lazyPage(() => import('./features/marketing/pages/MarketingCampaignsPage').then(m => ({ default: m.MarketingCampaignsPage })));
const MarketingCampaignDetailPage = lazyPage(() => import('./features/marketing/pages/MarketingCampaignDetailPage').then(m => ({ default: m.MarketingCampaignDetailPage })));
const MarketingCalendarPage = lazyPage(() => import('./features/marketing/pages/MarketingCalendarPage').then(m => ({ default: m.MarketingCalendarPage })));
const MarketingEmailListsPage = lazyPage(() => import('./features/marketing/pages/MarketingEmailListsPage').then(m => ({ default: m.MarketingEmailListsPage })));
const MarketingSocialPage = lazyPage(() => import('./features/marketing/pages/MarketingSocialPage').then(m => ({ default: m.MarketingSocialPage })));
const MarketingAnalyticsPage = lazyPage(() => import('./features/marketing/pages/MarketingAnalyticsPage').then(m => ({ default: m.MarketingAnalyticsPage })));

// Lazy-loaded PUBLIC marketing page components (rendered at root domain, no auth).
// Pricing is intentionally NOT here — it lives in the business extension at /pricing.
const HomePage = lazyPage(() => import('./features/marketing/public/HomePage').then(m => ({ default: m.HomePage })));
const FeaturesPage = lazyPage(() => import('./features/marketing/public/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const BlogIndexPage = lazyPage(() => import('./features/marketing/public/BlogIndexPage').then(m => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazyPage(() => import('./features/marketing/public/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const DocsLandingPage = lazyPage(() => import('./features/marketing/public/DocsLandingPage').then(m => ({ default: m.DocsLandingPage })));

export function register(): void {
  // Public-facing marketing routes (rendered by App.tsx, no authentication required)
  // These override App.tsx defaults like the `/` -> `/welcome` redirect when present.
  featureRegistry.registerPublicRoutes('marketing', [
    { path: '/', component: HomePage },
    { path: '/features', component: FeaturesPage },
    { path: '/blog', component: BlogIndexPage },
    { path: '/blog/:slug', component: BlogPostPage },
    { path: '/docs', component: DocsLandingPage },
  ]);

  // Marketing routes — rendered dynamically via featureRegistry in DashboardPage
  featureRegistry.registerRoutes('marketing', [
    { path: '/marketing/campaigns', component: MarketingCampaignsPage, permission: 'marketing.campaigns.read' },
    { path: '/marketing/campaigns/:id', component: MarketingCampaignDetailPage, permission: 'marketing.campaigns.read' },
    { path: '/marketing/calendar', component: MarketingCalendarPage, permission: 'marketing.calendar.read' },
    { path: '/marketing/email-lists', component: MarketingEmailListsPage, permission: 'marketing.email_lists.read' },
    { path: '/marketing/social', component: MarketingSocialPage, permission: 'marketing.social.read' },
    { path: '/marketing/analytics', component: MarketingAnalyticsPage, permission: 'marketing.analytics.read' },
  ]);

  // Marketing navigation section
  featureRegistry.registerNavSections('marketing', [{
    id: 'marketing',
    name: 'Marketing',
    permissions: ['marketing.campaigns.read', 'marketing.calendar.read', 'marketing.email_lists.read', 'marketing.social.read', 'marketing.analytics.read'],
    collapsible: true,
    defaultExpanded: true,
    order: 16,
    items: [
      { label: 'Campaigns', path: '/app/marketing/campaigns', icon: 'Megaphone', permission: 'marketing.campaigns.read', order: 1 },
      { label: 'Calendar', path: '/app/marketing/calendar', icon: 'CalendarDays', permission: 'marketing.calendar.read', order: 2 },
      { label: 'Email Lists', path: '/app/marketing/email-lists', icon: 'Mail', permission: 'marketing.email_lists.read', order: 3 },
      { label: 'Social', path: '/app/marketing/social', icon: 'Share2', permission: 'marketing.social.read', order: 4 },
      { label: 'Analytics', path: '/app/marketing/analytics', icon: 'TrendingUp', permission: 'marketing.analytics.read', order: 5 },
    ],
  }]);
}
