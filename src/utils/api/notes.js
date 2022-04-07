import axios from "axios";
import { compareStrings } from "../helpers";

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

export const getSortedNotes = (sort, notes) => {
  switch (sort) {
    case "oldest":
      return [...notes].sort(
        (noteOne, noteTwo) => noteOne.createdAt - noteTwo.createdAt
      );
    case "newest":
      return [...notes].sort(
        (noteOne, noteTwo) => noteTwo.createdAt - noteOne.createdAt
      );
    default:
      return notes;
  }
};

export const getFilteredNotes = (notes, filters) => {
  if (!notes) return;
  const sortedNotes = getSortedNotes(filters.sortBy, notes);
  const searchedNotes = sortedNotes.filter((note) =>
    compareStrings(note.title, filters.search)
  );
  if (filters.filterBy === "priority")
    return searchedNotes.filter((note) =>
      filters.filterPriority.includes(note.priority)
    );
  if (filters.filterBy === "label")
    return searchedNotes.filter((note) =>
      note.tags.some((tag) => filters.filterLabels.includes(tag))
    );
  return searchedNotes;
};
