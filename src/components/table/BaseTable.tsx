import { useCallback, useMemo, useRef } from "react"
import { AgGridReact } from "@ag-grid-community/react"
import { ModuleRegistry } from "@ag-grid-community/core"
import type { ColDef, GridReadyEvent, GridApi } from "@ag-grid-community/core"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-alpine.css"

ModuleRegistry.registerModules([])

interface BaseTableProps<T> {
  rowData: T[]
  columnDefs: ColDef<T>[]
  onGridReady?: (event: GridReadyEvent<T>) => void
  pagination?: boolean
  paginationPageSize?: number
  domLayout?: "normal" | "autoHeight" | "print"
}

export function BaseTable<T>({
  rowData,
  columnDefs,
  onGridReady,
  pagination = true,
  paginationPageSize = 10,
  domLayout = "autoHeight",
}: BaseTableProps<T>) {
  const gridRef = useRef<AgGridReact<T>>(null)

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    [],
  )

  const handleGridReady = useCallback(
    (event: GridReadyEvent<T>) => {
      event.api.sizeColumnsToFit()
      onGridReady?.(event)
    },
    [onGridReady],
  )

  return (
    <div className="ag-theme-alpine w-full">
      <AgGridReact<T>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        modules={[]}
        onGridReady={handleGridReady}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        domLayout={domLayout}
        suppressCellFocus={true}
        animateRows={true}
      />
    </div>
  )
}

export type { GridApi }
