import { useState } from "react";
import { useContext, createContext } from "react";

const SideNavContext = createContext(null);

export const useSideNav = () => useContext(SideNavContext);

export const SideNavProvider = ({ children }) => {
  const [isSideNavActive, setIsSideNavActive] = useState(false);
  return (
    <SideNavContext.Provider
      value={{
        isSideNavActive,
        toggleSideNav: (state) => setIsSideNavActive(state),
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
};
