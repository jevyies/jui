<script setup>
import { ref, reactive, computed } from 'vue'
import JPagination from '../@core/components/JPagination.vue'

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
const playground = reactive({
  currentPage: 1,
  total: 120,
  pageSize: 10,
  size: 'md', // 'sm' | 'md' | 'lg' | 'xs' | 'xl'
  shape: 'rounded', // 'rounded' | 'pill' | 'square'
  variant: 'solid', // 'solid' | 'tonal' | 'outlined' | 'ghost' | 'glass'
  color: 'primary', // 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  attached: false,
  showFirstLast: true,
  showPrevNext: true,
  showQuickJumper: true,
  showPageSize: true,
  showTotal: true,
})

const generatedCode = computed(() => {
  const props = []
  props.push(`v-model="page"`)
  props.push(`:total="${playground.total}"`)
  if (playground.pageSize !== 10) props.push(`:page-size="${playground.pageSize}"`)
  if (playground.size !== 'md') props.push(`size="${playground.size}"`)
  if (playground.shape !== 'rounded') props.push(`shape="${playground.shape}"`)
  if (playground.variant !== 'solid') props.push(`variant="${playground.variant}"`)
  if (playground.color !== 'primary') props.push(`color="${playground.color}"`)
  if (playground.attached) props.push(`:attached="true"`)
  if (playground.showFirstLast) props.push(`:show-first-last="true"`)
  if (!playground.showPrevNext) props.push(`:show-prev-next="false"`)
  if (playground.showQuickJumper) props.push(`:show-quick-jumper="true"`)
  if (playground.showPageSize) props.push(`:show-page-size="true"`)
  if (playground.showTotal) props.push(`:show-total="true"`)

  return `<template>\n  <JPagination\n    ${props.join('\n    ')}\n  />\n</template>`
})

// ----------------------------------------------------------------------------
// 2. Mock Data for Table Demo
// ----------------------------------------------------------------------------
const pageTableDemo = ref(1)
const tablePageSize = ref(5)

const mockUsers = [
  { id: 1, name: 'Sophia Chen', role: 'Staff UI Engineer', team: 'Design Systems', status: 'Active', badge: 'badge-success' },
  { id: 2, name: 'Marcus Vance', role: 'Backend Lead', team: 'Cloud Infra', status: 'Active', badge: 'badge-success' },
  { id: 3, name: 'Elena Rostova', role: 'Principal Architect', team: 'Core Platform', status: 'In Review', badge: 'badge-warning' },
  { id: 4, name: 'Liam Gallagher', role: 'Security Ops', team: 'SecOps', status: 'Active', badge: 'badge-success' },
  { id: 5, name: 'Aria Takahashi', role: 'Product Designer', team: 'UX Labs', status: 'Active', badge: 'badge-success' },
  { id: 6, name: 'Dante Moretti', role: 'Frontend Engineer', team: 'Design Systems', status: 'Offline', badge: 'badge-neutral' },
  { id: 7, name: 'Chloe Dubois', role: 'Data Scientist', team: 'AI Intelligence', status: 'Active', badge: 'badge-success' },
  { id: 8, name: 'Zane Al-Mansoor', role: 'DevOps Specialist', team: 'Cloud Infra', status: 'Pending', badge: 'badge-info' },
]

const paginatedUsers = computed(() => {
  const start = (pageTableDemo.value - 1) * tablePageSize.value
  return mockUsers.slice(start, start + tablePageSize.value)
})

// ----------------------------------------------------------------------------
// 3. Code Recipes
// ----------------------------------------------------------------------------
const snippetStandard = `<script setup>
import { ref } from 'vue'
import JPagination from '@core/components/JPagination.vue'

const currentPage = ref(1)
<` + `/script>

<template>
  <JPagination
    v-model="currentPage"
    :total="200"
    :page-size="10"
    size="md"
    variant="tonal"
    color="primary"
  />
</template>`

const snippetTableIntegration = `<!-- Table Footer Pagination Bar with Page Size and Jumper -->
<JPagination
  v-model="page"
  v-model:page-size="pageSize"
  :total="totalRecords"
  :page-sizes="[5, 10, 20, 50]"
  :show-page-size="true"
  :show-total="true"
  :show-quick-jumper="true"
  :show-first-last="true"
  size="sm"
  variant="tonal"
  align="between"
/>`
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>Pagination & JPagination</h2>
        <p class="text-secondary mb-0">
          Responsive pagination with 3 core sizes (SM, MD, LG), 4 shapes (Rounded, Pill, Square, Attached), 5 patterns, quick jumper, and entries summary.
        </p>
      </div>
      <button class="btn btn-sm btn-tonal-primary" @click="copyToClipboard(generatedCode)">
        <span>📋</span> Copy Active Playground Code
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
        <div class="alert-title font-bold">Code Copied to Clipboard!</div>
        <div class="text-xs text-muted">Ready to paste directly into your template.</div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 1. INTERACTIVE JPagination PLAYGROUND                               -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4 bg-surface-elevated">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <h3 class="mb-0">⚡ Interactive JPagination Component Playground</h3>
            <span class="badge badge-pill badge-primary">Vue 3 Component</span>
          </div>
          <button class="btn btn-xs btn-tonal-primary" @click="copyToClipboard(generatedCode)">Copy Code</button>
        </div>

        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <!-- Total -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Total Records</label>
            <input v-model.number="playground.total" type="number" class="form-control form-control-sm" />
          </div>

          <!-- Page Size -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Page Size</label>
            <input v-model.number="playground.pageSize" type="number" class="form-control form-control-sm" />
          </div>

          <!-- Shape -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Button Shape</label>
            <select v-model="playground.shape" class="form-select form-select-sm">
              <option value="rounded">rounded (Standard)</option>
              <option value="pill">pill / circle (Circular)</option>
              <option value="square">square (Sharp Corners)</option>
            </select>
          </div>

          <!-- Variant -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Pattern Variant</label>
            <select v-model="playground.variant" class="form-select form-select-sm">
              <option value="solid">solid (Filled Active)</option>
              <option value="tonal">tonal (Soft Tinted)</option>
              <option value="outlined">outlined (Bordered)</option>
              <option value="ghost">ghost (Flat / Text)</option>
              <option value="glass">glass (Translucent)</option>
            </select>
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

          <!-- Size -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Size Scale</label>
            <select v-model="playground.size" class="form-select form-select-sm">
              <option value="sm">sm (Compact • 32px)</option>
              <option value="md">md (Standard • 38px)</option>
              <option value="lg">lg (Spacious • 44px)</option>
            </select>
          </div>
        </div>

        <!-- Toggles -->
        <div class="d-flex flex-wrap align-center gap-4 text-xs">
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.attached" type="checkbox" class="form-check-input" />
            <span>Attached Toolbar Group (<code>:attached="true"</code>)</span>
          </label>
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.showTotal" type="checkbox" class="form-check-input" />
            <span>Summary Text (<code>:show-total="true"</code>)</span>
          </label>
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.showPageSize" type="checkbox" class="form-check-input" />
            <span>Page Size Select (<code>:show-page-size="true"</code>)</span>
          </label>
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.showQuickJumper" type="checkbox" class="form-check-input" />
            <span>Quick Jumper (<code>:show-quick-jumper="true"</code>)</span>
          </label>
        </div>

        <!-- Live Preview Stage -->
        <div class="p-4 rounded-lg bg-surface border border-subtle d-flex flex-column align-center justify-center gap-3">
          <div style="width: 100%;">
            <JPagination
              v-model="playground.currentPage"
              :total="playground.total"
              :page-size="playground.pageSize"
              :size="playground.size"
              :shape="playground.shape"
              :variant="playground.variant"
              :color="playground.color"
              :attached="playground.attached"
              :show-first-last="playground.showFirstLast"
              :show-prev-next="playground.showPrevNext"
              :show-quick-jumper="playground.showQuickJumper"
              :show-page-size="playground.showPageSize"
              :show-total="playground.showTotal"
              align="between"
            />
          </div>
          <code class="text-xs text-muted pt-2 border-top border-subtle w-full text-center">
            Active Page: <b class="text-primary">{{ playground.currentPage }}</b> / {{ Math.ceil(playground.total / playground.pageSize) }} (Records {{ ((playground.currentPage - 1) * playground.pageSize) + 1 }} to {{ Math.min(playground.currentPage * playground.pageSize, playground.total) }} of {{ playground.total }})
          </code>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 2. VISUAL SHOWCASE SECTIONS                                         -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="card-header px-0 pt-0 mb-4">
        <h3 class="card-title">2. Core Shapes & Patterns Showcase</h3>
      </div>

      <div class="d-flex flex-column gap-4">
        <!-- 1. Shapes -->
        <div class="d-flex flex-column gap-2">
          <div class="d-flex align-center justify-between">
            <span class="text-xs font-semibold text-muted uppercase">1. Shape Variations (Rounded, Pill, Square, Attached)</span>
            <code>shape="rounded" | "pill" | "square" | :attached="true"</code>
          </div>
          <div class="d-flex flex-column gap-3">
            <div class="d-flex flex-wrap align-center justify-between gap-2 p-2 rounded bg-surface-tonal border border-subtle">
              <span class="text-xs font-bold text-muted">Rounded (Default):</span>
              <JPagination :total="50" :page-size="10" shape="rounded" size="sm" />
            </div>
            <div class="d-flex flex-wrap align-center justify-between gap-2 p-2 rounded bg-surface-tonal border border-subtle">
              <span class="text-xs font-bold text-muted">Pill / Circular:</span>
              <JPagination :total="50" :page-size="10" shape="pill" variant="tonal" color="success" size="sm" />
            </div>
            <div class="d-flex flex-wrap align-center justify-between gap-2 p-2 rounded bg-surface-tonal border border-subtle">
              <span class="text-xs font-bold text-muted">Attached Group:</span>
              <JPagination :total="50" :page-size="10" :attached="true" variant="outlined" color="primary" size="sm" />
            </div>
          </div>
        </div>

        <hr class="hr-thin" />

        <!-- 2. Table Footer Integration Demo -->
        <div>
          <div class="d-flex align-center justify-between mb-3">
            <div>
              <h4 class="card-title text-sm mb-0">3. Live Data Table Integration Demo</h4>
              <p class="text-xs text-secondary mb-0">Seamlessly docks into data table headers and footers.</p>
            </div>
            <span class="badge badge-sm badge-tonal-primary">Interactive Footer</span>
          </div>

          <div class="table-responsive rounded-lg border border-subtle">
            <table class="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th style="width: 3rem;">#</th>
                  <th>Team Member</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id">
                  <td class="text-muted text-xs font-mono">{{ user.id }}</td>
                  <td class="font-bold">{{ user.name }}</td>
                  <td class="text-secondary text-xs">{{ user.role }}</td>
                  <td><span class="badge badge-tonal-neutral">{{ user.team }}</span></td>
                  <td><span class="badge badge-pill" :class="user.badge">{{ user.status }}</span></td>
                </tr>
              </tbody>
            </table>

            <!-- Table Footer Pagination Bar -->
            <div class="p-3 bg-surface-elevated border-top border-subtle">
              <JPagination
                v-model="pageTableDemo"
                v-model:page-size="tablePageSize"
                :total="mockUsers.length"
                :page-sizes="[5, 10, 20]"
                :show-page-size="true"
                :show-total="true"
                :show-quick-jumper="true"
                :show-first-last="true"
                size="sm"
                align="between"
              />
            </div>
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
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetStandard)">Copy JPagination Recipe</button>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">1. Standard &lt;JPagination /&gt; Component:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetStandard }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">2. Integrated Table Footer Layout:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetTableIntegration }}</code></pre>
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
          <p class="text-secondary text-sm mb-0">Full configuration reference and design tokens for pagination.</p>
        </div>

        <!-- JPagination Props, Events & Slots -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-primary">⚙️</span> 1. &lt;JPagination /&gt; Vue Component API
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
                  <td><code>v-model</code></td>
                  <td><code>Number</code></td>
                  <td><code>1</code></td>
                  <td>Active page number (1-based index).</td>
                </tr>
                <tr>
                  <td><code>total</code></td>
                  <td><code>Number</code></td>
                  <td><code>0</code></td>
                  <td>Total record count across the entire dataset.</td>
                </tr>
                <tr>
                  <td><code>pageSize</code></td>
                  <td><code>Number</code></td>
                  <td><code>10</code></td>
                  <td>Records per page (supports <code>v-model:pageSize</code>).</td>
                </tr>
                <tr>
                  <td><code>pageSizes</code></td>
                  <td><code>Array</code></td>
                  <td><code>[10, 20, 50]</code></td>
                  <td>Available page size options for rows-per-page dropdown.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>String</code></td>
                  <td><code>'md'</code></td>
                  <td><code>'sm'</code> (32px) | <code>'md'</code> (38px) | <code>'lg'</code> (44px)</td>
                </tr>
                <tr>
                  <td><code>shape</code></td>
                  <td><code>String</code></td>
                  <td><code>'rounded'</code></td>
                  <td><code>'rounded'</code> | <code>'pill'</code> | <code>'circle'</code> | <code>'square'</code></td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>String</code></td>
                  <td><code>'solid'</code></td>
                  <td><code>'solid'</code> | <code>'tonal'</code> | <code>'outlined'</code> | <code>'ghost'</code> | <code>'glass'</code></td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>String</code></td>
                  <td><code>'primary'</code></td>
                  <td>Theme accent color: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>warning</code>, etc.</td>
                </tr>
                <tr>
                  <td><code>attached</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Seamlessly joins buttons into a connected toolbar group.</td>
                </tr>
                <tr>
                  <td><code>showTotal</code> / <code>showPageSize</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Enables summary entries text and rows-per-page dropdown.</td>
                </tr>
                <tr>
                  <td><code>showQuickJumper</code> / <code>showFirstLast</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Enables quick page number jump input and « / » first/last buttons.</td>
                </tr>
                <tr>
                  <td><code>@change</code></td>
                  <td><code>Event</code></td>
                  <td>—</td>
                  <td>Emits <code>(page: number)</code> when active page changes.</td>
                </tr>
                <tr>
                  <td><code>#total</code> / <code>#prev</code> / <code>#next</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Custom template slots for summary and directional icons.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-secondary">🎨</span> 2. Pagination SCSS Classes Reference
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
                  <td><code>.pagination-container</code> / <code>.j-pagination</code></td>
                  <td>Root Container</td>
                  <td>Flex container wrapping page list, summary info, and quick jumper.</td>
                </tr>
                <tr>
                  <td><code>.pagination</code></td>
                  <td>Button List</td>
                  <td>Inline-flex unstyled list holding numbered pagination buttons.</td>
                </tr>
                <tr>
                  <td><code>.pagination-btn</code> / <code>.pagination-link</code></td>
                  <td>Button Item</td>
                  <td>Interactive square/rounded button item with hover and active states.</td>
                </tr>
                <tr>
                  <td><code>.pagination-ellipsis</code></td>
                  <td>Ellipsis Separator</td>
                  <td>Disabled ellipsis indicator (<code>...</code>) for large page ranges.</td>
                </tr>
                <tr>
                  <td><code>.pagination-sm</code> / <code>.pagination-lg</code></td>
                  <td>Size Modifiers</td>
                  <td>Compact (32px) or spacious (44px) item dimensions and typography.</td>
                </tr>
                <tr>
                  <td><code>.pagination-pill</code> / <code>.pagination-circle</code></td>
                  <td>Pill / Circle Shape</td>
                  <td>Fully rounded circular buttons (<code>border-radius: 50%</code>).</td>
                </tr>
                <tr>
                  <td><code>.pagination-attached</code></td>
                  <td>Attached Toolbar</td>
                  <td>Connected button group with shared borders and flat edges.</td>
                </tr>
                <tr>
                  <td><code>.pagination-solid-{color}</code></td>
                  <td>Solid Pattern</td>
                  <td>Solid filled background on active selected button.</td>
                </tr>
                <tr>
                  <td><code>.pagination-tonal-{color}</code></td>
                  <td>Tonal Pattern</td>
                  <td>Soft tinted background on active selected button.</td>
                </tr>
                <tr>
                  <td><code>.pagination-total</code> / <code>.pagination-jumper</code></td>
                  <td>Helper Controls</td>
                  <td>Summary text and quick page number input box containers.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
