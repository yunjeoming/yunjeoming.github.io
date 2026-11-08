'use client';

import React, { useEffect, useRef } from 'react';
import { getTheme, subscribeTheme } from '@/utils/theme';

const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('src', 'https://giscus.app/client.js');
    script.setAttribute('data-repo', 'yunjeoming/yuns-blog');
    script.setAttribute('data-repo-id', 'R_kgDOJnu5ug');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOJnu5us4CX_VZ');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');

    script.setAttribute('data-theme', getTheme());
    const sentThemes = new WeakMap<HTMLIFrameElement, string>();
    const syncTheme = () => {
      const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      if (!iframe?.contentWindow || sentThemes.get(iframe) === theme) return;
      iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
      sentThemes.set(iframe, theme);
    };
    const onMessage = (event: MessageEvent) => {
      const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (event.origin === 'https://giscus.app' && event.source === iframe?.contentWindow && event.data?.giscus) syncTheme();
    };
    const unsubscribe = subscribeTheme(syncTheme);
    window.addEventListener('message', onMessage);
    container.appendChild(script);
    return () => {
      unsubscribe();
      window.removeEventListener('message', onMessage);
      container.replaceChildren();
    };
  }, []);

  return <div ref={ref} className="w-full max-w-post mt-8 sm:mt-16"></div>;
};

export default Comments;
