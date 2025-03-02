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
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  recieveEmails: boolean = false;
  authMethod: AuthMethod = AuthMethod.INITIAL;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      loggedIn: observable,
      id: observable,
      firstName: observable,
      lastName: observable,
      recieveEmails: observable,
      setLoggedIn: action,
      setId: action,
      setFirstName: action,
      setLastName: action,
      setEmail: action,
      setUser: action,
    });
  }

  public setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
  }

  public setId = (id: number) => {
    this.id = id;
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

  public setUser = (firstName: string, lastName: string, email: string, recieveEmails: boolean) => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.recieveEmails = recieveEmails;
  }
}