import React from "react";
import { useNotes } from "../contexts";
import { TAGS } from "../utils/constants";
import { NoteCard } from "../components";

export const Label = () => {
  const { notes } = useNotes();

  return (
    <>
      <h2 className="txt-xl font-medium mt-xl">Labels</h2>
      <div className="note-container full-height ofy-auto fc-fs-ct p-xl mt-xl">
        {TAGS.map((tag) => (
          <div key={tag} className="full-width fc-fs-ct">
            <h3 className="txt-lg font-medium mt-xl mr-auto">{tag}</h3>
            {notes.some((note) => note.tags.includes(tag)) ? (
              notes
                ?.filter((note) => note.tags.includes(tag))
                .map((note) => (
                  <NoteCard note={note} className="my-sm" key={note._id} />
                ))
            ) : (
              <p className="txt-sm font-medium my-xl py-xl">Nothing here...</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
