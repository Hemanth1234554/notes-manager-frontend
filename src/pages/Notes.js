import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null); // ✅ new state for editing
  const navigate = useNavigate();

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const { data } = await API.get("/notes");
      setNotes(data);
    } catch (err) {
      setError("Failed to load notes. Please try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchNotes();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new note
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/notes", form);
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      setError("Failed to add note.");
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  // Open modal to edit
  const openEditModal = (note) => {
    setEditingNote(note);
  };

  // Close modal
  const closeModal = () => {
    setEditingNote(null);
  };

  // Update note
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/notes/${editingNote._id}`, {
        title: editingNote.title,
        content: editingNote.content,
      });
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      setError("Failed to update note.");
    }
  };

  return (
    <div className="notes-wrapper">
      <div className="notes-header">
        <h2>My Notes</h2>
      </div>

      {/* Add Note */}
      <form className="note-form" onSubmit={handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Note title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your note..."
          value={form.content}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Add Note</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Notes Grid */}
      <div className="notes-grid">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet. Add one!</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small className="note-date">
                {new Date(note.createdAt).toLocaleDateString()}
              </small>
              <div className="note-actions">
                <button onClick={() => openEditModal(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🪄 Edit Modal */}
      {editingNote && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Note</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, title: e.target.value })
                }
                required
              />
              <textarea
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, content: e.target.value })
                }
                required
              ></textarea>
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
