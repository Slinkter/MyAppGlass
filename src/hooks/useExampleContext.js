import React, { createContext, useContext, useState } from 'react';

// Create a Context
const ExampleContext = createContext(null);

// Create a Provider component
export const ExampleProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  const value = {
    count,
    increment,
    decrement,
  };

  return (
    <ExampleContext.Provider value={value}>
      {children}
    </ExampleContext.Provider>
  );
};

// Create a custom hook to use the ExampleContext
export const useExampleContext = () => {
  const context = useContext(ExampleContext);
  if (context === undefined) {
    throw new Error('useExampleContext must be used within an ExampleProvider');
  }
  return context;
};
