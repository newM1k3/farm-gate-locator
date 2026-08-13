import { useState, useEffect } from 'react';
import { Farm } from '../types';

interface VisitNotesProps {
  farmId: string;
  farmName: string;
}

interface VisitNote {
  date: string;
  text: string;
  found: boolean;
}

export default function VisitNotes({ farmId, farmName }: VisitNotesProps) {
  const [notes, setNotes] = useState<VisitNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [foundProduct, setFoundProduct] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const key = `visit-notes-${farmId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try { setNotes(JSON.parse(saved)); } catch {}
    }
  }, [farmId]);

  // Save notes to localStorage
  const saveNotes = (updated: VisitNote[]) => {
    setNotes(updated);
    localStorage.setItem(`visit-notes-${farmId}`, JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newNote.trim()) return;
    const note: VisitNote = {
      date: new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
      text: newNote.trim(),
      found: foundProduct,
    };
    saveNotes([note, ...notes]);
    setNewNote('');
    setFoundProduct(true);
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    saveNotes(updated);
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm text-brown-light uppercase tracking-wide">Visit Notes</h2>
        {notes.length > 0 && (
          <span className="text-xs text-brown-light">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Add note button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full border-2 border-dashed border-cream-dark rounded-xl py-3 text-sm text-brown-light hover:border-green-mid hover:text-green-dark transition-colors"
        >
          ✏️ Add a visit note
        </button>
      )}

      {/* Add note form */}
      {showForm && (
        <div className="bg-cream rounded-xl p-3 space-y-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={`What did you find at ${farmName}? Was the availability accurate?`}
            className="w-full bg-white rounded-lg p-3 text-sm border border-cream-dark focus:border-green-mid focus:outline-none resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={foundProduct}
                onChange={(e) => setFoundProduct(e.target.checked)}
                className="w-4 h-4 rounded accent-green-dark"
              />
              {foundProduct ? '✅' : '❌'} Found what I was looking for
            </label>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="btn-primary text-sm py-2 flex-1">
              Save Note
            </button>
            <button
              onClick={() => { setShowForm(false); setNewNote(''); setFoundProduct(true); }}
              className="px-4 py-2 rounded-xl border border-cream-dark text-sm text-brown-light hover:bg-cream-dark transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes list */}
      {notes.length > 0 && (
        <div className="mt-3 space-y-2">
          {notes.map((note, i) => (
            <div key={i} className="bg-cream rounded-xl p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-brown-light">{note.date}</span>
                    <span className={`text-xs font-medium ${note.found ? 'text-green-dark' : 'text-red'}`}>
                      {note.found ? '✓ Found it' : '✗ Not available'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{note.text}</p>
                </div>
                <button
                  onClick={() => handleDelete(i)}
                  className="text-brown-light hover:text-red text-sm px-1 flex-shrink-0"
                  aria-label="Delete note"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
