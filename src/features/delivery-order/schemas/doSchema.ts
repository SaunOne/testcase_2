import { z } from 'zod';

export const uomTypeSchema = z.enum(['Pack', 'Weight']);
export const pickingStrategySchema = z.enum(['FIFO', 'FEFO']);
export const itemConditionSchema = z.enum(['Good', 'Damage']);

export const doFormSchema = z.object({
  itemId: z.string().min(1, 'Item is required'),
  uomOrderType: uomTypeSchema,
  pickingStrategy: pickingStrategySchema,
  qtyOrder: z.number().positive('Quantity must be greater than 0'),
  priorityCondition: itemConditionSchema.optional(),
  batch: z.string().optional(),
});

export type DOFormSchema = z.infer<typeof doFormSchema>;

// Custom validation function to check stock availability
export const validateStockAvailability = (
  qtyOrder: number,
  availableStock: number,
  uomType: 'Pack' | 'Weight'
): string | null => {
  if (qtyOrder > availableStock) {
    return `Quantity exceeds available stock (${availableStock} ${uomType === 'Pack' ? 'packs' : 'kg'})`;
  }
  return null;
};
