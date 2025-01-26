import { makeObservable, observable, action } from "mobx";
import { RootStore } from ".";

// Stores the search state
// On refresh, the search state is reverted back to the last thing the user searched for
export class SearchStore {
  // Default values
  root: RootStore;
  fromCountry: string = "US";
  toCountry: string = "GB";
  amount: string = "500";

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

    this.loadFromLocalStorage();
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

  loadFromLocalStorage() {
    if (typeof window !== "undefined" && window.localStorage) {
      const fromCountry = localStorage.getItem("fromCountry");
      if (fromCountry) {
        this.fromCountry = fromCountry;
      }

      const toCountry = localStorage.getItem("toCountry");
      if (toCountry) {
        this.toCountry = toCountry;
      }

      const amount = localStorage.getItem("amount");
      if (amount) {
        this.amount = amount;
      }
    }
  }
}
