import { useRef, useEffect } from "react";

/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */
export function useDebounce(func, delay) {
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = (...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunction;
}
