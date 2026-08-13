import { ProductCategory } from '../types';
import { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/farms';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  activeCategory: ProductCategory | 'all';
  resultCount: number;
}

export default function SearchBar({ value, onChange, activeCategory, resultCount }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const activeLabel = CATEGORIES.find((c) => c.key === activeCategory)?.label || 'All';

  return (
    <div className="px-4 pt-3 pb-1">
      <div className={`flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border-2 transition-all ${
        focused ? 'border-green-mid shadow-md' : 'border-cream-dark'
      }`}>
        <span className="text-lg flex-shrink-0">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={`Search ${activeLabel === 'All' ? 'farms & products' : activeLabel.toLowerCase()}...`}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-brown-light"
          aria-label="Search farms and products"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="text-brown-light hover:text-brown text-lg px-1"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {value && (
        <p className="text-xs text-brown-light mt-1.5 ml-1">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      )}
    </div>
  );
}
