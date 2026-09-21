const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

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

document
  .querySelectorAll<HTMLButtonElement>('[data-dialog-trigger]')
  .forEach((trigger) => {
    const id = trigger.dataset.dialogTrigger;
    const dialog = id
      ? (document.getElementById(id) as HTMLDialogElement | null)
      : null;
    if (!dialog) return;

    const close = () => dialog.close();
    trigger.addEventListener('click', () => {
      dialog.showModal();
      document.body.classList.add('dialog-open');
      dialog.querySelector<HTMLElement>('[data-dialog-close]')?.focus();
    });
    dialog
      .querySelector('[data-dialog-close]')
      ?.addEventListener('click', close);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      trigger.focus();
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });

document
  .querySelectorAll<HTMLElement>('[data-shared-highlight]')
  .forEach((container) => {
    const highlight = container.querySelector<HTMLElement>('.shared-highlight');
    const items = container.querySelectorAll<HTMLElement>(
      '[data-highlight-item]',
    );
    if (!highlight) return;
    const activate = (item: HTMLElement) => {
      highlight.style.height = `${item.offsetHeight}px`;
      highlight.style.transform = `translateY(${item.offsetTop}px)`;
      highlight.classList.add('is-visible');
    };
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => activate(item));
      item.addEventListener('focus', () => activate(item));
    });
    container.addEventListener('mouseleave', () =>
      highlight.classList.remove('is-visible'),
    );
    container.addEventListener('focusout', (event) => {
      if (!container.contains(event.relatedTarget as Node | null))
        highlight.classList.remove('is-visible');
    });
  });

document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((row) => {
  if (!finePointer.matches || reducedMotion.matches) return;
  row.addEventListener('pointerenter', () => row.classList.add('is-spotlit'));
  row.addEventListener('pointerleave', () =>
    row.classList.remove('is-spotlit'),
  );
  row.addEventListener('pointermove', (event) => {
    const rect = row.getBoundingClientRect();
    row.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    row.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  });
});

const copyButton = document.querySelector<HTMLButtonElement>('[data-copy-url]');
copyButton?.addEventListener('click', () => {
  const state = copyButton.querySelector<HTMLElement>('[data-copy-state]');
  if (!state) return;
  state.classList.add('is-morphing');
  window.setTimeout(() => {
    state.textContent = 'Copied';
    state.classList.remove('is-morphing');
  }, 120);
  void navigator.clipboard.writeText(window.location.href).catch(() => {
    // Clipboard access can be unavailable in previews or restricted contexts.
  });
  window.setTimeout(() => {
    state.classList.add('is-morphing');
    window.setTimeout(() => {
      state.textContent = 'Copy';
      state.classList.remove('is-morphing');
    }, 120);
  }, 2000);
});

const progress = document.querySelector<HTMLElement>('.scroll-progress span');
if (progress) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.transform = `scaleX(${value})`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
}
