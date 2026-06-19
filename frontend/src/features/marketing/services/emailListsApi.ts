import { apiClient } from '@/shared/services/apiClient';
import type {
  EmailList,
  EmailListFormData,
  EmailSubscriber,
  SubscriberStatus,
  ApiResponse,
  Pagination,
} from '../types';

const num = (value: unknown): number => (typeof value === 'number' && Number.isFinite(value) ? value : 0);

const normalizeEmailList = (raw: Partial<EmailList> | null | undefined): EmailList => ({
  id: raw?.id ?? '',
  name: raw?.name ?? '',
  description: raw?.description ?? '',
  subscriber_count: num(raw?.subscriber_count),
  active_subscriber_count: num(raw?.active_subscriber_count),
  tags: Array.isArray(raw?.tags) ? raw.tags : [],
  double_opt_in: raw?.double_opt_in ?? false,
  created_at: raw?.created_at ?? '',
  updated_at: raw?.updated_at ?? '',
});

const normalizeSubscriber = (raw: Partial<EmailSubscriber> | null | undefined): EmailSubscriber => ({
  id: raw?.id ?? '',
  email_list_id: raw?.email_list_id ?? '',
  email: raw?.email ?? '',
  first_name: raw?.first_name ?? null,
  last_name: raw?.last_name ?? null,
  status: raw?.status ?? ('pending' as SubscriberStatus),
  subscribed_at: raw?.subscribed_at ?? '',
  unsubscribed_at: raw?.unsubscribed_at ?? null,
  metadata: raw?.metadata ?? {},
  created_at: raw?.created_at ?? '',
  updated_at: raw?.updated_at ?? '',
});

export const emailListsApi = {
  list: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }): Promise<{ email_lists: EmailList[]; pagination: Pagination | null }> => {
    const response = await apiClient.get<ApiResponse<{
      items: EmailList[];
      pagination: Pagination;
    }>>('/marketing/email_lists', { params });
    const data = response.data.data;
    const items = Array.isArray(data?.items) ? data.items : [];
    return { email_lists: items.map(normalizeEmailList), pagination: data?.pagination ?? null };
  },

  get: async (id: string): Promise<EmailList> => {
    const response = await apiClient.get<ApiResponse<{
      email_list: EmailList;
    }>>(`/marketing/email_lists/${id}`);
    return normalizeEmailList(response.data.data?.email_list);
  },

  create: async (data: EmailListFormData): Promise<EmailList> => {
    const response = await apiClient.post<ApiResponse<{
      email_list: EmailList;
    }>>('/marketing/email_lists', { email_list: data });
    return normalizeEmailList(response.data.data?.email_list);
  },

  update: async (id: string, data: Partial<EmailListFormData>): Promise<EmailList> => {
    const response = await apiClient.patch<ApiResponse<{
      email_list: EmailList;
    }>>(`/marketing/email_lists/${id}`, { email_list: data });
    return normalizeEmailList(response.data.data?.email_list);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/marketing/email_lists/${id}`);
  },

  importSubscribers: async (id: string, file: File): Promise<{ imported: number; skipped: number; errors: number }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<ApiResponse<{
      imported: number;
      skipped: number;
      errors: number;
    }>>(`/marketing/email_lists/${id}/import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const data = response.data.data;
    return {
      imported: num(data?.imported),
      skipped: num(data?.skipped),
      errors: num(data?.errors),
    };
  },

  // Subscriber management
  listSubscribers: async (listId: string, params?: {
    page?: number;
    per_page?: number;
    status?: SubscriberStatus;
    search?: string;
  }): Promise<{ subscribers: EmailSubscriber[]; pagination: Pagination | null }> => {
    const response = await apiClient.get<ApiResponse<{
      items: EmailSubscriber[];
      pagination: Pagination;
    }>>(`/marketing/email_lists/${listId}/subscribers`, { params });
    const data = response.data.data;
    const items = Array.isArray(data?.items) ? data.items : [];
    return { subscribers: items.map(normalizeSubscriber), pagination: data?.pagination ?? null };
  },

  addSubscriber: async (listId: string, data: {
    email: string;
    first_name?: string;
    last_name?: string;
    metadata?: Record<string, string>;
  }): Promise<EmailSubscriber> => {
    const response = await apiClient.post<ApiResponse<{
      subscriber: EmailSubscriber;
    }>>(`/marketing/email_lists/${listId}/add_subscriber`, { subscriber: data });
    return normalizeSubscriber(response.data.data?.subscriber);
  },

  removeSubscriber: async (listId: string, _subscriberId: string): Promise<void> => {
    await apiClient.delete(`/marketing/email_lists/${listId}/remove_subscriber`);
  },
};
