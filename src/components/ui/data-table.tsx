"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { Loader2 } from "lucide-react"
import { useMemo, useEffect } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  initialPageIndex?: number
  onPageChange?: (pageIndex: number) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  initialPageIndex = 0,
  onPageChange,
}: DataTableProps<TData, TValue>) {

  const memoizedColumns = useMemo(() => columns, [columns]);
  const table = useReactTable({
    data,
    columns: memoizedColumns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: 10,
      },
    },
  })

  // Set initial page index
  useEffect(() => {
    if (initialPageIndex !== table.getState().pagination.pageIndex) {
      table.setPageIndex(initialPageIndex);
    }
  }, [initialPageIndex, table]);

  // Listen for page changes and call the callback
  useEffect(() => {
    if (onPageChange) {
      onPageChange(table.getState().pagination.pageIndex);
    }
  }, [table.getState().pagination.pageIndex, onPageChange]);

  return (
    <div className="relative">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </>

              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}