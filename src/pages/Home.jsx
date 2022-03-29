import React from "react";
import {
  Header,
  MainContainer,
  NoteCard,
  SearchBar,
  SideNav,
} from "../components";
import { useNotes } from "../contexts";

export const Home = () => {
  const { notes } = useNotes();

  return (
    <div className="full-page">
      <Header />
      <SideNav />
      <MainContainer>
        <SearchBar />
        <div className="full-width full-height ofy-auto fc-fs-ct py-xl mt-xl">
          <NoteCard newNote />
          <h3 className="txt-lg font-medium mt-xl">Pinned Notes</h3>
          {notes
            ?.filter((note) => note.isPinned)
            .map((note) => (
              <NoteCard key={note._id} className="my-sm" note={note} />
            ))}
          <h3 className="txt-lg font-medium mt-xl pt-xl">Other Notes</h3>
          {notes
            ?.filter((note) => !note.isPinned)
            .map((note) => (
              <NoteCard key={note._id} className="my-sm" note={note} />
            ))}
        </div>
      </MainContainer>
    </div>
  );
};
