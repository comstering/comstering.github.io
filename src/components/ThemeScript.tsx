export function ThemeScript() {
  const script = `(function(){try{var e=localStorage.getItem('theme')||'';var t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var a=e||t;document.documentElement.classList[a==='dark'?'add':'remove']('dark')}catch(e){}})();`;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
