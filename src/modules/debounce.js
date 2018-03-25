export default function debounce(callback) {
  const DEBOUNCE_INTERVAL = 2000;
  let lastTimeout;
  return function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
}
