import { useState } from 'react';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    // Store feedback in localStorage for pilot tracking
    const existing = JSON.parse(localStorage.getItem('pilot-feedback') || '[]');
    existing.push({
      text: text.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem('pilot-feedback', JSON.stringify(existing));
    setSent(true);
    setText('');
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(!open); setSent(false); }}
        className="fixed bottom-20 right-4 w-12 h-12 bg-brown text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-brown-light transition-colors z-40"
        aria-label="Report a problem or send feedback"
        title="Report a problem"
      >
        💬
      </button>

      {/* Feedback panel */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg p-6 animate-[slideUp_0.2s_ease-out]">
            {sent ? (
              <div className="text-center py-4">
                <span className="text-4xl">🙏</span>
                <h3 className="font-bold text-lg mt-2">Thank you!</h3>
                <p className="text-brown-light text-sm mt-1">Your feedback has been saved.</p>
                <button onClick={() => setOpen(false)} className="btn-primary mt-4">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Report a Problem</h3>
                  <button onClick={() => setOpen(false)} className="text-brown-light text-xl" aria-label="Close">✕</button>
                </div>
                <p className="text-sm text-brown-light mb-3">
                  Found a bug? Wrong info? Let us know — this helps improve the pilot.
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe what happened..."
                  className="w-full border-2 border-cream-dark rounded-xl p-3 text-sm focus:border-green-mid focus:outline-none resize-none"
                  rows={4}
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="btn-primary w-full mt-3"
                >
                  Send Feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
