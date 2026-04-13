/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { useReclamoForm } from "../hooks/useReclamoForm";

const ReclamationFormContext = createContext(null);

export const ReclamationFormProvider = ({ children }) => {
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
