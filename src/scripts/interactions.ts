import { bind, setVolume } from 'cuelume';

setVolume(0.22);
bind();

const themeRoot = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle instanceof HTMLButtonElement) {
  const syncThemeToggle = (dark: boolean) => {
    const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  };

  syncThemeToggle(themeRoot.dataset.theme === 'dark');

  const themeObserver = new MutationObserver(() => {
    syncThemeToggle(themeRoot.dataset.theme === 'dark');
  });
  themeObserver.observe(themeRoot, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  themeToggle.addEventListener('click', () => {
    const next = themeRoot.dataset.theme === 'dark' ? 'light' : 'dark';
    themeRoot.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // The visible toggle still works when storage is unavailable.
    }
    syncThemeToggle(next === 'dark');
  });
}
