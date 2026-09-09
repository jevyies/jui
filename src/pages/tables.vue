<script setup>
import { ref, computed } from 'vue'
import JDataTable from '../@core/components/JDataTable.vue'

const activeTab = ref('all')
const activeApiSubTab = ref('props')
const copiedSnippet = ref('')

const tableSnippet1 = `<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alex Vance</td>
        <td>Architect</td>
        <td><span class="badge badge-success">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>`

const dataTableSnippet = `<script setup>
import JDataTable from '@core/components/JDataTable.vue'

const columns = [
  { key: 'name', label: 'User Name', sortable: true },
  { key: 'role', label: 'Access Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
]
<` + `/script>

<template>
  <JDataTable
    :columns="columns"
    :items="items"
    title="Accounts Table"
    :selectable="true"
    :expandable="true"
    :paginated="true"
    :page-size="10"
    :page-sizes="[5, 10, 20, 50]"
    pagination-variant="tonal"
    pagination-color="primary"
  >
    <template #cell-status="{ item }">
      <span class="badge badge-success">{{ item.status }}</span>
    </template>
  </JDataTable>
</template>`

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// Simple Table Mock Data
// ----------------------------------------------------------------------------
const simpleTableUsers = [
  { id: 'USR-101', name: 'Alex Vance', role: 'Lead Architect', email: 'alex@jui.dev', status: 'Active', statusClass: 'badge-success', spent: '$14,200', progress: 85 },
  { id: 'USR-102', name: 'Elena Rostova', role: 'Security Ops', email: 'elena@jui.dev', status: 'Pending', statusClass: 'badge-warning', spent: '$8,940', progress: 62 },
  { id: 'USR-103', name: 'Marcus Sterling', role: 'Frontend Lead', email: 'marcus@jui.dev', status: 'Active', statusClass: 'badge-success', spent: '$22,500', progress: 94 },
  { id: 'USR-104', name: 'Sarah Chen', role: 'Data Scientist', email: 'sarah@jui.dev', status: 'Inactive', statusClass: 'badge-neutral', spent: '$4,320', progress: 38 },
  { id: 'USR-105', name: 'David Kim', role: 'DevOps Engineer', email: 'david@jui.dev', status: 'Suspended', statusClass: 'badge-danger', spent: '$1,150', progress: 15 },
]

// ----------------------------------------------------------------------------
// Advanced Enterprise DataTable Mock Data (20 records)
// ----------------------------------------------------------------------------
const dataTableColumns = [
  { key: 'user', label: 'User & Identity', sortable: true, width: '18rem', align: 'center' },
  { key: 'role', label: 'Access Role', sortable: true, align: 'center' },
  { key: 'status', label: 'Account Status', sortable: true, align: 'center' },
  { key: 'plan', label: 'Subscription', sortable: true, align: 'center' },
  { key: 'billing', label: 'Total Billed', sortable: true, align: 'right' },
  { key: 'activity', label: 'Last Active', sortable: true, align: 'center' },
]

const initialDataRecords = [
  {
    id: 1,
    name: 'Alexandre Vance',
    handle: '@alexvance',
    avatar: '👨‍💻',
    email: 'alex.vance@jui.dev',
    role: 'Enterprise Admin',
    status: 'Active',
    plan: 'Platinum SLA',
    billing: 14200.00,
    activity: '2 mins ago',
    location: 'San Francisco, CA',
    department: 'Engineering Infrastructure',
    phone: '+1 (415) 890-4242',
    joinDate: 'Jan 14, 2024',
    ipAddress: '192.168.1.104',
    twoFactor: true,
  },
  {
    id: 2,
    name: 'Elena Rostova',
    handle: '@erostova',
    avatar: '👩‍🔬',
    email: 'elena.rostova@jui.dev',
    role: 'Security Engineer',
    status: 'Active',
    plan: 'Enterprise Pro',
    billing: 9450.50,
    activity: '14 mins ago',
    location: 'Berlin, DE',
    department: 'Cyber Defense & Compliance',
    phone: '+49 30 901820',
    joinDate: 'Feb 22, 2024',
    ipAddress: '10.0.4.19',
    twoFactor: true,
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    handle: '@msterling',
    avatar: '👨‍🎨',
    email: 'marcus.s@jui.dev',
    role: 'Product Designer',
    status: 'Active',
    plan: 'Team Tier',
    billing: 4800.00,
    activity: '1 hour ago',
    location: 'London, UK',
    department: 'UI/UX Design Systems',
    phone: '+44 20 7946 0912',
    joinDate: 'Mar 08, 2024',
    ipAddress: '172.16.254.1',
    twoFactor: false,
  },
  {
    id: 4,
    name: 'Sarah Chen',
    handle: '@sarahchen',
    avatar: '👩‍💼',
    email: 'sarah.chen@jui.dev',
    role: 'Financial Analyst',
    status: 'Pending',
    plan: 'Enterprise Pro',
    billing: 18750.00,
    activity: '4 hours ago',
    location: 'Singapore, SG',
    department: 'Treasury & Liquidity',
    phone: '+65 6789 0123',
    joinDate: 'Apr 02, 2024',
    ipAddress: '10.8.0.44',
    twoFactor: true,
  },
  {
    id: 5,
    name: 'David Thorne',
    handle: '@dthorne',
    avatar: '👨‍🚀',
    email: 'david.thorne@jui.dev',
    role: 'Cloud Architect',
    status: 'Active',
    plan: 'Platinum SLA',
    billing: 32400.00,
    activity: 'Yesterday',
    location: 'Austin, TX',
    department: 'Distributed Systems',
    phone: '+1 (512) 440-9921',
    joinDate: 'Nov 12, 2023',
    ipAddress: '192.168.10.82',
    twoFactor: true,
  },
  {
    id: 6,
    name: 'Maya Lin',
    handle: '@mayalin',
    avatar: '👩‍💻',
    email: 'maya.lin@jui.dev',
    role: 'Frontend Dev',
    status: 'Active',
    plan: 'Team Tier',
    billing: 3200.00,
    activity: '3 days ago',
    location: 'Toronto, CA',
    department: 'Web Applications',
    phone: '+1 (416) 555-0199',
    joinDate: 'May 19, 2024',
    ipAddress: '10.0.12.5',
    twoFactor: false,
  },
  {
    id: 7,
    name: 'Viktor Reznov',
    handle: '@vreznov',
    avatar: '👨‍🚒',
    email: 'viktor.r@jui.dev',
    role: 'Database Admin',
    status: 'Suspended',
    plan: 'Starter Plan',
    billing: 850.00,
    activity: '1 week ago',
    location: 'Prague, CZ',
    department: 'Relational & Key-Value DBs',
    phone: '+420 221 890 123',
    joinDate: 'Aug 30, 2023',
    ipAddress: '192.168.0.14',
    twoFactor: false,
  },
  {
    id: 8,
    name: 'Chloe Bennett',
    handle: '@cbennett',
    avatar: '👩‍🎨',
    email: 'chloe.b@jui.dev',
    role: 'Marketing Lead',
    status: 'Inactive',
    plan: 'Starter Plan',
    billing: 1200.00,
    activity: '2 weeks ago',
    location: 'Sydney, AU',
    department: 'Growth Marketing',
    phone: '+61 2 9876 5432',
    joinDate: 'Jun 15, 2024',
    ipAddress: '172.20.10.3',
    twoFactor: true,
  },
]

const dataRecords = ref([...initialDataRecords])
const selectedUserIds = ref([])
const statusFilter = ref('All')
const isTableLoading = ref(false)

// Filtered Records based on status
const computedDataRecords = computed(() => {
  if (statusFilter.value === 'All') return dataRecords.value
  return dataRecords.value.filter((r) => r.status === statusFilter.value)
})

// Batch Action Handlers
const handleBatchDelete = (ids) => {
  dataRecords.value = dataRecords.value.filter((r) => !ids.includes(r.id))
  selectedUserIds.value = []
}

const handleBatchExport = (ids) => {
  const selected = dataRecords.value.filter((r) => ids.includes(r.id))
  const jsonContent = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selected, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', jsonContent)
  downloadAnchor.setAttribute('download', 'exported_users.json')
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

const toggleUserStatus = (user) => {
  user.status = user.status === 'Active' ? 'Inactive' : 'Active'
}

const deleteSingleUser = (userId) => {
  dataRecords.value = dataRecords.value.filter((r) => r.id !== userId)
}

const reloadSampleData = () => {
  isTableLoading.value = true
  setTimeout(() => {
    dataRecords.value = [...initialDataRecords]
    isTableLoading.value = false
  }, 400)
}
</script>

<template>
  <div class="d-flex flex-column gap-4 gap-md-5 w-full">

    <!-- ============================================================ -->
    <!-- HEADER & VIEW SWITCHER                                       -->
    <!-- ============================================================ -->
    <header class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h1 class="font-bold mb-1" style="font-size: 1.5rem; letter-spacing: -0.02em;">Tables & DataTables</h1>
        <p class="text-secondary text-sm mb-0">
          Clean semantic data tables with sorting, searching, selection, expandable sub-rows, and pagination.
        </p>
      </div>

      <!-- Segmented View Switcher -->
      <div class="d-flex align-center p-1 rounded-full border border-subtle bg-surface-tonal">
        <button
          v-for="t in [
            { id: 'all', label: 'All' },
            { id: 'datatable', label: 'DataTable' },
            { id: 'simple', label: 'HTML5 Styles' },
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

    <!-- ============================================================ -->
    <!-- 1. ENTERPRISE INTERACTIVE DATATABLE                          -->
    <!-- ============================================================ -->
    <section v-if="activeTab === 'all' || activeTab === 'datatable'" class="d-flex flex-column gap-3">
      <div class="d-flex flex-wrap align-center justify-between gap-2">
        <div class="d-flex align-center gap-2">
          <h2 class="tbl-section-title mb-0">Interactive DataTable</h2>
        </div>

        <!-- Status Filter Pills -->
        <div class="d-flex align-center gap-1">
          <span class="text-xs text-muted me-1">Status:</span>
          <button
            v-for="st in ['All', 'Active', 'Pending', 'Inactive', 'Suspended']"
            :key="st"
            :class="['btn btn-xs rounded-full px-2.5', statusFilter === st ? 'btn-primary' : 'btn-tonal-neutral']"
            @click="statusFilter = st"
          >
            {{ st }}
          </button>
        </div>
      </div>

      <!-- Advanced JDataTable Instance -->
      <JDataTable
        :columns="dataTableColumns"
        :items="computedDataRecords"
        title="Accounts & Subscriptions"
        subtitle="Manage user permissions, license tiers, real-time activity and monthly billings."
        :selectable="true"
        :expandable="true"
        :paginated="true"
        :pageSize="5"
        :pageSizes="[5, 10, 20]"
        :hoverable="true"
        :bordered="true"
        :loading="isTableLoading"
        @delete:batch="handleBatchDelete"
        @export:batch="handleBatchExport"
      >
        <!-- Custom Toolbar Actions -->
        <template #toolbar-actions>
          <button class="btn btn-xs btn-outlined-neutral" title="Reload Mock Data" @click="reloadSampleData">
            <span>🔄</span> Reset Data
          </button>
          <button class="btn btn-xs btn-primary">
            <span>➕</span> Add Account
          </button>
        </template>

        <!-- Custom User Column -->
        <template #cell-user="{ item }">
          <div class="d-flex align-center gap-3">
            <div
              class="rounded-circle d-flex align-center justify-center font-bold"
              style="width: 2.25rem; height: 2.25rem; background: var(--bg-surface-tonal); font-size: 1.15rem; border: 1px solid var(--border-color-subtle);"
            >
              {{ item.avatar }}
            </div>
            <div>
              <div class="font-bold text-sm text-primary">{{ item.name }}</div>
              <div class="text-xs text-muted">{{ item.email }}</div>
            </div>
          </div>
        </template>

        <!-- Custom Role Column -->
        <template #cell-role="{ item }">
          <div class="d-flex flex-column">
            <span class="font-semibold text-xs text-primary">{{ item.role }}</span>
            <span class="text-xs text-muted">{{ item.department }}</span>
          </div>
        </template>

        <!-- Custom Account Status Column -->
        <template #cell-status="{ item }">
          <span :class="[
            'badge badge-pill',
            item.status === 'Active'
              ? 'badge-success'
              : item.status === 'Pending'
                ? 'badge-warning'
                : item.status === 'Suspended'
                  ? 'badge-danger'
                  : 'badge-neutral',
          ]">
            {{ item.status }}
          </span>
        </template>

        <!-- Custom Subscription Plan Column -->
        <template #cell-plan="{ item }">
          <span class="badge badge-tonal-primary font-mono text-xs">{{ item.plan }}</span>
        </template>

        <!-- Custom Billed Amount Column -->
        <template #cell-billing="{ item }">
          <span class="font-mono font-bold text-sm" style="color: var(--primary);">
            ${{ item.billing.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </span>
        </template>

        <!-- Custom Last Active Column -->
        <template #cell-activity="{ item }">
          <div class="d-flex align-center gap-1.5 text-xs text-secondary">
            <span
              style="width: 6px; height: 6px; border-radius: 50%;"
              :style="{ background: item.status === 'Active' ? 'var(--success, #10b981)' : 'var(--text-muted)' }"
            ></span>
            <span>{{ item.activity }}</span>
          </div>
        </template>

        <!-- Custom Actions Column -->
        <template #actions="{ item }">
          <div class="d-flex align-center justify-end gap-1">
            <button class="btn btn-xs btn-tonal-neutral" title="Toggle Account Status" @click="toggleUserStatus(item)">
              {{ item.status === 'Active' ? '⏸️' : '▶️' }}
            </button>
            <button class="btn btn-xs btn-tonal-danger" title="Delete Account" @click="deleteSingleUser(item.id)">
              🗑️
            </button>
          </div>
        </template>

        <!-- Expandable Row Accordion Content -->
        <template #expanded="{ item }">
          <div class="d-flex flex-column gap-3 p-1">
            <div class="d-flex align-center justify-between">
              <span class="text-xs font-bold text-muted uppercase">Security & Metadata Audit</span>
              <span class="badge badge-xs badge-tonal-neutral font-mono">UUID: #USR-2026-{{ item.id }}</span>
            </div>
            <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3">
              <div class="p-3 rounded bg-surface border border-subtle">
                <div class="text-xs text-muted">Office Location</div>
                <div class="font-semibold text-xs mt-1 text-primary">📍 {{ item.location }}</div>
              </div>
              <div class="p-3 rounded bg-surface border border-subtle">
                <div class="text-xs text-muted">Phone Number</div>
                <div class="font-semibold text-xs mt-1 text-primary">📞 {{ item.phone }}</div>
              </div>
              <div class="p-3 rounded bg-surface border border-subtle">
                <div class="text-xs text-muted">2-Factor Auth</div>
                <div class="font-semibold text-xs mt-1" :class="item.twoFactor ? 'text-success' : 'text-danger'">
                  {{ item.twoFactor ? '🛡️ Enabled' : '⚠️ Disabled' }}
                </div>
              </div>
              <div class="p-3 rounded bg-surface border border-subtle">
                <div class="text-xs text-muted">Last Known IP</div>
                <div class="font-mono font-semibold text-xs mt-1 text-primary">🌐 {{ item.ipAddress }}</div>
              </div>
            </div>
          </div>
        </template>
      </JDataTable>
    </section>

    <!-- ============================================================ -->
    <!-- 2. HTML5 TABLES MATRIX                                       -->
    <!-- ============================================================ -->
    <section v-if="activeTab === 'all' || activeTab === 'simple'" class="d-flex flex-column gap-4">
      <div>
        <h2 class="tbl-section-title mb-1">HTML5 Tables Matrix</h2>
        <p class="text-secondary text-sm mb-0">Clean semantic markup with zebra striping, borders, and contextual rows.</p>
      </div>

      <!-- Striped & Hoverable Table -->
      <div class="card card-bordered">
        <div class="tbl-card-header">
          <div>
            <h3 class="tbl-card-title">1. Striped & Hoverable Table</h3>
            <p class="tbl-card-subtitle">Classes: <code>.table .table-striped .table-hover</code></p>
          </div>
          <button class="btn btn-xs btn-tonal-neutral" @click="copyToClipboard(tableSnippet1)">Copy HTML</button>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive" style="border: 0; border-radius: 0;">
            <table class="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Spent</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in simpleTableUsers" :key="u.id">
                  <td>
                    <div class="font-bold text-sm text-primary">{{ u.name }}</div>
                    <div class="text-xs text-muted">{{ u.email }}</div>
                  </td>
                  <td class="text-sm font-medium">{{ u.role }}</td>
                  <td>
                    <span :class="['badge badge-pill', u.statusClass]">{{ u.status }}</span>
                  </td>
                  <td class="font-mono font-bold text-sm text-primary">{{ u.spent }}</td>
                  <td style="width: 10rem;">
                    <div class="d-flex align-center gap-2">
                      <div class="progress flex-1" style="height: 6px;">
                        <div class="progress-bar bg-primary" :style="{ width: `${u.progress}%` }"></div>
                      </div>
                      <span class="text-xs text-muted font-mono">{{ u.progress }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Bordered & Borderless Grid -->
      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <!-- Bordered Grid -->
        <div class="card card-bordered">
          <div class="tbl-card-header">
            <div>
              <h3 class="tbl-card-title">2. Bordered Grid</h3>
              <p class="tbl-card-subtitle">Class: <code>.table-bordered</code></p>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive" style="border: 0; border-radius: 0;">
              <table class="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product</th>
                    <th>Stock</th>
                    <th class="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-mono text-xs">SKU-9021</td>
                    <td class="font-semibold text-sm">Titanium Key</td>
                    <td><span class="badge badge-xs badge-success">In Stock</span></td>
                    <td class="font-mono text-sm text-end">$89.00</td>
                  </tr>
                  <tr>
                    <td class="font-mono text-xs">SKU-9022</td>
                    <td class="font-semibold text-sm">Glass Bridge</td>
                    <td><span class="badge badge-xs badge-warning">12 Left</span></td>
                    <td class="font-mono text-sm text-end">$240.00</td>
                  </tr>
                  <tr>
                    <td class="font-mono text-xs">SKU-9023</td>
                    <td class="font-semibold text-sm">Matrix Router</td>
                    <td><span class="badge badge-xs badge-danger">Out of Stock</span></td>
                    <td class="font-mono text-sm text-end">$1,450.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Borderless Minimal -->
        <div class="card card-bordered">
          <div class="tbl-card-header">
            <div>
              <h3 class="tbl-card-title">3. Borderless Minimal Table</h3>
              <p class="tbl-card-subtitle">Class: <code>.table-borderless</code></p>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive" style="border: 0; border-radius: 0;">
              <table class="table table-borderless mb-0">
                <thead>
                  <tr>
                    <th>Ledger Item</th>
                    <th>Status</th>
                    <th class="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="font-semibold text-sm">SaaS Cloud Billing</div>
                      <div class="text-xs text-muted">Monthly auto-debit</div>
                    </td>
                    <td><span class="badge badge-xs badge-success">Settled</span></td>
                    <td class="font-mono text-end font-bold text-sm text-primary">$1,200.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="font-semibold text-sm">Developer Seat Addons</div>
                      <div class="text-xs text-muted">5 x $40/mo</div>
                    </td>
                    <td><span class="badge badge-xs badge-success">Settled</span></td>
                    <td class="font-mono text-end font-bold text-sm text-primary">$200.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="font-semibold text-sm">Overrage Bandwidth</div>
                      <div class="text-xs text-muted">14 TB CDN Transfer</div>
                    </td>
                    <td><span class="badge badge-xs badge-warning">Pending</span></td>
                    <td class="font-mono text-end font-bold text-sm text-warning">$84.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Density & Contextual Highlights -->
      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <!-- Compact Density Table -->
        <div class="card card-bordered">
          <div class="tbl-card-header">
            <div>
              <h3 class="tbl-card-title">4. Compact Density</h3>
              <p class="tbl-card-subtitle">Classes: <code>.table-compact</code> or <code>.table-sm</code></p>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive" style="border: 0; border-radius: 0;">
              <table class="table table-compact table-hover mb-0">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Delta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>API Latency (p99)</td>
                    <td class="font-mono font-bold text-primary">18ms</td>
                    <td><span class="text-success text-xs">▼ -4ms</span></td>
                  </tr>
                  <tr>
                    <td>Cache Hit Ratio</td>
                    <td class="font-mono font-bold text-primary">99.4%</td>
                    <td><span class="text-success text-xs">▲ +0.2%</span></td>
                  </tr>
                  <tr>
                    <td>Active TCP Sockets</td>
                    <td class="font-mono font-bold text-primary">42,890</td>
                    <td><span class="text-danger text-xs">▲ +1,420</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Contextual Row Highlights -->
        <div class="card card-bordered">
          <div class="tbl-card-header">
            <div>
              <h3 class="tbl-card-title">5. Contextual Highlights</h3>
              <p class="tbl-card-subtitle">Classes: <code>.table-row-selected</code>, <code>.table-row-success</code>, <code>.table-row-danger</code></p>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive" style="border: 0; border-radius: 0;">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Event Description</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-row-selected">
                    <td><span class="badge badge-xs badge-primary">Selected</span></td>
                    <td class="text-xs font-semibold">Row highlighted via cursor selection</td>
                    <td class="text-xs font-mono">Now</td>
                  </tr>
                  <tr class="table-row-success">
                    <td><span class="badge badge-xs badge-success">Success</span></td>
                    <td class="text-xs font-semibold">Payment batch cleared without anomalies</td>
                    <td class="text-xs font-mono">1m ago</td>
                  </tr>
                  <tr class="table-row-danger">
                    <td><span class="badge badge-xs badge-danger">Danger</span></td>
                    <td class="text-xs font-semibold">Failed login attempt limit exceeded</td>
                    <td class="text-xs font-mono">1h ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 3. COMPONENT API & RECIPES                                   -->
    <!-- ============================================================ -->
    <section v-if="activeTab === 'all' || activeTab === 'api'" class="d-flex flex-column gap-4">
      <div class="card card-bordered">
        <div class="tbl-card-header d-flex flex-wrap align-center justify-between gap-2">
          <div>
            <h2 class="tbl-card-title">Technical Reference</h2>
            <p class="tbl-card-subtitle">Configuration props, options, and copyable snippets for <code>&lt;JDataTable /&gt;</code></p>
          </div>

          <!-- Sub Tab Switcher -->
          <div class="d-flex align-center p-1 rounded-full border border-subtle bg-surface-tonal">
            <button
              :class="['btn btn-sm rounded-full px-3', activeApiSubTab === 'props' ? 'btn-primary' : 'btn-text']"
              @click="activeApiSubTab = 'props'"
            >
              Component Props
            </button>
            <button
              :class="['btn btn-sm rounded-full px-3', activeApiSubTab === 'recipes' ? 'btn-primary' : 'btn-text']"
              @click="activeApiSubTab = 'recipes'"
            >
              Code Recipes
            </button>
          </div>
        </div>

        <div class="card-body p-0">
          <!-- Props Table -->
          <div v-if="activeApiSubTab === 'props'" class="table-responsive">
            <table class="table table-clean mb-0">
              <thead>
                <tr>
                  <th style="width: 220px;">Prop / Option</th>
                  <th style="width: 140px;">Type</th>
                  <th style="width: 110px;">Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>columns</code></td>
                  <td><code>Array</code></td>
                  <td><code>required</code></td>
                  <td>Column definitions: <code>[{ key, label, sortable, width, align, hidden }]</code></td>
                </tr>
                <tr>
                  <td><code>items</code></td>
                  <td><code>Array</code></td>
                  <td><code>required</code></td>
                  <td>Array of record objects to display in the table</td>
                </tr>
                <tr>
                  <td><code>itemKey</code></td>
                  <td><code>String</code></td>
                  <td><code>'id'</code></td>
                  <td>Unique record key for selection tracking and row rendering</td>
                </tr>
                <tr>
                  <td><code>title / subtitle</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>Header title and subtitle text in table toolbar</td>
                </tr>
                <tr>
                  <td><code>searchable</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true</code></td>
                  <td>Shows instant search filter input in table toolbar</td>
                </tr>
                <tr>
                  <td><code>selectable</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Enables multi-select checkboxes & floating batch action bar</td>
                </tr>
                <tr>
                  <td><code>expandable</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Enables accordion toggle per row (uses <code>#expanded</code> slot)</td>
                </tr>
                <tr>
                  <td><code>paginated</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enables integrated footer powered by <code>&lt;JPagination /&gt;</code></td>
                </tr>
                <tr>
                  <td><code>pageSize</code></td>
                  <td><code>Number</code></td>
                  <td><code>10</code></td>
                  <td>Records per page (supports <code>v-model:pageSize</code>)</td>
                </tr>
                <tr>
                  <td><code>pageSizes</code></td>
                  <td><code>Array</code></td>
                  <td><code>[5, 10, 20, 50]</code></td>
                  <td>Available page size options in dropdown selector</td>
                </tr>
                <tr>
                  <td><code>striped / hoverable / bordered</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false / true / false</code></td>
                  <td>Zebra striping, hover highlight, and outer perimeter borders</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Recipes Grid -->
          <div v-else-if="activeApiSubTab === 'recipes'" class="p-4 d-grid grid-cols-1 grid-cols-lg-2 gap-3">
            <div>
              <span class="tbl-label mb-2 d-block">Reusable &lt;JDataTable /&gt; Component</span>
              <pre class="tbl-code-box"><code>{{ dataTableSnippet }}</code></pre>
            </div>
            <div>
              <span class="tbl-label mb-2 d-block">Responsive HTML Table</span>
              <pre class="tbl-code-box"><code>{{ tableSnippet1 }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.tbl-section-title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Card Header */
.tbl-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.25rem;
  border-bottom: 1px solid var(--border-color-subtle, rgba(255, 255, 255, 0.08));
}

.tbl-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
}

.tbl-card-subtitle {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0.15rem 0 0;
}

.tbl-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.tbl-code-box {
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

/* Clean Documentation Table */
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
