import type { Theme } from '@/types/common';

export const THEME_EVENT = 'themechange';

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  return stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light';
}

export function getTheme(): Theme {
  let stored = null;
  try { stored = localStorage.getItem('theme'); } catch { /* Storage may be disabled. */ }
  return resolveTheme(stored, window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme) {
  try { localStorage.setItem('theme', theme); } catch { /* Keep the current page usable. */ }
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

export function subscribeTheme(listener: () => void) {
  const sync = () => { applyTheme(getTheme()); listener(); };
  const storage = (event: StorageEvent) => {
    if (event.key === 'theme' || event.key === null) sync();
  };
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  window.addEventListener(THEME_EVENT, listener);
  window.addEventListener('storage', storage);
  media.addEventListener('change', sync);
  applyTheme(getTheme());
  return () => {
    window.removeEventListener(THEME_EVENT, listener);
    window.removeEventListener('storage', storage);
    media.removeEventListener('change', sync);
  };
}

// Runs before first paint, using the same preference rules as the interactive controls.
export const themeInitScript = `(() => {
  let stored = null;
  try { stored = localStorage.getItem('theme'); } catch {}
  const theme = stored === 'dark' || stored === 'light' ? stored :
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
})();`;
