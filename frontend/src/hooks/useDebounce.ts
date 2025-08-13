import {atom, useAtom} from 'jotai';

const handlerAtom = atom<NodeJS.Timeout | undefined>(undefined);

export default function useDebounce() {
  const [handler, setHandler] = useAtom(handlerAtom);

  function setDebounce(callback: () => void, delay: number) {
    if (handler) {
      clearTimeout(handler);
      setHandler(undefined);
    }

    const timeout = setTimeout(callback, delay);

    setHandler(timeout);
  }

  return {setDebounce};
}
