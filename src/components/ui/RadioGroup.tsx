import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  options: RadioOption[];
  selectedValue?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ className, label, error, options, selectedValue, orientation = 'horizontal', name, onChange, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div
          className={clsx(
            'flex gap-4',
            {
              'flex-row': orientation === 'horizontal',
              'flex-col': orientation === 'vertical',
            },
            className
          )}
        >
          {options.map((option, index) => (
            <label
              key={option.value}
              className={clsx(
                'flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors',
                {
                  'bg-primary-50 border-primary-500 text-primary-700': selectedValue === option.value,
                  'bg-white border-gray-300 text-gray-700 hover:bg-gray-50': selectedValue !== option.value,
                }
              )}
            >
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
                className="sr-only"
                {...props}
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
