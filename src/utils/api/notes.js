import axios from "axios";

export const getNotes = async (token) => {
  return await axios.get("/api/notes", {
    headers: {
      authorization: token,
    },
  });
};
