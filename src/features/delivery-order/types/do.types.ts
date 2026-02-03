// UOM Types
export type UOMType = "Pack" | "Weight";

// Picking Strategy
export type PickingStrategy = "FIFO" | "FEFO";

// Condition
export type ItemCondition = "Good" | "Damage";

// Stock Info
export interface StockInfo {
  pack: number;
  kg: number;
}

// Master Item (dari dummy data)
export interface MasterItem {
  id: string;
  name: string;
  sku: string;
  uomType: UOMType;
  availableQty: number;
  weightPerPack: number;
  condition: ItemCondition;
  batch: string;
  stock: {
    soh: StockInfo;
    allocated: StockInfo;
    blocked: StockInfo;
    picked: StockInfo;
    damage: StockInfo;
    available: StockInfo;
  };
}

// Form Input
export interface DOFormInput {
  itemId: string;
  uomOrderType: UOMType;
  pickingStrategy: PickingStrategy;
  qtyOrder: number;
  priorityCondition?: ItemCondition;
  batch?: string;
}

// DO Line Item (untuk table)
export interface DOLineItem {
  id: string;
  item: MasterItem;
  uomOrder: UOMType;
  condition: ItemCondition;
  pickingStrategy: PickingStrategy;
  prodDate: string | null;
  batch: string;
  packToDeliver: number | null;
  weightToDeliver: number;
}

// Summary
export interface DOSummary {
  totalItems: number;
  totalPacks: number;
  totalWeight: number;
}
