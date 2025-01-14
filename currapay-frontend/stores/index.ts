import { SearchStore } from "./search.store";
import { UserStore } from "./user.store";

export class RootStore {
  searchStore: SearchStore;
  userStore: UserStore;

  constructor() {
    this.searchStore = new SearchStore(this);
    this.userStore = new UserStore(this);
  }
}
