export type TransactionData = {
  userId: number;
  amount: number;
  currency: string;
  exchangeRate: number;
  fees: number;
  processingTime: number;
  transferMethod: string;
  purposeOfTransfer: string;
  status: string;
};
