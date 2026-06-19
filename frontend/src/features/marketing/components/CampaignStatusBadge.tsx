import React from 'react';
import type { CampaignStatus } from '../types';

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
  className?: string;
}

const STATUS_CONFIG: Record<CampaignStatus, { label: string; classes: string }> = {
  draft: {
    label: 'Draft',
    classes: 'bg-theme-surface text-theme-secondary border border-theme',
  },
  scheduled: {
    label: 'Scheduled',
    classes: 'bg-theme-info-bg text-theme-info-fg',
  },
  active: {
    label: 'Active',
    classes: 'bg-theme-success-bg text-theme-success-fg',
  },
  paused: {
    label: 'Paused',
    classes: 'bg-theme-warning-bg text-theme-warning-fg',
  },
  completed: {
    label: 'Completed',
    classes: 'bg-theme-interactive-primary/10 text-theme-primary',
  },
  archived: {
    label: 'Archived',
    classes: 'bg-theme-surface text-theme-tertiary',
  },
};

export const CampaignStatusBadge: React.FC<CampaignStatusBadgeProps> = ({ status, className = '' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.draft;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes} ${className}`}
      data-testid={`status-badge-${status}`}
    >
      {config.label}
    </span>
  );
};
