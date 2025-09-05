// usedeferedvalue
// import { useDeferredValue } from 'react';
import useDebounce from '~/hooks/useDebounce';

import { Input } from "~/components/ui/input";

type DebpuncedInputProps<T> = React.ComponentProps<"input"> & {
  onChange: (value: string) => void;
};

export function DebouncedInput<T extends string | number | object>({ onChange, ...props }: DebpuncedInputProps<T>) {
  const { setDebounce } = useDebounce()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounce(() => {
      const value = e.target instanceof HTMLInputElement ? e.target.value : undefined;
      onChange?.(e.target.value);
    }, 300)
  }

  return (
    <Input
      type="text"
      onChange={handleChange}
      {...props}
    />
  )
}