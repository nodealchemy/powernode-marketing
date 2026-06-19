import { apiClient } from '@/shared/services/apiClient';
import type {
  AnalyticsOverview,
  CampaignStatistics,
  ChannelAnalytics,
  TopPerformer,
  CampaignMetric,
  ApiResponse,
  Pagination,
} from '../types';

const num = (value: unknown): number => (typeof value === 'number' && Number.isFinite(value) ? value : 0);

const normalizeOverview = (raw: Partial<AnalyticsOverview> | null | undefined): AnalyticsOverview => ({
  period_start: raw?.period_start ?? '',
  period_end: raw?.period_end ?? '',
  total_campaigns: num(raw?.total_campaigns),
  total_impressions: num(raw?.total_impressions),
  total_clicks: num(raw?.total_clicks),
  total_conversions: num(raw?.total_conversions),
  total_revenue_cents: num(raw?.total_revenue_cents),
  total_spent_cents: num(raw?.total_spent_cents),
  roi_percentage: num(raw?.roi_percentage),
  impressions_trend: Array.isArray(raw?.impressions_trend) ? raw.impressions_trend : [],
  conversions_trend: Array.isArray(raw?.conversions_trend) ? raw.conversions_trend : [],
  revenue_trend: Array.isArray(raw?.revenue_trend) ? raw.revenue_trend : [],
});

const normalizeStatistics = (raw: Partial<CampaignStatistics> | null | undefined): CampaignStatistics => ({
  total_campaigns: num(raw?.total_campaigns),
  active_campaigns: num(raw?.active_campaigns),
  completed_campaigns: num(raw?.completed_campaigns),
  total_impressions: num(raw?.total_impressions),
  total_clicks: num(raw?.total_clicks),
  total_conversions: num(raw?.total_conversions),
  overall_click_rate: num(raw?.overall_click_rate),
  overall_conversion_rate: num(raw?.overall_conversion_rate),
  total_revenue_cents: num(raw?.total_revenue_cents),
  total_spent_cents: num(raw?.total_spent_cents),
  roi_percentage: num(raw?.roi_percentage),
  campaigns_by_status: raw?.campaigns_by_status ?? ({} as CampaignStatistics['campaigns_by_status']),
  campaigns_by_type: raw?.campaigns_by_type ?? ({} as CampaignStatistics['campaigns_by_type']),
});

const normalizeChannel = (raw: Partial<ChannelAnalytics> | null | undefined): ChannelAnalytics => ({
  channel: raw?.channel ?? ('email' as ChannelAnalytics['channel']),
  impressions: num(raw?.impressions),
  clicks: num(raw?.clicks),
  conversions: num(raw?.conversions),
  click_rate: num(raw?.click_rate),
  conversion_rate: num(raw?.conversion_rate),
  revenue_cents: num(raw?.revenue_cents),
  cost_cents: num(raw?.cost_cents),
  roi_percentage: num(raw?.roi_percentage),
});

const normalizePerformer = (raw: Partial<TopPerformer> | null | undefined): TopPerformer => ({
  campaign_id: raw?.campaign_id ?? '',
  campaign_name: raw?.campaign_name ?? '',
  campaign_type: raw?.campaign_type ?? ('email' as TopPerformer['campaign_type']),
  impressions: num(raw?.impressions),
  clicks: num(raw?.clicks),
  conversions: num(raw?.conversions),
  revenue_cents: num(raw?.revenue_cents),
  roi_percentage: num(raw?.roi_percentage),
});

export const analyticsApi = {
  overview: async (params?: {
    period_start?: string;
    period_end?: string;
  }): Promise<AnalyticsOverview> => {
    const response = await apiClient.get<ApiResponse<{
      overview: AnalyticsOverview;
    }>>('/marketing/analytics/overview', { params });
    return normalizeOverview(response.data.data?.overview);
  },

  campaignDetail: async (campaignId: string, params?: {
    period_start?: string;
    period_end?: string;
  }): Promise<{ metrics: CampaignMetric[]; pagination: Pagination | null }> => {
    const response = await apiClient.get<ApiResponse<{
      metrics: CampaignMetric[];
      pagination: Pagination;
    }>>(`/marketing/analytics/campaigns/${campaignId}`, { params });
    const data = response.data.data;
    return {
      metrics: Array.isArray(data?.metrics) ? data.metrics : [],
      pagination: data?.pagination ?? null,
    };
  },

  channels: async (params?: {
    period_start?: string;
    period_end?: string;
  }): Promise<ChannelAnalytics[]> => {
    const response = await apiClient.get<ApiResponse<{
      channels: ChannelAnalytics[];
    }>>('/marketing/analytics/channels', { params });
    const channels = response.data.data?.channels;
    return Array.isArray(channels) ? channels.map(normalizeChannel) : [];
  },

  roi: async (params?: {
    period_start?: string;
    period_end?: string;
  }): Promise<CampaignStatistics> => {
    const response = await apiClient.get<ApiResponse<{
      statistics: CampaignStatistics;
    }>>('/marketing/analytics/roi', { params });
    return normalizeStatistics(response.data.data?.statistics);
  },

  topPerformers: async (params?: {
    period_start?: string;
    period_end?: string;
    limit?: number;
  }): Promise<TopPerformer[]> => {
    const response = await apiClient.get<ApiResponse<{
      top_performers: TopPerformer[];
    }>>('/marketing/analytics/top_performers', { params });
    const performers = response.data.data?.top_performers;
    return Array.isArray(performers) ? performers.map(normalizePerformer) : [];
  },
};
