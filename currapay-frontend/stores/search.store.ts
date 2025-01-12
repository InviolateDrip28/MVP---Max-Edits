import { makeObservable, observable, action } from "mobx";
import { RootStore } from ".";

// Stores the search state
// On refresh, the search state is reverted back to the last thing the user searched for
export class SearchStore {
  // Default values
  root: RootStore;
  fromCountry: string = localStorage.getItem("fromCountry") || "US";
  toCountry: string = localStorage.getItem("toCountry") || "GB";
  amount: string = localStorage.getItem("amount") || "500";

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      fromCountry: observable,
      toCountry: observable,
      amount: observable,
      setFromCountry: action,
      setToCountry: action,
      setAmount: action,
    });
  }

  public setFromCountry = (country: string) => {
    this.fromCountry = country;
    localStorage.setItem("fromCountry", country);
  };

  public setToCountry = (country: string) => {
    this.toCountry = country;
    localStorage.setItem("toCountry", country);
  };

  public setAmount = (amount: string) => {
    this.amount = amount;
    localStorage.setItem("amount", amount);
  };

  // public makeLocalStorage = () => {
  //   localStorage.setItem("fromCountry", this.fromCountry);
  //   localStorage.setItem("toCountry", this.toCountry);
  //   localStorage.setItem("amount", this.amount);
  // };
}
