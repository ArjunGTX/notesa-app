import { createContext, useState, useContext } from "react";

const ArchivesContext = createContext(null);

export const useArchives = () => useContext(ArchivesContext);

export const ArchivesProvider = ({ children }) => {
  const [archives, setArchives] = useState([]);
  return (
    <ArchivesContext.Provider value={{ archives, setArchives }}>
      {children}
    </ArchivesContext.Provider>
  );
};
