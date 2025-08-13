// usedeferedvalue
// import { useDeferredValue } from 'react';
import useDebounce from '~/hooks/useDebounce';

import { Input } from "./ui/input";

function valuesObjectToArray<T>(
  row: T,
  ignoreKeys: string[] = ["__typename"]
): string[] {
  const result: string[] = [];
  const stack: any[] = [row];
  const seen = new WeakSet();

  while (stack.length) {
    const current = stack.pop();

    if (current && typeof current === "object") {
      if (seen.has(current)) continue; // evitar ciclos
      seen.add(current);

      for (const [key, value] of Object.entries(current)) {
        if (ignoreKeys.includes(key)) continue;

        if (value && typeof value === "object") {
          stack.push(value);
        } else {
          result.push(String(value));
        }
      }
    } else {
      result.push(String(current));
    }
  }

  return result;
}

function filterAndSearch<T>(searchKey: string, rows: T[]) {
  return rows.filter((row) => (
    valuesObjectToArray(row).some((value) => (
      value.toLowerCase().includes(searchKey.toLowerCase())
    ))
  ))
}

type InputQuickSearchProps<T> = React.ComponentProps<"input"> & {
  rows: T[],
  onSearch: (rows: T[]) => void;
};

export function InputQuickSearch<T extends string | number | object>({ rows, onSearch, onKeyUp, ...props }: InputQuickSearchProps<T>) {
  const { setDebounce } = useDebounce()

  const search = (searchKey: string | undefined) => {
    if (!searchKey || searchKey.length === 0 || searchKey === "") {
      onSearch(rows);
      return;
    }

    onSearch(filterAndSearch(searchKey, rows));
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setDebounce(() => {
      const value = e.target instanceof HTMLInputElement ? e.target.value : undefined;
      search(value);
      onKeyUp?.(e);
    }, 300)
  }

  return (
    <Input
      type="text"
      placeholder="Buscar..."
      onKeyUp={handleOnKeyUp}
      {...props}
    />
  )
}