import React, { useState, useRef, useEffect } from "react";
import { BsPinAngle, BsPinAngleFill, BsPalette } from "react-icons/bs";
import { MdLabelOutline, MdOutlineUnarchive } from "react-icons/md";
import { FaRegTrashAlt, FaTrashRestore } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { NOTE_COLORS, TAGS } from "../utils/constants";
import { Label } from "./Label";
import {
  addNote,
  addToArchives,
  deleteFromArchives,
  deleteNote,
  restoreFromArchives,
  updateNote,
  validateNote,
} from "../utils/api";
import { useArchives, useAuth, useNotes, useTrash } from "../contexts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dropdown } from "./Dropdown";

export const NoteCard = ({
  note,
  className,
  newNote,
  archivedNote,
  deletedNote,
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
  const { setTrash } = useTrash();

  const colorCountRef = useRef(0);
  const noteBodyRef = useRef(null);

  const [editNote, setEditNote] = useState(newNote);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [noteData, setNoteData] = useState(() =>
    note
      ? {
          body: note.body,
          color: note.color,
          createdAt: note.createdAt,
          isPinned: note.isPinned,
          tags: note.tags,
          title: note.title,
          priority: note.priority,
        }
      : {
          title: "",
          body: "",
          color: NOTE_COLORS[colorCountRef.current],
          isPinned: false,
          tags: [],
          createdAt: Date.now(),
          priority: "medium",
        }
  );

  useEffect(() => {
    if (editNote || !noteBodyRef.current) return;
    noteBodyRef.current.innerHTML = noteData.body;
  }, [editNote, noteBodyRef.current]);

  useEffect(() => {
    newNote || updateNoteRequest();
  }, [noteData.isPinned, noteData.color, noteData.priority]);

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

  const deleteNoteRequest = async () => {
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await deleteNote(auth.encodedToken, note._id);
      if (status === 200) {
        setNotes(data.notes);
        setTrash((trash) => [...trash, note]);
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
        setTrash((trash) => [...trash, note]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromTrash = () =>
    setTrash((trash) => trash.filter((item) => item._id !== note._id));

  const restoreFromTrash = () => {
    createNoteRequest();
    deleteFromTrash();
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
    colorCountRef.current !== 5
      ? (colorCountRef.current += 1)
      : (colorCountRef.current = 0);
    setNoteData((noteData) => ({
      ...noteData,
      color: NOTE_COLORS[colorCountRef.current],
    }));
  };

  const addLabel = (options) =>
    setNoteData((noteData) => ({
      ...noteData,
      tags: options,
    }));

  const removeLabel = (label) =>
    editNote &&
    setNoteData((noteData) => ({
      ...noteData,
      tags: noteData.tags.filter((tag) => tag !== label),
    }));

  const handlePriorityChange = () =>
    !archivedNote &&
    !deletedNote &&
    setNoteData((noteData) => ({
      ...noteData,
      priority:
        noteData.priority === "low"
          ? "medium"
          : noteData.priority === "medium"
          ? "high"
          : "low",
    }));

  const handleSave = () => {
    newNote ? createNoteRequest() : updateNoteRequest();
  };

  const handleArchive = () =>
    archivedNote ? restoreNoteRequest() : archiveNoteRequest();

  const handleDelete = () =>
    archivedNote
      ? deleteNoteFromArchivesRequest()
      : deletedNote
      ? deleteFromTrash()
      : deleteNoteRequest();

  const clearInputs = () =>
    setNoteData({
      title: "",
      body: "",
      color: NOTE_COLORS[0],
      isPinned: false,
      tags: [],
      createdAt: Date.now(),
      priority: "medium",
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
      <button
        onClick={handlePriorityChange}
        className="pos-abs top-left mt-xs ml-xs"
      >
        {noteData.priority === "low" ? (
          <FcLowPriority className="txt-lg" />
        ) : noteData.priority === "medium" ? (
          <FcMediumPriority className="txt-lg" />
        ) : (
          <FcHighPriority className="txt-lg" />
        )}
      </button>
      <form>
        <textarea
          type="text"
          id="title"
          placeholder="Note Title"
          value={noteData.title}
          disabled={!editNote}
          rows={1}
          onChange={handleNoteChange}
          className="txt-md font-medium mx-lg mb-md px-xl full-width"
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
          <Label
            label={label}
            key={index}
            className="mx-sm"
            onRemove={removeLabel}
          />
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
                className="mx-xs font-medium txt-success"
              >
                Save
              </button>
            ) : (
              !newNote && (
                <button
                  onClick={() => setEditNote(true)}
                  className="mx-xs p-sm br-sm fr-ct-ct hover-light"
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
            <button
              disabled={!editNote}
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
              className={`mx-xs p-sm br-sm fr-ct-ct ${
                editNote ? "hover-light" : ""
              }`}
            >
              <MdLabelOutline className="txt-medium txt-md" />
            </button>
          )}
          {showTagsDropdown && (
            <Dropdown
              className="bottom-right"
              options={TAGS}
              value={noteData.tags}
              onChange={addLabel}
              onClose={() => setShowTagsDropdown(false)}
              name="tags"
            />
          )}
          {!disableArchive && (
            <button
              onClick={handleArchive}
              className="mx-xs p-sm br-sm fr-ct-ct hover-light"
            >
              {archivedNote ? (
                <MdOutlineUnarchive className="txt-medium txt-md" />
              ) : (
                <FiArchive className="txt-medium" />
              )}
            </button>
          )}
          {deletedNote && (
            <button
              onClick={restoreFromTrash}
              className="mx-xs p-sm br-sm fr-ct-ct hover-light"
            >
              <FaTrashRestore className="txt-medium" />
            </button>
          )}
          {!disableDelete && (
            <button
              onClick={handleDelete}
              className="mx-xs p-sm br-sm fr-ct-ct hover-light"
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
