import { Farm } from '../types';
import { getAvailabilityState, timeAgo } from '../data/farms';
import { useState } from 'react';
import VisitNotes from './visitnotes';

interface FarmDetailProps {
  farm: Farm;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onToggleAlert: (id: string) => void;
}

export default function FarmDetail({ farm, onBack, onToggleFavorite, onToggleAlert }: FarmDetailProps) {
  const [saved, setSaved] = useState(farm.favorited);
  const [alertOn, setAlertOn] = useState((farm as any).alertEnabled || false);
  const state = getAvailabilityState(farm);
  const stateLabel = state === 'available' ? 'Products Available' : state === 'sold-out' ? 'Currently Sold Out' : 'Not Recently Updated';
  const stateColor = state === 'available' ? 'text-green-dark' : state === 'sold-out' ? 'text-amber' : 'text-stale';

  const handleSave = () => {
    setSaved(!saved);
    onToggleFavorite(farm.id);
  };

  const handleAlert = () => {
    setAlertOn(!alertOn);
    onToggleAlert(farm.id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-cream px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-cream-dark transition-colors" aria-label="Back">
          ←
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-lg truncate">{farm.name}</h1>
          <p className={`text-sm font-medium ${stateColor}`}>{stateLabel}</p>
        </div>
        <button
          onClick={handleAlert}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all ${
            alertOn ? 'bg-amber-light text-amber' : 'bg-white text-brown-light'
          }`}
          aria-label={alertOn ? 'Alerts enabled' : 'Enable alerts'}
          title={alertOn ? 'You will be notified when this farm updates' : 'Get notified when this farm updates'}
        >
          {alertOn ? '🔔' : '🔕'}
        </button>
        <button
          onClick={handleSave}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all ${
            saved ? 'bg-red-50 text-red-500' : 'bg-white text-brown-light'
          }`}
          aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Image placeholder */}
        <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-green-light to-cream flex items-center justify-center text-6xl">
          {farm.imagePlaceholder}
        </div>

        {/* Alert status banner */}
        {alertOn && (
          <div className="bg-amber-light border border-amber/20 rounded-xl p-3 flex items-center gap-3">
            <span className="text-xl">🔔</span>
            <div>
              <p className="text-sm font-semibold text-amber">Alert Active</p>
              <p className="text-xs text-brown-light">We'll notify you when {farm.name} updates their availability.</p>
            </div>
          </div>
        )}

        {/* Stale data warning */}
        {state === 'stale' && (
          <div className="stale-warning" role="alert">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-brown">Availability may be outdated</p>
              <p className="text-xs text-brown-light">
                This farm hasn't updated in over 48 hours. Call ahead before visiting.
              </p>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="card p-4">
          <h2 className="font-semibold text-sm text-brown-light uppercase tracking-wide mb-2">About</h2>
          <p className="text-sm leading-relaxed">{farm.description}</p>
          <div className="flex flex-col gap-1.5 mt-3 text-sm text-brown-light">
            <span>📍 {farm.address}</span>
            <span>📞 {farm.phone}</span>
            <span>🕐 Updated {timeAgo(farm.lastUpdated)}</span>
          </div>
        </div>

        {/* Availability */}
        <div className="card p-4">
          <h2 className="font-semibold text-sm text-brown-light uppercase tracking-wide mb-3">What's Available Today</h2>
          <div className="space-y-2">
            {farm.products.map((product, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-cream-dark last:border-0">
                <span className="text-sm font-medium">{product.name}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  product.available ? 'bg-green-light text-green-dark' : 'bg-red-light text-red'
                }`}>
                  {product.available ? '✓ Available' : '✗ Sold Out'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Directions */}
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(farm.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center block"
        >
          🧭 Get Directions
        </a>

        {/* Visit Notes */}
        <VisitNotes farmId={farm.id} farmName={farm.name} />
      </div>
    </div>
  );
}
