import { useState, useEffect, useCallback } from 'react';
import { marketingCampaignsApi } from '../services/campaignsApi';
import type { Campaign, CampaignFormData, CampaignStatus, CampaignType, Pagination } from '../types';

interface UseCampaignsOptions {
  page?: number;
  perPage?: number;
  status?: CampaignStatus;
  campaignType?: CampaignType;
  search?: string;
}

export function useCampaigns(options: UseCampaignsOptions = {}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await marketingCampaignsApi.list({
        page: options.page,
        per_page: options.perPage,
        status: options.status,
        campaign_type: options.campaignType,
        search: options.search,
      });
      setCampaigns(result.campaigns);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  }, [options.page, options.perPage, options.status, options.campaignType, options.search]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    pagination,
    loading,
    error,
    refresh: fetchCampaigns,
  };
}

export function useCampaign(id: string | null) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaign = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const result = await marketingCampaignsApi.get(id);
      setCampaign(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaign');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  const createCampaign = useCallback(async (data: CampaignFormData) => {
    const result = await marketingCampaignsApi.create(data);
    setCampaign(result);
    return result;
  }, []);

  const updateCampaign = useCallback(async (data: Partial<CampaignFormData>) => {
    if (!id) return;
    const result = await marketingCampaignsApi.update(id, data);
    setCampaign(result);
    return result;
  }, [id]);

  const deleteCampaign = useCallback(async () => {
    if (!id) return;
    await marketingCampaignsApi.delete(id);
  }, [id]);

  const executeCampaign = useCallback(async () => {
    if (!id) return;
    const result = await marketingCampaignsApi.execute(id);
    setCampaign(result);
    return result;
  }, [id]);

  const pauseCampaign = useCallback(async () => {
    if (!id) return;
    const result = await marketingCampaignsApi.pause(id);
    setCampaign(result);
    return result;
  }, [id]);

  const resumeCampaign = useCallback(async () => {
    if (!id) return;
    const result = await marketingCampaignsApi.resume(id);
    setCampaign(result);
    return result;
  }, [id]);

  const archiveCampaign = useCallback(async () => {
    if (!id) return;
    const result = await marketingCampaignsApi.archive(id);
    setCampaign(result);
    return result;
  }, [id]);

  const cloneCampaign = useCallback(async () => {
    if (!id) return;
    const result = await marketingCampaignsApi.clone(id);
    return result;
  }, [id]);

  return {
    campaign,
    loading,
    error,
    refresh: fetchCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    executeCampaign,
    pauseCampaign,
    resumeCampaign,
    archiveCampaign,
    cloneCampaign,
  };
}
