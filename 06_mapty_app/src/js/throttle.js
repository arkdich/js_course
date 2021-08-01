export function throttle(fn, delay) {
  let savedThis;
  let savedArgs;
  let isThrottled;

  return function wrapper(...args) {
    if (isThrottled) {
      savedThis = this;
      savedArgs = args;
      return;
    }

    fn.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedThis) {
        wrapper.apply(savedThis, savedArgs);
        savedThis = savedArgs = null;
      }
    }, delay);
  };
}
