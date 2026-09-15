<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, reactive, computed } from 'vue'

// ----------------------------------------------------------------------------
// 1. Toast Notification State for Clipboard Copy
// ----------------------------------------------------------------------------
const copiedSnippet = ref('')
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2200)
}

// ----------------------------------------------------------------------------
// 2. Interactive Icon Playground State
// ----------------------------------------------------------------------------
const playground = reactive({
  name: 'home',
  type: 'solid', // 'solid' | 'outlined'
  size: '2xl',
  color: 'primary',
  spin: false,
})

const codeTab = ref('vue') // 'vue' | 'html'

const playgroundComponentCode = computed(() => {
  const parts = [`name="${playground.name}"`]
  if (playground.type !== 'solid') parts.push(`type="${playground.type}"`)
  if (playground.size !== 'md') parts.push(`size="${playground.size}"`)
  if (playground.color !== 'currentColor') parts.push(`color="${playground.color}"`)
  if (playground.spin) parts.push('spin')
  return `<JIcon ${parts.join(' ')} />`
})

const playgroundCssCode = computed(() => {
  const classes = ['jui', `jui-${playground.name}-${playground.type}`]
  if (playground.size !== 'md') classes.push(`jui-${playground.size}`)
  if (playground.color !== 'currentColor') classes.push(`text-${playground.color}`)
  if (playground.spin) classes.push('jui-spin')
  return `<i class="${classes.join(' ')}"></i>`
})

// ----------------------------------------------------------------------------
// 3. Complete Icon Library Definition
// ----------------------------------------------------------------------------
import { allIcons, categories } from '@/plugins/icons'

const activeCategory = ref('All')
const searchQuery = ref('')
const catalogType = ref('solid') // 'solid' | 'outlined'

// Filtered icons computation
const filteredIcons = computed(() => {
  return allIcons.filter(icon => {
    // Category filter
    const matchesCategory = activeCategory.value === 'All' || icon.category === activeCategory.value
    if (!matchesCategory) return false

    // Search filter
    if (!searchQuery.value) return true
    const q = searchQuery.value.toLowerCase().trim()
    return icon.name.includes(q) || icon.tags.some(tag => tag.includes(q))
  })
})

// ----------------------------------------------------------------------------
// 4. Component Sizing & Color Demos
// ----------------------------------------------------------------------------
const iconSizes = [
  { label: 'xs', pixel: '12px', rem: '0.75rem' },
  { label: 'sm', pixel: '14px', rem: '0.875rem' },
  { label: 'md', pixel: '16px', rem: '1.00rem' },
  { label: 'lg', pixel: '20px', rem: '1.25rem' },
  { label: 'xl', pixel: '24px', rem: '1.50rem' },
  { label: '2xl', pixel: '32px', rem: '2.00rem' },
  { label: '3xl', pixel: '40px', rem: '2.50rem' },
  { label: '4xl', pixel: '48px', rem: '3.00rem' },
]

const colorThemes = [
  { name: 'primary', label: 'Primary' },
  { name: 'secondary', label: 'Secondary' },
  { name: 'success', label: 'Success' },
  { name: 'danger', label: 'Danger' },
  { name: 'warning', label: 'Warning' },
  { name: 'info', label: 'Info' },
  { name: 'dark', label: 'Dark' },
  { name: 'muted', label: 'Muted' },
]

const recipeCode = `<!-- 1. Using Vue JIcon Component -->
<JIcon name="home" />
<JIcon name="truck" type="outlined" size="lg" color="primary" />
<JIcon name="spinner" spin size="xl" color="info" />

<!-- 2. Using Pure SCSS Utility Classes -->
<i class="jui jui-home-solid text-primary"></i>
<i class="jui jui-truck-outlined jui-xl text-success"></i>
<i class="jui jui-spinner-solid jui-spin"></i>`
</script>

<template>
  <div class="d-flex flex-column gap-6 w-full">
    <!-- ============================================================ -->
    <!-- 1. HEADER SECTION                                            -->
    <!-- ============================================================ -->
    <header class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-4">
      <div>
        <div class="d-flex align-center gap-2 mb-1">
          <h1 class="font-bold mb-0" style="font-size: 1.75rem; letter-spacing: -0.02em;">JUI Vector Icons</h1>
          <span class="badge badge-primary badge-pill">v1.0 Mask System</span>
        </div>
        <p class="text-secondary mb-0" style="max-width: 48rem;">
          High-performance vector icons powered by CSS <code>mask-image</code>. Seamlessly inherits font color
          via <code>currentColor</code>, scales proportionally with typography, and offers full dual styling (Solid &amp; Outlined).
        </p>
      </div>

      <div class="d-flex align-center gap-2 flex-wrap">
        <button class="btn btn-sm btn-tonal-primary" @click="copyToClipboard(recipeCode, 'Recipe')">
          <JIcon name="copy" class="mr-1" /> Copy Usage Recipe
        </button>
      </div>
    </header>

    <!-- Floating Copy Toast Notification -->
    <transition name="fade">
      <div
        v-if="copiedSnippet"
        class="alert alert-primary alert-glass shadow-lg position-fixed d-flex align-center gap-3"
        style="bottom: 1.5rem; right: 1.5rem; z-index: 9999; max-width: 26rem;"
      >
        <JIcon name="circle-check" size="lg" class="text-success flex-shrink-0" />
        <div class="alert-content">
          <div class="alert-title font-bold">Copied to Clipboard!</div>
          <div class="text-xs text-truncate"><code>{{ copiedSnippet }}</code></div>
        </div>
      </div>
    </transition>

    <!-- ============================================================ -->
    <!-- 2. INTERACTIVE ICON PLAYGROUND                               -->
    <!-- ============================================================ -->
    <div class="card card-bordered shadow-sm">
      <div class="card-header d-flex align-center justify-between p-4 border-bottom">
        <div>
          <h3 class="font-bold mb-0" style="font-size: 1.15rem;">Interactive Icon Playground</h3>
          <p class="text-secondary text-xs mb-0">Fine-tune variant, scale, theme color, and animation properties in real time</p>
        </div>
        <span class="badge badge-tonal-primary badge-pill text-xs">Live Sandbox</span>
      </div>

      <div class="card-body p-4">
        <div class="row g-4 align-center">
          <!-- Playground Controls -->
          <div class="col-12 col-lg-7">
            <div class="d-flex flex-column gap-3">
              <!-- Icon Name & Style Variant -->
              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <label class="form-label font-medium text-xs text-secondary mb-1">Select Icon</label>
                  <select v-model="playground.name" class="form-select form-select-sm">
                    <option v-for="icon in allIcons" :key="icon.name" :value="icon.name">
                      {{ icon.name }} ({{ icon.category }})
                    </option>
                  </select>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="form-label font-medium text-xs text-secondary mb-1">Variant Style</label>
                  <div class="btn-group w-full">
                    <button
                      type="button"
                      class="btn btn-sm w-full"
                      :class="playground.type === 'solid' ? 'btn-primary' : 'btn-tonal-neutral'"
                      @click="playground.type = 'solid'"
                    >
                      Solid
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm w-full"
                      :class="playground.type === 'outlined' ? 'btn-primary' : 'btn-tonal-neutral'"
                      @click="playground.type = 'outlined'"
                    >
                      Outlined
                    </button>
                  </div>
                </div>
              </div>

              <!-- Size & Color -->
              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <label class="form-label font-medium text-xs text-secondary mb-1">Size Tier</label>
                  <select v-model="playground.size" class="form-select form-select-sm">
                    <option v-for="s in iconSizes" :key="s.label" :value="s.label">
                      {{ s.label.toUpperCase() }} — {{ s.pixel }} ({{ s.rem }})
                    </option>
                  </select>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="form-label font-medium text-xs text-secondary mb-1">Color Palette</label>
                  <select v-model="playground.color" class="form-select form-select-sm">
                    <option value="currentColor">currentColor (Inherited)</option>
                    <option v-for="c in colorThemes" :key="c.name" :value="c.name">
                      {{ c.label }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Spin Animation Toggle -->
              <div class="d-flex align-center gap-2 pt-1">
                <div class="form-check form-switch mb-0">
                  <input
                    id="spinSwitch"
                    v-model="playground.spin"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label text-sm cursor-pointer" for="spinSwitch">
                    Continuous Spin Animation (<code>jui-spin</code>)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Preview Canvas & Generated Code -->
          <div class="col-12 col-lg-5">
            <div
              class="p-4 rounded-3 border d-flex flex-column align-center justify-center gap-3 position-relative overflow-hidden"
              style="min-height: 180px; background: var(--bg-surface-tonal, rgba(255, 255, 255, 0.04)); border-color: var(--border-color, #1f293d) !important;"
            >
              <!-- Live Rendered Icon -->
              <div class="d-flex align-center justify-center p-3">
                <JIcon
                  :name="playground.name"
                  :type="playground.type"
                  :size="playground.size"
                  :color="playground.color === 'currentColor' ? undefined : playground.color"
                  :spin="playground.spin"
                />
              </div>

              <div class="badge badge-tonal-neutral text-xs">
                <code>.jui-{{ playground.name }}-{{ playground.type }}</code>
              </div>
            </div>

            <!-- Generated Snippet Box with Tabs -->
            <div
              class="mt-3 p-3 rounded-2 border d-flex flex-column gap-2"
              style="background: var(--bg-body, #0b0f19); border-color: var(--border-color, #1f293d) !important;"
            >
              <div class="d-flex align-center justify-between">
                <div class="d-flex align-center gap-1">
                  <button
                    class="btn btn-xs rounded-pill"
                    :class="codeTab === 'vue' ? 'btn-primary' : 'btn-tonal-neutral'"
                    @click="codeTab = 'vue'"
                  >
                    Vue Component
                  </button>
                  <button
                    class="btn btn-xs rounded-pill"
                    :class="codeTab === 'html' ? 'btn-primary' : 'btn-tonal-neutral'"
                    @click="codeTab = 'html'"
                  >
                    HTML / SCSS Class
                  </button>
                </div>
                <button
                  class="btn btn-xs btn-tonal-neutral flex-shrink-0"
                  title="Copy Snippet"
                  @click="copyToClipboard(codeTab === 'vue' ? playgroundComponentCode : playgroundCssCode)"
                >
                  Copy
                </button>
              </div>
              <div
                class="p-2 rounded text-truncate"
                style="background: var(--bg-surface, #111827); border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.06));"
              >
                <code class="text-xs text-success font-mono">
                  {{ codeTab === 'vue' ? playgroundComponentCode : playgroundCssCode }}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 3. COMPREHENSIVE ICON CATALOG & SEARCH GALLERY               -->
    <!-- ============================================================ -->
    <div class="card card-bordered shadow-sm">
      <div class="card-header p-4 border-bottom">
        <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
          <div>
            <div class="d-flex align-center gap-2 mb-1">
              <h3 class="font-bold mb-0" style="font-size: 1.15rem;">Icon Catalog</h3>
              <span class="badge badge-tonal-primary badge-pill text-xs">{{ filteredIcons.length }} of {{ allIcons.length }}</span>
            </div>
            <p class="text-secondary text-xs mb-0">
              Browse all vector icons in both solid and outlined variants. Click any icon to copy its component code.
            </p>
          </div>

          <!-- Variant Toggle Pill -->
          <div class="d-flex align-center gap-2">
            <div class="btn-group">
              <button
                class="btn btn-sm"
                :class="catalogType === 'solid' ? 'btn-primary' : 'btn-tonal-neutral'"
                @click="catalogType = 'solid'"
              >
                Solid Icons
              </button>
              <button
                class="btn btn-sm"
                :class="catalogType === 'outlined' ? 'btn-primary' : 'btn-tonal-neutral'"
                @click="catalogType = 'outlined'"
              >
                Outlined Icons
              </button>
            </div>
          </div>
        </div>

        <!-- Search Bar and Category Tabs -->
        <div class="row g-3 mt-2 align-center">
          <div class="col-12 col-md-5">
            <div class="position-relative">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control form-control-sm"
                placeholder="Search icons by name or tag (e.g. home, truck, user, mail)..."
              />
            </div>
          </div>

          <div class="col-12 col-md-7">
            <div class="d-flex align-center gap-1 flex-wrap">
              <button
                v-for="cat in categories"
                :key="cat"
                class="btn btn-xs rounded-pill"
                :class="activeCategory === cat ? 'btn-primary' : 'btn-tonal-neutral'"
                @click="activeCategory = cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Icon Cards Grid -->
      <div class="card-body p-4">
        <div v-if="filteredIcons.length > 0" class="icons-catalog-grid">
          <div
            v-for="icon in filteredIcons"
            :key="icon.name"
            class="icon-grid-card"
            :title="`Click to copy <JIcon name=&quot;${icon.name}&quot; type=&quot;${catalogType}&quot; /> (${icon.category})`"
            @click="copyToClipboard(`<JIcon name=&quot;${icon.name}&quot; type=&quot;${catalogType}&quot; />`)"
          >
            <!-- Icon Display -->
            <div class="icon-avatar">
              <JIcon :name="icon.name" :type="catalogType" size="xl" />
            </div>

            <!-- Icon Title -->
            <div class="icon-name">
              {{ icon.name }}
            </div>

            <!-- Hover overlay prompt -->
            <div class="icon-hover-prompt">
              Copy
            </div>
          </div>
        </div>

        <!-- No Results Fallback -->
        <div v-else class="text-center py-5 d-flex flex-column align-center justify-center gap-2">
          <JIcon name="search" size="3xl" class="text-muted" />
          <h4 class="font-medium text-secondary mb-0">No icons match "{{ searchQuery }}"</h4>
          <p class="text-muted text-xs mb-2">Try searching for a different keyword or select another category</p>
          <button class="btn btn-xs btn-tonal-primary" @click="searchQuery = ''; activeCategory = 'All'">
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 4. SIZING SCALE DEMO                                         -->
    <!-- ============================================================ -->
    <div class="card card-bordered shadow-sm">
      <div class="card-header p-4 border-bottom">
        <h3 class="font-bold mb-1" style="font-size: 1.15rem;">Sizing Hierarchy</h3>
        <p class="text-secondary text-xs mb-0">
          Standardized size tiers scaling from <code>xs</code> (12px) to <code>4xl</code> (48px) via typography-aligned CSS rules.
        </p>
      </div>

      <div class="card-body p-4">
        <div class="row g-4 align-end">
          <div
            v-for="s in iconSizes"
            :key="s.label"
            class="col-6 col-sm-4 col-md-3 col-lg d-flex flex-column align-center gap-2 text-center"
          >
            <div class="d-flex align-center justify-center text-primary" style="height: 56px;">
              <JIcon name="truck" type="solid" :size="s.label" />
            </div>
            <div class="badge badge-tonal-primary text-xs font-mono">{{ s.label }}</div>
            <span class="text-secondary font-mono" style="font-size: 0.7rem;">{{ s.pixel }} / {{ s.rem }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 5. THEME PALETTE INHERITANCE DEMO                            -->
    <!-- ============================================================ -->
    <div class="card card-bordered shadow-sm">
      <div class="card-header p-4 border-bottom">
        <h3 class="font-bold mb-1" style="font-size: 1.15rem;">Theme Color Inheritance</h3>
        <p class="text-secondary text-xs mb-0">
          Because icons utilize <code>currentColor</code>, they automatically harmonize with any text color token or gradient.
        </p>
      </div>

      <div class="card-body p-4">
        <div class="row g-3">
          <div
            v-for="c in colorThemes"
            :key="c.name"
            class="col-6 col-sm-4 col-md-3"
          >
            <div
              class="p-3 rounded-3 border d-flex align-center gap-3"
              style="background-color: var(--bg-surface-tonal, rgba(255, 255, 255, 0.04)); border-color: var(--border-color, #1f293d) !important;"
            >
              <JIcon name="home" size="xl" :color="c.name" />
              <div>
                <div class="font-bold text-xs" :class="`text-${c.name}`">{{ c.label }}</div>
                <code class="text-secondary" style="font-size: 0.68rem;">text-{{ c.name }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 6. PRACTICAL COMBINATIONS IN JUI COMPONENTS                  -->
    <!-- ============================================================ -->
    <div class="card card-bordered shadow-sm">
      <div class="card-header p-4 border-bottom">
        <h3 class="font-bold mb-1" style="font-size: 1.15rem;">Integration with JUI Components</h3>
        <p class="text-secondary text-xs mb-0">Seamlessly embed icons inside buttons, status badges, alert callouts, and chips</p>
      </div>

      <div class="card-body p-4 d-flex flex-column gap-4">
        <!-- Buttons with Icons -->
        <div>
          <h5 class="text-xs font-bold text-secondary text-uppercase mb-2" style="letter-spacing: 0.05em;">Buttons &amp; Icon Actions</h5>
          <div class="d-flex align-center gap-2 flex-wrap">
            <button class="btn btn-sm btn-primary d-flex align-center gap-2">
              <JIcon name="home" /> Home Dashboard
            </button>
            <button class="btn btn-sm btn-tonal-success d-flex align-center gap-2">
              <JIcon name="circle-check" /> Order Approved
            </button>
            <button class="btn btn-sm btn-outlined-primary d-flex align-center gap-2">
              <JIcon name="download" /> Export Report
            </button>
            <button class="btn btn-sm btn-tonal-danger d-flex align-center gap-2">
              <JIcon name="trash" /> Delete Item
            </button>
            <button class="btn btn-sm btn-tonal-neutral d-flex align-center gap-2">
              <JIcon name="spinner" spin /> Syncing...
            </button>
            <!-- Icon-only Circular Actions -->
            <button class="btn btn-sm btn-tonal-primary rounded-circle p-2" title="Notifications">
              <JIcon name="bell" />
            </button>
            <button class="btn btn-sm btn-tonal-secondary rounded-circle p-2" title="Settings">
              <JIcon name="gear" />
            </button>
          </div>
        </div>

        <!-- Badges & Chips with Icons -->
        <div>
          <h5 class="text-xs font-bold text-secondary text-uppercase mb-2" style="letter-spacing: 0.05em;">Badges &amp; Status Indicators</h5>
          <div class="d-flex align-center gap-2 flex-wrap">
            <span class="badge badge-primary badge-pill d-flex align-center gap-1">
              <JIcon name="star" /> Featured Item
            </span>
            <span class="badge badge-tonal-success badge-pill d-flex align-center gap-1">
              <JIcon name="truck" /> In Transit
            </span>
            <span class="badge badge-tonal-warning badge-pill d-flex align-center gap-1">
              <JIcon name="triangle-exclamation" /> Pending Verification
            </span>
            <span class="badge badge-outlined-danger badge-pill d-flex align-center gap-1">
              <JIcon name="lock" /> Secure Vault
            </span>
          </div>
        </div>

        <!-- Alert Callout with Icon -->
        <div>
          <h5 class="text-xs font-bold text-secondary text-uppercase mb-2" style="letter-spacing: 0.05em;">Notification Callout</h5>
          <div class="alert alert-primary d-flex align-start gap-3">
            <JIcon name="circle-info" size="lg" class="text-primary flex-shrink-0 mt-1" />
            <div class="alert-content">
              <div class="alert-title font-bold">Standard Vector Mask Architecture</div>
              <p class="mb-0 text-sm">
                Each icon in JUI is mapped via SCSS mask rules to <code>.jui-name-solid</code> and <code>.jui-name-outlined</code>.
                Adding new SVG vector files requires zero JavaScript overhead and compiles instantly into the design bundle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 7. COMPONENT API DOCUMENTATION TABLE                         -->
    <!-- ============================================================ -->
    <div class="card card-bordered shadow-sm">
      <div class="card-header p-4 border-bottom">
        <h3 class="font-bold mb-1" style="font-size: 1.15rem;">JIcon Component API Reference</h3>
        <p class="text-secondary text-xs mb-0">Props and options supported by the <code>&lt;JIcon&gt;</code> Vue component</p>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-subtle text-xs">
              <tr>
                <th class="p-3">Prop</th>
                <th class="p-3">Type</th>
                <th class="p-3">Default</th>
                <th class="p-3">Description</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="p-3 font-mono text-primary font-bold">name</td>
                <td class="p-3 font-mono text-xs">String</td>
                <td class="p-3 font-mono text-xs">''</td>
                <td class="p-3">Required icon identifier, e.g. <code>'home'</code>, <code>'truck'</code>, <code>'user'</code>.</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-primary font-bold">type</td>
                <td class="p-3 font-mono text-xs">'solid' | 'outlined'</td>
                <td class="p-3 font-mono text-xs">'solid'</td>
                <td class="p-3">Vector style variant. Selects the filled (solid) or strokework (outlined) vector representation.</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-primary font-bold">size</td>
                <td class="p-3 font-mono text-xs">String | Number</td>
                <td class="p-3 font-mono text-xs">undefined</td>
                <td class="p-3">
                  Preset tier (<code>'xs'</code>, <code>'sm'</code>, <code>'md'</code>, <code>'lg'</code>, <code>'xl'</code>, <code>'2xl'</code>, <code>'3xl'</code>, <code>'4xl'</code>)
                  or custom values like <code>24</code> or <code>'2rem'</code>.
                </td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-primary font-bold">color</td>
                <td class="p-3 font-mono text-xs">String</td>
                <td class="p-3 font-mono text-xs">undefined</td>
                <td class="p-3">Theme color token (<code>'primary'</code>, <code>'success'</code>, etc.) or custom hex/rgb value.</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-primary font-bold">spin</td>
                <td class="p-3 font-mono text-xs">Boolean</td>
                <td class="p-3 font-mono text-xs">false</td>
                <td class="p-3">Enables continuous 360-degree rotation animation, ideal for loading and spinner indicators.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.icons-catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: 0.75rem;
}

@media (max-width: 576px) {
  .icons-catalog-grid {
    grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
    gap: 0.5rem;
  }
}

.icon-grid-card {
  aspect-ratio: 1 / 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.25rem;
  background-color: var(--bg-surface, #111827);
  border: 1px solid var(--border-color, #1f293d);
  border-radius: var(--radius-md, 0.5rem);
  color: var(--text-primary, #f8fafc);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select: none;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.15s ease,
              background-color 0.15s ease;
}

.icon-grid-card:hover {
  transform: translateY(-3px);
  background-color: var(--bg-surface-elevated, #1f293d);
  border-color: var(--primary, #6366f1);
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.4);
}

.icon-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary, #6366f1);
  transition: transform 0.18s ease;
  flex-shrink: 0;
}

.icon-grid-card:hover .icon-avatar {
  transform: scale(1.15);
}

.icon-name {
  font-weight: 500;
  font-size: 0.7rem;
  color: var(--text-primary, #f8fafc);
  text-align: center;
  width: 100%;
  padding: 0 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.35rem;
  line-height: 1.15;
  transition: color 0.15s ease;
}

.icon-grid-card:hover .icon-name {
  color: var(--primary, #6366f1);
}

.icon-hover-prompt {
  opacity: 0;
  position: absolute;
  bottom: 0.2rem;
  background: var(--primary, #6366f1);
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform: translateY(4px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  white-space: nowrap;
}

.icon-grid-card:hover .icon-hover-prompt {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>