import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { themeConfig } from '../theme.config'

export const themes = [
  { id: 'dark', name: 'Dark Mode', icon: '🌙', desc: 'Midnight zinc & violet' },
  { id: 'light', name: 'Light Mode', icon: '☀️', desc: 'Clean slate & indigo' },
  { id: 'solarized', name: 'Solarized', icon: '🪐', desc: 'Warm cyan & retro base' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '⚡', desc: 'Neon yellow & cyan' },
]

export const useThemeStore = defineStore('theme', () => {
  // Helper to query device system theme preference
  const getSystemTheme = () => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Resolve initial theme
  const resolveInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark'
    const storedTheme = localStorage.getItem('jui_theme')
    if (storedTheme) return storedTheme

    if (!themeConfig.defaultTheme || themeConfig.defaultTheme === 'system') {
      return getSystemTheme()
    }
    return themeConfig.defaultTheme
  }

  // Resolve initial layout mode
  const resolveInitialLayout = () => {
    if (typeof window === 'undefined') return 'navbar'
    return localStorage.getItem('jui_layout_mode') || themeConfig.layoutMode || 'navbar'
  }

  // Resolve initial navbar menu mode ('inline' | 'menu-bar')
  const resolveInitialNavbarMenuMode = () => {
    if (typeof window === 'undefined') return 'inline'
    return localStorage.getItem('jui_navbar_menu_mode') || themeConfig.navbarMenuMode || 'inline'
  }

  // Reactive State in Pinia
  const currentTheme = ref(resolveInitialTheme())
  const layoutMode = ref(resolveInitialLayout())
  const navbarMenuMode = ref(resolveInitialNavbarMenuMode())
  const themeMode = ref(typeof window !== 'undefined' ? (localStorage.getItem('jui_theme') || themeConfig.defaultTheme || 'system') : 'system')
  
  const colors = ref({
    primary: themeConfig.colors?.primary || '#6366f1',
    secondary: themeConfig.colors?.secondary || '#64748b',
    accent: themeConfig.colors?.accent || '#6366f1',
    success: themeConfig.colors?.success || '#10b981',
    warning: themeConfig.colors?.warning || '#f59e0b',
    danger: themeConfig.colors?.danger || '#f43f5e',
    info: themeConfig.colors?.info || '#38bdf8',
  })

  const inputPattern = ref(themeConfig.defaultInputPattern || 'boxed')
  const buttonPattern = ref(themeConfig.defaultButtonPattern || 'solid')
  const buttonSize = ref(themeConfig.defaultButtonSize || 'md')
  const listDensity = ref(themeConfig.defaultListDensity || 'comfortable')
  const dropdownDensity = ref(themeConfig.defaultDropdownDensity || 'comfortable')
  
  // Helper to resolve modal style for any specific theme
  const getModalStyleForTheme = (themeName) => {
    if (customModalStyleOverride.value) {
      return customModalStyleOverride.value
    }
    const cfg = modalStyleConfig.value
    if (typeof cfg === 'object' && cfg !== null) {
      if (cfg[themeName]) return cfg[themeName]
      if (themeName === 'light') return cfg.light || 'elevated'
      return cfg.dark || 'glass'
    }
    return cfg || 'glass'
  }

  // Modal Defaults State
  const modalStyleConfig = ref(themeConfig.defaultModalStyle || { dark: 'glass', light: 'elevated' })
  const customModalStyleOverride = ref(null)

  // Reactive Modal Style dynamically resolved based on the active theme
  const modalStyle = computed(() => getModalStyleForTheme(currentTheme.value))

  const modalAnimation = ref(themeConfig.defaultModalAnimation || 'scale')
  const modalPosition = ref(themeConfig.defaultModalPosition || 'center')
  const modalSize = ref(themeConfig.defaultModalSize || 'md')
  const modalBackdrop = ref(themeConfig.defaultModalBackdrop || 'glass')

  // Pagination & DataTable Defaults
  const pagination = ref({
    pageSize: themeConfig.pagination?.pageSize || 10,
    pageSizes: themeConfig.pagination?.pageSizes || [5, 10, 20, 50],
    size: themeConfig.pagination?.size || 'sm',
    variant: themeConfig.pagination?.variant || 'tonal',
    color: themeConfig.pagination?.color || 'primary',
    shape: themeConfig.pagination?.shape || 'rounded',
    attached: themeConfig.pagination?.attached ?? false,
    simple: themeConfig.pagination?.simple ?? false,
    showTotal: themeConfig.pagination?.showTotal ?? true,
    showPageSize: themeConfig.pagination?.showPageSize ?? true,
    showQuickJumper: themeConfig.pagination?.showQuickJumper ?? false,
    showFirstLast: themeConfig.pagination?.showFirstLast ?? false,
    layout: themeConfig.pagination?.layout || 'pageSize, total, pager',
  })

  // Getters / Computed
  const isDarkMode = computed(() => currentTheme.value === 'dark')
  const isLightMode = computed(() => currentTheme.value === 'light')
  const isSystemTheme = computed(() => themeMode.value === 'system')
  const isNavbarMode = computed(() => layoutMode.value === 'navbar')
  const isSidebarMode = computed(() => layoutMode.value === 'sidebar')
  const isNavbarInlineMode = computed(() => layoutMode.value === 'navbar' && navbarMenuMode.value === 'inline')
  const isNavbarMenuBarMode = computed(() => layoutMode.value === 'navbar' && navbarMenuMode.value === 'menu-bar')

  // Synchronize CSS custom properties and DOM root attributes
  const applyThemeConfig = () => {
    if (typeof document === 'undefined') return
    const doc = document.documentElement

    // 1. Set active data-theme
    doc.setAttribute('data-theme', currentTheme.value)

    // 2. Set palette overrides
    Object.entries(colors.value).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        doc.style.setProperty(`--${key}`, value)
        if (key === 'primary') {
          doc.style.setProperty('--border-color-focus', value)
        }
      } else {
        doc.style.removeProperty(`--${key}`)
      }
    })

    // 3. Set pattern & density data attributes on root
    doc.setAttribute('data-default-input-pattern', inputPattern.value)
    doc.setAttribute('data-default-button-pattern', buttonPattern.value)
    doc.setAttribute('data-default-list-density', listDensity.value)
    doc.setAttribute('data-default-dropdown-density', dropdownDensity.value)
    
    // 4. Set modal defaults data attributes on root (dynamically reflects dark vs light)
    doc.setAttribute('data-default-modal-style', modalStyle.value)
    doc.setAttribute('data-default-modal-animation', modalAnimation.value)
    doc.setAttribute('data-default-modal-position', modalPosition.value)
    doc.setAttribute('data-default-modal-size', modalSize.value)
    doc.setAttribute('data-default-modal-backdrop', modalBackdrop.value)
  }

  // Pinia Actions
  const selectTheme = (themeId) => {
    themeMode.value = themeId
    themeConfig.defaultTheme = themeId
    if (themeId === 'system') {
      currentTheme.value = getSystemTheme()
    } else {
      currentTheme.value = themeId
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jui_theme', themeId)
    }
    applyThemeConfig()
  }

  const setLayoutMode = (mode) => {
    layoutMode.value = mode
    themeConfig.layoutMode = mode
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jui_layout_mode', mode)
    }
  }

  const setNavbarMenuMode = (mode) => {
    navbarMenuMode.value = mode
    themeConfig.navbarMenuMode = mode
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jui_navbar_menu_mode', mode)
    }
  }

  const setColor = (token, hex) => {
    if (colors.value[token] !== undefined) {
      colors.value[token] = hex
      if (!themeConfig.colors) themeConfig.colors = {}
      themeConfig.colors[token] = hex
      applyThemeConfig()
    }
  }

  const resetColors = () => {
    colors.value = {
      primary: '#6366f1',
      secondary: '#64748b',
      accent: '#6366f1',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#f43f5e',
      info: '#38bdf8',
    }
    if (themeConfig.colors) {
      Object.assign(themeConfig.colors, colors.value)
    }
    applyThemeConfig()
  }

  const setInputPattern = (pattern) => {
    inputPattern.value = pattern
    themeConfig.defaultInputPattern = pattern
    applyThemeConfig()
  }

  const setButtonPattern = (pattern, size = null) => {
    buttonPattern.value = pattern
    themeConfig.defaultButtonPattern = pattern
    if (size) {
      buttonSize.value = size
      themeConfig.defaultButtonSize = size
    }
    applyThemeConfig()
  }

  const setButtonSize = (size) => {
    buttonSize.value = size
    themeConfig.defaultButtonSize = size
    applyThemeConfig()
  }

  const setListDensity = (density) => {
    listDensity.value = density
    themeConfig.defaultListDensity = density
    applyThemeConfig()
  }

  const setDropdownDensity = (density) => {
    dropdownDensity.value = density
    themeConfig.defaultDropdownDensity = density
    applyThemeConfig()
  }

  const setModalStyle = (style, targetTheme = null) => {
    if (targetTheme) {
      if (typeof modalStyleConfig.value === 'object' && modalStyleConfig.value !== null) {
        modalStyleConfig.value = { ...modalStyleConfig.value, [targetTheme]: style }
      } else {
        modalStyleConfig.value = { dark: modalStyleConfig.value || 'glass', light: modalStyleConfig.value || 'elevated', [targetTheme]: style }
      }
      customModalStyleOverride.value = null
    } else {
      if (typeof modalStyleConfig.value === 'object' && modalStyleConfig.value !== null) {
        modalStyleConfig.value = { ...modalStyleConfig.value, [currentTheme.value]: style }
      } else {
        customModalStyleOverride.value = style
      }
    }
    themeConfig.defaultModalStyle = modalStyleConfig.value
    applyThemeConfig()
  }

  const resetModalStyle = () => {
    modalStyleConfig.value = { dark: 'glass', light: 'elevated' }
    customModalStyleOverride.value = null
    themeConfig.defaultModalStyle = modalStyleConfig.value
    applyThemeConfig()
  }

  const setModalAnimation = (anim) => {
    modalAnimation.value = anim
    themeConfig.defaultModalAnimation = anim
    applyThemeConfig()
  }

  const setModalPosition = (pos) => {
    modalPosition.value = pos
    themeConfig.defaultModalPosition = pos
    applyThemeConfig()
  }

  const setModalSize = (size) => {
    modalSize.value = size
    themeConfig.defaultModalSize = size
    applyThemeConfig()
  }

  const setModalBackdrop = (backdrop) => {
    modalBackdrop.value = backdrop
    themeConfig.defaultModalBackdrop = backdrop
    applyThemeConfig()
  }

  const setPagination = (settings) => {
    pagination.value = { ...pagination.value, ...settings }
    if (themeConfig.pagination) {
      themeConfig.pagination = { ...themeConfig.pagination, ...settings }
    }
  }

  const resetAllDefaults = () => {
    setLayoutMode('sidebar')
    selectTheme('system')
    resetColors()
    setInputPattern('boxed')
    setButtonPattern('solid', 'md')
    setListDensity('comfortable')
    setDropdownDensity('comfortable')
    resetModalStyle()
    setModalAnimation('slide-down')
    setModalPosition('center')
    setModalSize('md')
    setModalBackdrop('glass')
    setPagination({
      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
      size: 'sm',
      variant: 'tonal',
      color: 'primary',
      shape: 'rounded',
      attached: false,
      simple: false,
      showTotal: true,
      showPageSize: true,
      showQuickJumper: false,
      showFirstLast: false,
      layout: 'pageSize, total, pager',
    })
  }

  // Initialize listener & DOM on startup
  const initTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        const storedTheme = localStorage.getItem('jui_theme')
        if (!storedTheme || storedTheme === 'system') {
          currentTheme.value = e.matches ? 'dark' : 'light'
          applyThemeConfig()
        }
      })
    }
    applyThemeConfig()
  }

  return {
    // State
    themeConfig,
    themes,
    currentTheme,
    layoutMode,
    navbarMenuMode,
    themeMode,
    colors,
    inputPattern,
    buttonPattern,
    buttonSize,
    listDensity,
    dropdownDensity,
    modalStyleConfig,
    modalStyle,
    modalAnimation,
    modalPosition,
    modalSize,
    modalBackdrop,
    pagination,

    // Getters
    isDarkMode,
    isLightMode,
    isSystemTheme,
    isNavbarMode,
    isSidebarMode,
    isNavbarInlineMode,
    isNavbarMenuBarMode,

    // Actions
    getSystemTheme,
    getModalStyleForTheme,
    selectTheme,
    setLayoutMode,
    setNavbarMenuMode,
    setColor,
    resetColors,
    setInputPattern,
    setButtonPattern,
    setButtonSize,
    setListDensity,
    setDropdownDensity,
    setModalStyle,
    resetModalStyle,
    setModalAnimation,
    setModalPosition,
    setModalSize,
    setModalBackdrop,
    setPagination,
    resetAllDefaults,
    applyThemeConfig,
    initTheme,
  }
})
