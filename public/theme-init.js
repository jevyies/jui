/**
 * JUI - Anti-FOUC Theme & Background Initializer
 * Runs synchronously in <head> to immediately apply stored theme and background color
 * from localStorage before initial page render, preventing white flash on reload.
 */
(function () {
  try {
    var THEME_BACKGROUNDS = {
      dark: '#0b0f19',
      light: '#f8fafc',
      solarized: '#002b36',
      cyberpunk: '#08080f',
    }

    var storedTheme = localStorage.getItem('jui_theme')
    var storedBg = localStorage.getItem('jui_theme_bg') || localStorage.getItem('jui_bg_color')
    var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    var activeTheme = storedTheme
    if (!activeTheme || activeTheme === 'system') {
      activeTheme = isDark ? 'dark' : 'light'
    }

    var bg = storedBg || THEME_BACKGROUNDS[activeTheme] || '#0b0f19'

    // Persist if not already stored
    if (!storedBg) {
      localStorage.setItem('jui_theme_bg', bg)
      localStorage.setItem('jui_bg_color', bg)
    }

    // Immediately apply to HTML root
    var root = document.documentElement
    root.setAttribute('data-theme', activeTheme)
    root.style.backgroundColor = bg
    root.style.setProperty('--bg-body', bg)
    root.style.colorScheme = activeTheme === 'light' ? 'light' : 'dark'

    // Immediate fallback styles to eliminate white flash on reload
    var style = document.createElement('style')
    style.id = 'jui-theme-fallback'
    style.textContent =
      'html { background-color: ' + bg + ' !important; } ' +
      'html[data-theme="light"] { background-color: #f8fafc !important; } ' +
      'html[data-theme="dark"] { background-color: #0b0f19 !important; } ' +
      'html[data-theme="solarized"] { background-color: #002b36 !important; } ' +
      'html[data-theme="cyberpunk"] { background-color: #08080f !important; } ' +
      'body { margin: 0; background-color: inherit; }'
    document.head.appendChild(style)
  } catch (e) {
    console.error('Failed to initialize theme background', e)
  }
})()
