<script setup>
import { ref } from 'vue'
import { useDisplay } from '../composables/useDisplay'

const display = useDisplay()
const copiedSnippet = ref('')
const activeFilter = ref('all')

// Interactive Ring Generator State
const previewRingWidth = ref('ring-3')
const previewRingColor = ref('ring-primary')
const previewRingOffset = ref('ring-offset-2 ring-offset-body')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>CSS Utilities & Design Tokens</h2>
        <p class="text-secondary mb-0">High-performance zero-dependency utility classes for typography, backgrounds, layout, effects, enhanced rings, and spacing.</p>
      </div>

      <!-- Quick Filter Pills -->
      <div class="d-flex flex-wrap gap-1 p-1 rounded-lg border border-subtle bg-surface-tonal">
        <button
          v-for="f in [
            { id: 'all', label: 'All Utilities' },
            { id: 'display', label: '📱 Screen & Breakpoints' },
            { id: 'rings', label: '⚡ Enhanced Rings' },
            { id: 'typography', label: 'Typography' },
            { id: 'backgrounds', label: 'Backgrounds & Gradients' },
            { id: 'flex-grid', label: 'Flex & Grid' },
            { id: 'effects', label: 'Borders & Shadows' },
          ]"
          :key="f.id"
          :class="['btn btn-xs rounded-md', activeFilter === f.id ? 'btn-primary' : 'btn-text']"
          @click="activeFilter = f.id"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Toast Notification on Snippet Copy -->
    <div
      v-if="copiedSnippet"
      class="alert alert-primary alert-glass shadow-lg position-fixed"
      style="bottom: 1.5rem; right: 1.5rem; z-index: 9999; max-width: 24rem;"
    >
      <div class="alert-icon">📋</div>
      <div class="alert-content">
        <div class="alert-title">Copied to Clipboard!</div>
        <div class="text-xs text-truncate"><code>{{ copiedSnippet }}</code></div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 0. REAL-TIME SCREEN & BREAKPOINTS TRACKER (FEATURED)                 -->
    <!-- =================================================================== -->
    <section v-if="activeFilter === 'all' || activeFilter === 'display'" class="d-flex flex-column gap-4">
      <div class="d-flex flex-wrap align-center justify-between gap-2">
        <div class="d-flex align-center gap-2">
          <h3 class="mb-0">📱 Real-Time Screen & Breakpoints Tracker</h3>
          <span class="badge badge-pill badge-primary">useDisplay()</span>
          <span class="badge badge-pill badge-success">Live Resize Listener</span>
        </div>
        <div class="d-flex align-center gap-2 font-mono text-xs">
          <span class="badge badge-tonal-primary font-bold">📐 {{ display.width.value }}px × {{ display.height.value }}px</span>
          <span class="badge badge-accent font-bold text-uppercase">Breakpoint: {{ display.name.value }}</span>
          <span class="badge badge-tonal-neutral">{{ display.orientation.value }}</span>
        </div>
      </div>

      <!-- Live Dashboard Grid -->
      <div class="card card-elevated p-4 p-md-5 d-flex flex-column gap-4">
        <!-- Visual Breakpoint Stepper Bar -->
        <div class="d-flex flex-column gap-2">
          <div class="d-flex justify-between align-center text-xs">
            <span class="text-muted font-semibold uppercase">Active Viewport Interval</span>
            <span class="text-secondary font-mono">Current Width: <b>{{ display.width.value }}px</b></span>
          </div>
          <div class="d-grid grid-cols-2 grid-cols-sm-3 grid-cols-lg-6 gap-2">
            <div
              v-for="bp in [
                { id: 'xs', name: 'XS (< 640px)', active: display.xs.value },
                { id: 'sm', name: 'SM (640-767px)', active: display.sm.value },
                { id: 'md', name: 'MD (768-1023px)', active: display.md.value },
                { id: 'lg', name: 'LG (1024-1279px)', active: display.lg.value },
                { id: 'xl', name: 'XL (1280-1535px)', active: display.xl.value },
                { id: '2xl', name: '2XL (≥ 1536px)', active: display.xxl.value },
              ]"
              :key="bp.id"
              :class="[
                'p-3 rounded-lg border text-center transition-all',
                bp.active ? 'border-primary ring-2 ring-primary bg-primary-tonal text-primary font-bold' : 'border-subtle bg-surface-tonal text-muted'
              ]"
            >
              <div class="text-xs uppercase">{{ bp.id }}</div>
              <div class="text-xs opacity-80" style="font-size: 0.7rem;">{{ bp.name }}</div>
              <div v-if="bp.active" class="badge badge-xs badge-primary mt-1">Active Now</div>
            </div>
          </div>
        </div>

        <hr class="hr-thin my-0" />

        <!-- Directional Flags Matrix -->
        <div class="d-grid grid-cols-1 grid-cols-lg-3 gap-4">
          <!-- Col 1: *AndUp Flags -->
          <div class="p-3 rounded-xl border border-subtle bg-surface-tonal d-flex flex-column gap-2">
            <div class="text-xs font-bold text-muted uppercase">1. Directional AndUp (≥ Min Width)</div>
            <div class="d-flex flex-column gap-1 text-xs font-mono">
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>smAndUp (≥ 640px)</span>
                <span :class="['badge badge-xs', display.smAndUp.value ? 'badge-success' : 'badge-neutral']">{{ display.smAndUp.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>mdAndUp (≥ 768px)</span>
                <span :class="['badge badge-xs', display.mdAndUp.value ? 'badge-success' : 'badge-neutral']">{{ display.mdAndUp.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>lgAndUp (≥ 1024px)</span>
                <span :class="['badge badge-xs', display.lgAndUp.value ? 'badge-success' : 'badge-neutral']">{{ display.lgAndUp.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>xlAndUp (≥ 1280px)</span>
                <span :class="['badge badge-xs', display.xlAndUp.value ? 'badge-success' : 'badge-neutral']">{{ display.xlAndUp.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>2xlAndUp (≥ 1536px)</span>
                <span :class="['badge badge-xs', display.xxlAndUp.value ? 'badge-success' : 'badge-neutral']">{{ display.xxlAndUp.value }}</span>
              </div>
            </div>
          </div>

          <!-- Col 2: *AndDown Flags -->
          <div class="p-3 rounded-xl border border-subtle bg-surface-tonal d-flex flex-column gap-2">
            <div class="text-xs font-bold text-muted uppercase">2. Directional AndDown (< Next Max)</div>
            <div class="d-flex flex-column gap-1 text-xs font-mono">
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>xsAndDown (< 640px)</span>
                <span :class="['badge badge-xs', display.xsAndDown.value ? 'badge-success' : 'badge-neutral']">{{ display.xsAndDown.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>smAndDown (< 768px)</span>
                <span :class="['badge badge-xs', display.smAndDown.value ? 'badge-success' : 'badge-neutral']">{{ display.smAndDown.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>mdAndDown (< 1024px)</span>
                <span :class="['badge badge-xs', display.mdAndDown.value ? 'badge-success' : 'badge-neutral']">{{ display.mdAndDown.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>lgAndDown (< 1280px)</span>
                <span :class="['badge badge-xs', display.lgAndDown.value ? 'badge-success' : 'badge-neutral']">{{ display.lgAndDown.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>xlAndDown (< 1536px)</span>
                <span :class="['badge badge-xs', display.xlAndDown.value ? 'badge-success' : 'badge-neutral']">{{ display.xlAndDown.value }}</span>
              </div>
            </div>
          </div>

          <!-- Col 3: Semantic Devices & Helpers -->
          <div class="p-3 rounded-xl border border-subtle bg-surface-tonal d-flex flex-column gap-2">
            <div class="text-xs font-bold text-muted uppercase">3. Form Factor & Orientation</div>
            <div class="d-flex flex-column gap-1 text-xs font-mono">
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>📱 isMobile / isPhone (< 768px)</span>
                <span :class="['badge badge-xs', display.isMobile.value ? 'badge-primary' : 'badge-neutral']">{{ display.isMobile.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>📟 isTablet (768-1023px)</span>
                <span :class="['badge badge-xs', display.isTablet.value ? 'badge-primary' : 'badge-neutral']">{{ display.isTablet.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>💻 isDesktop (≥ 1024px)</span>
                <span :class="['badge badge-xs', display.isDesktop.value ? 'badge-primary' : 'badge-neutral']">{{ display.isDesktop.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>🖥️ isLargeDesktop (≥ 1280px)</span>
                <span :class="['badge badge-xs', display.isLargeDesktop.value ? 'badge-primary' : 'badge-neutral']">{{ display.isLargeDesktop.value }}</span>
              </div>
              <div class="d-flex align-center justify-between p-2 rounded bg-surface">
                <span>🔄 orientation</span>
                <span class="badge badge-xs badge-accent">{{ display.orientation.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Snippet & Live State Object -->
        <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
          <div>
            <div class="text-xs font-semibold text-muted uppercase mb-2">Usage in Vue 3 Component:</div>
            <pre class="p-3 rounded-lg font-mono text-xs bg-surface border border-subtle mb-0 overflow-x-auto" style="font-size: 0.75rem; line-height: 1.5;"><code>import { useDisplay } from '@/composables/useDisplay'

const {
  width,
  height,
  name,
  smAndUp,
  mdAndUp,
  lgAndUp,
  smAndDown,
  isMobile,
  isTablet,
  isDesktop
} = useDisplay()

// In Template:
// &lt;div v-if="smAndUp"&gt;Visible on Tablet & Desktop&lt;/div&gt;
// &lt;div v-if="isMobile"&gt;Mobile Layout&lt;/div&gt;</code></pre>
          </div>

          <div>
            <div class="text-xs font-semibold text-muted uppercase mb-2">Real-Time Reactive State Map:</div>
            <pre class="p-3 rounded-lg font-mono text-xs bg-surface border border-subtle mb-0 overflow-x-auto" style="max-height: 180px; font-size: 0.72rem; line-height: 1.4;"><code>{{ JSON.stringify(display.state.value, null, 2) }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 1. ENHANCED RING UTILITIES (FEATURED)                                -->
    <!-- =================================================================== -->
    <section v-if="activeFilter === 'all' || activeFilter === 'rings'" class="d-flex flex-column gap-4">
      <div class="d-flex align-center gap-2">
        <h3 class="mb-0">💍 Enhanced Ring Utilities</h3>
        <span class="badge badge-pill badge-primary">ring-1 to ring-5</span>
        <span class="badge badge-pill badge-tonal-success">All Colors & Offsets</span>
      </div>

      <!-- Live Interactive Ring Customizer -->
      <div class="card card-elevated p-5">
        <div class="d-flex flex-column flex-lg-row align-start align-lg-center justify-between gap-4">
          <!-- Left: Preview Box -->
          <div class="d-flex flex-column align-center justify-center p-6 rounded-xl border border-subtle bg-surface-tonal flex-1 w-full" style="min-height: 12rem;">
            <div
              :class="[
                'p-4 rounded-xl bg-surface-elevated font-bold text-center transition-all',
                previewRingWidth,
                previewRingColor,
                previewRingOffset
              ]"
              style="width: 14rem;"
            >
              <div class="text-md mb-1">Live Ring Preview</div>
              <div class="text-xs text-secondary opacity-80">{{ previewRingWidth }} {{ previewRingColor }}</div>
            </div>
            <div class="mt-4 d-flex align-center gap-2">
              <code>{{ previewRingWidth }} {{ previewRingColor }} {{ previewRingOffset }}</code>
              <button class="btn btn-xs btn-primary" @click="copyToClipboard(`${previewRingWidth} ${previewRingColor} ${previewRingOffset}`)">Copy Recipe</button>
            </div>
          </div>

          <!-- Right: Controls -->
          <div class="d-flex flex-column gap-3 flex-1 w-full">
            <!-- Width Selector -->
            <div>
              <div class="text-xs font-semibold text-muted uppercase mb-1">Select Ring Width (1px to 5px):</div>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="w in ['ring-1', 'ring-2', 'ring-3', 'ring-4', 'ring-5']"
                  :key="w"
                  :class="['btn btn-xs', previewRingWidth === w ? 'btn-primary' : 'btn-outlined-neutral']"
                  @click="previewRingWidth = w"
                >
                  {{ w }}
                </button>
              </div>
            </div>

            <!-- Color Selector -->
            <div>
              <div class="text-xs font-semibold text-muted uppercase mb-1">Select Ring Color:</div>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="c in [
                    { id: 'ring-primary', label: 'Primary' },
                    { id: 'ring-secondary', label: 'Secondary' },
                    { id: 'ring-accent', label: 'Accent' },
                    { id: 'ring-success', label: 'Success' },
                    { id: 'ring-warning', label: 'Warning' },
                    { id: 'ring-danger', label: 'Danger' },
                    { id: 'ring-info', label: 'Info' },
                    { id: 'ring-white', label: 'White' },
                    { id: 'ring-subtle', label: 'Subtle' },
                  ]"
                  :key="c.id"
                  :class="['btn btn-xs', previewRingColor === c.id ? 'btn-primary' : 'btn-tonal-neutral']"
                  @click="previewRingColor = c.id"
                >
                  {{ c.label }}
                </button>
              </div>
            </div>

            <!-- Offset Selector -->
            <div>
              <div class="text-xs font-semibold text-muted uppercase mb-1">Ring Offset Gap:</div>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="o in [
                    { id: 'ring-offset-0', label: 'No Offset' },
                    { id: 'ring-offset-2 ring-offset-body', label: '2px Body Offset' },
                    { id: 'ring-offset-4 ring-offset-body', label: '4px Body Offset' },
                    { id: 'ring-offset-2 ring-offset-white', label: '2px White Offset' },
                  ]"
                  :key="o.id"
                  :class="['btn btn-xs', previewRingOffset === o.id ? 'btn-primary' : 'btn-outlined-neutral']"
                  @click="previewRingOffset = o.id"
                >
                  {{ o.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ring Width Scales Grid (1 to 5) -->
      <div class="card card-bordered">
        <div class="card-header">
          <h4 class="card-title">Ring Width Scales (ring-1, ring-2, ring-3, ring-4, ring-5)</h4>
        </div>
        <div class="card-body">
          <div class="d-grid grid-cols-2 grid-cols-sm-3 grid-cols-md-5 gap-4">
            <div
              v-for="(w, idx) in [
                { class: 'ring-1 ring-primary', label: 'ring-1 (1px)' },
                { class: 'ring-2 ring-primary', label: 'ring-2 (2px)' },
                { class: 'ring-3 ring-primary', label: 'ring-3 (3px)' },
                { class: 'ring-4 ring-primary', label: 'ring-4 (4px)' },
                { class: 'ring-5 ring-primary', label: 'ring-5 (5px)' },
              ]"
              :key="w.label"
              :class="['p-4 rounded-xl bg-surface-elevated text-center d-flex flex-column align-center justify-between gap-2', w.class]"
              style="min-height: 7.5rem;"
            >
              <span class="font-bold text-sm">{{ w.label }}</span>
              <button class="btn btn-xs btn-tonal-neutral w-full justify-center" @click="copyToClipboard(w.class)">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <!-- All Ring Colors Matrix -->
      <div class="card card-bordered">
        <div class="card-header">
          <h4 class="card-title">Ring Color Variations (Solid & Translucent Subtle)</h4>
        </div>
        <div class="card-body d-flex flex-column gap-4">
          <!-- Solid Colors -->
          <div>
            <div class="text-xs font-semibold text-muted uppercase mb-3">Solid Color Rings (<code>ring-3 ring-*</code>)</div>
            <div class="d-grid grid-cols-2 grid-cols-sm-3 grid-cols-md-4 grid-cols-lg-5 gap-3">
              <div v-for="c in [
                { class: 'ring-3 ring-primary', label: 'ring-primary' },
                { class: 'ring-3 ring-secondary', label: 'ring-secondary' },
                { class: 'ring-3 ring-accent', label: 'ring-accent' },
                { class: 'ring-3 ring-success', label: 'ring-success' },
                { class: 'ring-3 ring-warning', label: 'ring-warning' },
                { class: 'ring-3 ring-danger', label: 'ring-danger' },
                { class: 'ring-3 ring-info', label: 'ring-info' },
                { class: 'ring-3 ring-neutral', label: 'ring-neutral' },
                { class: 'ring-3 ring-white', label: 'ring-white' },
                { class: 'ring-3 ring-subtle', label: 'ring-subtle' },
              ]" :key="c.class" :class="['p-3 rounded-lg bg-surface-elevated text-center d-flex flex-column align-center justify-between gap-2', c.class]">
                <span class="font-semibold text-xs">{{ c.label }}</span>
                <button class="btn btn-xs btn-tonal-neutral w-full justify-center" @click="copyToClipboard(c.class)">Copy</button>
              </div>
            </div>
          </div>

          <hr class="hr-thin" />

          <!-- Subtle Glow Tonal Rings -->
          <div>
            <div class="text-xs font-semibold text-muted uppercase mb-3">Translucent Soft Glow Rings (<code>ring-4 ring-*-subtle</code>)</div>
            <div class="d-grid grid-cols-2 grid-cols-sm-3 grid-cols-md-4 gap-3">
              <div v-for="c in [
                { class: 'ring-4 ring-primary-subtle', label: 'ring-primary-subtle' },
                { class: 'ring-4 ring-accent-subtle', label: 'ring-accent-subtle' },
                { class: 'ring-4 ring-success-subtle', label: 'ring-success-subtle' },
                { class: 'ring-4 ring-danger-subtle', label: 'ring-danger-subtle' },
              ]" :key="c.class" :class="['p-3 rounded-lg bg-surface-elevated text-center d-flex flex-column align-center justify-between gap-2', c.class]">
                <span class="font-semibold text-xs">{{ c.label }}</span>
                <button class="btn btn-xs btn-tonal-neutral w-full justify-center" @click="copyToClipboard(c.class)">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 2. TYPOGRAPHY UTILITIES                                             -->
    <!-- =================================================================== -->
    <section v-if="activeFilter === 'all' || activeFilter === 'typography'" class="d-flex flex-column gap-4">
      <div class="d-flex align-center gap-2">
        <h3 class="mb-0">🔤 Typography Suite</h3>
        <span class="badge badge-tonal-primary">Extended</span>
      </div>

      <!-- Font Sizes & Headings Scale -->
      <div class="card card-bordered">
        <div class="card-header">
          <h4 class="card-title">Font Sizes Scale (text-xs to text-6xl)</h4>
        </div>
        <div class="card-body d-flex flex-column gap-3">
          <div v-for="size in [
            { class: 'text-6xl font-black', label: 'text-6xl (3.75rem • 60px)' },
            { class: 'text-4xl font-extrabold', label: 'text-4xl (2.25rem • 36px)' },
            { class: 'text-2xl font-bold', label: 'text-2xl (1.5rem • 24px)' },
            { class: 'text-xl font-semibold', label: 'text-xl (1.25rem • 20px)' },
            { class: 'text-base font-normal', label: 'text-base (1rem • 16px - Base Body)' },
            { class: 'text-sm font-normal text-secondary', label: 'text-sm (0.875rem • 14px)' },
            { class: 'text-xs text-muted', label: 'text-xs (0.75rem • 12px)' },
          ]" :key="size.class" class="p-3 rounded-lg border border-subtle d-flex flex-column flex-md-row align-start align-md-center justify-between gap-2">
            <span :class="size.class">{{ size.label }}</span>
            <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard(size.class.split(' ')[0])">Copy</button>
          </div>
        </div>
      </div>

      <!-- Text Gradients, Tracking & Line Heights -->
      <div class="d-grid grid-cols-1 grid-cols-md-2 gap-4">
        <!-- Text Gradients -->
        <div class="card card-bordered p-4">
          <h4 class="card-title mb-2">Gradient Text Styles</h4>
          <p class="text-sm text-secondary mb-3">Vibrant multi-stop background clip text gradients.</p>
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="text-gradient-primary font-bold text-lg">.text-gradient-primary</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('text-gradient-primary')">Copy</button>
            </div>
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="text-gradient-cyber font-black text-lg">.text-gradient-cyber</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('text-gradient-cyber')">Copy</button>
            </div>
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="text-gradient-sunset font-bold text-lg">.text-gradient-sunset</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('text-gradient-sunset')">Copy</button>
            </div>
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="text-gradient-emerald font-bold text-lg">.text-gradient-emerald</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('text-gradient-emerald')">Copy</button>
            </div>
          </div>
        </div>

        <!-- Tracking & Leading -->
        <div class="card card-bordered p-4">
          <h4 class="card-title mb-2">Letter Spacing & Line Height</h4>
          <p class="text-sm text-secondary mb-3">Tracking and leading typographic control.</p>
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="tracking-widest font-bold text-xs uppercase">tracking-widest</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('tracking-widest')">Copy</button>
            </div>
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="tracking-tight font-bold text-sm">tracking-tight headline</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('tracking-tight')">Copy</button>
            </div>
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="font-mono text-sm">font-mono code tokens</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('font-mono')">Copy</button>
            </div>
            <div class="d-flex align-center justify-between p-2 rounded bg-surface-tonal">
              <span class="underline underline-offset-4 text-sm font-medium">underline underline-offset-4</span>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('underline underline-offset-4')">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 3. BACKGROUNDS & GRADIENTS                                          -->
    <!-- =================================================================== -->
    <section v-if="activeFilter === 'all' || activeFilter === 'backgrounds'" class="d-flex flex-column gap-4">
      <div class="d-flex align-center gap-2">
        <h3 class="mb-0">🎨 Backgrounds & Gradients</h3>
        <span class="badge badge-tonal-success">Rich Aesthetics</span>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-md-2 grid-cols-lg-4 gap-3">
        <div class="p-4 rounded-xl bg-gradient-primary d-flex flex-column justify-between shadow-md" style="min-height: 8rem;">
          <span class="font-bold text-md">Primary Gradient</span>
          <div class="d-flex align-center justify-between">
            <code class="text-xs text-white opacity-90">.bg-gradient-primary</code>
            <button class="btn btn-xs btn-pill btn-tonal-neutral" @click="copyToClipboard('bg-gradient-primary')">Copy</button>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gradient-cyber d-flex flex-column justify-between border border-accent shadow-md" style="min-height: 8rem;">
          <span class="font-bold text-md text-gradient-cyber">Cyber Carbon Gradient</span>
          <div class="d-flex align-center justify-between">
            <code class="text-xs text-secondary">.bg-gradient-cyber</code>
            <button class="btn btn-xs btn-pill btn-tonal-neutral" @click="copyToClipboard('bg-gradient-cyber')">Copy</button>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gradient-sunset d-flex flex-column justify-between shadow-md" style="min-height: 8rem;">
          <span class="font-bold text-md">Sunset Rose Gradient</span>
          <div class="d-flex align-center justify-between">
            <code class="text-xs text-white opacity-90">.bg-gradient-sunset</code>
            <button class="btn btn-xs btn-pill btn-tonal-neutral" @click="copyToClipboard('bg-gradient-sunset')">Copy</button>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gradient-emerald d-flex flex-column justify-between shadow-md" style="min-height: 8rem;">
          <span class="font-bold text-md">Emerald Cyan Gradient</span>
          <div class="d-flex align-center justify-between">
            <code class="text-xs text-white opacity-90">.bg-gradient-emerald</code>
            <button class="btn btn-xs btn-pill btn-tonal-neutral" @click="copyToClipboard('bg-gradient-emerald')">Copy</button>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 4. FLEXBOX & GRID                                                   -->
    <!-- =================================================================== -->
    <section v-if="activeFilter === 'all' || activeFilter === 'flex-grid'" class="d-flex flex-column gap-4">
      <div class="d-flex align-center gap-2">
        <h3 class="mb-0">📐 Flexbox & Grid Systems</h3>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-md-2 gap-4">
        <!-- Flexbox Cheatsheet -->
        <div class="card card-bordered p-4">
          <h4 class="card-title mb-2">Flexbox Layout Combinations</h4>
          <p class="text-sm text-secondary mb-3">Pre-assembled flex patterns.</p>
          <div class="d-flex flex-column gap-2">
            <div class="p-2 rounded bg-surface-tonal d-flex align-center justify-between">
              <code>d-flex flex-column justify-center</code>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('d-flex flex-column justify-center')">Copy</button>
            </div>
            <div class="p-2 rounded bg-surface-tonal d-flex align-center justify-between">
              <code>d-flex align-center justify-between gap-3</code>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('d-flex align-center justify-between gap-3')">Copy</button>
            </div>
            <div class="p-2 rounded bg-surface-tonal d-flex align-center justify-between">
              <code>d-inline-flex align-center gap-2</code>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('d-inline-flex align-center gap-2')">Copy</button>
            </div>
          </div>
        </div>

        <!-- CSS Grid -->
        <div class="card card-bordered p-4">
          <h4 class="card-title mb-2">CSS Grid Systems</h4>
          <p class="text-sm text-secondary mb-3">Responsive column grids and spans.</p>
          <div class="d-flex flex-column gap-2">
            <div class="p-2 rounded bg-surface-tonal d-flex align-center justify-between">
              <code>d-grid grid-cols-1 grid-cols-md-3 gap-4</code>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('d-grid grid-cols-1 grid-cols-md-3 gap-4')">Copy</button>
            </div>
            <div class="p-2 rounded bg-surface-tonal d-flex align-center justify-between">
              <code>grid-cols-2 grid-cols-lg-4 gap-3</code>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('grid-cols-2 grid-cols-lg-4 gap-3')">Copy</button>
            </div>
            <div class="p-2 rounded bg-surface-tonal d-flex align-center justify-between">
              <code>col-span-full / col-span-2</code>
              <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard('col-span-full')">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 5. BORDERS, SHADOWS & ASPECT RATIO                                  -->
    <!-- =================================================================== -->
    <section v-if="activeFilter === 'all' || activeFilter === 'effects'" class="d-flex flex-column gap-4">
      <div class="d-flex align-center gap-2">
        <h3 class="mb-0">✨ Borders, Shadows & Divide Utilities</h3>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-md-2 gap-4">
        <!-- Divide Utilities -->
        <div class="card card-bordered p-4">
          <h4 class="card-title mb-2">Child Divide Utilities</h4>
          <p class="text-sm text-muted mb-3">Automatic borders between child rows or columns.</p>
          <div class="d-flex flex-column divide-y divide-subtle border border-subtle rounded-lg p-2">
            <div class="py-2 text-xs">First Item (.divide-y)</div>
            <div class="py-2 text-xs">Second Item</div>
            <div class="py-2 text-xs">Third Item</div>
          </div>
          <button class="btn btn-xs btn-tonal-neutral mt-3 w-full justify-center" @click="copyToClipboard('d-flex flex-column divide-y divide-subtle')">Copy Divide Pattern</button>
        </div>

        <!-- Aspect Ratio & Media Fit -->
        <div class="card card-bordered p-4">
          <h4 class="card-title mb-2">Aspect Ratio & Media</h4>
          <p class="text-sm text-muted mb-3">Aspect ratios and responsive media containment.</p>
          <div class="d-flex align-center gap-2">
            <div class="aspect-square bg-surface-tonal rounded-md d-flex align-center justify-center p-2 text-xs font-semibold" style="width: 4.5rem;">
              1:1 Sq
            </div>
            <div class="aspect-video bg-surface-tonal rounded-md d-flex align-center justify-center p-2 text-xs font-semibold flex-1">
              16:9 Video
            </div>
          </div>
          <button class="btn btn-xs btn-tonal-neutral mt-3 w-full justify-center" @click="copyToClipboard('aspect-video object-cover')">Copy Aspect Ratio</button>
        </div>
      </div>
    </section>
  </div>
</template>
