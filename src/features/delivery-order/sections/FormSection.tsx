import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Button, Input, Select } from '../../../components/ui';
import { DOItemSelect, DOUomRadio, DOPickingStrategySelect } from '../components';
import { StockInfoSection } from './StockInfoSection';
import { useGetItemsQuery } from '../../../_services/api';
import { useAppDispatch } from '../../../app/hooks';
import { addLineItem } from '../slices/doSlice';
import { doFormSchema } from '../schemas/doSchema';
import type { DOFormInput, DOLineItem } from '../types/do.types';

export function FormSection() {
  const dispatch = useAppDispatch();
  const { data: items } = useGetItemsQuery();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DOFormInput>({
    resolver: zodResolver(doFormSchema),
    defaultValues: {
      itemId: '',
      uomOrderType: 'Pack',
      pickingStrategy: 'FIFO',
      qtyOrder: 0,
      priorityCondition: undefined,
      batch: '',
    },
  });

  const selectedItemId = watch('itemId');
  const selectedItem = items?.find((i) => i.id === selectedItemId);
  const uomOrderType = watch('uomOrderType');
  const pickingStrategy = watch('pickingStrategy');

  const onSubmit = (data: DOFormInput) => {
    if (!selectedItem) return;

    const lineItem: DOLineItem = {
      id: crypto.randomUUID(),
      item: selectedItem,
      uomOrder: data.uomOrderType,
      condition: data.priorityCondition || 'Good',
      pickingStrategy: data.pickingStrategy,
      prodDate: null,
      batch: data.batch || selectedItem.batch,
      packToDeliver: data.uomOrderType === 'Pack' ? data.qtyOrder : null,
      weightToDeliver:
        data.uomOrderType === 'Weight'
          ? data.qtyOrder
          : data.qtyOrder * selectedItem.weightPerPack,
    };

    dispatch(addLineItem(lineItem));
    reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1: Order Item + Priority Condition */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DOItemSelect
            value={selectedItemId}
            onChange={(id) => setValue('itemId', id)}
            error={errors.itemId?.message}
          />
          <Select
            label="Priority Condition"
            id="priorityCondition"
            {...register('priorityCondition')}
            options={[
              { value: '', label: 'Select' },
              { value: 'Good', label: 'Good' },
              { value: 'Damage', label: 'Damage' },
            ]}
          />
        </div>

        {/* Stock Info (muncul setelah item dipilih) */}
        {selectedItemId && <StockInfoSection selectedItemId={selectedItemId} />}

        {/* Row 2: UOM Type + Qty */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DOUomRadio
            value={uomOrderType}
            onChange={(uom) => setValue('uomOrderType', uom)}
            suggestedUom={selectedItem?.uomType}
          />
          <Input
            type="number"
            label="Input Qty Order"
            id="qtyOrder"
            placeholder="Input"
            {...register('qtyOrder', { valueAsNumber: true })}
            error={errors.qtyOrder?.message}
          />
        </div>

        {/* Row 3: Picking Strategy + Batch */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <DOPickingStrategySelect
            value={pickingStrategy}
            onChange={(s) => setValue('pickingStrategy', s)}
            error={errors.pickingStrategy?.message}
          />
          <Input
            label="Batch"
            id="batch"
            placeholder="Input"
            {...register('batch')}
          />
        </div>

        {/* Add Item Button */}
        <Button type="submit" variant="primary" fullWidth>
          Add Item
        </Button>
      </form>
    </Card>
  );
}
