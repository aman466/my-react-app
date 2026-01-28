import { useState } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Header from "./Header";
import Footer from "./Footer";

// Generate unique IDs for notes and items
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch (error) {
      console.log('Failed to read earlier notes.', error);
      return [];
    }
  });

  function addNote(newNote) {
    setNotes((prevNotes) => {
      // Convert content to items array (split by line breaks)
      const items = newNote.content
        .split('\n')
        .filter(item => item.trim() !== '')
        .map(text => ({
          id: generateId(),
          text,
          completed: false
        }));

      const noteWithItems = {
        id: generateId(),
        title: newNote.title,
        items: items
      };

      const notes = [...prevNotes, noteWithItems];
      localStorage.setItem("notes", JSON.stringify(notes));
      return notes;
    });
  }

  function deleteNote(noteId) {
    setNotes((prevNotes) => {
      const notes = prevNotes.filter(note => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(notes));
      return notes;
    });
  }

  function toggleComplete(noteId, itemId) {
    setNotes((prevNotes) => {
      const notes = prevNotes.map(note => {
        // Skip notes that aren't the target
        if (note.id !== noteId) return note;

        // Toggle the specific item's completed state
        const updatedItems = note.items.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );

        return { ...note, items: updatedItems };
      });

      localStorage.setItem("notes", JSON.stringify(notes));
      return notes;
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          items={note.items || []}
          onDelete={deleteNote}
          onToggle={toggleComplete}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
