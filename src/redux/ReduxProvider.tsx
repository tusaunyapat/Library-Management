"use client";

import { store } from "./store";
import { Provider as ReactReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import React from "react";

type ReduxProviderProps = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  let reduxPersistor = persistStore(store);

  return (
    <ReactReduxProvider store={store}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        {children}
      </PersistGate>
    </ReactReduxProvider>
  );
}
