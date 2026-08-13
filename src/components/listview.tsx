import { Farm } from '../types';
import { getAvailabilityState, timeAgo } from '../data/farms';

interface ListViewProps {
  farms: Farm[];
  onSelectFarm: (farm: Farm) => void;
}

export default function ListView({ farms, onSelectFarm }: ListViewProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 space-y-3">
      {farms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-brown-light">
          <span className="text-4xl mb-3">🌾</span>
          <p className="font-medium">No farms found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
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
                    {farm.favorited && <span className="text-sm">❤️</span>}
                    {(farm as any).alertEnabled && <span className="text-sm">🔔</span>}
                  </div>
                  <p className="text-sm text-brown-light mt-0.5 line-clamp-2">{farm.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-brown-light">
                    <span>📍 {farm.address.split(',')[0]}</span>
                    <span>🕐 {timeAgo(farm.lastUpdated)}</span>
                  </div>
                </div>
                <span className="text-brown-light text-lg flex-shrink-0 self-center">›</span>
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}
