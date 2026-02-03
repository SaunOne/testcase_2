import type { MasterItem } from '../types/do.types';

interface DOStockCardProps {
  item: MasterItem | null;
}

interface StockColumnProps {
  label: string;
  pack: number;
  kg: number;
}

function StockColumn({ label, pack, kg }: StockColumnProps) {
  return (
    <div className="text-center">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-semibold text-gray-900">{pack} Karung</div>
      <div className="text-sm text-gray-600">{kg} Kg</div>
    </div>
  );
}

export function DOStockCard({ item }: DOStockCardProps) {
  if (!item) {
    return (
      <div className="grid grid-cols-6 gap-4 py-4 px-2 bg-gray-50 rounded-lg mb-4">
        {['SOH', 'Allocated', 'Blocked', 'Picked', 'Damage', 'Available'].map((label) => (
          <div key={label} className="text-center">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="font-semibold text-gray-400">- Karung</div>
            <div className="text-sm text-gray-400">- Kg</div>
          </div>
        ))}
      </div>
    );
  }

  const { stock } = item;

  return (
    <div className="grid grid-cols-6 gap-4 py-4 px-2 bg-gray-50 rounded-lg mb-4">
      <StockColumn label="SOH" pack={stock.soh.pack} kg={stock.soh.kg} />
      <StockColumn label="Allocated" pack={stock.allocated.pack} kg={stock.allocated.kg} />
      <StockColumn label="Blocked" pack={stock.blocked.pack} kg={stock.blocked.kg} />
      <StockColumn label="Picked" pack={stock.picked.pack} kg={stock.picked.kg} />
      <StockColumn label="Damage" pack={stock.damage.pack} kg={stock.damage.kg} />
      <StockColumn label="Available" pack={stock.available.pack} kg={stock.available.kg} />
    </div>
  );
}
