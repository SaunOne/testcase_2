import { HiOutlineBell } from 'react-icons/hi';

interface AppBarProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function AppBar({ breadcrumb = [] }: AppBarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm">
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">&gt;</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-semibold text-gray-900">{item.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <HiOutlineBell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
