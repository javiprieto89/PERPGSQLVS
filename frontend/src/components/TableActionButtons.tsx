import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function TableActionDropdown({ onDelete, onEdit }: { onDelete: () => void, onEdit?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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