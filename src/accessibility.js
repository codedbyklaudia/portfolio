import './accessibility.scss';

// Saved settings live in localStorage and are applied to <html> as attributes.
// The styles for each attribute are in accessibility.scss.

const FONT_SCALE_KEY = 'cbk-font-scale';

const FLAGS = {
  dyslexia: { key: 'cbk-dyslexia',        attr: 'data-dyslexia',        on: 'true', off: 'false' },
  spacing:  { key: 'cbk-text-spacing',    attr: 'data-text-spacing',    on: 'true', off: 'false' },
  links:    { key: 'cbk-underline-links', attr: 'data-underline-links', on: 'true', off: 'false' },
  contrast: { key: 'cbk-high-contrast',   attr: 'data-contrast',        on: 'high', off: 'normal' },
};

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode: the setting just won't be remembered */
  }
};

// OpenDyslexic is only downloaded the first time someone switches it on
let fontRequested = false;
function loadDyslexicFont() {
  if (fontRequested) return;
  fontRequested = true;
  import('@fontsource/opendyslexic/400.css');
  import('@fontsource/opendyslexic/700.css');
}

export const readFontScale = () => Number(read(FONT_SCALE_KEY)) || 1;

export function setFontScale(value) {
  document.documentElement.style.setProperty('--font-scale', String(value));
  write(FONT_SCALE_KEY, String(value));
}

export const readFlag = (name) => read(FLAGS[name].key) === '1';

export function setFlag(name, on) {
  const flag = FLAGS[name];
  document.documentElement.setAttribute(flag.attr, on ? flag.on : flag.off);
  write(flag.key, on ? '1' : '0');
  if (name === 'dyslexia' && on) loadDyslexicFont();
}

// Call once at startup (main.jsx) so saved settings apply on every page
export function initAccessibility() {
  setFontScale(readFontScale());
  Object.keys(FLAGS).forEach((name) => setFlag(name, readFlag(name)));

  // The old "reduce motion" switch was removed
  try {
    localStorage.removeItem('cbk-reduce-motion');
  } catch {
  }
  document.documentElement.removeAttribute('data-reduce-motion');
}