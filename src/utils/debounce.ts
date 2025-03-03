interface IDebounce {
  <T extends (...args: unknown[]) => Promise<void>>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => Promise<void>;
}

export const debounce: IDebounce = (fn, delay) => {
  let timer: ReturnType<typeof setTimeout>;

  return async (...args) => {
    clearTimeout(timer);
    
    return new Promise((resolve) => {
      timer = setTimeout(async () => {
        await fn(...args);
        resolve();
      }, delay);
    });
  };
};