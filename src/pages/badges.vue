<script setup>
import { ref, reactive, computed } from 'vue'

const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// 1. Interactive Badge Playground State
// ----------------------------------------------------------------------------
const playground = reactive({
  label: 'Active Settlement',
  color: 'primary',
  variant: 'solid', // 'solid' | 'tonal' | 'outlined'
  size: 'md', // 'xs' | 'sm' | 'md' | 'lg'
  pill: true,
  dot: false,
})

const playgroundBadgeClass = computed(() => {
  const classes = ['badge']
  
  if (playground.variant === 'solid') {
    classes.push(`badge-${playground.color}`)
  } else if (playground.variant === 'tonal') {
    classes.push(`badge-tonal-${playground.color}`)
  } else if (playground.variant === 'outlined') {
    classes.push(`badge-outlined-${playground.color}`)
  }

  if (playground.size === 'xs') classes.push('badge-xs')
  if (playground.size === 'sm') classes.push('badge-sm')
  if (playground.size === 'lg') classes.push('badge-lg')

  if (playground.pill) classes.push('badge-pill')
  return classes.join(' ')
})

const generatedBadgeCode = computed(() => {
  if (playground.dot) {
    return `<span class="badge-dot badge-dot-${playground.size === 'lg' ? 'lg' : 'sm'} text-${playground.color}"></span>`
  }
  return `<span class="${playgroundBadgeClass.value}">${playground.label}</span>`
})

// ----------------------------------------------------------------------------
// 2. Interactive Dismissible Chips State
// ----------------------------------------------------------------------------
const chips = ref([
  { id: 1, label: 'Vue 3.5' },
  { id: 2, label: 'Vite 8' },
  { id: 3, label: 'Multi-Theme SCSS' },
  { id: 4, label: 'Transactional UI' },
  { id: 5, label: 'Accessible A11y' },
])

const removeChip = (id) => {
  chips.value = chips.value.filter((c) => c.id !== id)
}

const resetChips = () => {
  chips.value = [
    { id: 1, label: 'Vue 3.5' },
    { id: 2, label: 'Vite 8' },
    { id: 3, label: 'Multi-Theme SCSS' },
    { id: 4, label: 'Transactional UI' },
    { id: 5, label: 'Accessible A11y' },
  ]
}

// ----------------------------------------------------------------------------
// 3. Code Recipe Snippets
// ----------------------------------------------------------------------------
const snippetBadges = `<!-- Solid, Tonal & Outlined Badges -->
<span class="badge badge-primary">Primary Solid</span>
<span class="badge badge-tonal-success">Tonal Success</span>
<span class="badge badge-outlined-warning">Outlined Warning</span>

<!-- Sizing & Pill Shapes -->
<span class="badge badge-xs badge-danger badge-pill">99+</span>
<span class="badge badge-sm badge-tonal-info">Small Badge</span>
<span class="badge badge-lg badge-primary">Large Badge</span>

<!-- Status Dot Indicators -->
<span class="badge-dot text-success"></span>
<span class="badge-dot badge-dot-lg text-danger"></span>`

const snippetChips = `<!-- Interactive Dismissible Chip -->
<div class="chip">
  <span>Vue 3.5</span>
  <span class="chip-remove" @click="removeChip(id)">✕</span>
</div>`

const snippetAlerts = `<!-- Solid / Tonal Alert Callouts -->
<div class="alert alert-success">
  <div class="alert-icon">✓</div>
  <div class="alert-content">
    <div class="alert-title">Payment Settlement Complete</div>
    <p class="mb-0 text-sm">Transaction #TX-9042 successfully processed.</p>
  </div>
  <button class="alert-close">✕</button>
</div>

<!-- Outlined Alert Callout -->
<div class="alert alert-outlined-warning">
  <div class="alert-icon">⚠️</div>
  <div class="alert-content">
    <div class="alert-title">API Quota Threshold</div>
    <p class="mb-0 text-sm">Webhook reached 85% of monthly allocated quota.</p>
  </div>
</div>`
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>Badges, Status Pills, Chips & Alerts</h2>
        <p class="text-secondary mb-0">
          Compact contextual badges, live status dots, dismissible chips, and responsive notification callouts.
        </p>
      </div>
      <button class="btn btn-sm btn-tonal-primary" @click="copyToClipboard(snippetBadges)">
        <span>📋</span> Copy Badge Snippet
      </button>
    </div>

    <!-- Toast Notification on Snippet Copy -->
    <div
      v-if="copiedSnippet"
      class="alert alert-primary alert-glass shadow-lg position-fixed"
      style="bottom: 1.5rem; right: 1.5rem; z-index: 9999; max-width: 24rem;"
    >
      <div class="alert-icon">📋</div>
      <div class="alert-content">
        <div class="alert-title font-bold">Copied to Clipboard!</div>
        <div class="text-xs text-truncate"><code>{{ copiedSnippet }}</code></div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 1. INTERACTIVE BADGE PLAYGROUND                                     -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <h3 class="mb-0">⚡ Interactive Badge Playground</h3>
            <span class="badge badge-pill badge-primary">Live Reactive</span>
          </div>
          <button class="btn btn-xs btn-tonal-primary" @click="copyToClipboard(generatedBadgeCode)">Copy Active Code</button>
        </div>

        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <!-- Badge Text -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Badge Label</label>
            <input v-model="playground.label" type="text" class="form-control form-control-sm" />
          </div>

          <!-- Color -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Color Theme</label>
            <select v-model="playground.color" class="form-select form-select-sm">
              <option value="primary">primary (Indigo / Accent)</option>
              <option value="secondary">secondary (Slate)</option>
              <option value="success">success (Emerald)</option>
              <option value="warning">warning (Amber)</option>
              <option value="danger">danger (Rose)</option>
              <option value="info">info (Sky)</option>
              <option value="neutral">neutral (Elevated)</option>
            </select>
          </div>

          <!-- Variant -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Variant Pattern</label>
            <select v-model="playground.variant" class="form-select form-select-sm">
              <option value="solid">solid (Filled)</option>
              <option value="tonal">tonal (Soft / Tinted)</option>
              <option value="outlined">outlined (Border Only)</option>
            </select>
          </div>

          <!-- Size -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Size Scale</label>
            <select v-model="playground.size" class="form-select form-select-sm">
              <option value="xs">xs (Extra Small • 10px)</option>
              <option value="sm">sm (Small • 12px)</option>
              <option value="md">md (Default • 13px)</option>
              <option value="lg">lg (Large • 14px)</option>
            </select>
          </div>
        </div>

        <!-- Toggles -->
        <div class="d-flex flex-wrap align-center gap-4 text-xs">
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.pill" type="checkbox" class="form-check-input" />
            <span>Pill / Capsule Shape (<code>.badge-pill</code>)</span>
          </label>
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.dot" type="checkbox" class="form-check-input" />
            <span>Status Dot Indicator Mode (<code>.badge-dot</code>)</span>
          </label>
        </div>

        <!-- Live Preview Stage -->
        <div class="p-4 rounded-lg bg-surface border border-subtle d-flex flex-column align-center justify-center gap-3 min-h-120">
          <div>
            <span v-if="playground.dot" :class="['badge-dot', playground.size === 'lg' ? 'badge-dot-lg' : '', `text-${playground.color}`]"></span>
            <span v-else :class="playgroundBadgeClass">{{ playground.label }}</span>
          </div>
          <code class="text-xs text-muted">{{ generatedBadgeCode }}</code>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 2. VISUAL SHOWCASE SECTIONS                                         -->
    <!-- =================================================================== -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- Solid Badges -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">1. Solid Badges</h4>
          <code>.badge-{color}</code>
        </div>
        <p class="text-xs text-secondary mb-3">High-contrast solid filled badges for urgent statuses, counts, and primary tags.</p>
        <div class="d-flex flex-wrap align-center gap-2">
          <span class="badge badge-primary">Primary</span>
          <span class="badge badge-secondary">Secondary</span>
          <span class="badge badge-success">Success</span>
          <span class="badge badge-warning">Warning</span>
          <span class="badge badge-danger">Danger</span>
          <span class="badge badge-info">Info</span>
          <span class="badge badge-neutral">Neutral</span>
        </div>
      </div>

      <!-- Tonal Badges -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">2. Tonal Badges</h4>
          <code>.badge-tonal-{color}</code>
        </div>
        <p class="text-xs text-secondary mb-3">Subtle tinted background with colored text for elegant, low-glare dashboard tags.</p>
        <div class="d-flex flex-wrap align-center gap-2">
          <span class="badge badge-tonal-primary">Primary</span>
          <span class="badge badge-tonal-secondary">Secondary</span>
          <span class="badge badge-tonal-success">Success</span>
          <span class="badge badge-tonal-warning">Warning</span>
          <span class="badge badge-tonal-danger">Danger</span>
          <span class="badge badge-tonal-info">Info</span>
          <span class="badge badge-tonal-neutral">Neutral</span>
        </div>
      </div>

      <!-- Outlined Badges -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">3. Outlined Badges</h4>
          <code>.badge-outlined-{color}</code>
        </div>
        <p class="text-xs text-secondary mb-3">Transparent background with 1px structural colored border for secondary metadata.</p>
        <div class="d-flex flex-wrap align-center gap-2">
          <span class="badge badge-outlined-primary">Primary</span>
          <span class="badge badge-outlined-secondary">Secondary</span>
          <span class="badge badge-outlined-success">Success</span>
          <span class="badge badge-outlined-warning">Warning</span>
          <span class="badge badge-outlined-danger">Danger</span>
          <span class="badge badge-outlined-info">Info</span>
          <span class="badge badge-outlined-neutral">Neutral</span>
        </div>
      </div>

      <!-- Sizing Scales & Pill Badges -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">4. Sizes & Pill Shapes</h4>
          <code>.badge-xs | sm | lg | .badge-pill</code>
        </div>
        <p class="text-xs text-secondary mb-3">Scalable typography and fully rounded capsule corners for numeric badges.</p>
        <div class="d-flex flex-wrap align-center gap-3">
          <span class="badge badge-xs badge-pill badge-primary">XS Pill 99+</span>
          <span class="badge badge-sm badge-pill badge-tonal-success">SM Pill</span>
          <span class="badge badge-pill badge-warning">MD Pill Default</span>
          <span class="badge badge-lg badge-pill badge-tonal-danger">LG Pill VIP</span>
        </div>
      </div>
    </div>

    <!-- Status Dots & Interactive Chips -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- Status Dots -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">5. Status Dot Indicators</h4>
          <code>.badge-dot / .badge-dot-lg</code>
        </div>
        <p class="text-xs text-secondary mb-3">Minimalist indicator circles ideal for avatar statuses, connection health, and table rows.</p>
        <div class="d-flex flex-column gap-3">
          <div class="d-flex align-center gap-3 p-2 rounded bg-surface-tonal border border-subtle">
            <span class="badge-dot text-success"></span>
            <span class="text-xs font-semibold">Production Gateway — 99.99% Uptime</span>
          </div>
          <div class="d-flex align-center gap-3 p-2 rounded bg-surface-tonal border border-subtle">
            <span class="badge-dot text-warning"></span>
            <span class="text-xs font-semibold">Database Re-indexing (In Progress)</span>
          </div>
          <div class="d-flex align-center gap-3 p-2 rounded bg-surface-tonal border border-subtle">
            <span class="badge-dot badge-dot-lg text-danger"></span>
            <span class="text-xs font-semibold">Authentication Bridge Offline</span>
          </div>
        </div>
      </div>

      <!-- Interactive Chips -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <div>
            <h4 class="mb-0">6. Interactive Dismissible Chips</h4>
            <span class="text-xs text-secondary">Click ✕ to remove chip tags</span>
          </div>
          <button class="btn btn-xs btn-tonal-neutral" @click="resetChips">Reset Tags</button>
        </div>
        <p class="text-xs text-secondary mb-3">Touch-friendly rounded pills with hover states and dismiss triggers for multi-select filter tags.</p>
        <div class="d-flex flex-wrap gap-2">
          <div v-for="chip in chips" :key="chip.id" class="chip">
            <span>{{ chip.label }}</span>
            <span class="chip-remove" title="Remove" @click="removeChip(chip.id)">✕</span>
          </div>
          <span v-if="chips.length === 0" class="text-xs text-muted fst-italic">All chips removed. Click "Reset Tags" to restore.</span>
        </div>
      </div>
    </div>

    <!-- Alert Callouts Showcase -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-3">
        <h4 class="mb-0">7. Alert & Notification Callouts</h4>
        <code>&lt;JAlert color="..." /&gt;</code>
      </div>
      <p class="text-xs text-secondary mb-3">System banners and notification callouts with icon, title, description, and dismiss actions.</p>
      
      <div class="d-flex flex-column gap-3">
        <!-- Success Alert -->
        <JAlert
          color="success"
          title="Payment Settlement Complete"
          message="Transaction #TX-9042 successfully processed and credited to your primary liquidity pool."
          dismissible
          class="mb-0"
        />

        <!-- Warning Alert -->
        <JAlert
          color="warning"
          title="API Rate Limit Threshold"
          message="Your webhook endpoint reached 85% of monthly allocated quota. Consider scaling your plan."
          dismissible
          class="mb-0"
        />

        <!-- Danger Alert (Outlined) -->
        <JAlert
          color="danger"
          variant="outlined"
          title="Authorization Declined"
          message="Card issuer declined the transaction handshake. Contact support if the issue persists."
          dismissible
          class="mb-0"
        />
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 3. COPYABLE CODE RECIPES                                            -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-3">
        <h3 class="card-title text-base mb-0">📖 Copyable Code Recipes</h3>
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetBadges)">Copy Badge Recipes</button>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-3 gap-4">
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">1. Badges & Dots:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 220px;"><code>{{ snippetBadges }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">2. Interactive Chips:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 220px;"><code>{{ snippetChips }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">3. Alert Callouts:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 220px;"><code>{{ snippetAlerts }}</code></pre>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 4. COMPONENT API & SCSS REFERENCE                                  -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex flex-column gap-4">
        <div>
          <h3 class="mb-1">📖 Component API & SCSS Classes</h3>
          <p class="text-secondary text-sm mb-0">Master index of all Badges, Chips, and Alerts CSS classes and tokens.</p>
        </div>

        <!-- Badges SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-primary">🏷️</span> 1. Badges & Status Indicators SCSS Classes
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 280px;">SCSS Class</th>
                  <th style="width: 180px;">Target</th>
                  <th>Styling Description & Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.badge</code></td>
                  <td>Base Element</td>
                  <td>Base inline-flex container, 13px font, semibold weight, rounded corners.</td>
                </tr>
                <tr>
                  <td><code>.badge-{color}</code></td>
                  <td>Solid Variant</td>
                  <td>Solid filled background: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, <code>info</code>, <code>neutral</code>.</td>
                </tr>
                <tr>
                  <td><code>.badge-tonal-{color}</code></td>
                  <td>Tonal Variant</td>
                  <td>Tinted soft background (~12% opacity) with colored foreground text.</td>
                </tr>
                <tr>
                  <td><code>.badge-outlined-{color}</code></td>
                  <td>Outlined Variant</td>
                  <td>Transparent background with 1px colored structural perimeter border.</td>
                </tr>
                <tr>
                  <td><code>.badge-xs</code> / <code>.badge-sm</code> / <code>.badge-lg</code></td>
                  <td>Size Scales</td>
                  <td>Scales badge padding and font size: <code>xs</code> (10px), <code>sm</code> (12px), <code>lg</code> (14px).</td>
                </tr>
                <tr>
                  <td><code>.badge-pill</code></td>
                  <td>Shape Modifier</td>
                  <td>Applies full 50px pill radius (<code>$radius-full</code>) for capsule tags and counters.</td>
                </tr>
                <tr>
                  <td><code>.badge-dot</code> / <code>.badge-dot-lg</code></td>
                  <td>Status Dot</td>
                  <td>Circular indicator dot (0.5rem / 0.75rem) inheriting color from parent or utility.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Chips & Alerts SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-success">✨</span> 2. Chips & Alerts SCSS Classes
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 280px;">SCSS Class</th>
                  <th style="width: 180px;">Target</th>
                  <th>Styling Description & Behaviors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.chip</code></td>
                  <td>Chip Container</td>
                  <td>Interactive rounded capsule tag with surface elevated background and border hover highlight.</td>
                </tr>
                <tr>
                  <td><code>.chip-remove</code></td>
                  <td>Chip Close Button</td>
                  <td>Circular dismiss trigger (1rem × 1rem) with hover transition to danger color.</td>
                </tr>
                <tr>
                  <td><code>.alert</code></td>
                  <td>Alert Container</td>
                  <td>Flex container with rounded-lg radius, icon slot, and surface elevated background.</td>
                </tr>
                <tr>
                  <td><code>.alert-{color}</code></td>
                  <td>Alert Variant</td>
                  <td>Tonal surface background with contextual accent border and header colors.</td>
                </tr>
                <tr>
                  <td><code>.alert-outlined-{color}</code></td>
                  <td>Alert Outlined</td>
                  <td>Transparent background with 1px colored border and colored title.</td>
                </tr>
                <tr>
                  <td><code>.alert-icon</code> / <code>.alert-title</code> / <code>.alert-close</code></td>
                  <td>Alert Parts</td>
                  <td>Child elements for leading icon (1.25rem), bold title, and top-right dismiss button.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
