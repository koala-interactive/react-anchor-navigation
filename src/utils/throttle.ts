export function throttle(fn: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function throttledFn() {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn();
      }, delay);
    }
  }

  throttledFn.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return throttledFn;
}
