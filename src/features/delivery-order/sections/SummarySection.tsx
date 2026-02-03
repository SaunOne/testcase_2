import { useDOSummary } from "../hooks/useDOSummary"

export function SummarySection() {
  const { summary } = useDOSummary()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Items</span>
          <span className="font-semibold text-gray-900">
            {summary.totalItems} Items
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Packs</span>
          <span className="font-semibold text-gray-900">
            {summary.totalPacks} Karung
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Weight</span>
          <span className="font-semibold text-gray-900">
            {summary.totalWeight} Kg
          </span>
        </div>
      </div>
    </div>
  )
}
