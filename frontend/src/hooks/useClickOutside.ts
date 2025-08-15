import { useEffect, useState } from "react";

type UseClickOutsideProps = {
  ref: React.RefObject<null>;
  defaultState: boolean;
};

export function useClickOutside({
  ref,
  defaultState = false,
}: UseClickOutsideProps) {
  const [state, setState] = useState<boolean>(defaultState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return [state, setState];
}
