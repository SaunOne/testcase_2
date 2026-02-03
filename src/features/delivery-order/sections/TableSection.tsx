import { useState } from "react"
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"
import { ConfirmModal } from "../../../components/ui"
import { DOEmptyState } from "../components"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { removeLineItem, setEditingItem } from "../slices/doSlice"
import type { DOLineItem } from "../types/do.types"

interface TableSectionProps {
  onEdit?: (item: DOLineItem) => void
}

export function TableSection({ onEdit }: TableSectionProps) {
  const lineItems = useAppSelector((state) => state.deliveryOrder.lineItems)
  const dispatch = useAppDispatch()
  const [deleteItem, setDeleteItem] = useState<DOLineItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.ceil(lineItems.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = lineItems.slice(startIndex, endIndex)

  const handleDelete = (item: DOLineItem) => {
    setDeleteItem(item)
  }

  const confirmDelete = () => {
    if (deleteItem) {
      dispatch(removeLineItem(deleteItem.id))
      setDeleteItem(null)
    }
  }

  const handleEdit = (item: DOLineItem) => {
    dispatch(setEditingItem(item))
    onEdit?.(item)
  }

  if (lineItems.length === 0) {
    return <DOEmptyState />
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UOM Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Picking Strategy
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prod Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pack To Deliver
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight To Deliver
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-medium text-gray-900">
                    {item.item.name}
                  </div>
                  <div className="text-xs text-gray-500">{item.item.sku}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.uomOrder}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.condition}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.pickingStrategy}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.prodDate || "-"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.batch}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.packToDeliver ? `${item.packToDeliver} Karung` : "-"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.weightToDeliver} Kg
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg text-primary-500 hover:bg-primary-50 transition-colors"
                      title="Edit"
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Page Size:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option value="10">10</option>
          </select>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">
            {startIndex + 1} to {Math.min(endIndex, lineItems.length)} of{" "}
            {lineItems.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>
            <span className="px-2">
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteItem?.item.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  )
}
