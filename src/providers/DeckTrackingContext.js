import React, { createContext, useState, useContext } from 'react';
const DeckTrackingContext = createContext();
export const DeckTrackingProvider = ({ children }) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [refreshInterval, setRefreshInterval] = useState(15000); 

  const checkAndRefresh = () => {
    const now = Date.now();
    if (now - timestamp >= refreshInterval) {
      setTimestamp(now);
      return true; 
    }
    return false;
  };

  const updateRefreshInterval = (newInterval) => {
    setRefreshInterval(newInterval);
  };

  return (
    <DeckTrackingContext.Provider value={{ timestamp, refreshInterval, checkAndRefresh, updateRefreshInterval }}>
      {children}
    </DeckTrackingContext.Provider>
  );
};

export const useDeckTracking = () => {
  return useContext(DeckTrackingContext);
};
