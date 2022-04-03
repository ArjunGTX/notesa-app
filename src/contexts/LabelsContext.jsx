import { createContext, useState, useContext } from "react";
import { TAGS } from "../utils/constants";

const LabelsContext = createContext(null);

export const useLabels = () => useContext(LabelsContext);

export const LabelsProvider = ({ children }) => {
  const [labels, setLabels] = useState(TAGS);
  return (
    <LabelsContext.Provider value={{ labels, setLabels }}>
      {children}
    </LabelsContext.Provider>
  );
};
