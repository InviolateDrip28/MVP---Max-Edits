"use client";
import { createContext, ReactNode, useContext } from "react";
import { RootStore } from ".";

export const StoreContext = createContext(RootStore);

export const useStores = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <StoreContext.Provider value={RootStore}>
      {children}
    </StoreContext.Provider>
  );
};
