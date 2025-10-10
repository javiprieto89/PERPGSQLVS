import { type Row } from "@tanstack/react-table";
import { cn } from "~/lib/utils";

export type HighLightRow<TData> = {
  highlightKey?: keyof TData;
  highlightValue?: string;
};

export function getRowClassName<TData>(
  row: Row<TData>,
  highlightKey: keyof TData,
  highlightValue: string
) {
  return cn(
    String(highlightValue) === String(row.original[highlightKey])
      ? "bg-primary/10 border-primary/30"
      : ""
  );
}

export function getSelected<TData>(
  row: Row<TData>,
  highlightKey?: keyof TData,
  highlightValue?: string
) {
  if (!highlightKey || !highlightValue || !highlightValue) return "";
  return cn(
    String(highlightValue) === String(row.original[highlightKey])
      ? "selected"
      : ""
  );
}
