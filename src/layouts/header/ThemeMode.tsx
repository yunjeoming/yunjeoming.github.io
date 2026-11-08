'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'react-feather';
import { setTheme, subscribeTheme } from '@/utils/theme';

export default function ThemeMode() {
  useEffect(() => subscribeTheme(() => {}), []);
  const changeTheme = () => {
    setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  };

  return (
    <button type="button" aria-label="밝은 테마와 어두운 테마 전환"
      className="cursor-pointer rounded-full p-2 focus-visible:outline focus-visible:outline-2" onClick={changeTheme}>
      <Sun aria-hidden="true" color="red" size={22} className="dark:hidden" />
      <Moon aria-hidden="true" color="yellow" className="hidden dark:block" />
    </button>
  );
}
