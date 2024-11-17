// export interface Option {
//   method: string;
//   fee: number;
//   exchangeRate: number;
//   transferTime: string;
// }


export type Provider = {
  source: string;
  rate: number;
}
export interface Option {
  rate: number;
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

