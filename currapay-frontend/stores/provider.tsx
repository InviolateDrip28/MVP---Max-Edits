"use client";
import { createContext, ReactNode, useContext } from "react";
import { enableStaticRendering } from "mobx-react";
import { RootStore } from ".";

enableStaticRendering(typeof window === "undefined");

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = "StoreContext";

export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("error creating root store");
  }

  return context;
};

export function useSearchStore() {
  const { searchStore } = useRootStore();
  return searchStore;
}

export function useUserStore() {
  const { userStore } = useRootStore();
  return userStore;
}

function initializeStore(): RootStore {
  const _store = store ?? new RootStore();;

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export const StoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const store = initializeStore();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
