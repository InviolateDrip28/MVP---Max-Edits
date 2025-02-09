export type Transaction = {
  userId: number;
  amount: number;
  createdAt: string;
  currencyFrom: string;
  exchangeRate: number;
  fees: number;
  processingTime: number;
  transferMethod: string;
  purposeOfTransfer: string;
  status: string;
  updatedAt: string;
};

export type User = {
  age: number;
  browserUsed: string;
  city: string;
  country: string;
  createdAt: string;
  deviceUsed: string;
  emailAddress: string;
  gender: string;
  id: number;
  nationality: string;
  occupation: string;
  password: string;
  updatedAt: string;
};
