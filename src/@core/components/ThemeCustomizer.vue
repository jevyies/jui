<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLayout } from '../../composables/useLayout'
import AppLogo from './AppLogo.vue'

const {
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
  modalStyle,
  modalAnimation,
  modalPosition,
  modalSize,
  modalBackdrop,
  setLayoutMode,
  selectTheme,
  setColor,
  setInputPattern,
  setButtonPattern,
  setButtonSize,
  setListDensity,
  setDropdownDensity,
  setModalStyle,
  setModalAnimation,
  setModalPosition,
  setModalSize,
  setModalBackdrop,
  resetAllDefaults
} = useLayout()

// Drawer open state
const isOpen = ref(false)
const copied = ref(false)

// Strict Primary Colors Array as specified by the user
const primaryColors = [
  { name: 'Indigo (Default)', hex: '#6366f1' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Sky Blue', hex: '#38bdf8' },
]

// Available Options for other settings
const layoutOptions = [
  { id: 'sidebar', name: 'Vertical Sidebar', desc: 'Fixed left menu', icon: '◧' },
  { id: 'navbar', name: 'Top Navbar', desc: 'Horizontal glass bar', icon: '⬒' },
]

const inputPatternOptions = [
  { id: 'boxed', name: 'Boxed', desc: 'Standard border' },
  { id: 'underlined', name: 'Underlined', desc: 'Bottom line only' },
  { id: 'filled', name: 'Filled', desc: 'Surface container' },
  { id: 'floating', name: 'Floating', desc: 'Material floating label' },
  { id: 'pill', name: 'Pill', desc: 'Rounded corners' },
]

const buttonPatternOptions = [
  { id: 'solid', name: 'Solid / Flat' },
  { id: 'outlined', name: 'Outlined' },
  { id: 'tonal', name: 'Tonal' },
  { id: 'text', name: 'Text' },
  { id: 'link', name: 'Link' },
]

const buttonSizeOptions = ['xs', 'sm', 'md', 'lg', 'xl']

const densityOptions = [
  { id: 'compact', name: 'Compact', desc: 'Dense / High info' },
  { id: 'comfortable', name: 'Comfortable', desc: 'Balanced standard' },
  { id: 'convenient', name: 'Convenient', desc: 'Spacious / Touch' },
]

const modalStyleOptions = [
  { id: 'glass', name: 'Glassmorphism' },
  { id: 'elevated', name: 'Elevated Surface' },
  { id: 'bordered', name: 'Bordered Stroke' },
  { id: 'tonal', name: 'Tonal Surface' },
]

const modalAnimationOptions = ['slide-down', 'scale', 'fade', 'slide-up', 'slide-left', 'slide-right', 'bounce']
const modalPositionOptions = ['center', 'top', 'bottom', 'top-right', 'bottom-right']
const modalSizeOptions = ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen']
const modalBackdropOptions = ['glass', 'blur', 'dim']

// Active primary color check
const isColorActive = (hex) => {
  const currentPrimary = colors.value.primary?.toLowerCase()
  return currentPrimary === hex.toLowerCase()
}

// Copy configuration code
const copyConfig = async () => {
  const cfg = {
    layoutMode: layoutMode.value,
    defaultTheme: themeMode.value,
    colors: {
      ...colors.value
    },
    defaultInputPattern: inputPattern.value,
    defaultButtonPattern: buttonPattern.value,
    defaultButtonSize: buttonSize.value,
    defaultListDensity: listDensity.value,
    defaultDropdownDensity: dropdownDensity.value,
    defaultModalStyle: modalStyle.value,
    defaultModalAnimation: modalAnimation.value,
    defaultModalPosition: modalPosition.value,
    defaultModalSize: modalSize.value,
    defaultModalBackdrop: modalBackdrop.value,
  }

  const jsString = `export const themeConfig = ${JSON.stringify(cfg, null, 2)}\n\nexport default themeConfig\n`
  try {
    await navigator.clipboard.writeText(jsString)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy config:', err)
  }
}

// Close on Escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="customizer-root">
    <!-- =================================================================== -->
    <!-- 1. FLOATING ROTATING GEAR TRIGGER BUTTON (Bottom-Right)             -->
    <!-- =================================================================== -->
    <button
      class="customizer-trigger-btn"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      title="Customize Theme & Layout"
      aria-label="Customize Theme & Layout"
    >
      <div class="gear-icon-wrapper">
        <svg
          class="rotating-gear"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </div>
      <span class="customizer-tooltip">Theme Settings</span>
    </button>

    <!-- =================================================================== -->
    <!-- 2. BACKDROP OVERLAY                                                 -->
    <!-- =================================================================== -->
    <div
      :class="['customizer-backdrop', { show: isOpen }]"
      @click="isOpen = false"
    ></div>

    <!-- =================================================================== -->
    <!-- 3. RIGHT OFFCANVAS CUSTOMIZER DRAWER                                -->
    <!-- =================================================================== -->
    <aside :class="['customizer-drawer', { 'drawer-open': isOpen }]">
      <!-- Drawer Header -->
      <div class="drawer-header">
        <div class="d-flex align-center gap-2">
          <AppLogo :width="26" :height="19" />
          <div>
            <div class="font-bold text-sm text-md-base text-primary mb-0">Theme Customizer</div>
            <div class="text-xs text-muted">Live Runtime Configuration</div>
          </div>
        </div>

        <div class="d-flex align-center gap-1">
          <button
            class="btn btn-icon btn-xs btn-tonal-neutral"
            @click="resetAllDefaults"
            title="Reset to System Defaults"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>
          <button
            class="btn btn-icon btn-xs btn-tonal-neutral"
            @click="isOpen = false"
            title="Close Drawer (Esc)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Drawer Scrollable Body -->
      <div class="drawer-body">
        
        <!-- SECTION 1: LAYOUT MODE -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Navigation Layout Mode</span>
            <span class="badge badge-xs badge-tonal-primary text-capitalize">{{ layoutMode }}</span>
          </div>
          <div class="d-grid grid-cols-2 gap-2">
            <button
              v-for="opt in layoutOptions"
              :key="opt.id"
              :class="['customizer-option-card', { active: layoutMode === opt.id }]"
              @click="setLayoutMode(opt.id)"
            >
              <span class="option-icon">{{ opt.icon }}</span>
              <span class="font-semibold text-xs">{{ opt.name }}</span>
              <span class="text-xs text-muted" style="font-size: 0.7rem;">{{ opt.desc }}</span>
            </button>
          </div>
        </div>

        <!-- SECTION 2: DEFAULT / ACTIVE THEME -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Active Theme (defaultTheme)</span>
            <span class="badge badge-xs badge-tonal-success text-capitalize">{{ themeMode }}</span>
          </div>
          <div class="d-grid grid-cols-2 gap-2">
            <button
              :class="['customizer-pill-btn', { active: themeMode === 'system' }]"
              @click="selectTheme('system')"
            >
              <span>💻</span>
              <span>System (Auto)</span>
            </button>
            <button
              v-for="t in themes"
              :key="t.id"
              :class="['customizer-pill-btn', { active: themeMode === t.id }]"
              @click="selectTheme(t.id)"
            >
              <span>{{ t.icon }}</span>
              <span>{{ t.name }}</span>
            </button>
          </div>
        </div>

        <!-- SECTION 3: PRIMARY COLOR PALETTE (Strict specified list) -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Primary Brand Color</span>
            <span class="font-mono text-xs text-primary font-bold">{{ colors.primary }}</span>
          </div>
          <div class="color-swatches-grid">
            <button
              v-for="color in primaryColors"
              :key="color.hex"
              :class="['color-swatch-item', { active: isColorActive(color.hex) }]"
              :style="{ '--swatch-color': color.hex }"
              @click="setColor('primary', color.hex)"
              :title="`${color.name} (${color.hex})`"
            >
              <span class="color-swatch-circle">
                <svg
                  v-if="isColorActive(color.hex)"
                  class="color-check-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span class="color-label">{{ color.name.split(' ')[0] }}</span>
              <span class="color-hex font-mono">{{ color.hex }}</span>
            </button>
          </div>
        </div>

        <!-- SECTION 4: DEFAULT FORM / INPUT PATTERN -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Form Input Pattern</span>
            <span class="badge badge-xs badge-tonal-info text-capitalize">{{ inputPattern }}</span>
          </div>
          <div class="d-grid grid-cols-2 gap-2">
            <button
              v-for="opt in inputPatternOptions"
              :key="opt.id"
              :class="['customizer-option-card', { active: inputPattern === opt.id }]"
              @click="setInputPattern(opt.id)"
            >
              <span class="font-semibold text-xs text-capitalize">{{ opt.name }}</span>
              <span class="text-xs text-muted" style="font-size: 0.7rem;">{{ opt.desc }}</span>
            </button>
          </div>
        </div>

        <!-- SECTION 5: DEFAULT BUTTON PATTERN & SIZE -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Button Pattern & Size</span>
            <span class="badge badge-xs badge-tonal-warning text-capitalize">{{ buttonPattern }} ({{ buttonSize }})</span>
          </div>
          
          <!-- Patterns -->
          <div class="text-xs text-muted mb-1 font-semibold uppercase" style="font-size: 0.68rem;">Pattern Variant:</div>
          <div class="d-flex flex-wrap gap-1 mb-2">
            <button
              v-for="opt in buttonPatternOptions"
              :key="opt.id"
              :class="['btn btn-xs rounded-full', buttonPattern === opt.id ? 'btn-primary' : 'btn-tonal-neutral']"
              @click="setButtonPattern(opt.id)"
            >
              {{ opt.name }}
            </button>
          </div>

          <!-- Sizes -->
          <div class="text-xs text-muted mb-1 font-semibold uppercase" style="font-size: 0.68rem;">Default Size Scale:</div>
          <div class="d-flex gap-1">
            <button
              v-for="sz in buttonSizeOptions"
              :key="sz"
              :class="['btn btn-xs flex-1 text-uppercase font-mono', buttonSize === sz ? 'btn-primary' : 'btn-tonal-neutral']"
              @click="setButtonSize(sz)"
            >
              {{ sz }}
            </button>
          </div>
        </div>

        <!-- SECTION 6: DEFAULT LIST DENSITY -->
        <div class="customizer-section">
          <div class="section-title">
            <span>List Row Density</span>
            <span class="badge badge-xs badge-tonal-primary text-capitalize">{{ listDensity }}</span>
          </div>
          <div class="d-grid grid-cols-3 gap-1">
            <button
              v-for="opt in densityOptions"
              :key="opt.id"
              :class="['customizer-pill-btn', { active: listDensity === opt.id }]"
              @click="setListDensity(opt.id)"
            >
              <span class="font-semibold text-xs text-capitalize">{{ opt.name }}</span>
            </button>
          </div>
        </div>

        <!-- SECTION 7: DEFAULT DROPDOWN DENSITY -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Dropdown Menu Density</span>
            <span class="badge badge-xs badge-tonal-accent text-capitalize">{{ dropdownDensity }}</span>
          </div>
          <div class="d-grid grid-cols-3 gap-1">
            <button
              v-for="opt in densityOptions"
              :key="opt.id"
              :class="['customizer-pill-btn', { active: dropdownDensity === opt.id }]"
              @click="setDropdownDensity(opt.id)"
            >
              <span class="font-semibold text-xs text-capitalize">{{ opt.name }}</span>
            </button>
          </div>
        </div>

        <!-- SECTION 8: DEFAULT MODAL OPTIONS -->
        <div class="customizer-section">
          <div class="section-title">
            <span>Modal System Defaults</span>
            <span class="badge badge-xs badge-tonal-success text-capitalize">{{ modalStyle }}</span>
          </div>

          <!-- Modal Style -->
          <div class="text-xs text-muted mb-1 font-semibold uppercase" style="font-size: 0.68rem;">Modal Container Style:</div>
          <div class="d-grid grid-cols-2 gap-1 mb-2">
            <button
              v-for="opt in modalStyleOptions"
              :key="opt.id"
              :class="['customizer-pill-btn', { active: modalStyle === opt.id }]"
              @click="setModalStyle(opt.id)"
            >
              <span class="text-xs text-capitalize">{{ opt.name }}</span>
            </button>
          </div>

          <!-- Modal Animation -->
          <div class="text-xs text-muted mb-1 font-semibold uppercase" style="font-size: 0.68rem;">Entry Animation:</div>
          <div class="d-flex flex-wrap gap-1 mb-2">
            <button
              v-for="anim in modalAnimationOptions"
              :key="anim"
              :class="['btn btn-xs', modalAnimation === anim ? 'btn-primary' : 'btn-tonal-neutral']"
              @click="setModalAnimation(anim)"
            >
              {{ anim }}
            </button>
          </div>

          <!-- Modal Position & Size Grid -->
          <div class="d-grid grid-cols-2 gap-2">
            <div>
              <div class="text-xs text-muted mb-1 font-semibold uppercase" style="font-size: 0.68rem;">Position:</div>
              <select
                class="form-control form-control-sm"
                :value="modalPosition"
                @change="setModalPosition($event.target.value)"
              >
                <option v-for="pos in modalPositionOptions" :key="pos" :value="pos">{{ pos }}</option>
              </select>
            </div>

            <div>
              <div class="text-xs text-muted mb-1 font-semibold uppercase" style="font-size: 0.68rem;">Size:</div>
              <select
                class="form-control form-control-sm"
                :value="modalSize"
                @change="setModalSize($event.target.value)"
              >
                <option v-for="sz in modalSizeOptions" :key="sz" :value="sz">{{ sz }}</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <!-- Drawer Footer (Copy & Reset) -->
      <div class="drawer-footer">
        <button class="btn btn-sm btn-primary w-full justify-center gap-2" @click="copyConfig">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>{{ copied ? '✓ Copied JS Config!' : 'Copy themeConfig JS' }}</span>
        </button>
        <button class="btn btn-xs btn-tonal-neutral w-full justify-center" @click="resetAllDefaults">
          Reset All to Defaults
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* ------------------------------------------------------------------------- */
/* 1. FLOATING ROTATING TRIGGER BUTTON                                        */
/* ------------------------------------------------------------------------- */
.customizer-trigger-btn {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 1045;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background: var(--primary, #6366f1);
  color: var(--primary-text, #ffffff);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px var(--primary-tonal, rgba(99, 102, 241, 0.45)), 0 8px 16px rgba(0, 0, 0, 0.25);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms ease;
  outline: none;
}

.customizer-trigger-btn:hover {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 8px 25px var(--primary-tonal, rgba(99, 102, 241, 0.65)), 0 12px 24px rgba(0, 0, 0, 0.35);
}

.customizer-trigger-btn:active {
  transform: scale(0.96);
}

.gear-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin-gear-continuous {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating-gear {
  animation: spin-gear-continuous 8s linear infinite;
  transform-origin: center center;
}

.customizer-trigger-btn:hover .rotating-gear {
  animation-duration: 2.5s;
}

.customizer-tooltip {
  position: absolute;
  right: 115%;
  white-space: nowrap;
  background: var(--bg-surface-elevated, #1e293b);
  color: var(--text-primary, #ffffff);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.1));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  opacity: 0;
  transform: translateX(10px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.customizer-trigger-btn:hover .customizer-tooltip {
  opacity: 1;
  transform: translateX(0);
}

/* ------------------------------------------------------------------------- */
/* 2. BACKDROP OVERLAY                                                       */
/* ------------------------------------------------------------------------- */
.customizer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1050;
  opacity: 0;
  visibility: hidden;
  transition: opacity 250ms ease, visibility 250ms ease;
}

.customizer-backdrop.show {
  opacity: 1;
  visibility: visible;
}

/* ------------------------------------------------------------------------- */
/* 3. RIGHT OFFCANVAS DRAWER                                                 */
/* ------------------------------------------------------------------------- */
.customizer-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 390px;
  max-width: 90vw;
  height: 100vh;
  background: var(--bg-surface-elevated, #1e293b);
  border-left: 1px solid var(--border-color, #334155);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  z-index: 1055;
  transform: translateX(100%);
  visibility: hidden;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), visibility 300ms ease, box-shadow 300ms ease;
  overflow: hidden;
}

.customizer-drawer.drawer-open {
  transform: translateX(0);
  visibility: visible;
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.5);
}

/* Header */
.drawer-header {
  height: 4rem;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: var(--bg-surface, #111827);
}

/* Body */
.drawer-body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 1.25rem 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Customizer Section */
.customizer-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.06));
}

.customizer-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary, #f8fafc);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Option Cards (Layout, Input Patterns) */
.customizer-option-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color, #334155);
  background: var(--bg-surface-tonal, rgba(255, 255, 255, 0.04));
  color: var(--text-secondary, #94a3b8);
  cursor: pointer;
  text-align: left;
  transition: all 180ms ease;
  width: 100%;
}

.customizer-option-card:hover {
  background: var(--bg-hover, rgba(255, 255, 255, 0.08));
  color: var(--text-primary, #ffffff);
  border-color: var(--border-color-focus, #6366f1);
}

.customizer-option-card.active {
  background: var(--primary-tonal, rgba(99, 102, 241, 0.16));
  border-color: var(--primary, #6366f1);
  color: var(--text-primary, #ffffff);
  box-shadow: 0 0 0 1px var(--primary, #6366f1);
}

.option-icon {
  font-size: 1.1rem;
  color: var(--primary, #6366f1);
}

/* Pill Buttons */
.customizer-pill-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.45rem 0.65rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border-color, #334155);
  background: var(--bg-surface-tonal, rgba(255, 255, 255, 0.04));
  color: var(--text-secondary, #94a3b8);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
}

.customizer-pill-btn:hover {
  background: var(--bg-hover, rgba(255, 255, 255, 0.08));
  color: var(--text-primary, #ffffff);
}

.customizer-pill-btn.active {
  background: var(--primary, #6366f1);
  color: var(--primary-text, #ffffff);
  border-color: var(--primary, #6366f1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Primary Color Swatches Grid */
.color-swatches-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.color-swatch-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color, #334155);
  background: var(--bg-surface-tonal, rgba(255, 255, 255, 0.04));
  cursor: pointer;
  transition: all 180ms ease;
  outline: none;
}

.color-swatch-item:hover {
  transform: translateY(-2px);
  border-color: var(--swatch-color);
  background: var(--bg-hover, rgba(255, 255, 255, 0.08));
}

.color-swatch-item.active {
  border-color: var(--swatch-color);
  background: color-mix(in srgb, var(--swatch-color) 16%, transparent);
  box-shadow: 0 0 0 2px var(--swatch-color);
}

.color-swatch-circle {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--swatch-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 180ms ease;
}

.color-swatch-item:hover .color-swatch-circle {
  transform: scale(1.1);
}

.color-check-icon {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
}

.color-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-primary, #f8fafc);
  text-align: center;
}

.color-hex {
  font-size: 0.625rem;
  color: var(--text-muted, #94a3b8);
}

/* Footer */
.drawer-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--bg-surface, #111827);
  flex-shrink: 0;
}
</style>
