import { useMemo } from "react"
import { AgGridReact } from "@ag-grid-community/react"
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model"
import { ModuleRegistry } from "@ag-grid-community/core"
import type { ColDef } from "@ag-grid-community/core"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-alpine.css"

import { DOActionButtons, DOEmptyState } from "../components"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { removeLineItem } from "../slices/doSlice"
import type { DOLineItem } from "../types/do.types"

ModuleRegistry.registerModules([ClientSideRowModelModule])

export function TableSection() {
  const lineItems = useAppSelector((state) => state.deliveryOrder.lineItems)
  const dispatch = useAppDispatch()

  const columnDefs = useMemo<ColDef<DOLineItem>[]>(
    () => [
      {
        field: "item.name",
        headerName: "Items",
        flex: 2,
        cellRenderer: (params: { data: DOLineItem }) => (
          <div className="py-2">
            <div className="font-medium text-gray-900">
              {params.data.item.name}
            </div>
            <div className="text-xs text-gray-500">{params.data.item.sku}</div>
          </div>
        ),
      },
      { field: "uomOrder", headerName: "UOM Order", width: 100 },
      { field: "condition", headerName: "Condition", width: 100 },
      { field: "pickingStrategy", headerName: "Picking Strategy", width: 130 },
      {
        field: "prodDate",
        headerName: "Prod Date",
        width: 120,
        valueFormatter: (params) => params.value || "-",
      },
      { field: "batch", headerName: "Batch", width: 100 },
      {
        field: "packToDeliver",
        headerName: "Pack To Deliver",
        width: 130,
        cellRenderer: (params: { value: number | null }) =>
          params.value ? `${params.value} Karung` : "-",
      },
      {
        field: "weightToDeliver",
        headerName: "Weight To Deliver",
        width: 140,
        cellRenderer: (params: { value: number }) => `${params.value} Kg`,
      },
      {
        headerName: "",
        width: 100,
        cellRenderer: (params: { data: DOLineItem }) => (
          <DOActionButtons
            onEdit={() => console.log("Edit", params.data.id)}
            onDelete={() => dispatch(removeLineItem(params.data.id))}
          />
        ),
      },
    ],
    [dispatch],
  )

  if (lineItems.length === 0) {
    return <DOEmptyState />
  }

  return (
    <div className="ag-theme-alpine w-full" style={{ height: "400px" }}>
      <AgGridReact<DOLineItem>
        rowData={lineItems}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
      />
    </div>
  )
}
