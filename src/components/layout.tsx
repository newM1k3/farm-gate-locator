import { ViewMode, Farm, ProductCategory } from '../types';
import { useState, useCallback, useMemo } from 'react';
import { useFarmsData } from '../hooks/usefarmsdata';
import BottomNav from './bottomnav';
import FilterBar from './filterbar';
import SearchBar from './searchbar';
import MapView from './mapview';
import ListView from './listview';
import FarmDetail from './farmdetail';
import VendorForm from './vendorform';
import FavoritesView from './favoritesview';
import OfflineBanner from './offlinebanner';
import FeedbackButton from './feedbackbutton';

export default function Layout() {
  const [view, setView] = useState<ViewMode>('map');
  const [filterCategory, setFilterCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  const {
    farms,
    updateVendor,
    toggleFavorite,
    toggleAlert,
    getFilteredFarms,
    getFavorites,
  } = useFarmsData();

  const filteredFarms = useMemo(
    () => getFilteredFarms(filterCategory, searchQuery),
    [filterCategory, searchQuery, getFilteredFarms]
  );

  const favoriteFarms = useMemo(
    () => getFavorites(searchQuery),
    [searchQuery, getFavorites]
  );

  const selectedFarm = selectedFarmId ? farms.find((f) => f.id === selectedFarmId) || null : null;

  const resultCount = filteredFarms.length;

  const handleSelectFarm = useCallback((farm: Farm) => {
    setSelectedFarmId(farm.id);
    setView('detail');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedFarmId(null);
    setView('map');
  }, []);

  const handleToggleFavorite = useCallback(
    (farmId: string) => {
      toggleFavorite(farmId);
    },
    [toggleFavorite]
  );

  const handleToggleAlert = useCallback(
    (farmId: string) => {
      toggleAlert(farmId);
    },
    [toggleAlert]
  );

  const handleVendorUpdate = useCallback(
    (farmId: string, products: { name: string; available: boolean }[]) => {
      updateVendor(farmId, products);
    },
    [updateVendor]
  );

  const showSearch = view === 'map' || view === 'list';

  return (
    <div className="h-full flex flex-col max-w-lg mx-auto bg-[#E8E0D5]">
      {/* Skip to content link — accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-green-dark focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* Offline banner */}
      <OfflineBanner />
      {/* Header */}
      {view !== 'detail' && view !== 'vendor' && (
        <header className="bg-cream px-4 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-brown flex items-center gap-2">
                🌾 Farm Gate Locator
              </h1>
              <p className="text-xs text-brown-light mt-0.5">Peterborough · Kawartha Lakes</p>
            </div>
            <div className="flex gap-2">
              {view === 'map' && (
                <button
                  onClick={() => setView('list')}
                  className="text-sm text-green-dark font-medium bg-green-light px-3 py-1.5 rounded-lg hover:bg-green-mid/20 transition-colors"
                >
                  List View
                </button>
              )}
              {view === 'list' && (
                <button
                  onClick={() => setView('map')}
                  className="text-sm text-green-dark font-medium bg-green-light px-3 py-1.5 rounded-lg hover:bg-green-mid/20 transition-colors"
                >
                  Map View
                </button>
              )}
              {view === 'favorites' && (
                <button
                  onClick={() => setView('map')}
                  className="text-sm text-green-dark font-medium bg-green-light px-3 py-1.5 rounded-lg hover:bg-green-mid/20 transition-colors"
                >
                  Map View
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Search bar */}
      {showSearch && (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          activeCategory={filterCategory}
          resultCount={resultCount}
        />
      )}

      {/* Filter bar */}
      {showSearch && <FilterBar selected={filterCategory} onChange={setFilterCategory} />}

      {/* Main content */}
      <main id="main-content" className="flex-1 flex flex-col min-h-0">
      {view === 'map' && (
        <MapView farms={filteredFarms} onSelectFarm={handleSelectFarm} />
      )}
      {view === 'list' && (
        <ListView farms={filteredFarms} onSelectFarm={handleSelectFarm} />
      )}
      {view === 'detail' && selectedFarm && (
        <FarmDetail
          farm={selectedFarm}
          onBack={handleBack}
          onToggleFavorite={handleToggleFavorite}
          onToggleAlert={handleToggleAlert}
        />
      )}
      {view === 'vendor' && (
        <VendorForm farms={farms} onUpdate={handleVendorUpdate} onBack={handleBack} />
      )}
      {view === 'favorites' && (
        <FavoritesView farms={favoriteFarms} onSelectFarm={handleSelectFarm} />
      )}
      </main>

      {/* Bottom nav */}
      <BottomNav active={view} onChange={(mode) => { setView(mode); setSelectedFarmId(null); }} />

      {/* Feedback / support button */}
      <FeedbackButton />
    </div>
  );
}
