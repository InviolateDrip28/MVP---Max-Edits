import { makeObservable, observable, action } from "mobx";
import Cookies from "js-cookie";
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
  id: number | undefined = undefined;
  firstName: string | undefined = undefined;
  lastName: string | undefined = undefined;
  email: string | undefined = undefined;
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
      signOut: action,
    });

    this.loadFromCookies();
  }

  public setLoggedIn = (loggedIn: boolean) => {
    this.loggedIn = loggedIn;
    Cookies.set("loggedIn", loggedIn.toString());
  }

  public setId = (id: number) => {
    this.id = id;
    Cookies.set("userId", id.toString());
  }

  public setFirstName = (firstName: string) => {
    this.firstName = firstName;
    Cookies.set("firstName", firstName);
  };

  public setLastName = (lastName: string) => {
    this.lastName = lastName;
    Cookies.set("lastName", lastName);
  };

  public setEmail = (email: string) => {
    this.email = email;
    Cookies.set("email", email);
  };

  public setAuthMethod = (method: AuthMethod) => {
    this.authMethod = method;
    Cookies.set("authMethod", method);
  };

  public setUser = (firstName: string, lastName: string, email: string, recieveEmails: boolean) => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.recieveEmails = recieveEmails;
    Cookies.set("firstName", firstName);
    Cookies.set("lastName", lastName);
    Cookies.set("email", email);
    Cookies.set("recieveEmails", recieveEmails.toString());
  }

  public signOut = () => {
    this.loggedIn = false;
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.recieveEmails = false;
    Cookies.remove("loggedIn");
    Cookies.remove("userId");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("email");
    Cookies.remove("recieveEmails");
  }

  loadFromCookies() {
    if (typeof window !== "undefined") {
      //&& window.localStorage) {
      const loggedIn = Cookies.get("loggedIn");
      if (loggedIn) {
        this.loggedIn = Boolean(loggedIn);
      }

      const firstName = Cookies.get("firstName");
      if (firstName) {
        this.firstName = firstName;
      }

      const lastName = Cookies.get("lastName");
      if (lastName) {
        this.lastName = lastName;
      }

      const email = Cookies.get("email");
      if (email) {
        this.email = email;
      }

      const id = Cookies.get("userId");
      if (id) {
        this.id = parseInt(id);
      }

      const recieveEmails = Cookies.get("recieveEmails");
      if (recieveEmails) {
        this.recieveEmails = Boolean(recieveEmails);
      }

      const authMethod = Cookies.get("authMethod");
      if (authMethod) {
        this.authMethod = authMethod as AuthMethod;
      }
    }
  }
}