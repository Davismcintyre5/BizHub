let navigateFn = null;

export function setGlobalNavigate(fn) {
  navigateFn = fn;
}

export function navigateTo(path, options) {
  if (navigateFn) {
    navigateFn(path, options);
    return true;
  }
  console.warn('[navigation] router not ready, falling back to hash set');
  if (typeof window !== 'undefined') {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  }
  return false;
}