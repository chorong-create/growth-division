export interface Contract {
  id: string;
  account: string;
  rep: string;
  quote_date: string;
  close_date: string;
  plan: 'Advance' | 'Professional' | 'Standard' | 'Basic';
  duration: 'Annual' | 'Monthly';
  type: 'New' | 'Renewal';
  status: 'Closed' | 'In Progress';
  amount: number;
  months: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type ContractInsert = Omit<Contract, 'id' | 'created_at' | 'updated_at'>;
