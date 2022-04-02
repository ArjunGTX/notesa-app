import React, { useState } from "react";
import {
  Button,
  NoteCard,
  SearchBar,
} from "../components";
import { useNotes } from "../contexts";

export const Home = () => {
  const { notes } = useNotes();

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);

  const [showCreateNote, setShowCreateNote] = useState(false);

  return (
    <>
      <SearchBar />
      {showCreateNote ? (
        <Button
          onClick={() => setShowCreateNote(false)}
          variant="outlined"
          color="primary"
          className="mt-xl"
        >
          Cancel
        </Button>
      ) : (
        <Button
          onClick={() => setShowCreateNote(true)}
          variant="contained"
          color="primary"
          className="mt-xl"
        >
          Create New Note
        </Button>
      )}
      <div className="note-container full-height ofy-auto fc-fs-ct p-xl mt-xl">
        {showCreateNote && (
          <NoteCard
            newNote
            disableArchive
            disableDelete
            className="mb-xl"
          />
        )}
        {notes.length !== 0 && (
          <>
            <h3 className="txt-lg font-medium mt-xl mr-auto">Pinned Notes</h3>
            {pinnedNotes.length !== 0 ? (
              pinnedNotes.map((note) => (
                <NoteCard key={note._id} className="my-sm" note={note} />
              ))
            ) : (
              <p className="txt-sm font-medium my-xl py-xl">Nothing here...</p>
            )}
            <h3 className="txt-lg font-medium mt-xl pt-xl mr-auto">
              Other Notes
            </h3>
            {otherNotes.length !== 0 ? (
              otherNotes.map((note) => (
                <NoteCard key={note._id} className="my-sm" note={note} />
              ))
            ) : (
              <p className="txt-sm font-medium my-xl py-xl">Nothing here...</p>
            )}
          </>
        )}
      </div>
    </>
  );
};
