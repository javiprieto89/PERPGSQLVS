import useDebounce from '~/hooks/useDebounce';

import { Input } from "./ui/input";

type InputQuickSearchProps<T> = React.ComponentProps<"input"> & {
  rows: T[],
  onSearch: (rows: T[]) => void;
};

export function InputQuickSearch<T extends {}>({ rows, onSearch, onKeyUp, ...props }: InputQuickSearchProps<T>) {
  const { setDebounce } = useDebounce()

  const search = (key: string | undefined) => {
    if (!key || key.length === 0 || key === "") {
      onSearch(rows);
      return;
    }

    onSearch(
      rows.filter((rows) => {
        return Object.values(rows).find((value) => {
          return String(value).toLowerCase().includes(key.toLowerCase())
        }
        );
      })
    );
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setDebounce(() => {
      const value = e.target instanceof HTMLInputElement ? e.target.value : undefined;
      console.log("value", value)
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