import { ViewMode } from '../types';

interface BottomNavProps {
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  const items: { mode: ViewMode; icon: string; label: string }[] = [
    { mode: 'map', icon: '🗺️', label: 'Map' },
    { mode: 'list', icon: '📋', label: 'List' },
    { mode: 'favorites', icon: '❤️', label: 'Saved' },
    { mode: 'vendor', icon: '🏪', label: 'Vendor' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark flex justify-around items-center h-16 safe-area-bottom z-50 max-w-lg mx-auto">
      {items.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-lg transition-colors ${
            active === mode ? 'text-green-dark' : 'text-brown-light'
          }`}
        >
          <span className="text-xl">{icon}</span>
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
}
