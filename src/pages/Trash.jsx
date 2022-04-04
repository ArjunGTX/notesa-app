import React, { useState } from "react";
import { NoteCard } from "../components";
import { useTrash } from "../contexts";
import { toast } from "react-toastify";
import { TOAST_SUCCESS } from "../utils/constants";
import { Loader } from "../components/Loader";

export const Trash = () => {
  const { trash, setTrash } = useTrash();
  const [loading, setLoading] = useState(false);

  const handleEmptyTrash = () => {
    setLoading(true);
    setTrash([]);
    setTimeout(() => setLoading(false), 800);
    setTimeout(() => toast.success(TOAST_SUCCESS.CLEAR_TRASH), 800)
  };

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
        {loading && <Loader />}
      </div>
    </>
  );
};
