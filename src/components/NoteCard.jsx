import React, { useState, useRef } from "react";
import { BsPinAngle, BsPinAngleFill, BsPalette } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { NOTE_COLORS } from "../utils/constants";
import { Label } from "./Label";
import { addNote, updateNote, validateNote } from "../utils/api";
import { useAuth, useNotes } from "../contexts";

export const NoteCard = ({ note, className, newNote }) => {
  const { auth } = useAuth();
  const { setNotes } = useNotes();

  const colorCountRef = useRef(0);

  const [editNote, setEditNote] = useState(newNote);
  const [noteData, setNoteData] = useState(() =>
    note
      ? {
          body: note.body,
          color: note.color,
          createdAt: note.createdAt,
          isPinned: note.isPinned,
          labels: note.labels,
          title: note.title,
        }
      : {
          title: "",
          body: "",
          color: NOTE_COLORS[colorCountRef.current],
          isPinned: false,
          labels: [],
          createdAt: Date.now(),
        }
  );

  const createNoteRequest = async () => {
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await addNote(auth.encodedToken, noteData);
      if (status === 201) {
        setNotes(data.notes);
        clearInputs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNoteRequest = async () => {
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await updateNote(
        auth.encodedToken,
        noteData,
        note._id
      );
      if (status === 201) {
        setNotes(data.notes);
        console.log(data);
        setEditNote(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteChange = (e) =>
    setNoteData((noteData) => ({
      ...noteData,
      [e.target.id]: e.target.value,
    }));

  const handlePinChange = () => {
    setNoteData((noteData) => ({
      ...noteData,
      isPinned: !noteData.isPinned,
    }));
    setEditNote(true);
  };

  const handleColorChange = () => {
    colorCountRef.current !== 3
      ? (colorCountRef.current += 1)
      : (colorCountRef.current = 0);
    setNoteData((noteData) => ({
      ...noteData,
      color: NOTE_COLORS[colorCountRef.current],
    }));
    setEditNote(true);
  };

  const handleSave = () => {
    newNote ? createNoteRequest() : updateNoteRequest();
  };

  const clearInputs = () =>
    setNoteData({
      title: "",
      body: "",
      color: NOTE_COLORS[0],
      isPinned: false,
      labels: [],
      createdAt: Date.now(),
    });

  return (
    <div
      className={`br-sm px-xl py-lg full-width pos-rel bg-note-${
        noteData.color
      } ${className ? className : ""}`}
    >
      <button onClick={handlePinChange} className="pos-abs top-right">
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
          value={noteData.title}
          disabled={!editNote}
          onChange={handleNoteChange}
          className="txt-md font-medium mr-xl pr-xl full-width"
        />
        <textarea
          value={noteData.body}
          disabled={!editNote}
          id="body"
          placeholder="Earth is flat! people don't believe me."
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
          {!newNote &&
            `Created on ${new Date(noteData.createdAt).toDateString()}`}
        </p>
        <div className="fr-fs-ct">
          {editNote && validateNote(noteData) ? (
            <button
              onClick={handleSave}
              className="mx-md font-medium txt-success"
            >
              Save
            </button>
          ) : (
            <button onClick={() => setEditNote(true)} className="mx-md">
              <AiOutlineEdit className="txt-md txt-medium" />
            </button>
          )}
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
