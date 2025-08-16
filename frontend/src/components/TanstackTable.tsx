import { flexRender, getCoreRowModel, getExpandedRowModel, getPaginationRowModel, getSortedRowModel, Row, useReactTable, VisibilityState, type TableOptions } from '@tanstack/react-table';
import { atom, useAtom } from 'jotai';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { cn } from '~/lib/utils';
import { TableColumnVisibility, TablePagination } from './TableExtraComponents';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export type ColumnMap = { [key: string]: object };

const columnVisibilityAtom = atom<VisibilityState>({});

const getColumnClassName = (columnClassName?: ColumnMap, columnId?: string) => cn(
  columnClassName && columnId && columnClassName[columnId], {
  'w-8': columnId === 'id',
  'text-end': columnId === 'actions',
  'column-actions': columnId === 'actions',
});

const getColumnStyle = (columnStyles?: ColumnMap, columnId?: string) => (columnStyles && columnId) ? columnStyles[columnId] : {}

interface AdminTable<TData> extends Omit<TableOptions<TData>, 'getCoreRowModel'> {
  caption?: string;
  columnStyles?: ColumnMap;
  columnClassName?: ColumnMap;
  renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement
  getRowCanExpand: (row: Row<TData>) => boolean
}

export function AdminTable<TData>({ columns, data, caption, columnClassName, columnStyles, getRowCanExpand, renderSubComponent }: AdminTable<TData>) {
  const [columnVisibility, setColumnVisibility] = useAtom(columnVisibilityAtom)
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,

    // column visibility
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <div className='flex flex-col gap-4'>

      <TableColumnVisibility table={table} />

      <div className="overflow-hidden rounded-lg border">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={`table-header-${headerGroup.id}`}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}
                    className={getColumnClassName(columnClassName, header.column.id)}
                    style={getColumnStyle(columnStyles, header.column.id)}
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
                    <TableCell key={cell.id} className={getColumnClassName(columnClassName, cell.column.id)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow key={`${row.id}-expanded`}>
                    {/* 2nd row is a custom 1 cell row */}
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
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
