import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

type CallBack = () => void;

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: CallBack,
  when: boolean = true,
) => {
  const savedHandler = useRef(callback);

  const memoizedCallback = useCallback((e: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(e.target as Element)) {
      // @ts-ignore
      savedHandler.current(e);
    }
  }, []);

  useEffect(() => {
    savedHandler.current = callback;
  });

  useEffect(() => {
    if (when) {
      document.addEventListener('click', memoizedCallback, true);
      // document.addEventListener("ontouchstart", memoizedCallback, true);

      return () => {
        document.removeEventListener('click', memoizedCallback, true);
        // document.removeEventListener("ontouchstart", memoizedCallback, true);
      };
    }
  }, [ref, callback, when]);
};

export default useOutsideClick;
