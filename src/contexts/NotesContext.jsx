import { useState, useEffect, useContext, createContext } from "react";
import { getNotes } from "../utils/api";
import { useAuth } from "./AuthContext";

const NotesContext = createContext(null);

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const { auth } = useAuth();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await getNotes(auth.encodedToken);
        console.log(data.notes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
