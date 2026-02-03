import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex bg-gray-100 rounded-lg p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={clsx(
            'flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
            {
              'bg-primary-500 text-white shadow-sm': activeTab === tab.id,
              'text-gray-600 hover:text-gray-900 hover:bg-gray-200':
                activeTab !== tab.id && !tab.disabled,
              'text-gray-400 cursor-not-allowed': tab.disabled,
            }
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
