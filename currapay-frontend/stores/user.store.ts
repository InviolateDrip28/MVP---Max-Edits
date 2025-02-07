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
  firstName: string = "First name";
  lastName: string = "Last name";
  email: string = "";
  authMethod: AuthMethod = AuthMethod.INITIAL;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      loggedIn: observable,
      firstName: observable,
      lastName: observable,
      setLoggedIn: action,
      setFirstName: action,
      setLastName: action,
      setEmail: action,
      setUser: action,
    });
  }

  public setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
  }

  public setFirstName = (firstName: string) => {
    this.firstName = firstName;
  };

  public setLastName = (lastName: string) => {
    this.lastName = lastName;
  };

  public setEmail = (email: string) => {
    this.email = email;
  };

  public setAuthMethod = (method: AuthMethod) => {
    this.authMethod = method;
  };

  public setUser = (firstName: string, lastName: string, email: string) => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
  
}