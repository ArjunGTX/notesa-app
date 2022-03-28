import React, { useState } from "react";
import { BsPinAngle, BsPinAngleFill, BsPalette } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { AiOutlineEdit, AiFillEdit } from "react-icons/ai";
import { NOTE_COLORS } from "../utils/constants";
import { Label } from "./Label";

export const NoteCard = ({ note, className, newNote }) => {
  const [editNote, setEditNote] = useState(newNote);
  const [noteData, setNoteData] = useState(() =>
    note
      ? {
          title: note.title,
          body: note.body,
          color: note.color,
          isPinned: note.isPinned,
          labels: note.labels,
        }
      : {
          title: "",
          body: "",
          color: NOTE_COLORS[Math.floor(Math.random() * 4)],
          isPinned: false,
          labels: [],
        }
  );

  const handleNoteChange = (e) =>
    setNoteData((noteData) => ({
      ...noteData,
      [e.target.id]: e.target.value,
    }));

  const toggleEdit = () => setEditNote(!editNote);

  const handleColorChange = () =>
    setNoteData((noteData) => ({
      ...noteData,
      color: NOTE_COLORS[Math.floor(Math.random() * 4)],
    }));

  return (
    <div
      className={`br-sm px-xl py-lg note-card pos-rel bg-note-${
        noteData.color
      } ${className ? className : ""}`}
    >
      <button className="pos-abs top-right">
        {noteData.isPinned ? (
          <BsPinAngleFill className="txt-md" />
        ) : (
          <BsPinAngle className="txt-md" />
        )}
      </button>
      <form>
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          disabled={!editNote}
          value={noteData.title}
          onChange={handleNoteChange}
          className="txt-md font-medium mr-xl pr-xl full-width"
        />
        <textarea
          value={noteData.body}
          id="body"
          placeholder="Earth is flat! people don't believe me."
          disabled={!editNote}
          onChange={handleNoteChange}
          className="my-xs mr-xl full-width"
          rows={4}
        >
          {noteData.body}
        </textarea>
      </form>
      <div className="fr-fs-ct mb-lg">
        {noteData?.labels.map((label, index) => (
          <Label key={index} className="mx-sm">
            {label}
          </Label>
        ))}
      </div>
      <div className="fr-sb-ct full-width">
        <p className="txt-xs font-medium txt-medium">
          {!newNote && `Created on ${note?.createdAt}`}
        </p>
        <div className="fr-fs-ct">
          <button onClick={toggleEdit} className="mx-md font-medium txt-success">
            {editNote ? (
              "Done"
            ) : (
              <AiOutlineEdit className="txt-medium txt-md" />
            )}
          </button>
          <button onClick={handleColorChange} className="mx-md">
            <BsPalette className="txt-medium" />
          </button>
          <button className="mx-md">
            <MdLabelOutline className="txt-medium txt-md" />
          </button>
          <button className="mx-md">
            <FiArchive className="txt-medium" />
          </button>
          <button className="mx-md">
            <FaRegTrashAlt className="txt-medium" />
          </button>
        </div>
      </div>
    </div>
  );
};
