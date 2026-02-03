import { HiOutlineInbox } from 'react-icons/hi';

export function DOEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
      <HiOutlineInbox className="w-12 h-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No items added</h3>
      <p className="text-sm text-gray-500">
        Belum ada item. Tambahkan item melalui form di atas.
      </p>
    </div>
  );
}
