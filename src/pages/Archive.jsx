import React from "react";
import { NoteCard } from "../components";
import { useArchives } from "../contexts";

export const Archive = () => {
  const { archives } = useArchives();
  return (
    <>
      <h3 className="txt-xl font-medium my-xl">Archives</h3>
      <div className="note-container full-height ofy-auto fc-fs-ct p-xl mt-xl">
        {archives.length !== 0 ? (
          archives.map((note) => (
            <NoteCard
              archivedNote
              key={note._id}
              className="my-sm"
              note={note}
              disableEdit
              disablePin
              disableColor
              disableLabel
            />
          ))
        ) : (
          <p className="txt-sm font-medium my-xl py-xl">Nothing here...</p>
        )}
      </div>
    </>
  );
};
