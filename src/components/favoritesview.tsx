import { Farm } from '../types';
import { getAvailabilityState, timeAgo } from '../data/farms';

interface FavoritesViewProps {
  farms: Farm[];
  onSelectFarm: (farm: Farm) => void;
}

export default function FavoritesView({ farms, onSelectFarm }: FavoritesViewProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 space-y-3">
      {farms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-brown-light">
          <span className="text-5xl mb-4">❤️</span>
          <p className="font-medium text-lg">No saved farms yet</p>
          <p className="text-sm mt-1">Tap the heart on any farm to save it here</p>
        </div>
      ) : (
        farms.map((farm) => {
          const state = getAvailabilityState(farm);
          const badgeClass = state === 'available' ? 'badge-green' : state === 'sold-out' ? 'badge-amber' : 'badge-stale';
          const badgeText = state === 'available' ? 'Available' : state === 'sold-out' ? 'Sold Out' : 'Not Updated';

          return (
            <button
              key={farm.id}
              onClick={() => onSelectFarm(farm)}
              className="card p-4 w-full text-left hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-3xl flex-shrink-0">
                  {farm.imagePlaceholder}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{farm.name}</h3>
                    <span className={badgeClass}>{badgeText}</span>
                  </div>
                  <p className="text-sm text-brown-light mt-0.5 line-clamp-2">{farm.description}</p>
                  <p className="text-xs text-brown-light mt-1">🕐 {timeAgo(farm.lastUpdated)}</p>
                </div>
                <span className="text-red-400 text-lg flex-shrink-0">❤️</span>
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}
