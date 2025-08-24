import { type Table } from '@tanstack/react-table';
import { CheckCircle, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, EllipsisVertical, Loader, Pencil, Save, Trash, X } from "lucide-react";

import { useRef, useState } from 'react';
import { cn } from '~/lib/utils';
import { Badge } from './ui/badge';
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function TableActionDropdown({ onDelete, onEdit }: { onDelete: () => void, onEdit?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {onEdit && (
          <DropdownMenuItem
            onClick={onEdit}
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          variant="destructive"
          onClick={onDelete}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TableActionButton({ onEdit, onDelete }: { onEdit?: () => void, onDelete: () => void }) {
  return (
    <div className="flex gap-2 justify-end">
      <Button
        onClick={onEdit}
        className="hidden md:inline px-3 py-2 text-sm rounded"
      >
        <Pencil />
      </Button>
      <TableActionDropdown onDelete={onDelete} onEdit={onEdit} />
    </div>
  )
}

export function TableIsActiveCell({ getValue }: { getValue: () => string }) {
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {getValue() ? (
        <CheckCircle className="stroke-green-500 dark:stroke-green-400" />
      ) : (
        <Loader />
      )}
      {getValue() ? "Activo" : "Inactivo"}
    </Badge>
  );
}

export function TablePagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronFirst />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronLast />
          </Button>
        </div>
      </div>
    </div>
  )
}

export const AdminTableLoading = () => (
  <div className="animate-pulse my-4">
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-accent w-full h-10 rounded"></div>
      ))}
    </div>
  </div>
)

export const EditableInput = ({ defaultValue, onSave, ...props }: React.ComponentProps<"input"> & { onSave: (value: string) => void }) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef?.current) {
      onSave(inputRef?.current.value)
    }
    setEdit(false)
  }

  if (!edit) return <Button variant="ghost" className='w-full' onClick={() => setEdit(true)}>{defaultValue}</Button>

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'inline-flex gap-1 items-center border rounded-md justify-between p-1',
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      )}
    >
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        type="number"
        step="0.01"
        className="border-0 h-8 w-30 p-1 focus-visible:border-0 focus-visible:outline-0"
        {...props}
      />
      <div className="flex gap-1 items-center">
        <Button size={'sm'} variant="outline" onClick={() => setEdit(false)}>
          <X /> <span className="sr-only">Cancelar</span>
        </Button>
        <Button size={'sm'} type="submit" variant="primary">
          <Save /> <span className="sr-only">Guardar</span>
        </Button>
      </div>
    </form>
  );
}
