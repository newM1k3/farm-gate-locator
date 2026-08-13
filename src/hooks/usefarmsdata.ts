import { useState, useCallback, useEffect } from 'react';
import { Farm, ProductCategory } from '../types';
import { FARMS as defaultFarms, getAvailabilityState } from '../data/farms';

const STORAGE_KEY = 'farm-gate-farms';

function loadFarms(): Farm[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Parse date strings back to Date objects
      return parsed.map((f: Farm) => ({
        ...f,
        lastUpdated: new Date(f.lastUpdated),
      }));
    }
  } catch {}
  return defaultFarms;
}

function saveFarms(farms: Farm[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(farms));
  } catch {
    // Private browsing and full quotas should not stop the in-memory pilot.
  }
}

export function useFarmsData() {
  const [farms, setFarms] = useState<Farm[]>(loadFarms);

  // Persist on change
  useEffect(() => {
    saveFarms(farms);
  }, [farms]);

  const updateVendor = useCallback(
    (farmId: string, products: { name: string; available: boolean }[]) => {
      setFarms((prev) =>
        prev.map((f) => {
          if (f.id !== farmId) return f;
          return {
            ...f,
            lastUpdated: new Date(),
            products: f.products.map((p) => {
              const update = products.find((u) => u.name === p.name);
              return update ? { ...p, available: update.available } : p;
            }),
          };
        })
      );
    },
    []
  );

  const toggleFavorite = useCallback((farmId: string) => {
    setFarms((prev) =>
      prev.map((f) => {
        if (f.id !== farmId) return f;
        return { ...f, favorited: !f.favorited };
      })
    );
  }, []);

  const toggleAlert = useCallback((farmId: string) => {
    setFarms((prev) =>
      prev.map((f) => {
        if (f.id !== farmId) return f;
        return { ...f, alertEnabled: !f.alertEnabled };
      })
    );
  }, []);

  const getFilteredFarms = useCallback(
    (category: ProductCategory | 'all', search: string) => {
      return farms.filter((f) => {
        const catMatch =
          category === 'all' || f.products.some((p) => p.category === category);
        if (!catMatch) return false;
        if (!search.trim()) return true;
        const q = search.toLowerCase().trim();
        return (
          f.name.toLowerCase().includes(q) ||
          f.products.some((p) => p.name.toLowerCase().includes(q)) ||
          f.description.toLowerCase().includes(q)
        );
      });
    },
    [farms]
  );

  const getFavorites = useCallback(
    (search: string = '') => {
      return farms.filter((f) => {
        if (!f.favorited) return false;
        if (!search.trim()) return true;
        const q = search.toLowerCase().trim();
        return (
          f.name.toLowerCase().includes(q) ||
          f.products.some((p) => p.name.toLowerCase().includes(q)) ||
          f.description.toLowerCase().includes(q)
        );
      });
    },
    [farms]
  );

  // Farms with alerts enabled that have been updated recently
  const getAlertedFarms = useCallback(() => {
    const now = new Date();
    return farms.filter((f) => {
      if (!f.alertEnabled) return false;
      const hoursSinceUpdate = (now.getTime() - f.lastUpdated.getTime()) / 3600000;
      return hoursSinceUpdate < 24;
    });
  }, [farms]);

  const resetToDefaults = useCallback(() => {
    setFarms(defaultFarms);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    farms,
    updateVendor,
    toggleFavorite,
    toggleAlert,
    getFilteredFarms,
    getFavorites,
    getAlertedFarms,
    resetToDefaults,
  };
}
