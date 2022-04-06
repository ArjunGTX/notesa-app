import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { getArchives } from "../utils/api";
import { TOAST_ERRORS } from "../utils/constants";
import { useAuth } from "./AuthContext";

const ArchivesContext = createContext(null);

export const useArchives = () => useContext(ArchivesContext);

export const ArchivesProvider = ({ children }) => {
  const { auth } = useAuth();

  const [archives, setArchives] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!auth.isLoggedIn) return;
        const { status, data } = await getArchives(auth.encodedToken);
        if (status !== 200) return;
        setArchives(data.archives);
      } catch (error) {
        toast.error(TOAST_ERRORS.GENERAL_ERROR);
      }
    })();
  }, [auth.isLoggedIn]);

  return (
    <ArchivesContext.Provider value={{ archives, setArchives }}>
      {children}
    </ArchivesContext.Provider>
  );
};
