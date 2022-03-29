import axios from "axios";

export const getNotes = async (token) => {
  return await axios.get("/api/notes", {
    headers: {
      authorization: token,
    },
  });
};

export const addNote = async (token, note) => {
  return await axios.post(
    "/api/notes",
    { note },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const deleteNote = async (token, noteId) => {
  return await axios.delete(`/api/notes/${noteId}`, {
    headers: {
      authorization: token,
    },
  });
};

export const updateNote = async (token, note, noteId) => {
  return await axios.post(
    `/api/notes/${noteId}`,
    { note },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const validateNote = ({ title, body }) => {
  if (!title) return false;
  if (!body) return false;
  return true;
};
