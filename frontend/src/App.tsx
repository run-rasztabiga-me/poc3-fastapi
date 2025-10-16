import React, { useState, useEffect } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/notes`);
      if (!response.ok) throw new Error('Nie udało się pobrać notatek');
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (title: string, content: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error('Nie udało się utworzyć notatki');
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    }
  };

  const handleUpdateNote = async (id: number, title: string, content: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error('Nie udało się zaktualizować notatki');
      setEditingNote(null);
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę notatkę?')) return;

    try {
      setError(null);
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Nie udało się usunąć notatki');
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplikacja do zarządzania notatkami</h1>
      </header>
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        <NoteForm
          note={editingNote}
          onSubmit={(title, content) => {
            if (editingNote) {
              handleUpdateNote(editingNote.id, title, content);
            } else {
              handleCreateNote(title, content);
            }
          }}
          onCancel={() => setEditingNote(null)}
        />

        {loading ? (
          <p>Ładowanie notatek...</p>
        ) : (
          <NotesList
            notes={notes}
            onEdit={setEditingNote}
            onDelete={handleDeleteNote}
          />
        )}
      </main>
    </div>
  );
}

export default App;
