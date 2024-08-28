import { makeAutoObservable } from "mobx";

// Stores the user state
class _UserStore {
  // Default values
  loggedIn = false;
  firstName = "Jessica";
  lastName = "Ni";
  country = "US";

  constructor() {
    makeAutoObservable(this);
  }

  public setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
  }
  
}

export const UserStore = new _UserStore();