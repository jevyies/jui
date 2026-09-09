<script setup>
import { ref, reactive } from 'vue'
import JTabs from '../@core/components/JTabs.vue'

const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// 1. Interactive Playground State
// ----------------------------------------------------------------------------
const playgroundState = reactive({
  orientation: 'horizontal', // 'horizontal' | 'vertical' | 'vertical-right'
  variant: 'line', // 'line' | 'pills' | 'tonal' | 'segmented' | 'bordered' | 'card' | 'glass'
  size: 'md', // 'sm' | 'md' | 'lg'
  card: true,
  grow: false,
  animated: true,
  activeTab: 'analytics',
})

const playgroundTabs = [
  { id: 'analytics', label: 'Analytics & Traffic', icon: '📈', badge: 'Live', badgeClass: 'badge-success' },
  { id: 'security', label: 'Security & Auth', icon: '🛡️', badge: '3 Alerts', badgeClass: 'badge-danger' },
  { id: 'invoices', label: 'Billing Invoices', icon: '💳' },
  { id: 'apikeys', label: 'API & Webhooks', icon: '⚡', badge: 'v2.4', badgeClass: 'badge-tonal-primary' },
]

// ----------------------------------------------------------------------------
// 2. Dynamic Closable & Addable Tabs State
// ----------------------------------------------------------------------------
let tabCounter = 4
const dynamicTabs = ref([
  { id: 'tab-1', label: 'Dashboard.vue', icon: '📄', closable: true },
  { id: 'tab-2', label: 'UserStore.js', icon: '📦', closable: true },
  { id: 'tab-3', label: '_variables.scss', icon: '🎨', closable: true },
])
const activeDynamicTab = ref('tab-1')

const handleAddDynamicTab = () => {
  const newId = `tab-${tabCounter++}`
  dynamicTabs.value.push({
    id: newId,
    label: `Component_${tabCounter - 1}.vue`,
    icon: '✨',
    closable: true,
  })
  activeDynamicTab.value = newId
}

const handleCloseDynamicTab = (tabId) => {
  if (dynamicTabs.value.length <= 1) return
  const index = dynamicTabs.value.findIndex((t) => t.id === tabId)
  if (index !== -1) {
    dynamicTabs.value.splice(index, 1)
    if (activeDynamicTab.value === tabId) {
      const nextIndex = Math.max(0, index - 1)
      activeDynamicTab.value = dynamicTabs.value[nextIndex].id
    }
  }
}

// ----------------------------------------------------------------------------
// 3. Vertical Navigation States
// ----------------------------------------------------------------------------
const verticalAccountTab = ref('profile')
const verticalAccountTabs = [
  { id: 'profile', label: 'Profile & Identity', icon: '👤', badge: 'Verified', badgeClass: 'badge-success' },
  { id: 'security', label: 'Security & 2FA', icon: '🔒', badge: 'High', badgeClass: 'badge-tonal-primary' },
  { id: 'notifications', label: 'Notification Feeds', icon: '🔔' },
  { id: 'billing', label: 'Billing & Plan', icon: '💳' },
]

// ----------------------------------------------------------------------------
// 4. Code Recipe Snippets
// ----------------------------------------------------------------------------
const snippetHorizontal = `<script setup>
import { ref } from 'vue'
import JTabs from '@core/components/JTabs.vue'

const tabs = [
  { id: 'overview', label: 'Overview', icon: '❖' },
  { id: 'analytics', label: 'Analytics', icon: '📈', badge: 'Live', badgeClass: 'badge-success' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]
const activeTab = ref('overview')
<` + `/script>

<template>
  <JTabs
    v-model="activeTab"
    :items="tabs"
    variant="line"
    size="md"
    :card="true"
  >
    <template #overview>
      <div>Overview Content Pane</div>
    </template>
    <template #analytics>
      <div>Analytics Dashboard Pane</div>
    </template>
    <template #settings>
      <div>Settings Configuration Pane</div>
    </template>
  </JTabs>
</template>`

const snippetVertical = `<!-- Vertical Tabs Navigation -->
<JTabs
  v-model="activeTab"
  :items="accountTabs"
  orientation="vertical"
  variant="pills"
  :card="true"
>
  <template #profile>Profile Settings...</template>
  <template #security>Security Settings...</template>
</JTabs>`
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>Tabs & JTabs Component</h2>
        <p class="text-secondary mb-0">
          7 Design Variants (Line, Pills, Tonal, Segmented, Bordered, Card, Glass), horizontal/vertical orientations, and dynamic closable tabs powered by <code>&lt;JTabs /&gt;</code>.
        </p>
      </div>
      <button class="btn btn-sm btn-tonal-primary" @click="copyToClipboard(snippetHorizontal)">
        <span>📋</span> Copy JTabs Recipe
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
    <!-- 1. INTERACTIVE JTabs PLAYGROUND                                     -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4 bg-surface-elevated">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <h3 class="mb-0">⚡ Interactive JTabs Component Playground</h3>
            <span class="badge badge-pill badge-primary">Vue 3 Component</span>
          </div>
          <button class="btn btn-xs btn-tonal-primary" @click="copyToClipboard(snippetHorizontal)">Copy Code</button>
        </div>

        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <!-- Variant -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Design Variant</label>
            <select v-model="playgroundState.variant" class="form-select form-select-sm">
              <option value="line">line (Active Bottom Line)</option>
              <option value="pills">pills (Solid Active Pill)</option>
              <option value="tonal">tonal (Tinted Surface)</option>
              <option value="segmented">segmented (iOS Segmented)</option>
              <option value="bordered">bordered (Full Border Tab)</option>
              <option value="card">card (Attached Folder Tab)</option>
              <option value="glass">glass (Frosted Translucent)</option>
            </select>
          </div>

          <!-- Orientation -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Orientation</label>
            <select v-model="playgroundState.orientation" class="form-select form-select-sm">
              <option value="horizontal">horizontal (Top Nav)</option>
              <option value="vertical">vertical (Left Nav)</option>
              <option value="vertical-right">vertical-right (Right Nav)</option>
            </select>
          </div>

          <!-- Size -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Size Scale</label>
            <select v-model="playgroundState.size" class="form-select form-select-sm">
              <option value="sm">sm (Compact • 12px font)</option>
              <option value="md">md (Standard • 14px font)</option>
              <option value="lg">lg (Spacious • 16px font)</option>
            </select>
          </div>

          <!-- Features -->
          <div class="form-group mb-0 d-flex flex-column justify-center gap-1">
            <label class="d-flex align-center gap-2 cursor-pointer text-xs">
              <input v-model="playgroundState.card" type="checkbox" class="form-check-input" />
              <span>Card Frame (<code>:card="true"</code>)</span>
            </label>
            <label class="d-flex align-center gap-2 cursor-pointer text-xs">
              <input v-model="playgroundState.grow" type="checkbox" class="form-check-input" />
              <span>Full-Width Grow (<code>:grow="true"</code>)</span>
            </label>
          </div>
        </div>

        <!-- Live Preview Stage -->
        <div class="p-4 rounded-lg bg-surface border border-subtle">
          <JTabs
            v-model="playgroundState.activeTab"
            :items="playgroundTabs"
            :variant="playgroundState.variant"
            :orientation="playgroundState.orientation"
            :size="playgroundState.size"
            :card="playgroundState.card"
            :grow="playgroundState.grow"
            :animated="playgroundState.animated"
          >
            <template #analytics>
              <div class="d-flex flex-column gap-2">
                <h5 class="mb-0">📈 Real-Time Analytics Telemetry</h5>
                <p class="text-sm text-secondary mb-0">
                  Global ingestion pipeline running at <b>142,000 req/s</b> with 99.99% successful edge handshake.
                </p>
              </div>
            </template>
            <template #security>
              <div class="d-flex flex-column gap-2">
                <h5 class="mb-0">🛡️ Security & Authentication Logs</h5>
                <p class="text-sm text-secondary mb-0">
                  Enforces automated token rotation, mTLS 1.3 encryption, and IP whitelist policies.
                </p>
              </div>
            </template>
            <template #invoices>
              <div class="d-flex flex-column gap-2">
                <h5 class="mb-0">💳 Settlement & Invoices</h5>
                <p class="text-sm text-secondary mb-0">
                  Next scheduled billing cycle runs on 1st of next month. All merchant payouts up to date.
                </p>
              </div>
            </template>
            <template #apikeys>
              <div class="d-flex flex-column gap-2">
                <h5 class="mb-0">⚡ Developer API Tokens</h5>
                <p class="text-sm text-secondary mb-0">
                  Active access key <code>jui_live_pk_8892410</code> authorized with Enterprise scope.
                </p>
              </div>
            </template>
          </JTabs>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 2. VISUAL SHOWCASE SECTIONS                                         -->
    <!-- =================================================================== -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- 1. Dynamic Closable & Addable Tabs -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <div>
            <h4 class="mb-0">1. Dynamic Closable & Addable Tabs</h4>
            <p class="text-xs text-secondary mb-0">IDE-style editor tabs with ✕ close and ➕ add triggers.</p>
          </div>
          <span class="badge badge-sm badge-tonal-primary">Interactive</span>
        </div>

        <JTabs
          v-model="activeDynamicTab"
          :items="dynamicTabs"
          variant="card"
          size="sm"
          :card="true"
          :addable="true"
          @close="handleCloseDynamicTab"
          @add="handleAddDynamicTab"
        >
          <template v-for="t in dynamicTabs" :key="t.id" #[t.id]>
            <div class="p-2 text-xs">
              <span>Editing file: <b>{{ t.label }}</b> (Tab ID: <code>{{ t.id }}</code>)</span>
            </div>
          </template>
        </JTabs>
      </div>

      <!-- 2. Vertical Left Navigation -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <div>
            <h4 class="mb-0">2. Vertical Settings Navigation</h4>
            <p class="text-xs text-secondary mb-0">Sidebar layout for account settings and portals.</p>
          </div>
          <span class="badge badge-sm badge-tonal-success">Vertical</span>
        </div>

        <JTabs
          v-model="verticalAccountTab"
          :items="verticalAccountTabs"
          orientation="vertical"
          variant="pills"
          size="sm"
          :card="true"
        >
          <template #profile>
            <div class="text-xs">
              <b>Profile Details:</b> Alexandre Vance (admin@jui.dev)
            </div>
          </template>
          <template #security>
            <div class="text-xs">
              <b>Security:</b> 2FA Hardware Key (FIDO2) Enforced.
            </div>
          </template>
          <template #notifications>
            <div class="text-xs">
              <b>Feeds:</b> Real-time Slack webhooks active.
            </div>
          </template>
          <template #billing>
            <div class="text-xs">
              <b>Plan:</b> Enterprise Platinum SLA.
            </div>
          </template>
        </JTabs>
      </div>
    </div>

    <!-- 7 Variants Comparative Strip -->
    <div class="card card-bordered p-4">
      <div class="card-header px-0 pt-0 mb-3">
        <h3 class="card-title">3. The 7 Tab Design Variants</h3>
      </div>
      <div class="d-grid grid-cols-1 grid-cols-md-2 grid-cols-lg-3 gap-3">
        <div class="p-2 rounded bg-surface-tonal border border-subtle">
          <span class="text-xs font-bold text-primary">1. Line Variant:</span>
          <JTabs :items="[{ id: '1', label: 'Tab Alpha' }, { id: '2', label: 'Tab Beta' }]" variant="line" size="sm" />
        </div>
        <div class="p-2 rounded bg-surface-tonal border border-subtle">
          <span class="text-xs font-bold text-success">2. Pills Variant:</span>
          <JTabs :items="[{ id: '1', label: 'Tab Alpha' }, { id: '2', label: 'Tab Beta' }]" variant="pills" size="sm" />
        </div>
        <div class="p-2 rounded bg-surface-tonal border border-subtle">
          <span class="text-xs font-bold text-warning">3. Tonal Variant:</span>
          <JTabs :items="[{ id: '1', label: 'Tab Alpha' }, { id: '2', label: 'Tab Beta' }]" variant="tonal" size="sm" />
        </div>
        <div class="p-2 rounded bg-surface-tonal border border-subtle">
          <span class="text-xs font-bold text-info">4. Segmented Variant:</span>
          <JTabs :items="[{ id: '1', label: 'Tab Alpha' }, { id: '2', label: 'Tab Beta' }]" variant="segmented" size="sm" />
        </div>
        <div class="p-2 rounded bg-surface-tonal border border-subtle">
          <span class="text-xs font-bold text-secondary">5. Bordered Variant:</span>
          <JTabs :items="[{ id: '1', label: 'Tab Alpha' }, { id: '2', label: 'Tab Beta' }]" variant="bordered" size="sm" />
        </div>
        <div class="p-2 rounded bg-surface-tonal border border-subtle">
          <span class="text-xs font-bold text-muted">6. Card Folder Variant:</span>
          <JTabs :items="[{ id: '1', label: 'Tab Alpha' }, { id: '2', label: 'Tab Beta' }]" variant="card" size="sm" />
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 3. COPYABLE CODE RECIPES                                            -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-3">
        <h3 class="card-title text-base mb-0">📖 Copyable Code Recipes</h3>
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetHorizontal)">Copy JTabs Recipe</button>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">1. Horizontal &lt;JTabs /&gt; Component:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetHorizontal }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">2. Vertical Settings Navigation:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetVertical }}</code></pre>
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
          <p class="text-secondary text-sm mb-0">Full configuration reference and design tokens for tabs.</p>
        </div>

        <!-- JTabs Props, Events & Slots -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-primary">⚙️</span> 1. &lt;JTabs /&gt; Vue Component API
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 220px;">Prop / Event / Slot</th>
                  <th style="width: 130px;">Type</th>
                  <th style="width: 110px;">Default</th>
                  <th>Options & Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>items</code></td>
                  <td><code>Array</code></td>
                  <td><code>required</code></td>
                  <td>Tab items array: <code>[{ id, label, icon, badge, closable, disabled }]</code></td>
                </tr>
                <tr>
                  <td><code>v-model</code></td>
                  <td><code>String | Number</code></td>
                  <td><code>items[0].id</code></td>
                  <td>Active tab ID with two-way reactive binding.</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>String</code></td>
                  <td><code>'line'</code></td>
                  <td><code>'line'</code> | <code>'pills'</code> | <code>'tonal'</code> | <code>'segmented'</code> | <code>'bordered'</code> | <code>'card'</code> | <code>'glass'</code></td>
                </tr>
                <tr>
                  <td><code>orientation</code></td>
                  <td><code>String</code></td>
                  <td><code>'horizontal'</code></td>
                  <td><code>'horizontal'</code> (top) | <code>'vertical'</code> (left) | <code>'vertical-right'</code> (right)</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>String</code></td>
                  <td><code>'md'</code></td>
                  <td><code>'sm'</code> | <code>'md'</code> | <code>'lg'</code></td>
                </tr>
                <tr>
                  <td><code>card</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Wraps tab content pane in structured card container with border.</td>
                </tr>
                <tr>
                  <td><code>grow</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Expands tab buttons to fill 100% of parent width evenly.</td>
                </tr>
                <tr>
                  <td><code>closable</code> / <code>addable</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false / false</code></td>
                  <td>Shows ✕ close buttons and ➕ add button on tab bar.</td>
                </tr>
                <tr>
                  <td><code>@close</code> / <code>@add</code></td>
                  <td><code>Event</code></td>
                  <td>—</td>
                  <td>Emitted when a tab is closed <code>(tabId)</code> or added.</td>
                </tr>
                <tr>
                  <td><code>#[tabId]</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Dynamic slot matching each tab ID for pane content.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tabs SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-secondary">🎨</span> 2. Tabs SCSS Classes Reference
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 260px;">SCSS Class</th>
                  <th style="width: 180px;">Role</th>
                  <th>Styling Description & Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.tabs</code></td>
                  <td>Root Container</td>
                  <td>Flex column container holding navigation bar and content panes.</td>
                </tr>
                <tr>
                  <td><code>.tabs-horizontal</code> / <code>.tabs-vertical</code></td>
                  <td>Layout Orientations</td>
                  <td>Horizontal top bar or vertical left sidebar layout.</td>
                </tr>
                <tr>
                  <td><code>.tabs-nav</code> / <code>.tab-item</code> / <code>.tab-link</code></td>
                  <td>Nav Elements</td>
                  <td>Navigation bar flex row and individual interactive tab buttons.</td>
                </tr>
                <tr>
                  <td><code>.tabs-line</code> / <code>.tabs-pills</code> / <code>.tabs-tonal</code></td>
                  <td>Pattern Variants</td>
                  <td>Underlined indicator, solid filled pill, or soft tinted background.</td>
                </tr>
                <tr>
                  <td><code>.tabs-segmented</code> / <code>.tabs-bordered</code> / <code>.tabs-card</code></td>
                  <td>Structural Variants</td>
                  <td>iOS segmented slider, 1px bordered outline, or attached folder tabs.</td>
                </tr>
                <tr>
                  <td><code>.tabs-sm</code> / <code>.tabs-lg</code></td>
                  <td>Size Modifiers</td>
                  <td>Compact (12px font) or spacious (16px font) tab scale.</td>
                </tr>
                <tr>
                  <td><code>.tabs-grow</code> / <code>.tabs-center</code></td>
                  <td>Alignment Modifiers</td>
                  <td>Expands tabs to fill width or centers them in the container.</td>
                </tr>
                <tr>
                  <td><code>.tab-close</code> / <code>.tab-add-btn</code></td>
                  <td>Action Controls</td>
                  <td>✕ dismiss button and ➕ add new tab trigger.</td>
                </tr>
                <tr>
                  <td><code>.tabs-content</code> / <code>.tab-pane</code></td>
                  <td>Content Wrapper</td>
                  <td>Container hosting active animated tab view.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
