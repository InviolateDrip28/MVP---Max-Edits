import { makeObservable, observable, action } from "mobx";
import { RootStore } from ".";

export enum AuthType {
  LOGIN,
  SIGNUP,
}

export enum AuthMethod {
  INITIAL = '',
  EMAIL = 'email',
  GOOGLE = 'google',
}

// Stores the auth and user states
export class UserStore {
  // Default values
  root: RootStore;
  loggedIn: boolean = false;
  firstName: string = "First";
  lastName: string = "Last";
  email: string = "";
  authMethod: AuthMethod = AuthMethod.INITIAL;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      loggedIn: observable,
      firstName: observable,
      lastName: observable,
      setLoggedIn: action,
      setEmail: action
    });
  }

  public setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
  }

  public setEmail = (email: string) => {
    this.email = email;
  };

  public setAuthMethod = (method: AuthMethod) => {
    this.authMethod = method;
  };
  
}