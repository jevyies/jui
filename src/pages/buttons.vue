<script setup>
import { ref, reactive, computed } from 'vue'
import JBtn from '../@core/components/JBtn.vue'

const activeRefTab = ref('props')
const copied = ref(false)

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Interactive Playground State
const playground = reactive({
  label: 'Interactive Button',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  pill: false,
  block: false,
  loading: false,
  disabled: false,
  prependIcon: '✨',
  appendIcon: '→',
})

const playgroundCode = computed(() => {
  let attrs = []
  if (playground.color !== 'primary') attrs.push(`color="${playground.color}"`)
  if (playground.variant !== 'solid') attrs.push(`variant="${playground.variant}"`)
  if (playground.size !== 'md') attrs.push(`size="${playground.size}"`)
  if (playground.pill) attrs.push(':pill="true"')
  if (playground.block) attrs.push(':block="true"')
  if (playground.loading) attrs.push(':loading="true"')
  if (playground.disabled) attrs.push(':disabled="true"')
  if (playground.prependIcon) attrs.push(`prepend-icon="${playground.prependIcon}"`)
  if (playground.appendIcon) attrs.push(`append-icon="${playground.appendIcon}"`)

  const attrStr = attrs.length ? ' ' + attrs.join(' ') : ''
  return `<JBtn${attrStr}>${playground.label}</JBtn>`
})

const snippetComponent = `<script setup>
import JBtn from '@core/components/JBtn.vue'
</` + `script>

<template>
  <!-- Standard Solid Button -->
  <JBtn color="primary" size="md">Primary Action</JBtn>

  <!-- Tonal with Icons -->
  <JBtn variant="tonal" color="success" prepend-icon="✨" append-icon="→">
    Explore Features
  </JBtn>

  <!-- Outlined Pill with Loading -->
  <JBtn variant="outlined" color="danger" :pill="true" :loading="isLoading">
    Delete Resource
  </JBtn>

  <!-- Router Link -->
  <JBtn to="/tables" color="primary" variant="tonal">
    Go to Tables 📊
  </JBtn>
</template>`

const snippetVanilla = `<!-- Solid Buttons -->
<button class="btn btn-md btn-primary">Primary Solid</button>

<!-- Outlined Pill Button -->
<button class="btn btn-sm btn-pill btn-outlined-success">✓ Outlined Pill</button>

<!-- Tonal Button with Loading -->
<button class="btn btn-md btn-tonal-primary is-loading">Loading</button>

<!-- Button Group -->
<div class="btn-group">
  <button class="btn btn-sm btn-tonal-neutral">Day</button>
  <button class="btn btn-sm btn-primary">Week</button>
  <button class="btn btn-sm btn-tonal-neutral">Month</button>
</div>`
</script>

<template>
  <div class="d-flex flex-column gap-4 gap-md-5 w-full">

    <!-- ============================================================ -->
    <!-- HEADER                                                       -->
    <!-- ============================================================ -->
    <header class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-3">
      <div>
        <h1 class="font-bold mb-1" style="font-size: 1.5rem; letter-spacing: -0.02em;">Buttons & Actions</h1>
        <p class="text-secondary text-sm mb-0">
          Versatile button component supporting 5 design variants, 5 size tiers, icon slots, pill capsules, and loading states.
        </p>
      </div>
      <button
        class="btn btn-sm btn-tonal-primary flex-shrink-0"
        @click="copyToClipboard(snippetComponent)"
      >
        <span>{{ copied ? '✓ Copied!' : '📋 Copy JBtn Recipe' }}</span>
      </button>
    </header>

    <!-- ============================================================ -->
    <!-- INTERACTIVE PLAYGROUND                                       -->
    <!-- ============================================================ -->
    <div class="card card-bordered">
      <div class="btn-card-header">
        <div>
          <h2 class="btn-card-title">Interactive Sandbox</h2>
          <p class="btn-card-subtitle">Customize props live and preview the generated component</p>
        </div>
      </div>

      <div class="card-body p-4 d-flex flex-column gap-4">
        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4 gap-3">
          <!-- Label -->
          <div>
            <label class="btn-label mb-1">Button Label</label>
            <input v-model="playground.label" type="text" class="form-control form-control-sm" />
          </div>

          <!-- Color -->
          <div>
            <label class="btn-label mb-1">Color Theme</label>
            <select v-model="playground.color" class="form-select form-select-sm">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="info">Info</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <!-- Variant -->
          <div>
            <label class="btn-label mb-1">Variant Pattern</label>
            <select v-model="playground.variant" class="form-select form-select-sm">
              <option value="solid">Solid (Filled)</option>
              <option value="tonal">Tonal (Soft)</option>
              <option value="outlined">Outlined</option>
              <option value="text">Text (Ghost)</option>
              <option value="link">Link</option>
            </select>
          </div>

          <!-- Size -->
          <div>
            <label class="btn-label mb-1">Size Tier</label>
            <select v-model="playground.size" class="form-select form-select-sm">
              <option value="xs">XS (26px)</option>
              <option value="sm">SM (32px)</option>
              <option value="md">MD (40px)</option>
              <option value="lg">LG (48px)</option>
              <option value="xl">XL (56px)</option>
            </select>
          </div>
        </div>

        <!-- Toggles & Icons Bar -->
        <div class="d-flex flex-wrap align-center justify-between gap-3 pt-3 border-top border-subtle">
          <!-- Icons Input -->
          <div class="d-flex align-center gap-3">
            <div class="d-flex align-center gap-1">
              <span class="text-xs text-muted">Prepend:</span>
              <input v-model="playground.prependIcon" type="text" class="form-control form-control-sm text-center" style="width: 48px;" />
            </div>
            <div class="d-flex align-center gap-1">
              <span class="text-xs text-muted">Append:</span>
              <input v-model="playground.appendIcon" type="text" class="form-control form-control-sm text-center" style="width: 48px;" />
            </div>
          </div>

          <!-- Checkbox Toggles -->
          <div class="d-flex flex-wrap align-center gap-3 text-xs">
            <label class="d-flex align-center gap-1 cursor-pointer">
              <input v-model="playground.pill" type="checkbox" class="form-check-input" />
              <span>Pill</span>
            </label>
            <label class="d-flex align-center gap-1 cursor-pointer">
              <input v-model="playground.block" type="checkbox" class="form-check-input" />
              <span>Full Width</span>
            </label>
            <label class="d-flex align-center gap-1 cursor-pointer">
              <input v-model="playground.loading" type="checkbox" class="form-check-input" />
              <span>Loading</span>
            </label>
            <label class="d-flex align-center gap-1 cursor-pointer">
              <input v-model="playground.disabled" type="checkbox" class="form-check-input" />
              <span>Disabled</span>
            </label>
          </div>
        </div>

        <!-- Live Preview Canvas -->
        <div class="btn-preview-stage d-flex flex-column align-center justify-center gap-3">
          <div :style="playground.block ? 'width: 100%; max-width: 360px;' : ''">
            <JBtn
              :color="playground.color"
              :variant="playground.variant"
              :size="playground.size"
              :pill="playground.pill"
              :block="playground.block"
              :loading="playground.loading"
              :disabled="playground.disabled"
              :prepend-icon="playground.prependIcon"
              :append-icon="playground.appendIcon"
            >
              {{ playground.label }}
            </JBtn>
          </div>

          <!-- Generated Snippet -->
          <div class="d-flex align-center gap-2">
            <code class="btn-code-inline">{{ playgroundCode }}</code>
            <button class="btn btn-link btn-xs p-0 text-muted" @click="copyToClipboard(playgroundCode)">Copy</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- VISUAL GALLERY (PATTERNS & SCALES)                           -->
    <!-- ============================================================ -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">

      <!-- Variants Showcase -->
      <div class="card card-bordered">
        <div class="btn-card-header">
          <div>
            <h2 class="btn-card-title">Design Variants</h2>
            <p class="btn-card-subtitle">5 distinct visual styles across hierarchy levels</p>
          </div>
        </div>

        <div class="card-body p-4 d-flex flex-column gap-3">
          <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2 pb-2 border-bottom border-subtle">
            <span class="text-xs text-muted font-semibold uppercase">Solid</span>
            <div class="d-flex flex-wrap gap-2">
              <JBtn color="primary" size="sm">Primary</JBtn>
              <JBtn color="secondary" size="sm">Secondary</JBtn>
              <JBtn color="success" size="sm">Success</JBtn>
              <JBtn color="warning" size="sm">Warning</JBtn>
              <JBtn color="danger" size="sm">Danger</JBtn>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2 pb-2 border-bottom border-subtle">
            <span class="text-xs text-muted font-semibold uppercase">Tonal</span>
            <div class="d-flex flex-wrap gap-2">
              <JBtn variant="tonal" color="primary" size="sm">Primary</JBtn>
              <JBtn variant="tonal" color="secondary" size="sm">Secondary</JBtn>
              <JBtn variant="tonal" color="success" size="sm">Success</JBtn>
              <JBtn variant="tonal" color="warning" size="sm">Warning</JBtn>
              <JBtn variant="tonal" color="danger" size="sm">Danger</JBtn>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2 pb-2 border-bottom border-subtle">
            <span class="text-xs text-muted font-semibold uppercase">Outlined</span>
            <div class="d-flex flex-wrap gap-2">
              <JBtn variant="outlined" color="primary" size="sm">Primary</JBtn>
              <JBtn variant="outlined" color="secondary" size="sm">Secondary</JBtn>
              <JBtn variant="outlined" color="success" size="sm">Success</JBtn>
              <JBtn variant="outlined" color="warning" size="sm">Warning</JBtn>
              <JBtn variant="outlined" color="danger" size="sm">Danger</JBtn>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-2">
            <span class="text-xs text-muted font-semibold uppercase">Text & Link</span>
            <div class="d-flex flex-wrap align-center gap-2">
              <JBtn variant="text" color="primary" size="sm">Ghost Text</JBtn>
              <JBtn variant="text" color="warning" size="sm">Warning</JBtn>
              <JBtn variant="text" color="danger" size="sm">Discard</JBtn>
              <JBtn variant="link" color="primary" size="sm">Action Link →</JBtn>
            </div>
          </div>
        </div>
      </div>

      <!-- Sizing Scales -->
      <div class="card card-bordered">
        <div class="btn-card-header">
          <div>
            <h2 class="btn-card-title">Size Hierarchy</h2>
            <p class="btn-card-subtitle">5 scale tiers from compact widgets to prominent hero CTAs</p>
          </div>
        </div>

        <div class="card-body p-4 d-flex flex-column justify-center gap-3">
          <div class="d-flex flex-wrap align-center gap-2">
            <JBtn size="xs" color="primary">XS (26px)</JBtn>
            <JBtn size="sm" color="primary">SM (32px)</JBtn>
            <JBtn size="md" color="primary">MD (40px)</JBtn>
            <JBtn size="lg" color="primary">LG (48px)</JBtn>
            <JBtn size="xl" color="primary">XL (56px)</JBtn>
          </div>
          <p class="text-xs text-muted mb-0">
            Font size, internal paddings, and border radii automatically scale proportionally across tiers.
          </p>
        </div>
      </div>

      <!-- Shapes & Icon Buttons -->
      <div class="card card-bordered">
        <div class="btn-card-header">
          <div>
            <h2 class="btn-card-title">Shapes & Icons</h2>
            <p class="btn-card-subtitle">Pill capsule borders and standalone icon buttons</p>
          </div>
        </div>

        <div class="card-body p-4 d-flex flex-column gap-3">
          <div class="d-flex flex-wrap align-center gap-2">
            <JBtn :pill="true" color="primary" prepend-icon="✨" size="sm">Capsule Pill</JBtn>
            <JBtn :pill="true" variant="tonal" color="success" append-icon="✓" size="sm">Approved</JBtn>
            <JBtn icon="★" color="warning" variant="tonal" :pill="true" size="sm" />
            <JBtn icon="⚡" color="primary" variant="solid" size="sm" />
            <JBtn icon="⚙️" color="secondary" variant="outlined" size="sm" />
          </div>
        </div>
      </div>

      <!-- Button Groups & Toolbars -->
      <div class="card card-bordered">
        <div class="btn-card-header">
          <div>
            <h2 class="btn-card-title">Segmented Groups</h2>
            <p class="btn-card-subtitle">Connected button controls sharing border geometry</p>
          </div>
        </div>

        <div class="card-body p-4 d-flex flex-column gap-3">
          <div class="d-flex flex-wrap align-center gap-3">
            <div class="btn-group">
              <button class="btn btn-xs btn-tonal-neutral">Day</button>
              <button class="btn btn-xs btn-primary">Week</button>
              <button class="btn btn-xs btn-tonal-neutral">Month</button>
              <button class="btn btn-xs btn-tonal-neutral">Year</button>
            </div>

            <div class="btn-group">
              <button class="btn btn-xs btn-outlined-primary">◀ Prev</button>
              <button class="btn btn-xs btn-outlined-primary">Today</button>
              <button class="btn btn-xs btn-outlined-primary">Next ▶</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ============================================================ -->
    <!-- COMPONENT API & DOCUMENTATION TABS                           -->
    <!-- ============================================================ -->
    <div class="card card-bordered">
      <div class="btn-card-header d-flex flex-wrap align-center justify-between gap-2">
        <div class="d-flex align-center gap-2">
          <h2 class="btn-card-title">Technical Reference</h2>
        </div>

        <!-- Segmented Tab Switcher -->
        <div class="d-flex align-center p-1 rounded-full border border-subtle bg-surface-tonal">
          <button
            :class="['btn btn-sm rounded-full px-3', activeRefTab === 'props' ? 'btn-primary' : 'btn-text']"
            @click="activeRefTab = 'props'"
          >
            Vue Props
          </button>
          <button
            :class="['btn btn-sm rounded-full px-3', activeRefTab === 'classes' ? 'btn-primary' : 'btn-text']"
            @click="activeRefTab = 'classes'"
          >
            SCSS Classes
          </button>
          <button
            :class="['btn btn-sm rounded-full px-3', activeRefTab === 'recipes' ? 'btn-primary' : 'btn-text']"
            @click="activeRefTab = 'recipes'"
          >
            Recipes
          </button>
        </div>
      </div>

      <div class="card-body p-0">
        <!-- Tab 1: Vue Props -->
        <div v-if="activeRefTab === 'props'" class="table-responsive">
          <table class="table table-clean mb-0">
            <thead>
              <tr>
                <th style="width: 200px;">Prop</th>
                <th style="width: 120px;">Type</th>
                <th style="width: 100px;">Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>color</code></td>
                <td><code>String</code></td>
                <td><code>'primary'</code></td>
                <td><code>'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'</code></td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>String</code></td>
                <td><code>'solid'</code></td>
                <td><code>'solid' | 'tonal' | 'outlined' | 'text' | 'link'</code></td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>String</code></td>
                <td><code>'md'</code></td>
                <td><code>'xs' (26px) | 'sm' (32px) | 'md' (40px) | 'lg' (48px) | 'xl' (56px)</code></td>
              </tr>
              <tr>
                <td><code>pill</code></td>
                <td><code>Boolean</code></td>
                <td><code>false</code></td>
                <td>Renders 50px capsule rounded corners</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td><code>Boolean</code></td>
                <td><code>false</code></td>
                <td>Shows circular loading spinner with click events suppressed</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>Boolean</code></td>
                <td><code>false</code></td>
                <td>Applies disabled opacity and aria-disabled attributes</td>
              </tr>
              <tr>
                <td><code>prependIcon / appendIcon</code></td>
                <td><code>String</code></td>
                <td><code>''</code></td>
                <td>Leading or trailing emoji/character rendered inline</td>
              </tr>
              <tr>
                <td><code>to / href</code></td>
                <td><code>String | Object</code></td>
                <td><code>null</code></td>
                <td>Renders internal Vue router-link or external anchor tag</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tab 2: SCSS Classes -->
        <div v-else-if="activeRefTab === 'classes'" class="table-responsive">
          <table class="table table-clean mb-0">
            <thead>
              <tr>
                <th style="width: 220px;">Class</th>
                <th style="width: 140px;">Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>.btn</code></td>
                <td>Base</td>
                <td>Inline-flex container, reset styles, focus ring, smooth transition</td>
              </tr>
              <tr>
                <td><code>.btn-{size}</code></td>
                <td>Size Tier</td>
                <td><code>.btn-xs</code>, <code>.btn-sm</code>, <code>.btn-md</code>, <code>.btn-lg</code>, <code>.btn-xl</code></td>
              </tr>
              <tr>
                <td><code>.btn-{color}</code></td>
                <td>Solid Pattern</td>
                <td>Solid filled background across all semantic color tokens</td>
              </tr>
              <tr>
                <td><code>.btn-tonal-{color}</code></td>
                <td>Tonal Pattern</td>
                <td>Subtle tinted surface background with matching text color</td>
              </tr>
              <tr>
                <td><code>.btn-outlined-{color}</code></td>
                <td>Outlined</td>
                <td>1px colored border with transparent background</td>
              </tr>
              <tr>
                <td><code>.btn-pill</code></td>
                <td>Modifier</td>
                <td>Capsule rounded corners (<code>border-radius: 999px</code>)</td>
              </tr>
              <tr>
                <td><code>.btn-group</code></td>
                <td>Layout</td>
                <td>Connected button toolbar sharing outer border radius</td>
              </tr>
              <tr>
                <td><code>.is-loading</code></td>
                <td>State</td>
                <td>Displays spinning indicator and centers content</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tab 3: Recipes -->
        <div v-else-if="activeRefTab === 'recipes'" class="p-4 d-grid grid-cols-1 grid-cols-md-2 gap-3">
          <div>
            <span class="btn-label mb-2 d-block">Vue 3 Component Usage</span>
            <pre class="btn-code-box"><code>{{ snippetComponent }}</code></pre>
          </div>
          <div>
            <span class="btn-label mb-2 d-block">Vanilla SCSS HTML Markup</span>
            <pre class="btn-code-box"><code>{{ snippetVanilla }}</code></pre>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Card Header */
.btn-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.25rem;
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
}

.btn-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
}

.btn-card-subtitle {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0.15rem 0 0;
}

.btn-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

/* Preview Canvas */
.btn-preview-stage {
  padding: 2rem 1.5rem;
  border-radius: 0.5rem;
  background: var(--bg-surface-tonal);
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  min-height: 140px;
}

.btn-code-inline {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.btn-code-box {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  background: var(--bg-surface-tonal);
  border: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-secondary);
  max-height: 280px;
  overflow-y: auto;
  margin: 0;
}

/* Clean Table */
.table-clean th {
  padding: 0.875rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  background: var(--bg-surface-tonal);
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
}

.table-clean td {
  padding: 0.95rem 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  vertical-align: middle;
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.06));
}

.table-clean td code {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  background: var(--bg-surface-tonal);
}

.table-clean tr:last-child td {
  border-bottom: none;
}
</style>
