import { Farm } from '../types';
import { getAvailabilityState, timeAgo } from '../data/farms';
import { useState } from 'react';

interface MapViewProps {
  farms: Farm[];
  onSelectFarm: (farm: Farm) => void;
}

export default function MapView({ farms, onSelectFarm }: MapViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Position pins within a relative map area
  const pinPositions: Record<string, { x: number; y: number }> = {
    'green-meadow': { x: 25, y: 30 },
    'kawartha-berry': { x: 65, y: 20 },
    'maple-ridge': { x: 15, y: 50 },
    'sunflower-homestead': { x: 55, y: 55 },
    'lakeside-bakes': { x: 40, y: 70 },
  };

  const selectedFarm = selectedId ? farms.find((f) => f.id === selectedId) : null;

  return (
    <div className="relative flex flex-col h-full">
      {/* Map Area */}
      <div className="relative flex-1 mx-4 mt-3 rounded-2xl overflow-hidden bg-gradient-to-b from-green-light/60 to-cream">
        {/* Map grid lines */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-green-dark/10" style={{ top: `${i * 20}%` }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-green-dark/10" style={{ left: `${i * 25}%` }} />
          ))}
        </div>

        {/* Map label */}
        <div className="absolute top-3 left-3 bg-white/90 rounded-lg px-3 py-1.5 text-xs font-semibold text-brown-light shadow-sm">
          Peterborough · Kawartha Lakes
        </div>

        {/* Farm pins */}
        {farms.map((farm) => {
          const pos = pinPositions[farm.id] || { x: 50, y: 50 };
          const state = getAvailabilityState(farm);
          const isSelected = selectedId === farm.id;
          const pinColor = state === 'available' ? 'bg-green-avail' : state === 'sold-out' ? 'bg-amber' : 'bg-stale';

          return (
            <button
              key={farm.id}
              onClick={() => setSelectedId(farm.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                isSelected ? 'scale-125 z-20' : 'z-10 hover:scale-110'
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              aria-label={farm.name}
            >
              <div className={`w-8 h-8 ${pinColor} rounded-full flex items-center justify-center shadow-lg border-2 border-white text-lg`}>
                📍
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-lg px-2 py-0.5 text-xs font-medium shadow-sm whitespace-nowrap">
                {farm.name.split(' ')[0]}
              </div>
            </button>
          );
        })}

        {farms.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-brown-light text-sm">No farms found</p>
          </div>
        )}
      </div>

      {/* Selected farm preview card */}
      {selectedFarm && (
        <div className="mx-4 mb-3 mt-2 card p-4 animate-[slideUp_0.2s_ease-out]">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-2xl flex-shrink-0">
              {selectedFarm.imagePlaceholder}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-sm truncate">{selectedFarm.name}</h3>
                {(() => {
                  const s = getAvailabilityState(selectedFarm);
                  const cls = s === 'available' ? 'badge-green' : s === 'sold-out' ? 'badge-amber' : 'badge-stale';
                  const txt = s === 'available' ? 'Available' : s === 'sold-out' ? 'Sold Out' : 'Not Updated';
                  return <span className={cls}>{txt}</span>;
                })()}
                {selectedFarm.favorited && <span className="text-xs">❤️</span>}
                {(selectedFarm as any).alertEnabled && <span className="text-xs">🔔</span>}
              </div>
              <p className="text-xs text-brown-light mt-0.5">{selectedFarm.address}</p>
              <p className="text-xs text-brown-light mt-0.5">Updated {timeAgo(selectedFarm.lastUpdated)}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => onSelectFarm(selectedFarm)} className="btn-primary flex-1 text-sm py-2">
              View Details
            </button>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedFarm.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2"
            >
              🧭 Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
