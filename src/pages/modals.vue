<script setup>
import { ref, reactive, computed } from 'vue'
import JModal from '../@core/components/JModal.vue'
import JBtn from '../@core/components/JBtn.vue'

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
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2200)
}

// ----------------------------------------------------------------------------
// 1. Interactive Playground State
// ----------------------------------------------------------------------------
const isPlaygroundOpen = ref(false)
const playground = reactive({
  isDrawer: false,
  drawerSide: 'right', // 'right' | 'left' | 'bottom' | 'top'
  title: 'Enterprise Subscription Dialog',
  subtitle: 'Manage licensing, seats, and billing intervals',
  icon: '💎',
  size: 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  position: 'center',
  variant: 'elevated', // 'elevated' | 'glass' | 'bordered' | 'tonal'
  animation: 'slide-down',
  backdropGlass: true,
})

// ----------------------------------------------------------------------------
// 2. Dedicated Offcanvas Drawer Showcase States
// ----------------------------------------------------------------------------
const isCartDrawerOpen = ref(false)
const isNavDrawerOpen = ref(false)
const isBottomSheetOpen = ref(false)

const cartItems = ref([
  { id: 1, name: 'JUI Enterprise Pro License', price: 299, qty: 1, icon: '⚡' },
  { id: 2, name: 'Cloud Infrastructure SLA', price: 149, qty: 2, icon: '☁️' },
  { id: 3, name: 'Priority 24/7 Support Tier', price: 89, qty: 1, icon: '🛡️' }
])

const cartSubtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

// ----------------------------------------------------------------------------
// 3. Dynamic Quick Showcase Modal Triggers
// ----------------------------------------------------------------------------
const isDynamicModalOpen = ref(false)
const dynamicModalConfig = reactive({
  title: 'Dynamic Dialog',
  subtitle: 'Triggered from showcase',
  icon: '⚡',
  size: 'md',
  position: 'center',
  drawer: false,
  variant: 'elevated',
  animation: 'slide-down',
  content: 'Demonstration dialog content.'
})

const openShowcaseModal = (config) => {
  Object.assign(dynamicModalConfig, {
    title: 'Showcase Dialog',
    subtitle: 'Demonstration modal instance',
    icon: '⚡',
    size: 'md',
    position: 'center',
    drawer: false,
    variant: 'elevated',
    animation: 'slide-down',
    content: 'Demonstration dialog content.',
    ...config
  })
  isDynamicModalOpen.value = true
}

// ----------------------------------------------------------------------------
// 4. Code Recipes
// ----------------------------------------------------------------------------
const snippetComponent = `<script setup>
import { ref } from 'vue'
import JModal from '@core/components/JModal.vue'
import JBtn from '@core/components/JBtn.vue'

const isModalOpen = ref(false)
const isDrawerOpen = ref(false)
<` + `/script>

<template>
  <!-- Standard Center Modal -->
  <JBtn color="primary" @click="isModalOpen = true">Open Modal</JBtn>
  <JModal
    v-model="isModalOpen"
    title="Subscription Plan"
    subtitle="Configure license limits"
    icon="💎"
    size="md"
    position="center"
    variant="elevated"
  >
    <p class="text-sm">Standard modal content centered on screen.</p>
    <template #footer>
      <JBtn variant="tonal" color="neutral" size="sm" @click="isModalOpen = false">Cancel</JBtn>
      <JBtn color="primary" size="sm" @click="isModalOpen = false">Save</JBtn>
    </template>
  </JModal>

  <!-- Edge-docked Offcanvas Drawer -->
  <JBtn color="secondary" @click="isDrawerOpen = true">Open Right Drawer</JBtn>
  <JModal
    v-model="isDrawerOpen"
    title="Shopping Cart"
    drawer="right"
    size="md"
  >
    <p class="text-sm">Sliding offcanvas panel docked flush to the right viewport edge.</p>
    <template #footer>
      <JBtn color="primary" block @click="isDrawerOpen = false">Checkout</JBtn>
    </template>
  </JModal>
</template>`

const snippetVanilla = `<!-- Vanilla HTML/SCSS Offcanvas Drawer -->
<div class="modal-backdrop backdrop-glass"></div>

<!-- Offcanvas Right Drawer -->
<div class="modal modal-drawer modal-drawer-right modal-md" role="dialog">
  <div class="modal-dialog anim-drawer-right">
    <div class="modal-content modal-elevated">
      <div class="modal-header">
        <h4 class="modal-title">Shopping Cart</h4>
        <button class="btn-close">✕</button>
      </div>
      <div class="modal-body">
        Full height scrollable drawer body...
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary w-full">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</div>`
</script>

<template>
  <div class="d-flex flex-column gap-4 gap-md-5 w-full">
    <!-- Header -->
    <header class="d-flex flex-column gap-3">
      <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold mb-1">Modals & Offcanvas Drawers</h1>
          <p class="text-secondary text-sm mb-0">
            Backdrop glassmorphism, 9-point compass alignments, adaptive surfaces, and edge-docked offcanvas sliding panels.
          </p>
        </div>

        <div class="d-flex align-center gap-2">
          <JBtn variant="tonal" color="primary" size="sm" prepend-icon="📋" @click="copyToClipboard(snippetComponent)">
            Copy Recipe
          </JBtn>
        </div>
      </div>

      <!-- Quick Feature Badges -->
      <div class="d-flex flex-wrap align-center gap-2">
        <span class="badge badge-tonal-primary text-xs">🪟 Dialog Modals</span>
        <span class="badge badge-tonal-success text-xs">🚪 Offcanvas Drawers</span>
        <span class="badge badge-tonal-info text-xs">✨ Backdrop Glass</span>
        <span class="badge badge-tonal-warning text-xs">🧭 9-Point Viewport Compass</span>
        <span class="badge badge-tonal-neutral text-xs">📱 Mobile Bottom Sheet</span>
      </div>

      <!-- Segmented Navigation Tabs -->
      <div class="d-flex align-center gap-1 p-1 rounded-full bg-surface-tonal border border-subtle mt-1" style="width: fit-content;">
        <button
          v-for="t in [
            { id: 'all', label: 'All' },
            { id: 'playground', label: 'Playground' },
            { id: 'drawers', label: 'Offcanvas Drawers' },
            { id: 'positions', label: 'Sizes & Positions' },
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

    <!-- Toast Notification on Snippet Copy -->
    <div
      v-if="copiedSnippet"
      class="alert alert-primary alert-glass shadow-lg position-fixed"
      style="bottom: 1.5rem; right: 1.5rem; z-index: 9999; max-width: 24rem;"
    >
      <div class="alert-icon">📋</div>
      <div class="alert-content">
        <div class="alert-title font-bold">Copied to Clipboard!</div>
        <div class="text-xs text-truncate"><code>Code snippet copied successfully.</code></div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 1. INTERACTIVE PLAYGROUND                                           -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'playground'" class="card card-bordered p-4 bg-surface-elevated">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2">
          <div class="d-flex align-center gap-2">
            <h2 class="text-lg font-bold mb-0">⚡ Interactive Playground</h2>
            <span class="badge badge-pill badge-primary text-xs">Vue 3 Component</span>
          </div>
          
          <!-- Mode Switcher: Modal vs Drawer -->
          <div class="d-flex align-center gap-1 p-1 rounded-lg bg-surface border border-subtle">
            <button
              :class="['btn btn-xs', !playground.isDrawer ? 'btn-primary' : 'btn-ghost']"
              @click="playground.isDrawer = false"
            >
              🪟 Modal Dialog
            </button>
            <button
              :class="['btn btn-xs', playground.isDrawer ? 'btn-primary' : 'btn-ghost']"
              @click="playground.isDrawer = true"
            >
              🚪 Offcanvas Drawer
            </button>
          </div>
        </div>

        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <!-- Position / Drawer Side -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">
              {{ playground.isDrawer ? 'Drawer Dock Edge' : 'Modal Alignment' }}
            </label>
            <select
              v-if="playground.isDrawer"
              v-model="playground.drawerSide"
              class="form-select form-select-sm"
            >
              <option value="right">right (Docked Right Edge)</option>
              <option value="left">left (Docked Left Edge)</option>
              <option value="bottom">bottom (Docked Bottom Sheet)</option>
              <option value="top">top (Docked Top Banner)</option>
            </select>
            <select
              v-else
              v-model="playground.position"
              class="form-select form-select-sm"
            >
              <option value="center">center (Centered)</option>
              <option value="top">top (Notification Banner)</option>
              <option value="top-left">top-left (Corner Alert)</option>
              <option value="top-right">top-right (Toast Dialog)</option>
              <option value="left">left (Docked Left)</option>
              <option value="right">right (Docked Right)</option>
              <option value="bottom">bottom (Snackbar / Bottom)</option>
              <option value="bottom-left">bottom-left (Persistent Widget)</option>
              <option value="bottom-right">bottom-right (AI Copilot / Chat)</option>
            </select>
          </div>

          <!-- Size -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">
              {{ playground.isDrawer ? 'Drawer Width Tier' : 'Modal Size' }}
            </label>
            <select v-model="playground.size" class="form-select form-select-sm">
              <option value="xs">xs ({{ playground.isDrawer ? '288px' : '320px' }})</option>
              <option value="sm">sm ({{ playground.isDrawer ? '352px' : '384px' }})</option>
              <option value="md">md ({{ playground.isDrawer ? '416px' : '512px' }} • Default)</option>
              <option value="lg">lg ({{ playground.isDrawer ? '576px' : '768px' }})</option>
              <option value="xl">xl ({{ playground.isDrawer ? '768px' : '1024px' }})</option>
              <option v-if="!playground.isDrawer" value="fullscreen">fullscreen (100vw)</option>
            </select>
          </div>

          <!-- Surface Style -->
          <div class="form-group mb-0">
            <label class="form-label text-xs font-semibold">Surface Style</label>
            <select v-model="playground.variant" class="form-select form-select-sm">
              <option value="elevated">elevated (Ambient Shadow)</option>
              <option value="glass">glass (Frosted Glass Blur)</option>
              <option value="bordered">bordered (High Contrast)</option>
              <option value="tonal">tonal (Soft Surface Fill)</option>
            </select>
          </div>

          <!-- Animation (for modal) / Glass Toggle (for drawer) -->
          <div v-if="!playground.isDrawer" class="form-group mb-0">
            <label class="form-label text-xs font-semibold">Transition Animation</label>
            <select v-model="playground.animation" class="form-select form-select-sm">
              <option value="slide-down">slide-down (Drop Down)</option>
              <option value="scale">scale (Spring Pop)</option>
              <option value="fade">fade (Dissolve)</option>
              <option value="slide-up">slide-up (Slide from Bottom)</option>
              <option value="slide-left">slide-left (Slide from Right)</option>
              <option value="slide-right">slide-right (Slide from Left)</option>
              <option value="bounce">bounce (Soft Overshoot)</option>
            </select>
          </div>
          <div v-else class="form-group mb-0 d-flex flex-column justify-center">
            <label class="form-label text-xs font-semibold mb-1">Backdrop Glass Blur</label>
            <label class="d-flex align-center gap-2 cursor-pointer text-xs mt-1">
              <input v-model="playground.backdropGlass" type="checkbox" style="width: 1rem; height: 1rem;" />
              <span>12px Frosted Glass Blur</span>
            </label>
          </div>
        </div>

        <!-- Launch Trigger Stage -->
        <div class="p-4 rounded-lg bg-surface border border-subtle d-flex flex-column align-center justify-center gap-3">
          <JBtn
            color="primary"
            size="lg"
            :prepend-icon="playground.isDrawer ? '🚪' : '🚀'"
            @click="isPlaygroundOpen = true"
          >
            {{ playground.isDrawer ? `Launch ${playground.drawerSide.toUpperCase()} Offcanvas Drawer` : 'Launch Configured Modal' }}
          </JBtn>
          <code class="text-xs text-secondary text-center">
            &lt;JModal v-model="isOpen" {{ playground.isDrawer ? `:drawer="'${playground.drawerSide}'"` : `:position="'${playground.position}'"` }} size="{{ playground.size }}" variant="{{ playground.variant }}"&gt;
          </code>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 2. OFFCANVAS DRAWERS SHOWCASE                                       -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'drawers'" class="d-flex flex-column gap-3">
      <div class="d-flex align-center justify-between">
        <div>
          <h2 class="text-lg font-bold mb-0">🚪 Dedicated Offcanvas Drawers Showcase</h2>
          <p class="text-secondary text-xs mb-0">
            True edge-docked sliding panels that slide smoothly out from viewport borders with full-height layouts.
          </p>
        </div>
        <span class="badge badge-success text-xs font-mono">100% Height & Docked</span>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-md-3 gap-3">
        <!-- Card 1: Right Drawer (Cart / Settings) -->
        <div class="card card-bordered p-4 d-flex flex-column justify-between gap-3 bg-surface-elevated">
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="badge badge-tonal-primary text-xs">Right Docked</span>
              <span class="text-xs text-muted"><code>drawer="right"</code></span>
            </div>
            <h3 class="text-base font-bold mb-1">🛒 Shopping Cart & Checkout</h3>
            <p class="text-xs text-secondary mb-0">
              Full-height panel docked flush to the right edge with a scrollable item list and sticky checkout footer.
            </p>
          </div>
          <JBtn color="primary" prepend-icon="🛒" @click="isCartDrawerOpen = true">
            Open Cart Drawer
          </JBtn>
        </div>

        <!-- Card 2: Left Drawer (Navigation) -->
        <div class="card card-bordered p-4 d-flex flex-column justify-between gap-3 bg-surface-elevated">
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="badge badge-tonal-success text-xs">Left Docked</span>
              <span class="text-xs text-muted"><code>drawer="left"</code></span>
            </div>
            <h3 class="text-base font-bold mb-1">📂 Workspace & Navigation</h3>
            <p class="text-xs text-secondary mb-0">
              Left-side offcanvas panel for mobile sidebars, project hierarchies, and tenant account switchers.
            </p>
          </div>
          <JBtn variant="tonal" color="success" prepend-icon="📂" @click="isNavDrawerOpen = true">
            Open Left Drawer
          </JBtn>
        </div>

        <!-- Card 3: Bottom Action Sheet -->
        <div class="card card-bordered p-4 d-flex flex-column justify-between gap-3 bg-surface-elevated">
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="badge badge-tonal-warning text-xs">Bottom Docked</span>
              <span class="text-xs text-muted"><code>drawer="bottom"</code></span>
            </div>
            <h3 class="text-base font-bold mb-1">📱 Mobile Action Sheet</h3>
            <p class="text-xs text-secondary mb-0">
              Slides up from the bottom of the screen with rounded top corners, ideal for quick mobile actions and sharing.
            </p>
          </div>
          <JBtn variant="tonal" color="warning" prepend-icon="📱" @click="isBottomSheetOpen = true">
            Open Bottom Sheet
          </JBtn>
        </div>
      </div>

      <!-- Quick Drawer Width Presets -->
      <div class="card card-bordered p-3 bg-surface-tonal">
        <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2">
          <span class="text-xs font-semibold text-secondary">Quick Drawer Width Variants:</span>
          <div class="d-flex flex-wrap gap-2">
            <button
              class="btn btn-xs btn-outlined-neutral"
              @click="openShowcaseModal({ title: 'Compact Right Drawer (SM)', drawer: 'right', size: 'sm', icon: '📐' })"
            >
              SM Drawer (352px)
            </button>
            <button
              class="btn btn-xs btn-primary"
              @click="openShowcaseModal({ title: 'Standard Right Drawer (MD)', drawer: 'right', size: 'md', icon: '📐' })"
            >
              MD Drawer (416px)
            </button>
            <button
              class="btn btn-xs btn-outlined-neutral"
              @click="openShowcaseModal({ title: 'Expanded Right Drawer (LG)', drawer: 'right', size: 'lg', icon: '📐' })"
            >
              LG Drawer (576px)
            </button>
            <button
              class="btn btn-xs btn-tonal-info"
              @click="openShowcaseModal({ title: 'Glassmorphic Drawer', drawer: 'right', variant: 'glass', size: 'md', icon: '✨' })"
            >
              Glass Drawer
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- 3. SIZES & 9-POINT POSITIONS MATRIX                                 -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'all' || activeTab === 'positions'" class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- 1. Sizing Matrix -->
      <div class="card card-bordered p-4 bg-surface-elevated">
        <div class="d-flex align-center justify-between mb-2">
          <h3 class="text-base font-bold mb-0">Modal Sizing Matrix</h3>
          <span class="text-xs text-muted"><code>size="..."</code></span>
        </div>
        <p class="text-xs text-secondary mb-3">Responsive width tiers for different workflow densities.</p>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-tonal-neutral" @click="openShowcaseModal({ title: 'XS Modal (320px)', size: 'xs', icon: '🔒' })">
            XS (320px)
          </button>
          <button class="btn btn-sm btn-tonal-neutral" @click="openShowcaseModal({ title: 'SM Modal (384px)', size: 'sm', icon: '📝' })">
            SM (384px)
          </button>
          <button class="btn btn-sm btn-primary" @click="openShowcaseModal({ title: 'MD Modal (512px)', size: 'md', icon: '⚡' })">
            MD Default (512px)
          </button>
          <button class="btn btn-sm btn-tonal-neutral" @click="openShowcaseModal({ title: 'LG Modal (768px)', size: 'lg', icon: '📊' })">
            LG (768px)
          </button>
          <button class="btn btn-sm btn-tonal-neutral" @click="openShowcaseModal({ title: 'XL Modal (1024px)', size: 'xl', icon: '🗄️' })">
            XL (1024px)
          </button>
          <button class="btn btn-sm btn-tonal-primary" @click="openShowcaseModal({ title: 'Fullscreen Studio', size: 'fullscreen', icon: '🖥️' })">
            Fullscreen
          </button>
        </div>
      </div>

      <!-- 2. Surface Styles -->
      <div class="card card-bordered p-4 bg-surface-elevated">
        <div class="d-flex align-center justify-between mb-2">
          <h3 class="text-base font-bold mb-0">Surface Styles</h3>
          <span class="text-xs text-muted"><code>variant="..."</code></span>
        </div>
        <p class="text-xs text-secondary mb-3">Adaptive container surfaces designed for light and dark themes.</p>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-tonal-primary" @click="openShowcaseModal({ title: 'Elevated Surface Modal', variant: 'elevated', icon: '🏔️' })">
            Elevated (Shadow)
          </button>
          <button class="btn btn-sm btn-tonal-info" @click="openShowcaseModal({ title: 'Frosted Glass Modal', variant: 'glass', icon: '✨' })">
            Glassmorphic (Blur)
          </button>
          <button class="btn btn-sm btn-tonal-secondary" @click="openShowcaseModal({ title: 'Bordered High-Contrast Modal', variant: 'bordered', icon: '📐' })">
            Bordered (2px Outline)
          </button>
          <button class="btn btn-sm btn-tonal-success" @click="openShowcaseModal({ title: 'Tonal Surface Modal', variant: 'tonal', icon: '🎨' })">
            Tonal (Soft Fill)
          </button>
        </div>
      </div>

      <!-- 3. 9-Point Compass Positions -->
      <div class="card card-bordered p-4 bg-surface-elevated grid-col-span-full">
        <div class="d-flex align-center justify-between mb-2">
          <h3 class="text-base font-bold mb-0">🧭 9-Point Viewport Compass</h3>
          <span class="text-xs text-muted"><code>position="top-left" | "center" | "bottom-right" ...</code></span>
        </div>
        <p class="text-xs text-secondary mb-3">
          Precise viewport anchoring for floating copilots, alerts, toasts, and persistent widgets.
        </p>

        <div class="d-grid grid-cols-3 gap-2" style="max-width: 32rem; margin: 0 auto;">
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Top-Left Modal', position: 'top-left', animation: 'slide-down' })">↖ Top-L</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Top-Center Banner', position: 'top', animation: 'slide-down' })">⬆ Top</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Top-Right Toast', position: 'top-right', animation: 'slide-down' })">↗ Top-R</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Center-Left Modal', position: 'left', animation: 'slide-right' })">⬅ Left</button>
          <button class="btn btn-xs btn-primary" @click="openShowcaseModal({ title: 'Center Modal', position: 'center', animation: 'scale' })">⏺ Center</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Center-Right Modal', position: 'right', animation: 'slide-left' })">➡ Right</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Bottom-Left Widget', position: 'bottom-left', animation: 'slide-up' })">↙ Bot-L</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'Bottom-Center Sheet', position: 'bottom', animation: 'slide-up' })">⬇ Bottom</button>
          <button class="btn btn-xs btn-tonal-neutral" @click="openShowcaseModal({ title: 'AI Copilot Dialog', position: 'bottom-right', animation: 'slide-up' })">↘ Bot-R</button>
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
          <h3 class="text-base font-bold mb-0">📖 Copyable Code Recipes</h3>
          <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetComponent)">Copy Vue Recipe</button>
        </div>

        <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-3">
          <div>
            <span class="text-xs font-bold text-muted uppercase mb-1 d-block">Vue 3 &lt;JModal /&gt; Usage:</span>
            <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="line-height: 1.45; max-height: 250px;"><code>{{ snippetComponent }}</code></pre>
          </div>
          <div>
            <span class="text-xs font-bold text-muted uppercase mb-1 d-block">Pure Vanilla SCSS Drawer Classes:</span>
            <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="line-height: 1.45; max-height: 250px;"><code>{{ snippetVanilla }}</code></pre>
          </div>
        </div>
      </div>

      <!-- Technical Reference Tables with Enhanced Font Size -->
      <div class="card card-bordered p-4 bg-surface-elevated d-flex flex-column gap-4">
        <div>
          <h2 class="text-xl font-bold mb-1">Technical Reference</h2>
          <p class="text-secondary text-sm mb-0">Complete props, slots, drawer modifiers, and SCSS utility classes.</p>
        </div>

        <!-- 1. JModal Component API -->
        <div>
          <h3 class="text-base font-bold mb-2 d-flex align-center gap-2">
            <span class="text-primary">⚙️</span> 1. &lt;JModal /&gt; Component API
          </h3>
          <div class="table-responsive">
            <table class="table table-clean w-full" style="font-size: 0.9375rem;">
              <thead>
                <tr>
                  <th style="width: 220px;">Prop / Slot</th>
                  <th style="width: 140px;">Type</th>
                  <th style="width: 110px;">Default</th>
                  <th>Options & Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>v-model</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Two-way reactive visibility state (<code>true</code> = open).</td>
                </tr>
                <tr>
                  <td><code>drawer</code></td>
                  <td><code>Boolean | String</code></td>
                  <td><code>false</code></td>
                  <td>Activates offcanvas drawer mode: <code>'right'</code> | <code>'left'</code> | <code>'bottom'</code> | <code>'top'</code>.</td>
                </tr>
                <tr>
                  <td><code>title</code> / <code>subtitle</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>Header title text and descriptive caption.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>String</code></td>
                  <td><code>'md'</code></td>
                  <td><code>'xs'</code> | <code>'sm'</code> | <code>'md'</code> | <code>'lg'</code> | <code>'xl'</code> | <code>'fullscreen'</code>.</td>
                </tr>
                <tr>
                  <td><code>position</code></td>
                  <td><code>String</code></td>
                  <td><code>'center'</code></td>
                  <td><code>'center'</code> | <code>'top'</code> | <code>'top-left'</code> | <code>'top-right'</code> | <code>'left'</code> | <code>'right'</code> | <code>'bottom'</code> | <code>'bottom-left'</code> | <code>'bottom-right'</code>.</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>String</code></td>
                  <td><code>'elevated'</code></td>
                  <td><code>'elevated'</code> | <code>'glass'</code> | <code>'bordered'</code> | <code>'tonal'</code>.</td>
                </tr>
                <tr>
                  <td><code>animation</code></td>
                  <td><code>String</code></td>
                  <td><code>'slide-down'</code></td>
                  <td><code>'slide-down'</code> | <code>'scale'</code> | <code>'fade'</code> | <code>'slide-up'</code> | <code>'slide-left'</code> | <code>'slide-right'</code> | <code>'bounce'</code>.</td>
                </tr>
                <tr>
                  <td><code>backdrop</code> / <code>backdropGlass</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true / true</code></td>
                  <td>Enables background overlay and frosted 12px glass blur effect.</td>
                </tr>
                <tr>
                  <td><code>closeOnBackdrop</code> / <code>closeOnEsc</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true / true</code></td>
                  <td>Closes modal on outside backdrop click or Escape key.</td>
                </tr>
                <tr>
                  <td><code>#default</code> / <code>#header</code> / <code>#footer</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Custom template slots for body, header, and footer actions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. SCSS Classes Reference -->
        <div>
          <h3 class="text-base font-bold mb-2 d-flex align-center gap-2">
            <span class="text-secondary">🎨</span> 2. SCSS Utility Classes
          </h3>
          <div class="table-responsive">
            <table class="table table-clean w-full" style="font-size: 0.9375rem;">
              <thead>
                <tr>
                  <th style="width: 250px;">SCSS Class</th>
                  <th style="width: 170px;">Role</th>
                  <th>Styling Description & Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.modal.modal-drawer</code></td>
                  <td>Offcanvas Container</td>
                  <td>Zero-padding fixed overlay for edge-docked sliding panels.</td>
                </tr>
                <tr>
                  <td><code>.modal-drawer-right</code></td>
                  <td>Right Drawer</td>
                  <td>Full-height panel pinned to right edge with slide-in animation.</td>
                </tr>
                <tr>
                  <td><code>.modal-drawer-left</code></td>
                  <td>Left Drawer</td>
                  <td>Full-height panel pinned to left edge with slide-in animation.</td>
                </tr>
                <tr>
                  <td><code>.modal-drawer-bottom</code></td>
                  <td>Bottom Sheet</td>
                  <td>Full-width bottom panel with rounded top corners.</td>
                </tr>
                <tr>
                  <td><code>.modal-backdrop</code></td>
                  <td>Overlay Backdrop</td>
                  <td>Fixed dark translucent background (<code>z-index: 1040</code>).</td>
                </tr>
                <tr>
                  <td><code>.backdrop-glass</code></td>
                  <td>Glassmorphic Blur</td>
                  <td>Deep 12px frosted glass backdrop filter blur.</td>
                </tr>
                <tr>
                  <td><code>.modal-content</code></td>
                  <td>Surface Box</td>
                  <td>Elevated container holding header, body, and footer.</td>
                </tr>
                <tr>
                  <td><code>.anim-drawer-*</code></td>
                  <td>Drawer Animations</td>
                  <td>Smooth hardware-accelerated slide transitions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- MODAL INSTANCES                                                     -->
    <!-- =================================================================== -->

    <!-- 1. Interactive Playground Modal / Drawer Instance -->
    <JModal
      v-model="isPlaygroundOpen"
      :drawer="playground.isDrawer ? playground.drawerSide : false"
      :title="playground.title"
      :subtitle="playground.subtitle"
      :icon="playground.icon"
      :size="playground.size"
      :position="playground.position"
      :variant="playground.variant"
      :animation="playground.animation"
      :backdrop-glass="playground.backdropGlass"
    >
      <div class="d-flex flex-column gap-3">
        <p class="text-sm mb-0">
          This is an active demonstration of <b>&lt;JModal /&gt;</b> configured as
          <b class="text-primary">{{ playground.isDrawer ? `Offcanvas Drawer (${playground.drawerSide})` : `Modal Dialog (${playground.position})` }}</b>
          with size <code>{{ playground.size }}</code> and variant <code>{{ playground.variant }}</code>.
        </p>

        <div class="p-3 rounded-lg bg-surface-tonal border border-subtle text-xs d-flex flex-column gap-1.5">
          <div class="d-flex justify-between">
            <span class="text-muted">Display Mode:</span>
            <span class="font-bold text-primary">{{ playground.isDrawer ? 'Offcanvas Sliding Drawer' : 'Centered Modal Dialog' }}</span>
          </div>
          <div class="d-flex justify-between">
            <span class="text-muted">Edge / Position:</span>
            <span class="font-bold text-secondary">{{ playground.isDrawer ? playground.drawerSide : playground.position }}</span>
          </div>
          <div class="d-flex justify-between">
            <span class="text-muted">Backdrop Glass:</span>
            <span class="font-bold text-success">{{ playground.backdropGlass ? 'Enabled (12px blur)' : 'Standard Dark' }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <JBtn variant="tonal" color="neutral" size="sm" @click="isPlaygroundOpen = false">Cancel</JBtn>
        <JBtn color="primary" size="sm" @click="isPlaygroundOpen = false">Confirm & Close</JBtn>
      </template>
    </JModal>

    <!-- 2. Dedicated Right Cart Drawer Instance -->
    <JModal
      v-model="isCartDrawerOpen"
      drawer="right"
      title="Shopping Cart"
      subtitle="Review your order items"
      icon="🛒"
      size="md"
    >
      <div class="d-flex flex-column gap-3">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="d-flex align-center justify-between p-3 rounded-lg bg-surface-tonal border border-subtle"
        >
          <div class="d-flex align-center gap-2">
            <span style="font-size: 1.25rem;">{{ item.icon }}</span>
            <div>
              <div class="text-xs font-bold text-primary">{{ item.name }}</div>
              <div class="text-xs text-muted">${{ item.price }} &times; {{ item.qty }}</div>
            </div>
          </div>
          <div class="font-bold text-sm text-primary">
            ${{ item.price * item.qty }}
          </div>
        </div>

        <div class="p-3 rounded-lg bg-surface border border-subtle mt-2">
          <div class="d-flex justify-between text-xs text-secondary mb-1">
            <span>Subtotal</span>
            <span>${{ cartSubtotal }}</span>
          </div>
          <div class="d-flex justify-between text-xs text-secondary mb-2">
            <span>Estimated Taxes</span>
            <span>$0.00</span>
          </div>
          <div class="d-flex justify-between font-bold text-sm text-primary pt-2 border-top border-subtle">
            <span>Total Due</span>
            <span>${{ cartSubtotal }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <JBtn variant="tonal" color="neutral" size="sm" @click="isCartDrawerOpen = false">Continue Shopping</JBtn>
        <JBtn color="primary" size="sm" @click="isCartDrawerOpen = false">Checkout Now</JBtn>
      </template>
    </JModal>

    <!-- 3. Dedicated Left Navigation Drawer Instance -->
    <JModal
      v-model="isNavDrawerOpen"
      drawer="left"
      title="Workspaces & Teams"
      subtitle="Switch organization context"
      icon="📂"
      size="md"
    >
      <div class="d-flex flex-column gap-2">
        <div class="p-2.5 rounded-lg bg-surface border border-primary d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <span style="font-size: 1.25rem;">🏢</span>
            <div>
              <div class="text-xs font-bold text-primary">Acme Global Corp</div>
              <div class="text-xs text-muted">Enterprise Tier • 128 Members</div>
            </div>
          </div>
          <span class="badge badge-primary text-xs">Active</span>
        </div>

        <div class="p-2.5 rounded-lg bg-surface-tonal border border-subtle d-flex align-center justify-between cursor-pointer">
          <div class="d-flex align-center gap-2">
            <span style="font-size: 1.25rem;">🚀</span>
            <div>
              <div class="text-xs font-bold text-secondary">Starlight Labs</div>
              <div class="text-xs text-muted">Startup Plan • 12 Members</div>
            </div>
          </div>
          <span class="badge badge-tonal-neutral text-xs">Switch</span>
        </div>

        <div class="p-2.5 rounded-lg bg-surface-tonal border border-subtle d-flex align-center justify-between cursor-pointer">
          <div class="d-flex align-center gap-2">
            <span style="font-size: 1.25rem;">🧪</span>
            <div>
              <div class="text-xs font-bold text-secondary">Personal Workspace</div>
              <div class="text-xs text-muted">Free Plan • 1 Member</div>
            </div>
          </div>
          <span class="badge badge-tonal-neutral text-xs">Switch</span>
        </div>
      </div>

      <template #footer>
        <JBtn color="primary" size="sm" block @click="isNavDrawerOpen = false">Close Navigation</JBtn>
      </template>
    </JModal>

    <!-- 4. Dedicated Bottom Sheet Action Sheet Instance -->
    <JModal
      v-model="isBottomSheetOpen"
      drawer="bottom"
      title="Quick Actions"
      subtitle="Select an action to perform on this record"
      icon="⚡"
      size="md"
    >
      <div class="d-flex flex-column gap-2" style="max-width: 36rem; margin: 0 auto;">
        <button class="btn btn-tonal-neutral d-flex align-center justify-between p-3" @click="isBottomSheetOpen = false">
          <div class="d-flex align-center gap-2">
            <span>🔗</span>
            <span class="font-semibold text-xs">Copy Shareable Link</span>
          </div>
          <span class="text-xs text-muted">Public URL</span>
        </button>

        <button class="btn btn-tonal-neutral d-flex align-center justify-between p-3" @click="isBottomSheetOpen = false">
          <div class="d-flex align-center gap-2">
            <span>📥</span>
            <span class="font-semibold text-xs">Export Dataset as CSV / PDF</span>
          </div>
          <span class="text-xs text-muted">Download file</span>
        </button>

        <button class="btn btn-tonal-neutral d-flex align-center justify-between p-3" @click="isBottomSheetOpen = false">
          <div class="d-flex align-center gap-2">
            <span>📁</span>
            <span class="font-semibold text-xs">Archive to Cold Storage</span>
          </div>
          <span class="text-xs text-muted">Safe backup</span>
        </button>
      </div>

      <template #footer>
        <JBtn variant="tonal" color="neutral" size="sm" block @click="isBottomSheetOpen = false">Cancel</JBtn>
      </template>
    </JModal>

    <!-- 5. Generic Dynamic Showcase Modal / Drawer Instance -->
    <JModal
      v-model="isDynamicModalOpen"
      :drawer="dynamicModalConfig.drawer"
      :title="dynamicModalConfig.title"
      :subtitle="dynamicModalConfig.subtitle"
      :icon="dynamicModalConfig.icon"
      :size="dynamicModalConfig.size"
      :position="dynamicModalConfig.position"
      :variant="dynamicModalConfig.variant"
      :animation="dynamicModalConfig.animation"
    >
      <div class="d-flex flex-column gap-3">
        <p class="text-sm mb-0">
          {{ dynamicModalConfig.content || 'Showcase demonstration instance. Press ESC or click outside to dismiss.' }}
        </p>
      </div>

      <template #footer>
        <JBtn variant="tonal" color="neutral" size="sm" @click="isDynamicModalOpen = false">Close</JBtn>
        <JBtn color="primary" size="sm" @click="isDynamicModalOpen = false">Understood</JBtn>
      </template>
    </JModal>
  </div>
</template>
