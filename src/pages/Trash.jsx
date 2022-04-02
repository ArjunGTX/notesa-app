import React from "react";
import { NoteCard } from "../components";
import { useTrash } from "../contexts";

export const Trash = () => {
  const { trash, setTrash } = useTrash();

  const handleEmptyTrash = () => setTrash([]);

  return (
    <>
      <h3 className="txt-xl font-medium my-xl">Trash</h3>
      <div className="note-container full-height ofy-auto fc-fs-ct p-xl mt-xl">
        {trash.length !== 0 && (
          <button
            onClick={handleEmptyTrash}
            className="txt-underline hover-light py-xs px-md br-sm ml-auto"
          >
            Empty Trash
          </button>
        )}
        {trash.length !== 0 ? (
          trash.map((note) => (
            <NoteCard
              key={note._id}
              className="my-sm"
              note={note}
              deletedNote
              disableEdit
              disablePin
              disableColor
              disableLabel
              disableArchive
            />
          ))
        ) : (
          <p className="txt-sm font-medium my-xl py-xl">Nothing here...</p>
        )}
      </div>
    </>
  );
};
