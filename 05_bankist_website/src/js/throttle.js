export default function throttle(callback, delay) {
  let isOnCoolDown = false;
  let lastThis;
  let lastArgs;

  return function wrapper(...args) {
    if (isOnCoolDown) {
      lastThis = this;
      lastArgs = args;
      return;
    }

    callback.apply(this, args);
    isOnCoolDown = true;

    setTimeout(() => {
      isOnCoolDown = false;

      if (lastThis) {
        wrapper.apply(lastThis, lastArgs);
        lastThis = lastArgs = null;
      }
    }, delay);
  };
}
