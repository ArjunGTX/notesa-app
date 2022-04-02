import axios from "axios";

export const getArchives = async (token) => {
  return await axios.get("/api/archives", {
    headers: {
      authorization: token,
    },
  });
};

export const addToArchives = async (token, note, noteId) => {
  return await axios.post(
    `/api/notes/archives/${noteId}`,
    { note },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const restoreFromArchives = async (token, noteId) => {
  return await axios.post(
    `/api/archives/restore/${noteId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const deleteFromArchives = async (token, noteId) => {
  return await axios.delete(`/api/archives/delete/${noteId}`, {
    headers: {
      authorization: token,
    },
  });
};
