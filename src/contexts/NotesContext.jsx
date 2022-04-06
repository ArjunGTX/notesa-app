import { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { getNotes } from "../utils/api";
import { TOAST_ERRORS } from "../utils/constants";
import { useAuth } from "./AuthContext";

const NotesContext = createContext(null);

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const { auth } = useAuth();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!auth.isLoggedIn) return;
        const { status, data } = await getNotes(auth.encodedToken);
        if (status !== 200) return;
        setNotes(data.notes);
      } catch (error) {
        toast.error(TOAST_ERRORS.GENERAL_ERROR);
      }
    })();
  }, [auth.isLoggedIn]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
