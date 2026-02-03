import { useGetItemByIdQuery } from '../../../_services/api';
import { DOStockCard } from '../components';

interface StockInfoSectionProps {
  selectedItemId: string | null;
}

export function StockInfoSection({ selectedItemId }: StockInfoSectionProps) {
  const { data: item } = useGetItemByIdQuery(selectedItemId!, {
    skip: !selectedItemId,
  });

  return <DOStockCard item={item || null} />;
}
