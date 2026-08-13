import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="bg-amber text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2" role="alert">
      <span>📡</span>
      <span>You're offline — saved data still works, but updates won't sync.</span>
    </div>
  );
}
