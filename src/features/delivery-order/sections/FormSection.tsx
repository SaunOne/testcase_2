import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { Button, Select } from "../../../components/ui"
import { DOItemSelect } from "../components"
import { StockInfoSection } from "./StockInfoSection"
import { useGetItemsQuery } from "../../../_services/api"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addLineItem,
  updateLineItem,
  clearEditingItem,
} from "../slices/doSlice"
import { doFormSchema } from "../schemas/doSchema"
import type { DOFormInput, DOLineItem } from "../types/do.types"

export function FormSection() {
  const dispatch = useAppDispatch()
  const { data: items } = useGetItemsQuery()
  const editingItem = useAppSelector((state) => state.deliveryOrder.editingItem)

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
      itemId: "",
      uomOrderType: "Pack",
      pickingStrategy: "FIFO",
      qtyOrder: 0,
      priorityCondition: undefined,
      batch: "",
    },
  })

  // Pre-fill form when editing
  useEffect(() => {
    if (editingItem) {
      setValue("itemId", editingItem.item.id)
      setValue("uomOrderType", editingItem.uomOrder)
      setValue("pickingStrategy", editingItem.pickingStrategy)
      setValue("priorityCondition", editingItem.condition)
      setValue("batch", editingItem.batch)
      setValue(
        "qtyOrder",
        editingItem.uomOrder === "Pack"
          ? editingItem.packToDeliver || 0
          : editingItem.weightToDeliver,
      )
    }
  }, [editingItem, setValue])

  const selectedItemId = watch("itemId")
  const selectedItem = items?.find((i) => i.id === selectedItemId)
  const uomOrderType = watch("uomOrderType")
  const pickingStrategy = watch("pickingStrategy")

  const onSubmit = (data: DOFormInput) => {
    if (!selectedItem) return

    const lineItem: DOLineItem = {
      id: editingItem?.id || crypto.randomUUID(),
      item: selectedItem,
      uomOrder: data.uomOrderType,
      condition: data.priorityCondition || "Good",
      pickingStrategy: data.pickingStrategy,
      prodDate: null,
      batch: data.batch || selectedItem.batch,
      packToDeliver: data.uomOrderType === "Pack" ? data.qtyOrder : null,
      weightToDeliver:
        data.uomOrderType === "Weight"
          ? data.qtyOrder
          : data.qtyOrder * selectedItem.weightPerPack,
    }

    if (editingItem) {
      dispatch(updateLineItem(lineItem))
      dispatch(clearEditingItem())
    } else {
      dispatch(addLineItem(lineItem))
    }
    reset()
  }

  const handleCancel = () => {
    dispatch(clearEditingItem())
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1: Order Item + Priority Condition + Input Qty (3 columns) */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <DOItemSelect
            value={selectedItemId}
            onChange={(id) => setValue("itemId", id)}
            error={errors.itemId?.message}
          />
          <Select
            label="Priority Condition"
            id="priorityCondition"
            {...register("priorityCondition")}
            options={[
              { value: "", label: "Select" },
              { value: "Good", label: "Good" },
              { value: "Damage", label: "Damage" },
            ]}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Input Qty Order
            </label>
            <input
              type="number"
              placeholder="0"
              className={clsx(
                "block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
                errors.qtyOrder && "border-danger-500",
              )}
              {...register("qtyOrder", { valueAsNumber: true })}
            />
            {errors.qtyOrder && (
              <p className="mt-1 text-sm text-danger-500">
                {errors.qtyOrder.message}
              </p>
            )}
          </div>
        </div>

        {/* Stock Info (muncul setelah item dipilih) */}
        {selectedItemId && <StockInfoSection selectedItemId={selectedItemId} />}

        {/* Row 2: UOM Type (full width) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please select UOM Order Type
          </label>
          <div className="flex gap-3">
            {/* Pack UOM Button */}
            <button
              type="button"
              onClick={() => setValue("uomOrderType", "Pack")}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors",
                uomOrderType === "Pack"
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
              )}
            >
              <span
                className={clsx(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  uomOrderType === "Pack"
                    ? "border-primary-500"
                    : "border-gray-300",
                )}
              >
                {uomOrderType === "Pack" && (
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                )}
              </span>
              <span className="font-medium">Pack UOM</span>
              {selectedItem?.uomType === "Pack" && (
                <span className="text-xs text-gray-400">(suggested)</span>
              )}
            </button>

            {/* Weight UOM Button */}
            <button
              type="button"
              onClick={() => setValue("uomOrderType", "Weight")}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors",
                uomOrderType === "Weight"
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
              )}
            >
              <span
                className={clsx(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  uomOrderType === "Weight"
                    ? "border-primary-500"
                    : "border-gray-300",
                )}
              >
                {uomOrderType === "Weight" && (
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                )}
              </span>
              <span className="font-medium">Weight UOM</span>
              {selectedItem?.uomType === "Weight" && (
                <span className="text-xs text-gray-400">(suggested)</span>
              )}
            </button>
          </div>
        </div>

        {/* Row 3: Picking Strategy (full width - Card + Select side by side) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please select one Picking Strategy
          </label>
          <div className="flex gap-4">
            {/* Card showing selected strategy */}
            <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white">
              <div className="font-semibold text-gray-900">
                {pickingStrategy}
              </div>
              <div className="text-xs text-gray-500">Picking Strategy</div>
            </div>
            {/* Select Dropdown */}
            <div className="flex-1">
              <select
                value={pickingStrategy}
                onChange={(e) =>
                  setValue("pickingStrategy", e.target.value as "FIFO" | "FEFO")
                }
                className="w-full h-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="FIFO">FIFO</option>
                <option value="FEFO">FEFO</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Batch Input (full width) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batch
          </label>
          <input
            placeholder="Input"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            {...register("batch")}
          />
        </div>

        {/* Add/Update Item Button */}
        <div className="flex gap-3">
          {editingItem && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary" fullWidth>
            {editingItem ? "Update Item" : "Add Item"}
          </Button>
        </div>
      </form>
    </div>
  )
}
