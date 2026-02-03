import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearLineItems } from '../slices/doSlice';

export function FooterSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lineItems = useAppSelector((state) => state.deliveryOrder.lineItems);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateDO = () => {
    if (lineItems.length === 0) {
      alert('Tambahkan minimal 1 item');
      return;
    }

    // Demo: log data
    console.log('Creating DO with items:', lineItems);

    // Success feedback
    alert('Delivery Order berhasil dibuat!');

    // Clear items
    dispatch(clearLineItems());
  };

  return (
    <div className="flex gap-4">
      <Button variant="secondary" onClick={handleBack} className="flex-1">
        Back
      </Button>
      <Button variant="primary" onClick={handleCreateDO} className="flex-1">
        Create DO
      </Button>
    </div>
  );
}
