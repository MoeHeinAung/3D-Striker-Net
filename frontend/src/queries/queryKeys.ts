export const queryKeys = {
  agents: {
    all: ['agents'] as const,
  },
  batches: {
    all: ['batches'] as const,
  },
  draws: {
    all: ['draws'] as const,
  },
  health: {
    all: ['health'] as const,
  },
  masterDealers: {
    all: ['master-dealers'] as const,
  },
  risk: {
    summary: (adminMaxHold: number) => ['risk-summary', adminMaxHold] as const,
  },
  sales: {
    all: ['sales'] as const,
  },
} as const;
