import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

interface DOActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function DOActionButtons({ onEdit, onDelete }: DOActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="p-1.5 rounded-lg text-primary-500 hover:bg-primary-50 transition-colors"
        title="Edit"
      >
        <HiOutlinePencil className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <HiOutlineTrash className="w-5 h-5" />
      </button>
    </div>
  );
}
