"use client";
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, ReactNode } from "react";
import { useReclamoForm } from "../hooks/useReclamoForm";
import { ReclamationFormContextValue } from "../types";

const ReclamationFormContext = createContext<ReclamationFormContextValue | null>(null);

interface ReclamationFormProviderProps {
  children: ReactNode;
}

export const ReclamationFormProvider: React.FC<ReclamationFormProviderProps> = ({ children }) => {
  const value = useReclamoForm();
  return (
    <ReclamationFormContext.Provider value={value}>
      {children}
    </ReclamationFormContext.Provider>
  );
};

export const useReclamationFormContext = (): ReclamationFormContextValue => {
  const context = useContext(ReclamationFormContext);
  if (!context) {
    throw new Error(
      "useReclamationFormContext must be used within a ReclamationFormProvider"
    );
  }
  return context;
};
