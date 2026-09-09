<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTransactionStore } from '../stores/transactions'

const txStore = useTransactionStore()

// Dropdown & Action States
const activeActionDropdown = ref(null)
const editingTransaction = ref(null)
const isEditModalOpen = ref(false)
const toastMessage = ref(null)

const toggleActionDropdown = (id) => {
  activeActionDropdown.value = activeActionDropdown.value === id ? null : id
}

const closeAllDropdowns = () => {
  activeActionDropdown.value = null
}

const handleDocumentClick = (e) => {
  if (!e.target.closest('.dropdown')) {
    closeAllDropdowns()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  if (txStore.transactions.length === 0) {
    txStore.fetchTransactions()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Edit Action
const openEditModal = (transaction) => {
  editingTransaction.value = { ...transaction }
  isEditModalOpen.value = true
  closeAllDropdowns()
}

const saveEdit = () => {
  if (!editingTransaction.value) return
  txStore.updateTransaction(editingTransaction.value.id, { ...editingTransaction.value })
  showToast(`Transaction ${editingTransaction.value.id} updated successfully via Pinia!`, 'success')
  isEditModalOpen.value = false
}

// Delete Action
const deleteTransaction = (id) => {
  txStore.deleteTransaction(id)
  closeAllDropdowns()
  showToast(`Transaction ${id} removed via Pinia store action.`, 'danger')
}

// Refresh from Axios
const handleRefresh = async () => {
  try {
    await txStore.fetchTransactions()
    showToast(`Loaded live transactions via Axios (${txStore.latency}ms)`, 'success')
  } catch {
    showToast('Failed to refresh data', 'danger')
  }
}

const showToast = (message, type = 'info') => {
  toastMessage.value = { message, type }
  setTimeout(() => {
    toastMessage.value = null
  }, 3500)
}
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <div class="d-flex align-center gap-2 mb-1">
          <span class="badge badge-pill badge-primary">Pinia Store State</span>
          <span class="badge badge-pill badge-tonal-success">Axios HTTP Client</span>
        </div>
        <h2>Transactional & Financial Suite</h2>
        <p class="text-secondary mb-0">Engineered for SaaS billing, e-commerce, and high-volume transaction dashboards.</p>
      </div>

      <div class="d-flex align-center gap-2">
        <button
          class="btn btn-sm btn-tonal-primary d-flex align-center gap-2"
          :disabled="txStore.isLoading"
          @click="handleRefresh"
        >
          <span v-if="txStore.isLoading">⏳</span>
          <span v-else>🔄</span>
          <span>{{ txStore.isLoading ? 'Fetching via Axios...' : 'Refresh (Axios)' }}</span>
        </button>
      </div>
    </div>

    <!-- Notification Toast Banner -->
    <div
      v-if="toastMessage"
      :class="['alert py-2 px-3', toastMessage.type === 'success' ? 'alert-success' : 'alert-danger']"
    >
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center gap-2">
          <span>{{ toastMessage.type === 'success' ? '✓' : '🗑️' }}</span>
          <span class="text-xs font-semibold">{{ toastMessage.message }}</span>
        </div>
        <button class="btn btn-xs btn-text" @click="toastMessage = null">✕</button>
      </div>
    </div>

    <!-- 1. KPI Metric Stat Cards -->
    <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4 gap-4">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Total Volume</span>
          <div class="stat-icon">💰</div>
        </div>
        <div class="stat-value">${{ txStore.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</div>
        <div class="stat-footer">
          <span class="stat-trend stat-trend-up">↑ +18.4%</span>
          <span>vs last month</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Transactions</span>
          <div class="stat-icon">⚡</div>
        </div>
        <div class="stat-value">{{ txStore.transactions.length }} Records</div>
        <div class="stat-footer">
          <span class="stat-trend stat-trend-up">↑ +8.1%</span>
          <span>Managed in Pinia</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Axios Latency</span>
          <div class="stat-icon">⏱️</div>
        </div>
        <div class="stat-value">{{ txStore.latency || 350 }} ms</div>
        <div class="stat-footer">
          <span class="badge badge-xs badge-tonal-success">HTTP 200 OK</span>
          <span>Last sync: {{ txStore.lastFetched || 'Just now' }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Active State</span>
          <div class="stat-icon">👥</div>
        </div>
        <div class="stat-value">useTransactionStore</div>
        <div class="stat-footer">
          <span class="badge badge-xs badge-tonal-primary">Pinia Reactive</span>
        </div>
      </div>
    </div>

    <!-- 2. Transaction Data Table & Invoice Receipt Split -->
    <div class="d-grid grid-cols-1 grid-cols-lg-3 gap-4">
      <!-- Left 2 Cols: Transaction Records Table -->
      <div class="col-span-full col-span-lg-2 card card-bordered overflow-visible">
        <div class="card-header d-flex flex-wrap align-center justify-between gap-2 p-3 p-sm-4">
          <div class="d-flex align-center gap-2">
            <h4 class="card-title text-base">Recent Transactions</h4>
            <span class="badge badge-pill badge-primary">{{ txStore.filteredTransactions.length }} Records</span>
          </div>
          <div class="d-flex align-center gap-2">
            <!-- Filter Dropdown -->
            <select v-model="txStore.filterStatus" class="form-select form-select-sm" style="width: auto;">
              <option value="all">All Statuses</option>
              <option value="completed">Completed / Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed / Refund</option>
            </select>
          </div>
        </div>

        <div class="table-responsive" style="border: none; border-radius: 0; overflow: visible;">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Customer / Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th class="text-end" style="width: 80px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="txStore.isLoading && txStore.transactions.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  <div class="d-flex align-center justify-center gap-2">
                    <span>⏳</span>
                    <span>Loading transactions via Axios HTTP request...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="txStore.filteredTransactions.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  No transactions match the selected filter.
                </td>
              </tr>
              <tr v-for="t in txStore.filteredTransactions" :key="t.id">
                <td>
                  <div class="font-semibold text-sm">{{ t.id }}</div>
                  <div class="text-xs text-muted">{{ t.type || 'Direct Payment' }}</div>
                </td>
                <td>
                  <div class="d-flex align-center gap-2">
                    <div
                      class="rounded-full d-flex align-center justify-center font-bold text-xs"
                      style="width: 1.85rem; height: 1.85rem; background: var(--bg-surface-tonal); color: var(--primary);"
                    >
                      {{ (t.customer || 'User').charAt(0) }}
                    </div>
                    <div>
                      <div class="text-sm font-medium">{{ t.customer }}</div>
                      <div class="text-xs text-muted">{{ t.customerEmail || t.category }}</div>
                    </div>
                  </div>
                </td>
                <td class="font-bold text-sm">${{ typeof t.amount === 'number' ? t.amount.toFixed(2) : t.amount }}</td>
                <td class="text-xs text-secondary">{{ t.date }}</td>
                <td>
                  <span
                    :class="[
                      'badge badge-pill badge-xs text-capitalize',
                      t.status === 'completed' || t.status === 'Paid'
                        ? 'badge-success'
                        : t.status === 'pending' || t.status === 'Pending'
                        ? 'badge-warning'
                        : t.status === 'Refunded'
                        ? 'badge-info'
                        : 'badge-danger',
                    ]"
                  >
                    {{ t.status }}
                  </span>
                </td>
                <td class="text-end" @click.stop>
                  <!-- 3 Vertical Dots Action Dropdown -->
                  <div class="dropdown">
                    <button
                      type="button"
                      class="btn btn-icon btn-xs btn-tonal-neutral"
                      @click.stop="toggleActionDropdown(t.id)"
                      :title="`Actions for ${t.id}`"
                      aria-label="More actions"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                      </svg>
                    </button>

                    <div
                      :class="['dropdown-menu dropdown-menu-end', { show: activeActionDropdown === t.id }]"
                      style="min-width: 9.5rem; z-index: 1060; right: 0; left: auto;"
                    >
                      <button type="button" class="dropdown-item d-flex align-center gap-2" @click="openEditModal(t)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span>Edit</span>
                      </button>
                      <div class="dropdown-divider my-1 border-top border-subtle"></div>
                      <button
                        type="button"
                        class="dropdown-item d-flex align-center gap-2 text-danger"
                        @click="deleteTransaction(t.id)"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right 1 Col: Live Invoice Receipt Summary -->
      <div class="invoice-card d-flex flex-column justify-between">
        <div>
          <div class="invoice-header">
            <div>
              <div class="font-bold text-md">Invoice #INV-2026-9481</div>
              <div class="text-xs text-muted">Issued to Acme Corp</div>
            </div>
            <span class="badge badge-success badge-pill">Paid</span>
          </div>

          <div class="d-flex flex-column gap-1">
            <div class="invoice-line-item">
              <span>Enterprise SLA Platform (Monthly)</span>
              <span class="font-semibold text-primary">$1,200.00</span>
            </div>
            <div class="invoice-line-item">
              <span>Custom Webhook Pipeline Addon</span>
              <span class="font-semibold text-primary">$150.00</span>
            </div>
            <div class="invoice-line-item">
              <span>Priority Support SLA (24/7)</span>
              <span class="font-semibold text-primary">$70.00</span>
            </div>
            <div class="invoice-line-item">
              <span>Estimated Tax / VAT (0%)</span>
              <span class="text-muted">$0.00</span>
            </div>
          </div>

          <div class="invoice-total">
            <span>Total Settled</span>
            <span style="color: var(--primary, #6366f1);">$1,420.00</span>
          </div>
        </div>

        <!-- Quick Pay / Actions -->
        <div class="mt-4 d-flex flex-column gap-2">
          <button class="btn btn-primary btn-block">Download Official PDF Receipt</button>
          <button class="btn btn-tonal-neutral btn-block">Email Invoice to Accounting</button>
        </div>
      </div>
    </div>

    <!-- Edit Transaction Modal Backdrop & Dialog -->
    <div
      v-if="isEditModalOpen"
      class="modal-backdrop show d-flex align-center justify-center p-4"
      style="position: fixed; inset: 0; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); z-index: 1100;"
      @click.self="isEditModalOpen = false"
    >
      <div
        class="card card-elevated w-full max-w-md shadow-xl border border-subtle"
        style="animation: dropdown-fade-in 200ms ease;"
      >
        <div class="card-header p-3 px-4 d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <span class="badge badge-primary badge-xs">Pinia Edit</span>
            <h4 class="card-title text-base font-bold mb-0">Edit Transaction {{ editingTransaction?.id }}</h4>
          </div>
          <button class="btn btn-icon btn-xs btn-text" @click="isEditModalOpen = false">✕</button>
        </div>

        <form v-if="editingTransaction" @submit.prevent="saveEdit" class="card-body p-4 d-flex flex-column gap-3">
          <div>
            <label class="form-label required">Customer / Organization</label>
            <input v-model="editingTransaction.customer" type="text" class="form-control" required />
          </div>

          <div>
            <label class="form-label required">Email</label>
            <input v-model="editingTransaction.customerEmail" type="email" class="form-control" required />
          </div>

          <div class="d-grid grid-cols-2 gap-3">
            <div>
              <label class="form-label required">Amount ($)</label>
              <input v-model="editingTransaction.amount" type="number" step="0.01" class="form-control" required />
            </div>
            <div>
              <label class="form-label required">Status</label>
              <select v-model="editingTransaction.status" class="form-select" required>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div>
            <label class="form-label required">Category</label>
            <input v-model="editingTransaction.category" type="text" class="form-control" required />
          </div>

          <div class="d-flex align-center justify-end gap-2 mt-3 pt-3 border-top border-subtle">
            <button type="button" class="btn btn-sm btn-tonal-neutral" @click="isEditModalOpen = false">Cancel</button>
            <button type="submit" class="btn btn-sm btn-primary">Save Changes in Pinia</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
