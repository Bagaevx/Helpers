import { useEffect, useRef } from 'react';

export const useDebouncedEffect = (callback, delay, deps = []) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      if (typeof callback === 'function') callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};
