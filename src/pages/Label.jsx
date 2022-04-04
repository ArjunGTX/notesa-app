import React from "react";
import { useLabels, useNotes } from "../contexts";
import { NoteCard } from "../components";

export const Label = () => {
  const { notes } = useNotes();
  const { labels } = useLabels();

  return (
    <>
      <h2 className="txt-xl font-medium mt-xl">Labels</h2>
      <div className="note-container full-height ofy-auto fc-fs-ct p-xl mt-xl">
        {labels.map((label) => (
          <div key={label} className="full-width fc-fs-ct">
            <h3 className="txt-lg font-medium mt-xl mr-auto">{label}</h3>
            {notes.some((note) => note.tags.includes(label)) ? (
              notes
                ?.filter((note) => note.tags.includes(label))
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
