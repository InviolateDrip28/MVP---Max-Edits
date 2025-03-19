import { makeObservable, observable, action } from "mobx";
import Cookies from "js-cookie";
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

    this.loadFromCookies();
  }

  public setFromCountry = (country: string) => {
    this.fromCountry = country;
    Cookies.set("fromCountry", country);
  };

  public setToCountry = (country: string) => {
    this.toCountry = country;
    Cookies.set("toCountry", country);
  };

  public setAmount = (amount: string) => {
    this.amount = amount;
    Cookies.set("amount", amount);
  };

  loadFromCookies() {
    if (typeof window !== "undefined") {
      //&& window.localStorage) {
      const fromCountry = Cookies.get("fromCountry");
      if (fromCountry) {
        this.fromCountry = fromCountry;
      }

      const toCountry = Cookies.get("toCountry");
      if (toCountry) {
        this.toCountry = toCountry;
      }

      const amount = Cookies.get("amount");
      if (amount) {
        this.amount = amount;
      }
    }
  }
}
