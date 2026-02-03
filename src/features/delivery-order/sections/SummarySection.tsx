import { Card } from '../../../components/ui';
import { useDOSummary } from '../hooks/useDOSummary';

export function SummarySection() {
  const { summary } = useDOSummary();

  return (
    <div className="flex justify-end">
      <Card className="w-80">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Items</span>
            <span className="font-semibold">{summary.totalItems} Items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Packs</span>
            <span className="font-semibold">{summary.totalPacks} Karung</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Weight</span>
            <span className="font-semibold">{summary.totalWeight} Kg</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
