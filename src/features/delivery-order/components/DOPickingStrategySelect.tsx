import clsx from 'clsx';
import type { PickingStrategy } from '../types/do.types';

interface DOPickingStrategySelectProps {
  value: PickingStrategy;
  onChange: (strategy: PickingStrategy) => void;
  error?: string;
}

const strategies: { value: PickingStrategy; label: string; subtitle: string }[] = [
  { value: 'FIFO', label: 'FIFO', subtitle: 'Picking Strategy' },
  { value: 'FEFO', label: 'FEFO', subtitle: 'Picking Strategy' },
];

export function DOPickingStrategySelect({ value, onChange, error }: DOPickingStrategySelectProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Please select one Picking Strategy
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3">
          <div className="font-semibold text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">Picking Strategy</div>
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as PickingStrategy)}
          className={clsx(
            'block w-full rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
            {
              'border-gray-300': !error,
              'border-red-500': error,
            }
          )}
        >
          <option value="">Select Type</option>
          {strategies.map((strategy) => (
            <option key={strategy.value} value={strategy.value}>
              {strategy.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
