import clsx from 'clsx';
import type { UOMType } from '../types/do.types';

interface DOUomRadioProps {
  value: UOMType;
  onChange: (uom: UOMType) => void;
  suggestedUom?: UOMType;
}

const options: { value: UOMType; label: string }[] = [
  { value: 'Pack', label: 'Pack UOM' },
  { value: 'Weight', label: 'Weight UOM' },
];

export function DOUomRadio({ value, onChange, suggestedUom }: DOUomRadioProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Please select UOM Order Type
      </label>
      <div className="flex gap-4">
        {options.map((option) => {
          const isSelected = value === option.value;
          const isSuggested = suggestedUom === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200',
                {
                  'border-primary-500 bg-primary-50 text-primary-700': isSelected,
                  'border-gray-200 bg-white text-gray-700 hover:border-gray-300': !isSelected,
                }
              )}
            >
              <span
                className={clsx(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                  {
                    'border-primary-500': isSelected,
                    'border-gray-300': !isSelected,
                  }
                )}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                )}
              </span>
              <span className="font-medium">{option.label}</span>
              {isSuggested && !isSelected && (
                <span className="text-xs text-gray-400">(suggested)</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
