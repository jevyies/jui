<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast, TOAST_POSITIONS, TOAST_SIZES, TOAST_COLORS, TOAST_VARIANTS } from '@/composables/useToast'
import JBtn from '@core/components/JBtn.vue'
import JToast from '@core/components/JToast.vue'

const toast = useToast()

// ----------------------------------------------------------------------------
// Active Tab & Clipboard Toast
// ----------------------------------------------------------------------------
const activeTab = ref('all')
const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(text)
  }
  copiedSnippet.value = text
  toast.success('Code copied to clipboard!', {
    position: 'bottom-center',
    size: 'sm',
    timeout: 2200,
  })
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2200)
}

// ----------------------------------------------------------------------------
// 1. Interactive Studio / Playground State
// ----------------------------------------------------------------------------
const studio = reactive({
  title: 'Notification Alert',
  message: 'This is a live interactive toast configured via the playground studio.',
  position: 'top-right',
  size: 'md',
  color: 'primary',
  variant: 'tonal',
  timeout: 4000,
  isPersistent: false,
  showProgress: true,
  pauseOnHover: true,
  dismissible: true,
  showIcon: true,
  hasAction: false,
  actionLabel: 'Undo',
})

// Dynamic Code Generation for the playground
const generatedCode = computed(() => {
  const options = []
  if (studio.title) options.push(`  title: '${studio.title}'`)
  if (studio.message) options.push(`  message: '${studio.message}'`)
  if (studio.color !== 'primary') options.push(`  color: '${studio.color}'`)
  if (studio.position !== 'top-right') options.push(`  position: '${studio.position}'`)
  if (studio.size !== 'md') options.push(`  size: '${studio.size}'`)
  if (studio.variant !== 'tonal') options.push(`  variant: '${studio.variant}'`)
  if (studio.isPersistent) {
    options.push(`  timeout: 0`)
  } else if (studio.timeout !== 4000) {
    options.push(`  timeout: ${studio.timeout}`)
  }
  if (!studio.showProgress && !studio.isPersistent) options.push(`  showProgress: false`)
  if (!studio.pauseOnHover) options.push(`  pauseOnHover: false`)
  if (!studio.dismissible) options.push(`  dismissible: false`)
  if (!studio.showIcon) options.push(`  icon: false`)
  if (studio.hasAction) {
    options.push(`  action: {\n    label: '${studio.actionLabel}',\n    onClick: (t) => console.log('Action clicked for', t.id)\n  }`)
  }

  return `import { useToast } from '@/composables/useToast'

const toast = useToast()

toast.show({
${options.join(',\n')}
})`
})

// Fire the configured toast
const fireStudioToast = () => {
  toast.show({
    title: studio.title,
    message: studio.message,
    position: studio.position,
    size: studio.size,
    color: studio.color,
    variant: studio.variant,
    timeout: studio.isPersistent ? 0 : Number(studio.timeout),
    showProgress: studio.showProgress && !studio.isPersistent,
    pauseOnHover: studio.pauseOnHover,
    dismissible: studio.dismissible,
    icon: studio.showIcon ? true : false,
    action: studio.hasAction
      ? {
          label: studio.actionLabel,
          onClick: () => {
            toast.info(`Clicked "${studio.actionLabel}" action!`, {
              position: studio.position,
              size: 'sm',
              timeout: 2500,
            })
          },
        }
      : null,
  })
}

// ----------------------------------------------------------------------------
// 2. Preset Matrix Triggers
// ----------------------------------------------------------------------------
const triggerLocationToast = (pos) => {
  studio.position = pos
  toast.show({
    title: `Location: ${pos}`,
    message: `Triggered at viewport coordinate: ${pos}`,
    position: pos,
    color: 'primary',
    variant: 'tonal',
    size: 'md',
    timeout: 3500,
  })
}

const triggerSizeToast = (size) => {
  studio.size = size
  toast.show({
    title: `Size: ${size.toUpperCase()}`,
    message: `Sizing demonstration using the ${size.toUpperCase()} scale.`,
    size,
    color: 'info',
    variant: 'tonal',
    position: studio.position,
    timeout: 4000,
  })
}

const triggerColorToast = (color, variant = 'tonal') => {
  const titles = {
    primary: 'Primary Update',
    secondary: 'Secondary Event',
    success: 'Action Successful',
    warning: 'Storage Warning',
    danger: 'Transaction Failed',
    info: 'System Advisory',
    neutral: 'Background Sync',
  }
  const messages = {
    primary: 'System settings synced across all workspace nodes.',
    secondary: 'Backup archive created at /var/backup/snapshot-latest.tar.gz',
    success: 'Payment authorization completed and verified via Stripe webhook.',
    warning: 'Your workspace reached 85% of assigned database disk quota.',
    danger: 'Gateway timeout 504 while processing remote RPC endpoint.',
    info: 'New maintenance window scheduled for Sunday 02:00 AM UTC.',
    neutral: 'Auto-saved document draft to local encrypted storage.',
  }

  toast.show({
    title: titles[color] || 'Notification',
    message: messages[color] || 'Dynamic message payload',
    color,
    variant,
    position: studio.position,
    size: studio.size,
    timeout: 4500,
  })
}

const triggerActionToast = () => {
  toast.show({
    title: 'Item Deleted',
    message: 'Record #4928 was moved to trash.',
    color: 'danger',
    variant: 'tonal',
    position: studio.position,
    size: 'md',
    timeout: 6000,
    action: {
      label: 'Undo Action',
      onClick: (t) => {
        toast.dismiss(t.id)
        toast.success('Action undone successfully!', {
          position: studio.position,
          size: 'sm',
          timeout: 3000,
        })
      },
    },
  })
}

const triggerPersistentToast = () => {
  toast.show({
    title: 'Persistent Critical Alert',
    message: 'This toast requires explicit user dismissal or action confirmation.',
    color: 'warning',
    variant: 'solid',
    position: 'bottom-right',
    size: 'md',
    timeout: 0,
    action: {
      label: 'Acknowledge',
      onClick: (t) => toast.dismiss(t.id),
    },
  })
}

// ----------------------------------------------------------------------------
// 3. Code Recipes
// ----------------------------------------------------------------------------
const snippetBasic = `import { useToast } from '@/composables/useToast'

const toast = useToast()

// Quick semantic helpers
toast.success('Project saved successfully!')
toast.error('Network connection timeout.')
toast.warning('Database storage reaching 90% capacity.')
toast.info('New software update available.')`

const snippetAdvanced = `import { useToast } from '@/composables/useToast'

const toast = useToast()

// Custom configured toast with interactive undo
toast.show({
  title: 'Item Deleted',
  message: 'Record #4928 was moved to trash.',
  position: 'bottom-right',
  color: 'danger',
  variant: 'tonal',
  size: 'md',
  timeout: 6000,
  showProgress: true,
  action: {
    label: 'Undo Action',
    onClick: (t) => {
      toast.dismiss(t.id)
      console.log('Restored record #4928')
    }
  }
})`
</script>

<template>
  <div class="d-flex flex-column gap-4 gap-md-5 w-full">
    <!-- Header -->
    <header class="d-flex flex-column gap-3">
      <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold mb-1">Toasts & Notifications</h1>
          <p class="text-secondary text-sm mb-0">
            Floating toast notification system with 9 anchor coordinates, adaptive surfaces, animated countdown timers, and rich action callbacks.
          </p>
        </div>

        <div class="d-flex align-center gap-2">
          <JBtn
            v-if="toast.toasts.value.length > 0"
            variant="outlined"
            color="danger"
            size="sm"
            @click="toast.clear()"
          >
            ✕ Clear All ({{ toast.toasts.value.length }})
          </JBtn>
          <JBtn variant="tonal" color="primary" size="sm" prepend-icon="📋" @click="copyToClipboard(generatedCode)">
            Copy Recipe
          </JBtn>
        </div>
      </div>

      <!-- Quick Feature Badges -->
      <div class="d-flex flex-wrap align-center gap-2">
        <span class="badge badge-tonal-primary text-xs">🧭 9 Viewport Anchors</span>
        <span class="badge badge-tonal-success text-xs">⏳ Progress Bar Timers</span>
        <span class="badge badge-tonal-info text-xs">⚡ Interactive Action Callbacks</span>
        <span class="badge badge-tonal-warning text-xs">📏 5 Sizing Scales</span>
        <span class="badge badge-tonal-neutral text-xs">🎨 7 Theme Palettes</span>
      </div>

      <!-- Segmented Navigation Tabs (All is First) -->
      <div class="d-flex align-center gap-1 p-1 rounded-full bg-surface-tonal border border-subtle mt-1" style="width: fit-content;">
        <button
          v-for="t in [
            { id: 'all', label: 'All' },
            { id: 'playground', label: 'Playground Studio' },
            { id: 'locations', label: 'Locations & Sizing' },
            { id: 'colors', label: 'Colors & Presets' },
            { id: 'api', label: 'API & Recipes' }
          ]"
          :key="t.id"
          :class="['btn btn-sm rounded-full px-3', activeTab === t.id ? 'btn-primary' : 'btn-text']"
          @click="activeTab = t.id"
        >
          {{ t.label }}
        </button>
      </div>
    </header>

    <!-- =================================================================== -->
    <!-- 1. INTERACTIVE TOAST STUDIO / PLAYGROUND                            -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'playground'" class="card card-bordered p-4 bg-surface-elevated">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2 border-bottom border-subtle pb-3">
          <div class="d-flex align-center gap-2">
            <span style="font-size: 1.25rem;">🎛️</span>
            <div>
              <h2 class="text-base font-bold mb-0">Interactive Toast Studio</h2>
              <span class="text-xs text-secondary">Tune positions, sizing, theme colors, and timeouts with live preview</span>
            </div>
          </div>
          <JBtn color="primary" size="md" prepend-icon="✨" @click="fireStudioToast">
            Fire Live Toast
          </JBtn>
        </div>

        <!-- 4-Column Controls Bar -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <!-- Position -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">1. Viewport Location</label>
            <select v-model="studio.position" class="form-select form-select-sm">
              <option value="top-right">top-right (Default)</option>
              <option value="top-center">top-center</option>
              <option value="top-left">top-left</option>
              <option value="center-right">center-right</option>
              <option value="center">center</option>
              <option value="center-left">center-left</option>
              <option value="bottom-right">bottom-right</option>
              <option value="bottom-center">bottom-center</option>
              <option value="bottom-left">bottom-left</option>
            </select>
          </div>

          <!-- Size -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">2. Sizing Scale</label>
            <select v-model="studio.size" class="form-select form-select-sm">
              <option value="xs">xs (Ultra-compact)</option>
              <option value="sm">sm (Compact)</option>
              <option value="md">md (Standard Default)</option>
              <option value="lg">lg (Large)</option>
              <option value="xl">xl (Broadcast Banner)</option>
            </select>
          </div>

          <!-- Color -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">3. Theme Palette</label>
            <select v-model="studio.color" class="form-select form-select-sm">
              <option value="primary">primary (Indigo)</option>
              <option value="secondary">secondary (Slate)</option>
              <option value="success">success (Emerald)</option>
              <option value="warning">warning (Amber)</option>
              <option value="danger">danger (Rose)</option>
              <option value="info">info (Sky)</option>
              <option value="neutral">neutral (Zinc)</option>
            </select>
          </div>

          <!-- Variant -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">4. Surface Variant</label>
            <select v-model="studio.variant" class="form-select form-select-sm">
              <option value="tonal">tonal (Soft Surface Fill)</option>
              <option value="solid">solid (High Contrast Solid)</option>
              <option value="outlined">outlined (Bordered Line)</option>
              <option value="glass">glass (Frosted Glass Blur)</option>
            </select>
          </div>
        </div>

        <!-- Secondary Config Row: Timeout Slider & Inputs -->
        <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
          <!-- Left: Timeout & Behavior -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column justify-between gap-3">
            <div class="d-flex align-center justify-between">
              <span class="font-semibold text-xs">5. Duration & Behavior Controls</span>
              <span class="badge" :class="studio.isPersistent ? 'badge-warning' : 'badge-tonal-primary'">
                {{ studio.isPersistent ? 'Sticky / No Auto-Close' : `${(studio.timeout / 1000).toFixed(1)}s (${studio.timeout}ms)` }}
              </span>
            </div>

            <input
              type="range"
              class="form-range w-full"
              min="1000"
              max="15000"
              step="500"
              :disabled="studio.isPersistent"
              v-model.number="studio.timeout"
            />

            <div class="d-flex flex-wrap align-center gap-3 text-xs text-secondary">
              <label class="d-flex align-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="studio.isPersistent" />
                <span class="text-primary font-medium">Sticky (No Timeout)</span>
              </label>
              <label class="d-flex align-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="studio.showProgress" :disabled="studio.isPersistent" />
                <span>Countdown Progress Bar</span>
              </label>
              <label class="d-flex align-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="studio.pauseOnHover" :disabled="studio.isPersistent" />
                <span>Pause Timer on Hover</span>
              </label>
              <label class="d-flex align-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="studio.showIcon" />
                <span>Show Icon</span>
              </label>
              <label class="d-flex align-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="studio.dismissible" />
                <span>Dismiss Button (✕)</span>
              </label>
            </div>
          </div>

          <!-- Right: Text & Action Button Content -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column gap-2.5">
            <div class="d-grid grid-cols-1 grid-cols-sm-2 gap-2">
              <div>
                <label class="form-label text-xs font-semibold">Title Headline</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="studio.title"
                  placeholder="Notification Headline"
                />
              </div>

              <div>
                <label class="form-label text-xs font-semibold">Action Button</label>
                <div class="d-flex gap-1.5">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    :disabled="!studio.hasAction"
                    v-model="studio.actionLabel"
                    placeholder="Button Label"
                  />
                  <button
                    type="button"
                    :class="['btn btn-xs', studio.hasAction ? 'btn-success' : 'btn-outlined-neutral']"
                    @click="studio.hasAction = !studio.hasAction"
                  >
                    {{ studio.hasAction ? 'On' : 'Off' }}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label class="form-label text-xs font-semibold">Body Message</label>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="studio.message"
                placeholder="Notification message body..."
              />
            </div>
          </div>
        </div>

        <!-- Live Preview Stage & Generated Code -->
        <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
          <!-- Live Preview Canvas -->
          <div class="p-4 rounded-lg bg-surface border border-subtle d-flex flex-column align-center justify-center gap-3" style="min-height: 200px;">
            <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Live Component Preview</span>
            <JToast
              :title="studio.title"
              :message="studio.message"
              :color="studio.color"
              :variant="studio.variant"
              :size="studio.size"
              :icon="studio.showIcon"
              :dismissible="studio.dismissible"
              :show-progress="studio.showProgress && !studio.isPersistent"
              :timeout="studio.isPersistent ? 0 : studio.timeout"
              :action="studio.hasAction ? { label: studio.actionLabel } : null"
            />
            <JBtn color="primary" size="md" prepend-icon="✨" @click="fireStudioToast">
              Fire Live Toast
            </JBtn>
          </div>

          <!-- Generated Code -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column justify-between gap-2">
            <div class="d-flex align-center justify-between">
              <span class="text-xs font-semibold text-secondary uppercase tracking-wider">Generated Code</span>
              <button class="btn btn-xs btn-tonal-primary" @click="copyToClipboard(generatedCode)">
                <span>📋</span> Copy
              </button>
            </div>
            <pre class="p-3 rounded font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="line-height: 1.45; max-height: 170px;"><code>{{ generatedCode }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 2. NINE VIEWPORT LOCATIONS & SIZING                                 -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'locations'" class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- 1. 9-Point Viewport Compass -->
      <div class="card card-bordered p-4 bg-surface-elevated">
        <div class="d-flex align-center justify-between mb-2">
          <div>
            <h2 class="text-base font-bold mb-0">🧭 9 Viewport Anchor Locations</h2>
            <p class="text-xs text-secondary mb-0">Click any coordinate below to fire a live toast into that screen anchor.</p>
          </div>
          <button
            class="btn btn-xs btn-tonal-primary"
            @click="TOAST_POSITIONS.forEach((p) => triggerLocationToast(p))"
          >
            🚀 Fire All 9
          </button>
        </div>

        <div class="d-grid grid-cols-3 gap-2 mt-3" style="max-width: 32rem; margin: 0 auto;">
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('top-left')">↖ Top-Left</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('top-center')">⬆ Top-Center</button>
          <button class="btn btn-xs btn-primary" @click="triggerLocationToast('top-right')">↗ Top-Right (Default)</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('center-left')">⬅ Center-Left</button>
          <button class="btn btn-xs btn-tonal-info" @click="triggerLocationToast('center')">⏺ True Center</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('center-right')">➡ Center-Right</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('bottom-left')">↙ Bottom-Left</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('bottom-center')">⬇ Bottom-Center</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="triggerLocationToast('bottom-right')">↘ Bottom-Right</button>
        </div>
      </div>

      <!-- 2. Sizing Scale Matrix -->
      <div class="card card-bordered p-4 bg-surface-elevated">
        <div class="d-flex align-center justify-between mb-2">
          <div>
            <h2 class="text-base font-bold mb-0">📏 5 Sizing Scales</h2>
            <p class="text-xs text-secondary mb-0">From mini compact badges to spacious broadcast hero banners.</p>
          </div>
          <button
            class="btn btn-xs btn-tonal-info"
            @click="TOAST_SIZES.forEach((s) => triggerSizeToast(s))"
          >
            Cascade All 5
          </button>
        </div>

        <div class="d-flex flex-column gap-2 mt-3">
          <div
            v-for="sz in TOAST_SIZES"
            :key="sz"
            class="p-2.5 rounded-lg bg-surface border border-subtle d-flex align-center justify-between"
          >
            <div class="d-flex align-center gap-2">
              <span class="badge badge-tonal-primary font-mono text-xs">{{ sz.toUpperCase() }}</span>
              <span class="text-xs text-secondary">
                <template v-if="sz === 'xs'">Ultra-compact single line mini badge.</template>
                <template v-else-if="sz === 'sm'">Compact quick status notification.</template>
                <template v-else-if="sz === 'md'">Balanced standard size (default).</template>
                <template v-else-if="sz === 'lg'">Enhanced readability with large typography.</template>
                <template v-else-if="sz === 'xl'">Spacious broadcast hero banner.</template>
              </span>
            </div>
            <button class="btn btn-xs btn-outlined-neutral" @click="triggerSizeToast(sz)">
              Trigger {{ sz.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 3. COLORS, VARIANTS & INTERACTIVE ACTIONS                           -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'colors'" class="d-flex flex-column gap-4">
      <!-- Semantic Color Palettes -->
      <div class="card card-bordered p-4 bg-surface-elevated">
        <div class="mb-3">
          <h2 class="text-base font-bold mb-0">🎨 Semantic Status Palettes & Surface Variants</h2>
          <p class="text-xs text-secondary mb-0">Semantic status palettes tested with tonal, solid, and frosted glass surface patterns.</p>
        </div>

        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3">
          <!-- Success -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column justify-between gap-2">
            <div>
              <div class="d-flex align-center gap-1.5 mb-1">
                <span class="badge badge-tonal-success text-xs">Success</span>
              </div>
              <p class="text-xs text-secondary mb-0">Positive operations, verifications, and approvals.</p>
            </div>
            <div class="d-flex gap-1">
              <button class="btn btn-xs btn-tonal-success flex-1" @click="triggerColorToast('success', 'tonal')">Tonal</button>
              <button class="btn btn-xs btn-solid-success flex-1" @click="triggerColorToast('success', 'solid')">Solid</button>
              <button class="btn btn-xs btn-outlined-neutral flex-1" @click="triggerColorToast('success', 'glass')">Glass</button>
            </div>
          </div>

          <!-- Danger -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column justify-between gap-2">
            <div>
              <div class="d-flex align-center gap-1.5 mb-1">
                <span class="badge badge-tonal-danger text-xs">Danger</span>
              </div>
              <p class="text-xs text-secondary mb-0">Critical failures, network errors, and aborts.</p>
            </div>
            <div class="d-flex gap-1">
              <button class="btn btn-xs btn-tonal-danger flex-1" @click="triggerColorToast('danger', 'tonal')">Tonal</button>
              <button class="btn btn-xs btn-solid-danger flex-1" @click="triggerColorToast('danger', 'solid')">Solid</button>
              <button class="btn btn-xs btn-outlined-neutral flex-1" @click="triggerColorToast('danger', 'glass')">Glass</button>
            </div>
          </div>

          <!-- Warning -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column justify-between gap-2">
            <div>
              <div class="d-flex align-center gap-1.5 mb-1">
                <span class="badge badge-tonal-warning text-xs">Warning</span>
              </div>
              <p class="text-xs text-secondary mb-0">Storage thresholds, session expiry, and warnings.</p>
            </div>
            <div class="d-flex gap-1">
              <button class="btn btn-xs btn-tonal-warning flex-1" @click="triggerColorToast('warning', 'tonal')">Tonal</button>
              <button class="btn btn-xs btn-solid-warning flex-1" @click="triggerColorToast('warning', 'solid')">Solid</button>
              <button class="btn btn-xs btn-outlined-neutral flex-1" @click="triggerColorToast('warning', 'glass')">Glass</button>
            </div>
          </div>

          <!-- Info -->
          <div class="p-3 rounded-lg bg-surface border border-subtle d-flex flex-column justify-between gap-2">
            <div>
              <div class="d-flex align-center gap-1.5 mb-1">
                <span class="badge badge-tonal-info text-xs">Info</span>
              </div>
              <p class="text-xs text-secondary mb-0">System updates, tips, and neutral advisories.</p>
            </div>
            <div class="d-flex gap-1">
              <button class="btn btn-xs btn-tonal-info flex-1" @click="triggerColorToast('info', 'tonal')">Tonal</button>
              <button class="btn btn-xs btn-solid-info flex-1" @click="triggerColorToast('info', 'solid')">Solid</button>
              <button class="btn btn-xs btn-outlined-neutral flex-1" @click="triggerColorToast('info', 'glass')">Glass</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Actions & Sticky Alerts -->
      <div class="d-grid grid-cols-1 grid-cols-md-2 gap-3">
        <!-- Interactive Undo Action -->
        <div class="card card-bordered p-4 bg-surface-elevated d-flex flex-column justify-between gap-3">
          <div>
            <div class="d-flex align-center justify-between mb-1.5">
              <span class="font-bold text-sm">Interactive Undo Action Button</span>
              <span class="badge badge-tonal-danger text-xs">With Callback</span>
            </div>
            <p class="text-xs text-secondary mb-0">
              Spawns an alert with an embedded "Undo Action" button that fires a callback and dismisses the notification.
            </p>
          </div>
          <JBtn variant="tonal" color="danger" size="sm" @click="triggerActionToast">
            Trigger "Undo" Action Toast
          </JBtn>
        </div>

        <!-- Sticky / Persistent Toast -->
        <div class="card card-bordered p-4 bg-surface-elevated d-flex flex-column justify-between gap-3">
          <div>
            <div class="d-flex align-center justify-between mb-1.5">
              <span class="font-bold text-sm">Sticky / Persistent Toast (timeout: 0)</span>
              <span class="badge badge-warning text-xs">No Auto-Close</span>
            </div>
            <p class="text-xs text-secondary mb-0">
              Anchors indefinitely until the user manually clicks the dismiss '✕' or action button.
            </p>
          </div>
          <JBtn variant="solid" color="warning" size="sm" @click="triggerPersistentToast">
            Trigger Sticky Alert Toast
          </JBtn>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 4. API & CODE RECIPES REFERENCE                                     -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'api'" class="d-flex flex-column gap-4">
      <!-- Code Recipes -->
      <div class="card card-bordered p-4 bg-surface-elevated">
        <div class="d-flex align-center justify-between mb-3">
          <h2 class="text-base font-bold mb-0">📖 Copyable Code Recipes</h2>
          <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetAdvanced)">Copy Action Recipe</button>
        </div>

        <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-3">
          <div>
            <span class="text-xs font-bold text-muted uppercase mb-1 d-block">Quick Semantic Helpers:</span>
            <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="line-height: 1.45; max-height: 240px;"><code>{{ snippetBasic }}</code></pre>
          </div>
          <div>
            <span class="text-xs font-bold text-muted uppercase mb-1 d-block">Configured Toast with Action:</span>
            <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="line-height: 1.45; max-height: 240px;"><code>{{ snippetAdvanced }}</code></pre>
          </div>
        </div>
      </div>

      <!-- Technical Reference Tables with Enhanced Font Size -->
      <div class="card card-bordered p-4 bg-surface-elevated d-flex flex-column gap-4">
        <div>
          <h2 class="text-xl font-bold mb-1">Technical Reference</h2>
          <p class="text-secondary text-sm mb-0">Complete useToast() composable options, helper methods, and status palettes.</p>
        </div>

        <!-- 1. Toast Options API -->
        <div>
          <h3 class="text-base font-bold mb-2 d-flex align-center gap-2">
            <span class="text-primary">⚙️</span> 1. Toast Configuration Options (<code>toast.show(options)</code>)
          </h3>
          <div class="table-responsive">
            <table class="table table-clean w-full" style="font-size: 0.9375rem;">
              <thead>
                <tr>
                  <th style="width: 200px;">Option</th>
                  <th style="width: 140px;">Type</th>
                  <th style="width: 120px;">Default</th>
                  <th>Description & Supported Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>message</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>Body notification text payload.</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>Optional bold headline rendered above the message.</td>
                </tr>
                <tr>
                  <td><code>position</code></td>
                  <td><code>String</code></td>
                  <td><code>'top-right'</code></td>
                  <td><code>'top-left'</code> | <code>'top-center'</code> | <code>'top-right'</code> | <code>'center-left'</code> | <code>'center'</code> | <code>'center-right'</code> | <code>'bottom-left'</code> | <code>'bottom-center'</code> | <code>'bottom-right'</code>.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>String</code></td>
                  <td><code>'md'</code></td>
                  <td><code>'xs'</code> | <code>'sm'</code> | <code>'md'</code> | <code>'lg'</code> | <code>'xl'</code>.</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>String</code></td>
                  <td><code>'primary'</code></td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'info'</code> | <code>'neutral'</code>.</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>String</code></td>
                  <td><code>'tonal'</code></td>
                  <td><code>'tonal'</code> | <code>'solid'</code> | <code>'outlined'</code> | <code>'glass'</code>.</td>
                </tr>
                <tr>
                  <td><code>timeout</code></td>
                  <td><code>Number</code></td>
                  <td><code>4000</code></td>
                  <td>Duration in milliseconds before auto-closing. Pass <code>0</code> for sticky persistence.</td>
                </tr>
                <tr>
                  <td><code>showProgress</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true</code></td>
                  <td>Displays an animated countdown progress bar.</td>
                </tr>
                <tr>
                  <td><code>pauseOnHover</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true</code></td>
                  <td>Freezes countdown timer while cursor is hovered over the toast.</td>
                </tr>
                <tr>
                  <td><code>dismissible</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true</code></td>
                  <td>Shows the close '✕' button.</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>Boolean | String</code></td>
                  <td><code>true</code></td>
                  <td>Set to <code>false</code> to suppress icon, or supply custom emoji/character.</td>
                </tr>
                <tr>
                  <td><code>action</code></td>
                  <td><code>Object</code></td>
                  <td><code>null</code></td>
                  <td><code>{ label: String, onClick: Function }</code> embedded action button.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. useToast() Composable Methods -->
        <div>
          <h3 class="text-base font-bold mb-2 d-flex align-center gap-2">
            <span class="text-secondary">🛠️</span> 2. <code>useToast()</code> Composable Methods
          </h3>
          <div class="table-responsive">
            <table class="table table-clean w-full" style="font-size: 0.9375rem;">
              <thead>
                <tr>
                  <th style="width: 250px;">Method</th>
                  <th style="width: 220px;">Signature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>toast.show(options)</code></td>
                  <td><code>(options: Object) => ToastInstance</code></td>
                  <td>Fires a toast with custom configuration options.</td>
                </tr>
                <tr>
                  <td><code>toast.success(msg, options?)</code></td>
                  <td><code>(msg: String, options?: Object) => ToastInstance</code></td>
                  <td>Shorthand to fire a green positive confirmation toast.</td>
                </tr>
                <tr>
                  <td><code>toast.error(msg, options?)</code></td>
                  <td><code>(msg: String, options?: Object) => ToastInstance</code></td>
                  <td>Shorthand to fire a red critical failure toast.</td>
                </tr>
                <tr>
                  <td><code>toast.warning(msg, options?)</code></td>
                  <td><code>(msg: String, options?: Object) => ToastInstance</code></td>
                  <td>Shorthand to fire an amber storage/quota alert toast.</td>
                </tr>
                <tr>
                  <td><code>toast.info(msg, options?)</code></td>
                  <td><code>(msg: String, options?: Object) => ToastInstance</code></td>
                  <td>Shorthand to fire a blue system advisory toast.</td>
                </tr>
                <tr>
                  <td><code>toast.dismiss(id)</code></td>
                  <td><code>(id: String) => void</code></td>
                  <td>Closes a specific active toast instance by its ID.</td>
                </tr>
                <tr>
                  <td><code>toast.clear()</code></td>
                  <td><code>() => void</code></td>
                  <td>Immediately removes all active toasts across all viewport locations.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
