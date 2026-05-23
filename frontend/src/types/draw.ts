export const DrawStatus = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  SETTLED: 'SETTLED',
} as const;

export type DrawStatus = typeof DrawStatus[keyof typeof DrawStatus];

export type Draw = {
  id: number;
  open_date: string;
  cutoff_time: string;
  status: DrawStatus;
  house_holding_amount: number;
  note?: string;
  created_at: string;
}

export type DrawCreate = {
  open_date: string;
  cutoff_time: string;
  house_holding_amount?: number;
  note?: string;
}
