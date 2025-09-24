import { type Column, type ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type Row, type TableOptions, useReactTable, type VisibilityState } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { DebouncedInput } from '~/components/form/debounced-input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { TableColumnVisibility, TablePagination } from './TableExtraComponents';

import { cn } from '~/lib/utils';
import { ColumnsSession } from './columnsHelper';

export type ColumnMap = { [key: string]: object };

const getColumnClassName = <TData,>(columnDef: ColumnDef<TData, unknown>, columnClassName?: ColumnMap, columnId?: string) => cn(
  columnClassName && columnId && columnClassName[columnId],
  columnDef?.meta?.className,
  {
    'max-w-20': columnId === 'id',
    'text-end': columnId === 'actions',
    'column-actions': columnId === 'actions',
  },
);

interface AdminTable<TData> extends Omit<TableOptions<TData>, 'getCoreRowModel'> {
  caption?: string;
  columnStyles?: ColumnMap;
  columnClassName?: ColumnMap;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  defaultColumnVisibility: VisibilityState;
  columnGroupName: string;
}

export function DataTable<TData>({ columnGroupName, columns, data, caption, columnClassName, getRowCanExpand, renderSubComponent, defaultColumnVisibility }: AdminTable<TData>) {
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const columnsHelper = new ColumnsSession(columnGroupName);
  const [columnVisibility, setColumnVisibility] = useState(columnsHelper.getAll() || defaultColumnVisibility);

  const table = useReactTable({
    columns,
    data,

    defaultColumn: {
      size: 90, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 200, //enforced during column resizing
    },
    getCoreRowModel: getCoreRowModel(),

    // expand
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),

    // sort
    getSortedRowModel: getSortedRowModel(),
    // pagination

    getPaginationRowModel: getPaginationRowModel(),

    // debug
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,

    // column visibility
    state: {
      columnVisibility,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,

    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleToggleVisibility = (column: Column<TData, unknown>, checked: boolean) => {
    if (checked)
      columnsHelper.setColumnShow(column.id);
    else
      columnsHelper.setColumnHidden(column.id);
  }

  return (
    <div className='space-y-4'>
      <div className="flex gap-4 justify-end">
        <DebouncedInput
          onChange={value => {
            console.log("value", value);
            table.setGlobalFilter(String(value))
          }}
          className="px-2 font-xs max-w-0.5 py-0 h-8"
          placeholder="Search all columns..."
        />
        <TableColumnVisibility
          table={table}
          onChange={handleToggleVisibility}
          onReset={() => columnsHelper.resetColumns()}
        />
      </div>
      <div className='overflow-y-clip overflow-x-auto rounded-lg border'>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader className="bg-muted sticky top-0 z-1">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}
                    className={getColumnClassName(header.column.columnDef, columnClassName, header.column.id)}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex gap-1 items-center'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {!header.isPlaceholder && flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowUp size="14" />,
                        desc: <ArrowDown size="14" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows.map((row, index) => (
              <Fragment key={`table-row-${row.id || index}`}>
                <TableRow>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className={getColumnClassName(cell.column.columnDef, columnClassName, cell.column.id)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow key={`${row.id}-expanded`}>
                    {/* 2nd row is a custom 1 cell row */}
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderSubComponent?.({ row })}
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      {/* <div className="h-4" />
      <pre>{JSON.stringify(table.getState().columnVisibility, null, 2)}</pre> */}
    </div>
  )
}
