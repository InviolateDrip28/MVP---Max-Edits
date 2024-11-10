export interface Option {
  method: string;
  fee: number;
  exchangeRate: number;
  transferTime: string;
}

export interface ProviderCardProps {
  provider: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  options: Option[];
}

export interface RecipientCardProps {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  option: Option;
}

