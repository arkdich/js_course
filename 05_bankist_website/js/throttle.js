export function throttle(callback, delay, ...args) {
  let isOnCoolDown = false;

  return () => {
    if (isOnCoolDown) {
      return;
    } else {
      callback(args);
      isOnCoolDown = true;

      setTimeout(() => (isOnCoolDown = false), delay);
    }
  };
}
