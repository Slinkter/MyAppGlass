"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useReclamoForm } from "../hooks/useReclamoForm";

const ReclamationFormContext = createContext<any>(null);

export const ReclamationFormProvider = ({ children }: { children: ReactNode }) => {
  const value = useReclamoForm();
  return (
    <ReclamationFormContext.Provider value={value}>
      {children}
    </ReclamationFormContext.Provider>
  );
};

export const useReclamationFormContext = () => {
  const context = useContext(ReclamationFormContext);
  if (!context) {
    throw new Error(
      "useReclamationFormContext must be used within a ReclamationFormProvider"
    );
  }
  return context;
};
