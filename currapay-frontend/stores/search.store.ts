import { makeAutoObservable } from "mobx";
import { COUNTRY_CODE_TO_CURRENCY } from "@/app/constants";

// Stores the search state
class _SearchStore {
  // Default values
  fromCountry = "US";
  toCountry = "GB";
  fromCurrency = "USD";
  toCurrency = "GBP";
  amount = "500";

  constructor() {
    makeAutoObservable(this);
  }

  public setFromCountry = (country: string) => {
    this.fromCountry = country;
    this.fromCurrency = COUNTRY_CODE_TO_CURRENCY[country];
  }

  public setToCountry = (country: string) => {
    this.toCountry = country;
    this.toCurrency = COUNTRY_CODE_TO_CURRENCY[country];
  }

  public setFromCurrency = (currency: string) => {
    this.fromCurrency = currency;
  }

  public setToCurrency = (currency: string) =>{
    this.toCurrency = currency;
  }

  public setAmount = (amount: string) => {
    this.amount = amount;
  }
}

export const SearchStore = new _SearchStore();
