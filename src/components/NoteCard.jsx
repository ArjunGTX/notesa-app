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
import { NOTE_COLORS, TOAST_ERRORS, TOAST_SUCCESS } from "../utils/constants";
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
import {
  useArchives,
  useAuth,
  useLabels,
  useNotes,
  useTrash,
} from "../contexts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dropdown } from "./Dropdown";
import { toast } from "react-toastify";
import { useDidUpdateEffect } from "../utils/hooks";
import { Loader } from "./Loader";

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
  const { labels } = useLabels();

  const colorCountRef = useRef(0);
  const noteBodyRef = useRef(null);

  const [loading, setLoading] = useState(false);
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
          priority: "Medium",
        }
  );

  useEffect(() => {
    if (editNote || !noteBodyRef.current) return;
    noteBodyRef.current.innerHTML = noteData.body;
  }, [editNote, noteBodyRef.current]);

  useDidUpdateEffect(() => {
    newNote || updateNoteRequest();
  }, [noteData.isPinned, noteData.color, noteData.priority]);

  //Intentionally added timer of 800ms on all request to display the loading image for more duration
  const createNoteRequest = async (fromTrash) => {
    !fromTrash && setLoading(true);
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await addNote(auth.encodedToken, noteData);
      if (status === 201) {
        setNotes(data.notes);
        clearInputs();
        fromTrash
          ? setTimeout(() => toast.success(TOAST_SUCCESS.RESTORE_NOTE), 800)
          : setTimeout(() => toast.success(TOAST_SUCCESS.CREATE_NOTE), 800);
      }
    } catch (error) {
      setTimeout(() => toast.error(TOAST_ERRORS.CREATE_NOTE), 800);
    } finally {
      !fromTrash && setTimeout(() => setLoading(false), 800);
    }
  };

  const updateNoteRequest = async () => {
    setLoading(true);
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
        setTimeout(() => toast.success(TOAST_SUCCESS.UPDATE_NOTE), 800);
      }
    } catch (error) {
      setTimeout(() => toast.error(TOAST_ERRORS.UPDATE_NOTE), 800);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const deleteNoteRequest = async () => {
    setLoading(true);
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await deleteNote(auth.encodedToken, note._id);
      if (status === 200) {
        setNotes(data.notes);
        setTrash((trash) => [...trash, note]);
        setTimeout(() => toast.success(TOAST_SUCCESS.DELETE_NOTE), 800);
      }
    } catch (error) {
      setTimeout(() => toast.error(TOAST_ERRORS.DELETE_NOTE), 800);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const archiveNoteRequest = async () => {
    setLoading(true);
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
        setTimeout(() => toast.success(TOAST_SUCCESS.ARCHIVE_NOTE), 800);
      }
    } catch (error) {
      setTimeout(() => toast.error(TOAST_ERRORS.ARCHIVE_NOTE), 800);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const restoreNoteRequest = async () => {
    setLoading(true);
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await restoreFromArchives(
        auth.encodedToken,
        note._id
      );
      if (status === 200) {
        setArchives(data.archives);
        setNotes(data.notes);
        setTimeout(() => toast.success(TOAST_SUCCESS.UNARCHIVE_NOTE), 800);
      }
    } catch (error) {
      setTimeout(() => toast.error(TOAST_ERRORS.UNARCHIVE_NOTE), 800);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const deleteNoteFromArchivesRequest = async () => {
    setLoading(true);
    try {
      if (!auth.isLoggedIn) return;
      const { status, data } = await deleteFromArchives(
        auth.encodedToken,
        note._id
      );
      if (status === 200) {
        setArchives(data.archives);
        setTrash((trash) => [...trash, note]);
        setTimeout(() => toast.success(TOAST_SUCCESS.DELETE_NOTE), 800);
      }
    } catch (error) {
      setTimeout(() => toast.error(TOAST_ERRORS.DELETE_NOTE), 800);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const deleteFromTrash = (isRestore) => {
    setTrash((trash) => trash.filter((item) => item._id !== note._id));
    if (!isRestore) {
      setLoading(true);
      setTimeout(() => toast.success(TOAST_SUCCESS.PERMANENT_DELETE_NOTE), 800);
      setTimeout(() => setLoading(false), 800);
    }
  };

  const restoreFromTrash = () => {
    createNoteRequest(true);
    deleteFromTrash(true);
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
        noteData.priority === "Low"
          ? "Medium"
          : noteData.priority === "Medium"
          ? "High"
          : "Low",
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
      priority: "Medium",
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
        {noteData.priority === "Low" ? (
          <FcLowPriority className="txt-lg" />
        ) : noteData.priority === "Medium" ? (
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
              options={labels}
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
      {loading && <Loader />}
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
