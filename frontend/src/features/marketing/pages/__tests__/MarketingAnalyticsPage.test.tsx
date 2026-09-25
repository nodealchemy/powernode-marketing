import { render } from '@testing-library/react';
import { MarketingAnalyticsPage } from '../MarketingAnalyticsPage';

let capturedBreadcrumbs: Array<{ label: string }> = [];
jest.mock('@/shared/components/layout/PageContainer', () => ({
  PageContainer: ({ breadcrumbs, children }: { breadcrumbs: Array<{ label: string }>; children: React.ReactNode }) => {
    capturedBreadcrumbs = breadcrumbs;
    return <div>{children}</div>;
  },
}));
jest.mock('../../components/CampaignAnalytics', () => ({ CampaignAnalytics: () => null }));

describe('MarketingAnalyticsPage', () => {
  // fc-47: the breadcrumb names the page the way the sidebar does.
  it('ends its breadcrumb with Marketing Analytics', () => {
    render(<MarketingAnalyticsPage />);
    expect(capturedBreadcrumbs[capturedBreadcrumbs.length - 1].label).toBe('Marketing Analytics');
  });
});
