import { useEffect, useState } from "react";

type UseClickOutsideProps<T> = {
  ref: React.RefObject<T>;
  defaultState: boolean;
};

export function useClickOutside<T extends HTMLElement>({
  defaultState,
  ref,
}: {
  defaultState: boolean;
  ref: React.RefObject<T | null | undefined>;
}): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setState(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [state, setState];
}
