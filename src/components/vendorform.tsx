import { timeAgo } from '../data/farms';
import { Farm } from '../types';
import { useState } from 'react';

interface VendorFormProps {
  farms: Farm[];
  onUpdate: (farmId: string, products: { name: string; available: boolean }[]) => void;
  onBack: () => void;
}

export default function VendorForm({ farms, onUpdate, onBack }: VendorFormProps) {
  const [selectedFarmId, setSelectedFarmId] = useState('');
  const [productToggles, setProductToggles] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedFarm = farms.find((f) => f.id === selectedFarmId) || null;

  const handleFarmSelect = (farmId: string) => {
    setSelectedFarmId(farmId);
    const farm = farms.find((f) => f.id === farmId);
    if (farm) {
      const toggles: Record<string, boolean> = {};
      farm.products.forEach((p) => {
        toggles[p.name] = p.available;
      });
      setProductToggles(toggles);
    }
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarm) return;
    const updates = Object.entries(productToggles).map(([name, available]) => ({ name, available }));
    onUpdate(selectedFarmId, updates);
    setSubmitted(true);
  };

  const handleToggle = (productName: string) => {
    setProductToggles((prev) => ({ ...prev, [productName]: !prev[productName] }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-cream px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-cream-dark transition-colors" aria-label="Back">
          ←
        </button>
        <div>
          <h1 className="font-bold text-lg">Vendor Update</h1>
          <p className="text-xs text-brown-light">Update what's available at your farm</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-green-light flex items-center justify-center text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-green-dark">Updated!</h2>
            <p className="text-brown-light mt-2">
              {selectedFarm?.name} availability has been posted.
            </p>
            <p className="text-xs text-brown-light mt-1">
              Last updated: {timeAgo(new Date())}
            </p>
            <p className="text-sm text-green-dark font-medium mt-3 bg-green-light px-4 py-1.5 rounded-full">
              Changes are live — customers can see them now!
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSubmitted(false)} className="btn-primary">
                Update Again
              </button>
              <button onClick={onBack} className="btn-primary bg-amber">
                Back to Map
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Farm selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown-light mb-2">Select Your Farm</label>
              <select
                value={selectedFarmId}
                onChange={(e) => handleFarmSelect(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-cream-dark bg-white text-sm focus:border-green-mid focus:outline-none transition-colors"
                required
              >
                <option value="">— Choose your farm —</option>
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
            </div>

            {selectedFarm && (
              <>
                {/* Product toggles */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brown-light mb-3">
                    What's Available Today?
                  </label>
                  <div className="space-y-2">
                    {selectedFarm.products.map((product) => (
                      <button
                        key={product.name}
                        type="button"
                        onClick={() => handleToggle(product.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                          productToggles[product.name]
                            ? 'border-green-mid bg-green-light'
                            : 'border-cream-dark bg-white'
                        }`}
                      >
                        <span className="text-sm font-medium">{product.name}</span>
                        <span className={`text-sm font-semibold ${
                          productToggles[product.name] ? 'text-green-dark' : 'text-stale'
                        }`}>
                          {productToggles[product.name] ? 'Available ✓' : 'Sold Out'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary w-full">
                  📡 Update Availability
                </button>

                <p className="text-xs text-center text-brown-light mt-3">
                  This takes about 30 seconds. Your customers will see the update immediately.
                </p>
              </>
            )}

            {!selectedFarm && (
              <div className="flex flex-col items-center justify-center py-16 text-brown-light">
                <span className="text-5xl mb-4">🏪</span>
                <p className="font-medium">Select your farm above</p>
                <p className="text-sm mt-1">Toggle what's available today</p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
