<script setup>
import { ref } from 'vue'

const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// 1. Interactive Density State
// ----------------------------------------------------------------------------
const activeDensity = ref('comfortable') // 'compact' | 'comfortable' | 'convenient'
const selectedListItem = ref(2)
const selectedDropdownItem = ref(2)

const sampleItems = [
  { id: 1, title: 'Corporate Treasury Vault', desc: 'Primary liquidity account • $1.2M', tag: 'Active', icon: '🏦', time: '2m ago' },
  { id: 2, title: 'European Merchant Payouts', desc: 'SEPA Direct Debit Gateway • €450k', tag: 'Selected', icon: '💶', time: '15m ago' },
  { id: 3, title: 'Stripe Global Settlement', desc: 'Automated 24h payout cycle', tag: 'Ready', icon: '💳', time: '1h ago' },
  { id: 4, title: 'Cross-Border FX Reserve', desc: 'Multi-currency hedging basket', tag: 'Audited', icon: '🌐', time: '3h ago' },
]

const densityOptions = [
  {
    id: 'compact',
    name: 'Compact',
    badge: 'Dense (12px)',
    padding: '0.375rem 0.75rem (6px 12px)',
    fontSize: '0.75rem (12px)',
    desc: 'Dense row height for data-heavy dashboards, logs, sidebars, and file trees.',
  },
  {
    id: 'comfortable',
    name: 'Comfortable',
    badge: 'Standard (14px)',
    padding: '0.75rem 1.0rem (12px 16px)',
    fontSize: '0.875rem (14px)',
    desc: 'Standard balanced spacing for general application feeds, settings, and tables.',
  },
  {
    id: 'convenient',
    name: 'Convenient',
    badge: 'Spacious (16px)',
    padding: '1.125rem 1.25rem (18px 20px)',
    fontSize: '1.0rem (16px)',
    desc: 'Generous touch-friendly padding for mobile devices, cards, and rich inbox views.',
  },
]

// ----------------------------------------------------------------------------
// 2. Code Recipe Snippets
// ----------------------------------------------------------------------------
const snippetListGroup = `<!-- 1. Interactive Action List Group -->
<ul class="list-group list-group-comfortable">
  <li class="list-group-item list-group-item-action active">
    <div class="d-flex align-center gap-3">
      <span>🏦</span>
      <div>
        <div class="fw-semibold">Treasury Vault</div>
        <div class="text-xs text-muted">Primary account • $1.2M</div>
      </div>
    </div>
    <span class="badge badge-success">Active</span>
  </li>
  <li class="list-group-item list-group-item-action">
    <div class="d-flex align-center gap-3">
      <span>💳</span>
      <div class="fw-semibold">Stripe Settlement</div>
    </div>
  </li>
</ul>

<!-- 2. Flush List Group -->
<ul class="list-group list-group-flush">
  <li class="list-group-item">Border-free outer edges...</li>
</ul>`

const snippetDropdown = `<!-- Dropdown Menu with Icons and Dividers -->
<div class="dropdown-menu dropdown-menu-comfortable show position-static">
  <div class="dropdown-header">Account Options</div>
  <button type="button" class="dropdown-item">
    <span>⚙️</span>
    <span>Settings</span>
  </button>
  <button type="button" class="dropdown-item active is-selected">
    <span>✓</span>
    <span>High Priority Node</span>
  </button>
  <div class="dropdown-divider"></div>
  <button type="button" class="dropdown-item text-danger">
    <span>🗑️</span>
    <span>Disconnect Account</span>
  </button>
</div>`
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>Lists & Dropdown Density Styles</h2>
        <p class="text-secondary mb-0">
          Engineered with 3 distinct padding & typography scales (<b>Compact</b>, <b>Comfortable</b>, and <b>Convenient</b>) for list groups and dropdown menus.
        </p>
      </div>
      <button class="btn btn-sm btn-tonal-primary" @click="copyToClipboard(snippetListGroup)">
        <span>📋</span> Copy List Recipe
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
    <!-- 1. INTERACTIVE DENSITY PLAYGROUND                                   -->
    <!-- =================================================================== -->
    <div class="card card-bordered">
      <div class="card-header d-flex flex-wrap align-center justify-between gap-3">
        <div class="d-flex align-center gap-2">
          <h3 class="card-title mb-0">⚡ Interactive Density Playground</h3>
          <span class="badge badge-pill badge-primary text-capitalize">{{ activeDensity }} Mode</span>
        </div>

        <!-- Density Switcher -->
        <div class="d-flex align-center p-1 rounded-full border border-subtle gap-1 bg-surface-tonal">
          <button
            v-for="d in densityOptions"
            :key="d.id"
            :class="['btn btn-xs rounded-full', activeDensity === d.id ? 'btn-primary' : 'btn-text']"
            @click="activeDensity = d.id"
          >
            {{ d.name }}
          </button>
        </div>
      </div>

      <!-- Density Information Bar -->
      <div class="p-3 border-bottom border-subtle d-flex flex-wrap align-center justify-between gap-2 bg-surface-tonal">
        <div class="d-flex flex-wrap align-center gap-3">
          <span class="text-xs text-muted font-semibold uppercase">Padding:</span>
          <code class="text-xs font-bold">{{ densityOptions.find(d => d.id === activeDensity)?.padding }}</code>
          <span class="text-xs text-muted font-semibold uppercase">Font Size:</span>
          <code class="text-xs font-bold">{{ densityOptions.find(d => d.id === activeDensity)?.fontSize }}</code>
        </div>
        <span class="text-xs text-secondary">
          {{ densityOptions.find(d => d.id === activeDensity)?.desc }}
        </span>
      </div>

      <!-- Live Switcher Grid (List + Dropdown) -->
      <div class="card-body p-4">
        <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
          <!-- Live List Group -->
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="text-xs font-bold text-muted uppercase">Interactive List Group:</span>
              <code>.list-group-{{ activeDensity }}</code>
            </div>
            <ul :class="['list-group', `list-group-${activeDensity}`]">
              <li
                v-for="item in sampleItems"
                :key="item.id"
                :class="['list-group-item list-group-item-action', { active: selectedListItem === item.id }]"
                @click="selectedListItem = item.id"
              >
                <div class="d-flex align-center gap-3 min-w-0">
                  <div class="stat-icon flex-shrink-0" style="font-size: 1.25rem;">{{ item.icon }}</div>
                  <div class="min-w-0">
                    <div class="font-semibold text-truncate">{{ item.title }}</div>
                    <div class="text-xs text-secondary text-truncate">{{ item.desc }}</div>
                  </div>
                </div>
                <div class="d-flex align-center gap-2 flex-shrink-0">
                  <span class="text-xs text-muted">{{ item.time }}</span>
                  <span :class="['badge badge-sm', selectedListItem === item.id ? 'badge-primary' : 'badge-tonal-neutral']">{{ item.tag }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Live Dropdown Menu -->
          <div>
            <div class="d-flex align-center justify-between mb-2">
              <span class="text-xs font-bold text-muted uppercase">Interactive Dropdown Menu:</span>
              <code>.dropdown-menu-{{ activeDensity }}</code>
            </div>
            <div :class="['dropdown-menu show position-static w-full shadow-none border border-subtle', `dropdown-menu-${activeDensity}`]">
              <div class="dropdown-header">Merchant Accounts</div>
              <button
                type="button"
                :class="['dropdown-item', { 'active is-selected': selectedDropdownItem === 1 }]"
                @click="selectedDropdownItem = 1"
              >
                <span>🏦</span>
                <span class="flex-1">Corporate Treasury Vault</span>
                <span v-if="selectedDropdownItem === 1">✓</span>
              </button>
              <button
                type="button"
                :class="['dropdown-item', { 'active is-selected': selectedDropdownItem === 2 }]"
                @click="selectedDropdownItem = 2"
              >
                <span>💶</span>
                <span class="flex-1">European Merchant Gateway</span>
                <span v-if="selectedDropdownItem === 2">✓</span>
              </button>
              <button
                type="button"
                :class="['dropdown-item', { 'active is-selected': selectedDropdownItem === 3 }]"
                @click="selectedDropdownItem = 3"
              >
                <span>💳</span>
                <span class="flex-1">Stripe Global Settlement</span>
                <span v-if="selectedDropdownItem === 3">✓</span>
              </button>
              <div class="dropdown-divider"></div>
              <button type="button" class="dropdown-item text-danger">
                <span>🗑️</span>
                <span class="flex-1">Disconnect Gateway</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 2. VISUAL SHOWCASE SECTIONS                                         -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="card-header px-0 pt-0 mb-4">
        <h3 class="card-title">2. Side-by-Side 3-Density Comparison</h3>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-3 gap-4">
        <!-- Style 1: Compact -->
        <div class="card card-bordered">
          <div class="card-header p-3 d-flex align-center justify-between">
            <div>
              <h5 class="card-title text-sm font-bold mb-0">1. Compact (Dense)</h5>
              <div class="text-xs text-muted mt-1"><code>pad: 6px 12px</code> • <code>font: 12px</code></div>
            </div>
            <span class="badge badge-xs badge-tonal-primary">Dense</span>
          </div>
          <ul class="list-group list-group-compact" style="border: none; border-radius: 0;">
            <li class="list-group-item list-group-item-action active">
              <span class="font-semibold text-xs">Primary Node (Active)</span>
              <span class="badge badge-xs badge-primary">99.9%</span>
            </li>
            <li class="list-group-item list-group-item-action">
              <span class="text-xs">Secondary Backup Cluster</span>
              <span class="badge badge-xs badge-tonal-neutral">Standby</span>
            </li>
            <li class="list-group-item list-group-item-action">
              <span class="text-xs">Edge Cache Region</span>
              <span class="badge badge-xs badge-tonal-neutral">Active</span>
            </li>
          </ul>
          <div class="card-footer p-2 px-3 text-xs text-muted bg-surface-tonal">
            Class: <code>.list-group-compact</code>
          </div>
        </div>

        <!-- Style 2: Comfortable -->
        <div class="card card-bordered border-primary">
          <div class="card-header p-3 d-flex align-center justify-between" style="background: var(--primary-tonal, rgba(99,102,241,0.08));">
            <div>
              <h5 class="card-title text-sm font-bold text-primary mb-0">2. Comfortable (Default)</h5>
              <div class="text-xs text-muted mt-1"><code>pad: 12px 16px</code> • <code>font: 14px</code></div>
            </div>
            <span class="badge badge-xs badge-primary">Standard</span>
          </div>
          <ul class="list-group list-group-comfortable" style="border: none; border-radius: 0;">
            <li class="list-group-item list-group-item-action active">
              <span class="font-semibold text-sm">Primary Node (Active)</span>
              <span class="badge badge-sm badge-primary">99.9%</span>
            </li>
            <li class="list-group-item list-group-item-action">
              <span class="text-sm">Secondary Backup Cluster</span>
              <span class="badge badge-sm badge-tonal-neutral">Standby</span>
            </li>
            <li class="list-group-item list-group-item-action">
              <span class="text-sm">Edge Cache Region</span>
              <span class="badge badge-sm badge-tonal-neutral">Active</span>
            </li>
          </ul>
          <div class="card-footer p-2 px-3 text-xs text-muted bg-surface-tonal">
            Class: <code>.list-group-comfortable</code>
          </div>
        </div>

        <!-- Style 3: Convenient -->
        <div class="card card-bordered">
          <div class="card-header p-3 d-flex align-center justify-between">
            <div>
              <h5 class="card-title text-sm font-bold mb-0">3. Convenient (Spacious)</h5>
              <div class="text-xs text-muted mt-1"><code>pad: 18px 20px</code> • <code>font: 16px</code></div>
            </div>
            <span class="badge badge-xs badge-tonal-warning">Spacious</span>
          </div>
          <ul class="list-group list-group-convenient" style="border: none; border-radius: 0;">
            <li class="list-group-item list-group-item-action active">
              <span class="font-semibold text-base">Primary Node (Active)</span>
              <span class="badge badge-lg badge-primary">99.9%</span>
            </li>
            <li class="list-group-item list-group-item-action">
              <span class="text-base">Secondary Backup Cluster</span>
              <span class="badge badge-lg badge-tonal-neutral">Standby</span>
            </li>
            <li class="list-group-item list-group-item-action">
              <span class="text-base">Edge Cache Region</span>
              <span class="badge badge-lg badge-tonal-neutral">Active</span>
            </li>
          </ul>
          <div class="card-footer p-2 px-3 text-xs text-muted bg-surface-tonal">
            Class: <code>.list-group-convenient</code>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 3. COPYABLE CODE RECIPES                                            -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-3">
        <h3 class="card-title text-base mb-0">📖 Copyable Code Recipes</h3>
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetListGroup)">Copy List Recipes</button>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">1. List Group Usage:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetListGroup }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">2. Dropdown Menu Usage:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetDropdown }}</code></pre>
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
          <p class="text-secondary text-sm mb-0">Master index of all list group and dropdown menu CSS classes.</p>
        </div>

        <!-- List Group SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-primary">📋</span> 1. List Group SCSS Classes
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 260px;">SCSS Class</th>
                  <th style="width: 180px;">Target</th>
                  <th>Styling Description & Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.list-group</code></td>
                  <td>Root Container</td>
                  <td>Flex column container with border radius, surface background, and overflow hidden.</td>
                </tr>
                <tr>
                  <td><code>.list-group-item</code></td>
                  <td>List Row Item</td>
                  <td>Flex row container with border-bottom divider, padding, and text styling.</td>
                </tr>
                <tr>
                  <td><code>.list-group-item-action</code></td>
                  <td>Interactive Item</td>
                  <td>Enables cursor pointer and hover background transition.</td>
                </tr>
                <tr>
                  <td><code>.list-group-flush</code></td>
                  <td>Flush Variant</td>
                  <td>Removes perimeter borders and border radius for seamless nesting inside cards.</td>
                </tr>
                <tr>
                  <td><code>.list-group-compact</code></td>
                  <td>Density Scale 1</td>
                  <td>Dense row padding (6px 12px) and 12px typography for sidebars and log feeds.</td>
                </tr>
                <tr>
                  <td><code>.list-group-comfortable</code></td>
                  <td>Density Scale 2</td>
                  <td>Balanced standard row padding (12px 16px) and 14px typography (Default).</td>
                </tr>
                <tr>
                  <td><code>.list-group-convenient</code></td>
                  <td>Density Scale 3</td>
                  <td>Generous row padding (18px 20px) and 16px typography for touch devices.</td>
                </tr>
                <tr>
                  <td><code>.active</code> / <code>.is-selected</code></td>
                  <td>Active State</td>
                  <td>Applies accent active background, 3px left active indicator line, and bold text.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Dropdown Menu SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-secondary">🔽</span> 2. Dropdown Menu SCSS Classes
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 260px;">SCSS Class</th>
                  <th style="width: 180px;">Target</th>
                  <th>Styling Description & Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.dropdown-menu</code></td>
                  <td>Menu Container</td>
                  <td>Absolute surface elevated dropdown box with shadow-lg and rounded radius.</td>
                </tr>
                <tr>
                  <td><code>.dropdown-item</code></td>
                  <td>Option Row</td>
                  <td>Interactive button item with icon alignment, hover background, and active checkmark.</td>
                </tr>
                <tr>
                  <td><code>.dropdown-header</code></td>
                  <td>Section Header</td>
                  <td>Muted uppercase section title for grouping options.</td>
                </tr>
                <tr>
                  <td><code>.dropdown-divider</code></td>
                  <td>Menu Divider</td>
                  <td>1px thin horizontal line separating option groups.</td>
                </tr>
                <tr>
                  <td><code>.dropdown-menu-compact</code></td>
                  <td>Density Scale 1</td>
                  <td>Tight 4px 9px padding and 12px font for compact table toolbars.</td>
                </tr>
                <tr>
                  <td><code>.dropdown-menu-comfortable</code></td>
                  <td>Density Scale 2</td>
                  <td>Balanced 9px 14px padding and 14px font for standard navbar dropdowns.</td>
                </tr>
                <tr>
                  <td><code>.dropdown-menu-convenient</code></td>
                  <td>Density Scale 3</td>
                  <td>Spacious 15px 22px padding and 17px font for touch interfaces and user pickers.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
