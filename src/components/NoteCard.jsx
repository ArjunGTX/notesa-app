import React, { useState, useRef, useEffect } from "react";
import { BsPinAngle, BsPinAngleFill, BsPalette } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { NOTE_COLORS } from "../utils/constants";
import { Label } from "./Label";
import {
  addNote,
  addToArchives,
  deleteFromArchives,
  restoreFromArchives,
  updateNote,
  validateNote,
} from "../utils/api";
import { useArchives, useAuth, useNotes } from "../contexts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const NoteCard = ({
  note,
  className,
  newNote,
  archivedNote,
  disablePin,
  disableEdit,
  disableArchive,
  disableLabel,
  disableColor,
  disableDelete,
}) => {
  const { auth } = useAuth();
  const { setNotes } = useNotes();
  const { setArchives } = useArchives();

  const colorCountRef = useRef(0);
  const noteBodyRef = useRef(null);

  const [editNote, setEditNote] = useState(newNote);
  const [noteData, setNoteData] = useState(() =>
    note
      ? {
          body: note.body,
          color: note.color,
          createdAt: note.createdAt,
          isPinned: note.isPinned,
          tags: note.tags,
          title: note.title,
        }
      : {
          title: "",
          body: "",
          color: NOTE_COLORS[colorCountRef.current],
          isPinned: false,
          tags: [],
          createdAt: Date.now(),
        }
  );

  useEffect(() => {
    if (editNote || !noteBodyRef.current) return;
    noteBodyRef.current.innerHTML = noteData.body;
  }, [editNote, noteBodyRef.current]);

  useEffect(() => {
    newNote || updateNoteRequest();
  }, [noteData.isPinned, noteData.color]);

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
        setEditNote(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNoteRequest = async () => {
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await addToArchives(
        auth.encodedToken,
        noteData,
        note._id
      );
      if (status === 201) {
        setArchives(data.archives);
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restoreNoteRequest = async () => {
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await restoreFromArchives(
        auth.encodedToken,
        note._id
      );
      if (status === 200) {
        setArchives(data.archives);
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoteFromArchivesRequest = async () => {
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await deleteFromArchives(
        auth.encodedToken,
        note._id
      );
      if (status === 200) {
        setArchives(data.archives);
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
  };

  const handleColorChange = () => {
    colorCountRef.current !== 3
      ? (colorCountRef.current += 1)
      : (colorCountRef.current = 0);
    setNoteData((noteData) => ({
      ...noteData,
      color: NOTE_COLORS[colorCountRef.current],
    }));
  };

  const handleSave = () => {
    newNote ? createNoteRequest() : updateNoteRequest();
  };

  const handleArchive = () =>
    archivedNote ? restoreNoteRequest() : archiveNoteRequest();

  const handleDelete = () =>
    archivedNote ? deleteNoteFromArchivesRequest() : null;

  const clearInputs = () =>
    setNoteData({
      title: "",
      body: "",
      color: NOTE_COLORS[0],
      isPinned: false,
      tags: [],
      createdAt: Date.now(),
    });

  return (
    <div
      className={`br-sm px-xl py-lg full-width pos-rel bg-note-${
        noteData.color
      } ${className ? className : ""}`}
    >
      <button
        onClick={handlePinChange}
        className="pos-abs top-right p-sm br-sm fr-ct-ct hover-light"
      >
        {!disablePin ? (
          noteData.isPinned ? (
            <BsPinAngleFill className="txt-md" />
          ) : (
            <BsPinAngle className="txt-md txt-medium" />
          )
        ) : null}
      </button>
      <form>
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={noteData.title}
          disabled={!editNote}
          onChange={handleNoteChange}
          className="txt-md font-medium mr-xl mb-md pr-xl full-width"
        />

        {editNote ? (
          <ReactQuill
            value={noteData.body}
            modules={NoteCard.modules}
            formats={NoteCard.formats}
            bounds={".app"}
            placeholder="Write something..."
            onChange={(value) =>
              setNoteData((noteData) => ({
                ...noteData,
                body: value,
              }))
            }
          />
        ) : (
          <div ref={noteBodyRef} className="full-width"></div>
        )}
      </form>
      <div className="fr-fs-ct my-md">
        {noteData.tags.map((label, index) => (
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
          {!disableEdit ? (
            editNote && validateNote(noteData) ? (
              <button
                onClick={handleSave}
                className="mx-md font-medium txt-success"
              >
                Save
              </button>
            ) : (
              !newNote && (
                <button
                  onClick={() => setEditNote(true)}
                  className="mx-sm p-sm br-sm fr-ct-ct hover-light"
                >
                  <AiOutlineEdit className="txt-md txt-medium" />
                </button>
              )
            )
          ) : null}
          {!disableColor && (
            <button
              onClick={handleColorChange}
              className="mx-sm p-sm br-sm fr-ct-ct hover-light"
            >
              <BsPalette className="txt-medium" />
            </button>
          )}
          {!disableLabel && (
            <button className="mx-sm p-sm br-sm fr-ct-ct hover-light">
              <MdLabelOutline className="txt-medium txt-md" />
            </button>
          )}
          {!disableArchive && (
            <button
              onClick={handleArchive}
              className="mx-sm p-sm br-sm fr-ct-ct hover-light"
            >
              <FiArchive className={archivedNote ? "txt-dark" : "txt-medium"} />
            </button>
          )}
          {!disableDelete && (
            <button
              onClick={handleDelete}
              className="mx-sm p-sm br-sm fr-ct-ct hover-light"
            >
              <FaRegTrashAlt className="txt-medium" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

NoteCard.modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      {
        font: ["sans-serif", "serif", "monospace"],
      },
    ],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};
NoteCard.formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
];
