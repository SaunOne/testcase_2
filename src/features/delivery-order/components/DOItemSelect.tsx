import clsx from 'clsx';
import { useGetItemsQuery } from '../../../_services/api';

interface DOItemSelectProps {
  value: string;
  onChange: (itemId: string) => void;
  error?: string;
}

export function DOItemSelect({ value, onChange, error }: DOItemSelectProps) {
  const { data: items, isLoading } = useGetItemsQuery();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Order Item
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'block w-full rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
          {
            'border-gray-300': !error,
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          }
        )}
        disabled={isLoading}
      >
        <option value="">Select</option>
        {items?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} ({item.sku})
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
