import { makeObservable, observable, action } from "mobx";
import { RootStore } from ".";

// Stores the user state
export class UserStore {
  // Default values
  root: RootStore;
  loggedIn = false;
  firstName = "First";
  lastName = "Last";
  country = "US";

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      loggedIn: observable,
      firstName: observable,
      lastName: observable,
      country: observable,
      setLoggedIn: action
    });
  }

  public setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
  }
  
}