import { useAppSelector } from '../../../app/hooks';

export function useDOSummary() {
  const summary = useAppSelector((state) => state.deliveryOrder.summary);
  const lineItems = useAppSelector((state) => state.deliveryOrder.lineItems);

  return {
    summary,
    lineItems,
    hasItems: lineItems.length > 0,
  };
}
