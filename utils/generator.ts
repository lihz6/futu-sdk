export function* generator<T>(
  executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => Promise<() => void>
) {
  type Executor<T> = { resolve: (value: T) => void; reject: (reason?: any) => void };
  const error: { reason?: any; rejected?: boolean } = {};
  const cache: Array<Promise<T> | Executor<T>> = [];
  const close = executor(
    value => {
      if (cache[0] && !(cache[0] instanceof Promise)) {
        (cache.shift() as Executor<T>).resolve(value);
      } else {
        cache.push(Promise.resolve(value));
      }
    },
    reason => {
      error.reason = reason;
      error.rejected = true;
      for (const item of cache) {
        if (!(item instanceof Promise)) {
          item.reject(reason);
        }
      }
    }
  );

  try {
    while (true) {
      yield close.then(() => {
        if (cache[0] instanceof Promise) {
          return cache.shift() as Promise<T>;
        }
        if (error.rejected) {
          throw error.reason;
        }
        return new Promise<T>((resolve, reject) => {
          cache.push({ resolve, reject });
        });
      });
    }
  } finally {
    close.then(close => close());
  }
}
