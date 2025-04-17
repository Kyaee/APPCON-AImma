import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [suppressNavigation, setSuppressNavigation] = useState(null); // 'main', 'lesson', or null

  return (
    <NavigationContext.Provider
      value={{ suppressNavigation, setSuppressNavigation }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
