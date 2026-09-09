import { storeToRefs } from 'pinia'
import { useThemeStore, themes } from '../stores/theme'
import { themeConfig } from '../theme.config'

import { useDisplay, useBreakpoints, useScreen, breakpoints } from './useDisplay'

export { themes, themeConfig, useDisplay, useBreakpoints, useScreen, breakpoints }

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useLayout() {
  const store = useThemeStore()
  const {
    currentTheme,
    layoutMode,
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
    isDarkMode,
    isLightMode,
    isSystemTheme,
    isNavbarMode,
    isSidebarMode,
  } = storeToRefs(store)

  return {
    themeConfig,
    themes,
    currentTheme,
    layoutMode,
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
    isDarkMode,
    isLightMode,
    isSystemTheme,
    isNavbarMode,
    isSidebarMode,
    setLayoutMode: store.setLayoutMode,
    selectTheme: store.selectTheme,
    setColor: store.setColor,
    resetColors: store.resetColors,
    setInputPattern: store.setInputPattern,
    setButtonPattern: store.setButtonPattern,
    setButtonSize: store.setButtonSize,
    setListDensity: store.setListDensity,
    setDropdownDensity: store.setDropdownDensity,
    setModalStyle: store.setModalStyle,
    resetModalStyle: store.resetModalStyle,
    getModalStyleForTheme: store.getModalStyleForTheme,
    setModalAnimation: store.setModalAnimation,
    setModalPosition: store.setModalPosition,
    setModalSize: store.setModalSize,
    setModalBackdrop: store.setModalBackdrop,
    setPagination: store.setPagination,
    resetAllDefaults: store.resetAllDefaults,
    applyThemeConfig: store.applyThemeConfig,
    getSystemTheme: store.getSystemTheme,
  }
}
