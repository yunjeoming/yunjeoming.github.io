import { useSyncExternalStore } from 'react';

const EVENT = 'tagstatechange';
let fallbackSnapshot = false;
function getSnapshot() {
  try { return localStorage.getItem('tag-state') === 'open'; } catch { return fallbackSnapshot; }
}
function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === 'tag-state' || event.key === null) listener();
  };
  window.addEventListener(EVENT, listener);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener('storage', onStorage);
  };
}
const getServerSnapshot = () => false;

export default function useMoreAndHide() {
  const showAllTags = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const handleClick = () => {
    fallbackSnapshot = !showAllTags;
    try {
      if (showAllTags) localStorage.removeItem('tag-state');
      else localStorage.setItem('tag-state', 'open');
    } catch { /* Keep the toggle usable when storage is disabled. */ }
    window.dispatchEvent(new Event(EVENT));
  };
  return { showAllTags, handleClick };
}
