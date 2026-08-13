import { CATEGORIES } from '../data/farms';
import { ProductCategory } from '../types';

interface FilterBarProps {
  selected: ProductCategory | 'all';
  onChange: (category: ProductCategory | 'all') => void;
}

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
      {CATEGORIES.map(({ key, label, emoji }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`chip ${selected === key ? 'chip-active' : 'chip-inactive'}`}
          aria-pressed={selected === key}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
}
