import { flexRender, getCoreRowModel, getExpandedRowModel, Row, useReactTable, type TableOptions } from '@tanstack/react-table';
import { Fragment } from 'react/jsx-runtime';
import { cn } from '~/lib/utils';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export type ColumnMap = { [key: string]: object };

const defaultColumn = {
  size: 90, //starting column size
  minSize: 50, //enforced during column resizing
  maxSize: 200, //enforced during column resizing
} as const;

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
  const table = useReactTable({
    columns, data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    defaultColumn,
    getRowCanExpand,
  })

  return (
    <div>
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody >
          {table.getRowModel().rows.map(row => (
            <Fragment key={`table-row-${row.id}`}>
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