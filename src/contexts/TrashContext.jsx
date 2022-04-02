import { useState, useContext, createContext } from "react";

const TrashContext = createContext(null);

export const useTrash = () => useContext(TrashContext);

export const TrashProvider = ({ children }) => {
  const [trash, setTrash] = useState([]);

  return (
    <TrashContext.Provider value={{ trash, setTrash }}>
      {children}
    </TrashContext.Provider>
  );
};
