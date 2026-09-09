<script setup>
import { ref } from 'vue'
import { useLayout } from '../composables/useLayout'
import { useTransactionStore } from '../stores/transactions'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'
import { axiosInstance, mockApi } from '../plugins/axios'
import AppLogo from '../@core/components/AppLogo.vue'

const layout = useLayout()
const themeStore = useThemeStore()
const txStore = useTransactionStore()
const authStore = useAuthStore()

const primaryColorPresets = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Sky Blue', hex: '#38bdf8' },
]

// Axios Live Interactive Demo
const apiMethod = ref('GET')
const apiEndpoint = ref('/transactions')
const apiLoading = ref(false)
const apiResponse = ref(null)
const apiStatus = ref(null)
const apiDuration = ref(null)
const apiError = ref(null)
const showFullResponse = ref(false)

const runApiRequest = async (method = 'GET', endpoint = '/transactions') => {
  apiMethod.value = method
  apiEndpoint.value = endpoint
  apiLoading.value = true
  apiError.value = null
  apiResponse.value = null
  const startTime = Date.now()

  try {
    let result
    if (endpoint === '/transactions') {
      try {
        result = await axiosInstance.get('/transactions')
      } catch {
        result = await mockApi.getTransactions()
      }
    } else if (endpoint === '/metrics') {
      try {
        result = await axiosInstance.get('/metrics')
      } catch {
        result = await mockApi.getMetrics()
      }
    } else if (endpoint === '/auth/login') {
      try {
        result = await axiosInstance.post('/auth/login', { email: 'admin@jui.dev', password: 'password123' })
      } catch {
        result = await mockApi.login({ email: 'admin@jui.dev', password: 'password123' })
      }
    }

    apiStatus.value = result.status || 200
    apiDuration.value = result.duration || (Date.now() - startTime)
    apiResponse.value = result.data
  } catch (err) {
    apiStatus.value = err.status || 500
    apiDuration.value = Date.now() - startTime
    apiError.value = err.message || 'API Request failed'
  } finally {
    apiLoading.value = false
  }
}

// Run initial sample request
if (!apiResponse.value) {
  runApiRequest('GET', '/transactions')
}
</script>

<template>
  <div class="d-flex flex-column gap-4 gap-md-5 w-full">

    <!-- ============================================================ -->
    <!-- HERO HEADER                                                  -->
    <!-- ============================================================ -->
    <header class="ov-hero card">
      <div class="d-flex flex-column flex-lg-row align-start align-lg-center justify-between gap-4">
        <div class="d-flex align-start gap-3">
          <AppLogo :width="46" :height="34" class="ov-hero__logo flex-shrink-0 mt-1" />
          <div>
            <div class="d-flex align-center gap-2 mb-1">
              <h1 class="ov-hero__title mb-0">JUI Design System</h1>
              <span class="ov-version-tag">v2.4</span>
            </div>
            <p class="ov-hero__desc text-secondary mb-0">
              Modern enterprise component system crafted with Vue 3, Pinia reactive state, Axios API services, and
              modular SCSS architecture.
            </p>
          </div>
        </div>

        <!-- Quick Theme Controls -->
        <div class="ov-hero__themes d-flex flex-wrap align-center gap-1 p-1 rounded-full border border-subtle">
          <button v-for="t in layout.themes" :key="t.id"
            :class="['btn btn-xs rounded-full', layout.currentTheme.value === t.id ? 'btn-primary' : 'btn-text']"
            :title="t.desc" @click="layout.selectTheme(t.id)">
            <span>{{ t.icon }}</span>
            <span>{{ t.name.split(' ')[0] }}</span>
          </button>
        </div>
      </div>

      <!-- Key Stat Highlights -->
      <div class="ov-stats-grid mt-4 pt-3 border-top border-subtle">
        <div class="ov-stat-item">
          <div class="ov-stat-value">25+</div>
          <div class="ov-stat-label">UI Components</div>
        </div>
        <div class="ov-stat-item">
          <div class="ov-stat-value">5</div>
          <div class="ov-stat-label">Built-in Themes</div>
        </div>
        <div class="ov-stat-item">
          <div class="ov-stat-value">2</div>
          <div class="ov-stat-label">Layout Modes</div>
        </div>
        <div class="ov-stat-item">
          <div class="ov-stat-value">100%</div>
          <div class="ov-stat-label">Token Reactive</div>
        </div>
      </div>
    </header>

    <!-- ============================================================ -->
    <!-- INTERACTIVE THEME & ARCHITECTURE ENGINE                      -->
    <!-- ============================================================ -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">

      <!-- Layout & Density Configuration -->
      <div class="card card-bordered">
        <div class="ov-card-header">
          <div>
            <h2 class="ov-card-title">Layout & Display Preferences</h2>
            <p class="ov-card-subtitle">Reactive Pinia layout mode and component spacing</p>
          </div>
        </div>

        <div class="card-body p-4 d-flex flex-column gap-4">
          <!-- Layout Selection -->
          <div>
            <span class="ov-section-label mb-2">Navigation Mode</span>
            <div class="d-grid grid-cols-2 gap-2">
              <button :class="['ov-mode-card', themeStore.layoutMode === 'sidebar' ? 'ov-mode-card--active' : '']"
                @click="themeStore.setLayoutMode('sidebar')">
                <span class="ov-mode-icon">◨</span>
                <span class="font-semibold text-sm">Fixed Sidebar</span>
                <span class="text-xs text-muted">Left full-height menu</span>
              </button>

              <button :class="['ov-mode-card', themeStore.layoutMode === 'navbar' ? 'ov-mode-card--active' : '']"
                @click="themeStore.setLayoutMode('navbar')">
                <span class="ov-mode-icon">⬒</span>
                <span class="font-semibold text-sm">Top Navbar</span>
                <span class="text-xs text-muted">Horizontal header menu</span>
              </button>
            </div>
          </div>

          <!-- Density Controls -->
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="ov-section-label mb-0">Component Density</span>
              <span class="text-xs font-mono text-primary font-semibold">{{ themeStore.listDensity }}</span>
            </div>
            <div class="d-flex gap-2">
              <button v-for="density in ['compact', 'comfortable', 'convenient']" :key="density"
                :class="['btn btn-xs flex-1 text-capitalize', themeStore.listDensity === density ? 'btn-primary' : 'btn-tonal-neutral']"
                @click="themeStore.setListDensity(density); themeStore.setDropdownDensity(density);">
                {{ density }}
              </button>
            </div>
          </div>

          <!-- Color Presets -->
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="ov-section-label mb-0">Primary Accent Preset</span>
              <button class="btn btn-link btn-xs text-danger p-0" @click="themeStore.resetColors()">Reset</button>
            </div>
            <div class="d-flex flex-wrap gap-2 align-center">
              <button v-for="color in primaryColorPresets" :key="color.hex" class="ov-color-chip"
                @click="themeStore.setColor('primary', color.hex)">
                <span class="ov-color-dot" :style="{ backgroundColor: color.hex }"></span>
                <span>{{ color.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Live API & Client Service -->
      <div class="card card-bordered">
        <div class="ov-card-header">
          <div>
            <h2 class="ov-card-title">Axios HTTP Client</h2>
            <p class="ov-card-subtitle">Mock interceptors with simulated network latency</p>
          </div>
          <span class="ov-status-indicator" :class="{ 'ov-status-indicator--active': !apiLoading }">
            {{ apiLoading ? 'Fetching...' : `${apiStatus || 200} OK` }}
          </span>
        </div>

        <div class="card-body p-4 d-flex flex-column gap-3">
          <!-- Request Bar -->
          <div>
            <span class="ov-section-label mb-2">Execute Endpoint</span>
            <div class="d-flex flex-wrap gap-2">
              <button :class="['btn btn-xs', apiEndpoint === '/transactions' ? 'btn-primary' : 'btn-tonal-neutral']"
                :disabled="apiLoading" @click="runApiRequest('GET', '/transactions')">
                GET /transactions
              </button>
              <button :class="['btn btn-xs', apiEndpoint === '/metrics' ? 'btn-primary' : 'btn-tonal-neutral']"
                :disabled="apiLoading" @click="runApiRequest('GET', '/metrics')">
                GET /metrics
              </button>
              <button :class="['btn btn-xs', apiEndpoint === '/auth/login' ? 'btn-primary' : 'btn-tonal-neutral']"
                :disabled="apiLoading" @click="runApiRequest('POST', '/auth/login')">
                POST /auth/login
              </button>
            </div>
          </div>

          <!-- Response Card -->
          <div class="ov-response-box flex-1 d-flex flex-column">
            <div class="d-flex align-center justify-between pb-2 mb-2 border-bottom border-subtle">
              <div class="d-flex align-center gap-2">
                <span class="font-mono text-xs font-bold text-primary">{{ apiMethod }}</span>
                <span class="font-mono text-xs text-muted">{{ apiEndpoint }}</span>
              </div>
              <div class="d-flex align-center gap-2 text-xs font-mono text-muted">
                <span v-if="apiDuration">{{ apiDuration }}ms</span>
                <button class="btn btn-link btn-xs p-0 text-muted" @click="showFullResponse = !showFullResponse">
                  {{ showFullResponse ? 'Collapse' : 'Expand' }}
                </button>
              </div>
            </div>

            <pre class="ov-code-pre mb-0"
              :class="{ 'ov-code-pre--expanded': showFullResponse }"><code>{{ apiLoading ? '// Request in progress...' : JSON.stringify(apiResponse, null, 2) }}</code></pre>
          </div>
        </div>
      </div>

    </div>

    <!-- ============================================================ -->
    <!-- COLOR TOKENS PALETTE                                         -->
    <!-- ============================================================ -->
    <div class="card card-bordered">
      <div class="ov-card-header">
        <div>
          <h2 class="ov-card-title">Color Tokens</h2>
          <p class="ov-card-subtitle">Harmonized semantic palettes computed via CSS variables</p>
        </div>
      </div>
      <div class="card-body p-4">
        <div class="ov-swatches-grid">
          <div class="ov-swatch" style="--swatch-color: var(--primary);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Primary</span>
              <span class="ov-swatch-token">--primary</span>
            </div>
          </div>

          <div class="ov-swatch" style="--swatch-color: var(--secondary);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Secondary</span>
              <span class="ov-swatch-token">--secondary</span>
            </div>
          </div>

          <div class="ov-swatch" style="--swatch-color: var(--accent);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Accent</span>
              <span class="ov-swatch-token">--accent</span>
            </div>
          </div>

          <div class="ov-swatch" style="--swatch-color: var(--success);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Success</span>
              <span class="ov-swatch-token">--success</span>
            </div>
          </div>

          <div class="ov-swatch" style="--swatch-color: var(--warning);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Warning</span>
              <span class="ov-swatch-token">--warning</span>
            </div>
          </div>

          <div class="ov-swatch" style="--swatch-color: var(--danger);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Danger</span>
              <span class="ov-swatch-token">--danger</span>
            </div>
          </div>

          <div class="ov-swatch" style="--swatch-color: var(--info);">
            <div class="ov-swatch-preview"></div>
            <div class="ov-swatch-info">
              <span class="ov-swatch-name">Info</span>
              <span class="ov-swatch-token">--info</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- SYSTEM EXPLORER TILES                                        -->
    <!-- ============================================================ -->
    <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-xl-4 gap-3 gap-md-4">
      <RouterLink to="/buttons" class="ov-nav-tile card card-bordered text-decoration-none">
        <div class="ov-nav-tile__icon">🔘</div>
        <div class="font-bold text-sm text-primary mb-1">Buttons & Sizes</div>
        <p class="text-xs text-muted mb-0">Flat, Outlined, Tonal, Text, and Link patterns with 5 scale tiers.</p>
      </RouterLink>

      <RouterLink to="/forms" class="ov-nav-tile card card-bordered text-decoration-none">
        <div class="ov-nav-tile__icon">📝</div>
        <div class="font-bold text-sm text-primary mb-1">Form Controls</div>
        <p class="text-xs text-muted mb-0">Boxed, Underlined, Floating Labels, and Pill rounded fields.</p>
      </RouterLink>

      <RouterLink to="/email" class="ov-nav-tile card card-bordered text-decoration-none">
        <div class="ov-nav-tile__icon">✉️</div>
        <div class="font-bold text-sm text-primary mb-1">Applications Suite</div>
        <p class="text-xs text-muted mb-0">Full-featured Email client, Kanban board, and real-time Chat UI.</p>
      </RouterLink>

      <RouterLink to="/tables" class="ov-nav-tile card card-bordered text-decoration-none">
        <div class="ov-nav-tile__icon">📊</div>
        <div class="font-bold text-sm text-primary mb-1">Data & Tables</div>
        <p class="text-xs text-muted mb-0">DataTables, sorting, density variations, and pagination controls.</p>
      </RouterLink>
    </div>

  </div>
</template>

<style scoped>
/* Hero Header */
.ov-hero {
  padding: 1.75rem 2rem;
  background: var(--bg-surface-elevated, var(--bg-surface));
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
}

.ov-hero__title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.ov-version-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--primary-tonal, rgba(99, 102, 241, 0.12));
  color: var(--primary);
}

.ov-hero__desc {
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: 44rem;
}

.ov-hero__themes {
  background: var(--bg-surface-tonal);
}

/* Stats Row */
.ov-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .ov-stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.ov-stat-item {
  display: flex;
  flex-direction: column;
}

.ov-stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.ov-stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Section Header */
.ov-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.25rem;
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
}

.ov-card-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
}

.ov-card-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0.15rem 0 0;
}

.ov-section-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

/* Layout Mode Cards */
.ov-mode-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  background: var(--bg-surface-tonal);
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.ov-mode-card:hover {
  border-color: var(--primary);
}

.ov-mode-card--active {
  border-color: var(--primary);
  background: var(--primary-tonal, rgba(99, 102, 241, 0.08));
}

.ov-mode-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: var(--primary);
}

/* Color Chips */
.ov-color-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--bg-surface-tonal);
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.ov-color-chip:hover {
  border-color: var(--primary);
  color: var(--text-primary);
}

.ov-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* API Status Indicator */
.ov-status-indicator {
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 0.375rem;
  background: var(--bg-surface-tonal);
  color: var(--text-muted);
}

.ov-status-indicator--active {
  background: var(--success-tonal, rgba(16, 185, 129, 0.12));
  color: var(--success, #10b981);
}

/* Code Pre */
.ov-response-box {
  background: var(--bg-surface-tonal);
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  border-radius: 0.5rem;
  padding: 0.875rem;
}

.ov-code-pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--text-secondary);
  background: transparent;
  max-height: 120px;
  overflow-y: auto;
  transition: max-height 0.25s ease;
}

.ov-code-pre--expanded {
  max-height: 280px;
}

/* Swatches Grid */
.ov-swatches-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 576px) {
  .ov-swatches-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) {
  .ov-swatches-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}

.ov-swatch {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  background: var(--bg-surface-tonal);
  overflow: hidden;
}

.ov-swatch-preview {
  height: 48px;
  background: var(--swatch-color);
}

.ov-swatch-info {
  padding: 0.5rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ov-swatch-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
}

.ov-swatch-token {
  font-size: 0.65rem;
  font-family: monospace;
  color: var(--text-muted);
}

/* Nav Tiles */
.ov-nav-tile {
  padding: 1.25rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.ov-nav-tile:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
}

.ov-nav-tile__icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
