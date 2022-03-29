import React from "react";
import {
  Header,
  MainContainer,
  NoteCard,
  SearchBar,
  SideNav,
} from "../components";

const NOTES_LIST = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    body: "consectetur adipisicing elit. Nostrum voluptas amet nam. Error, necessitatibus. Molestiae et velit nobis mollitia. Expedita nulla perspiciatis, atque similique non excepturi? Et quasi consequuntur animi?",
    isPinned: true,
    createdAt: "23/02/2021",
    color: "yellow",
    labels: ["react", "html"],
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet",
    body: "consectetur adipisicing elit. Nostrum voluptas amet nam. Error, necessitatibus. Molestiae et velit nobis mollitia. Expedita nulla perspiciatis, atque similique non excepturi? Et quasi consequuntur animi?",
    isPinned: false,
    createdAt: "23/02/2021",
    color: "blue",
    labels: ["react", "html"],
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet",
    body: "consectetur adipisicing elit. Nostrum voluptas amet nam. Error, necessitatibus. Molestiae et velit nobis mollitia. Expedita nulla perspiciatis, atque similique non excepturi? Et quasi consequuntur animi?",
    isPinned: false,
    createdAt: "23/02/2021",
    color: "green",
    labels: ["react", "html"],
  },
];

export const Home = () => {
  return (
    <div className="full-page">
      <Header />
      <SideNav />
      <MainContainer>
        <SearchBar />
        <div className="full-width full-height ofy-auto fc-fs-ct py-xl mt-xl">
          <NoteCard newNote />
          <h3 className="txt-lg font-medium mt-xl">Pinned Notes</h3>
          {NOTES_LIST.filter((note) => note.isPinned).map((note) => (
            <NoteCard key={note.id} className="my-sm" note={note} />
          ))}
          <h3 className="txt-lg font-medium mt-xl pt-xl">Other Notes</h3>
          {NOTES_LIST.filter((note) => !note.isPinned).map((note) => (
            <NoteCard key={note.id} className="my-sm" note={note} />
          ))}
        </div>
      </MainContainer>
    </div>
  );
};
