<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useToast } from '../composables/useToast'

const toast = useToast()

// Active navigation state
const activeFolder = ref('inbox')
const activeLabel = ref(null)
const searchQuery = ref('')
const selectedEmailId = ref(null)
const selectedEmailIds = ref([])
const isShowingDetail = ref(false)
const isComposeOpen = ref(false)
const isRefreshing = ref(false)

// Compose form state
const composeForm = ref({
  to: '',
  cc: '',
  showCc: false,
  subject: '',
  priority: 'normal',
  message: '',
})

// Quick reply state
const quickReplyText = ref('')
const isSendingReply = ref(false)

// Folders definitions
const folders = [
  { id: 'inbox', name: 'Inbox', icon: '📥', color: 'primary' },
  { id: 'starred', name: 'Starred', icon: '⭐', color: 'warning' },
  { id: 'sent', name: 'Sent Mail', icon: '📤', color: 'info' },
  { id: 'drafts', name: 'Drafts', icon: '📝', color: 'secondary' },
  { id: 'archive', name: 'Archive', icon: '📦', color: 'neutral' },
  { id: 'spam', name: 'Spam', icon: '🚫', color: 'warning' },
  { id: 'trash', name: 'Trash', icon: '🗑️', color: 'danger' },
]

// Labels definitions
const labels = [
  { id: 'work', name: 'Work & Projects', color: 'primary', dot: '#6366f1' },
  { id: 'finance', name: 'Finance & Billing', color: 'warning', dot: '#f59e0b' },
  { id: 'urgent', name: 'Urgent Action', color: 'danger', dot: '#f43f5e' },
  { id: 'product', name: 'Product Design', color: 'success', dot: '#10b981' },
  { id: 'security', name: 'Security & DevOps', color: 'info', dot: '#0ea5e9' },
]

// Sample rich emails dataset
const emails = ref([
  {
    id: 1,
    sender: 'Sarah Jenkins',
    email: 'sarah.j@designstudio.io',
    avatar: 'SJ',
    avatarColor: 'var(--primary)',
    subject: 'Q3 UI Design System Refresh & Component Specifications',
    preview: 'Hi team, I just published the updated Figma tokens and Vue component guidelines for the sprint review...',
    body: `<p>Hi Team,</p>
<p>I have finalized and uploaded the comprehensive design spec for the <strong>Q3 Design System Refresh</strong>. We have updated all color scales, elevation tiers, and interactive micro-animations.</p>
<p>Here are the primary milestones scheduled for this sprint:</p>
<ul>
  <li><strong>Component Parity:</strong> Ensure all JCard, JBtn, and JInput components support reactive theme switching.</li>
  <li><strong>Accessibility (WCAG 2.1 AA):</strong> Contrast checks and keyboard navigation tab-indices verified.</li>
  <li><strong>Performance:</strong> Sub-50ms render latency across standard datatables and list items.</li>
</ul>
<p>Please review the attached design token export and let me know if you need any adjustments before our Friday kickoff.</p>
<p>Best regards,<br/><strong>Sarah Jenkins</strong><br/>Lead Product Designer</p>`,
    date: '10:42 AM',
    fullDate: 'Today at 10:42 AM',
    folder: 'inbox',
    labels: ['work', 'product'],
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { name: 'Q3_Design_Tokens_v2.json', size: '248 KB', type: 'code' },
      { name: 'Component_Guidelines.pdf', size: '3.4 MB', type: 'pdf' },
    ],
  },
  {
    id: 2,
    sender: 'Stripe Billing System',
    email: 'invoices@stripe.com',
    avatar: '💳',
    avatarColor: '#10b981',
    subject: 'Monthly SaaS Infrastructure Receipt - Invoice #INV-89241',
    preview: 'Your receipt for JUI Cloud Services subscription for period Aug 1 - Aug 31 has been processed successfully...',
    body: `<p>Hello Administrator,</p>
<p>Your payment for invoice <strong>#INV-89241</strong> ($449.00 USD) was successfully processed via your corporate credit card ending in <strong>4242</strong>.</p>
<div style="padding: 16px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); margin: 16px 0;">
  <strong>Amount Paid:</strong> $449.00 USD<br/>
  <strong>Transaction Ref:</strong> ch_3N8e1209xx8921<br/>
  <strong>Billing Period:</strong> Aug 1, 2026 - Aug 31, 2026
</div>
<p>You can access past invoices and configure accounting webhooks directly in your billing dashboard.</p>`,
    date: 'Yesterday',
    fullDate: 'Sep 8, 2026 at 4:15 PM',
    folder: 'inbox',
    labels: ['finance'],
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    attachments: [
      { name: 'Invoice_INV-89241.pdf', size: '112 KB', type: 'pdf' },
    ],
  },
  {
    id: 3,
    sender: 'AWS Security Alerts',
    email: 'no-reply@security.amazon.com',
    avatar: '🛡️',
    avatarColor: '#f43f5e',
    subject: 'Action Required: IAM Policy Rotation Notice for Cluster us-east-1',
    preview: 'An IAM user access key hasn\'t been rotated in the last 90 days. Please inspect your credentials...',
    body: `<p>Greetings,</p>
<p>This automated notification indicates that access key <code>AKIA****************</code> has exceeded your team's 90-day credential rotation window in cluster <strong>us-east-1</strong>.</p>
<p>To avoid service disruption, please generate a new secret pair and deactivate the old token within 7 business days.</p>
<p>Security Compliance Ops</p>`,
    date: 'Sep 7',
    fullDate: 'Sep 7, 2026 at 9:10 AM',
    folder: 'inbox',
    labels: ['urgent', 'security'],
    isRead: false,
    isStarred: true,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: 4,
    sender: 'Alex Morgan',
    email: 'alex.m@cloudcorp.net',
    avatar: 'AM',
    avatarColor: 'var(--accent)',
    subject: 'Feedback on Kanban Board and Real-time WebSocket architecture',
    preview: 'Loved the smooth card transition animations! Have we stress tested with 200+ cards in the backlog?',
    body: `<p>Hey team,</p>
<p>I reviewed the newly deployed Kanban board and Chat channels. The micro-animations and drop target highlights look phenomenal.</p>
<p>One question: have we benchmarked card dragging when there are 200+ cards in the backlog column? We might want virtual scrolling or pagination if datasets exceed that threshold.</p>
<p>Let's catch up over coffee!</p>`,
    date: 'Sep 6',
    fullDate: 'Sep 6, 2026 at 2:30 PM',
    folder: 'inbox',
    labels: ['work', 'product'],
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: 5,
    sender: 'GitHub Notifications',
    email: 'notifications@github.com',
    avatar: '🐙',
    avatarColor: '#64748b',
    subject: '[Merged] PR #342: Refactor JInput styles and enhance focus rings',
    preview: 'Pull request #342 has been merged by maintainer into main. 12 checks passed with zero regressions...',
    body: `<p>The pull request <strong>#342 (Refactor JInput styles and enhance focus rings)</strong> was successfully merged into <code>main</code> branch.</p>
<p>All automated CI checks passed:</p>
<ul>
  <li>✓ Vite Build: Success</li>
  <li>✓ ESLint / Oxlint: 0 errors</li>
  <li>✓ Unit tests: 34 passed</li>
</ul>`,
    date: 'Sep 5',
    fullDate: 'Sep 5, 2026 at 11:20 AM',
    folder: 'archive',
    labels: ['work'],
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  },
  {
    id: 6,
    sender: 'Elena Rostova',
    email: 'elena@cybernetics.ai',
    avatar: 'ER',
    avatarColor: '#0ea5e9',
    subject: 'Draft proposal: AI Agent pair programming workspace',
    preview: 'Here is the draft document outlining the agent interaction model and prompt scheduling system...',
    body: `<p>Hi everyone,</p>
<p>Attached is the working draft for our upcoming developer tooling sprint. Let me know what you think of the architecture diagram.</p>`,
    date: 'Sep 4',
    fullDate: 'Sep 4, 2026 at 6:00 PM',
    folder: 'drafts',
    labels: ['product'],
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    attachments: [
      { name: 'AI_Workspace_Architecture.docx', size: '1.8 MB', type: 'doc' },
    ],
  },
])

// Computed filtered emails
const filteredEmails = computed(() => {
  return emails.value.filter((email) => {
    // Folder filter
    if (activeFolder.value === 'starred') {
      if (!email.isStarred) return false
    } else if (activeFolder.value) {
      if (email.folder !== activeFolder.value) return false
    }

    // Label filter
    if (activeLabel.value) {
      if (!email.labels.includes(activeLabel.value)) return false
    }

    // Search filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchSubject = email.subject.toLowerCase().includes(q)
      const matchSender = email.sender.toLowerCase().includes(q)
      const matchPreview = email.preview.toLowerCase().includes(q)
      if (!matchSubject && !matchSender && !matchPreview) return false
    }

    return true
  })
})

// Current selected email
const currentEmail = computed(() => {
  return emails.value.find((e) => e.id === selectedEmailId.value) || null
})

// Counts
const unreadCount = computed(() => {
  return emails.value.filter((e) => e.folder === 'inbox' && !e.isRead).length
})

const folderCounts = computed(() => {
  const counts = {}
  folders.forEach((f) => {
    if (f.id === 'starred') {
      counts[f.id] = emails.value.filter((e) => e.isStarred).length
    } else {
      counts[f.id] = emails.value.filter((e) => e.folder === f.id && !e.isRead).length
    }
  })
  return counts
})

// Email selection handlers
const selectEmail = (id) => {
  selectedEmailId.value = id
  isShowingDetail.value = true
  const target = emails.value.find((e) => e.id === id)
  if (target && !target.isRead) {
    target.isRead = true
  }
}

const goBackToList = () => {
  isShowingDetail.value = false
}

const toggleStar = (email, event) => {
  if (event) event.stopPropagation()
  email.isStarred = !email.isStarred
  toast.primary(email.isStarred ? 'Added to Starred' : 'Removed from Starred', { timeout: 2000 })
}

const toggleSelectAll = (checked) => {
  if (checked) {
    selectedEmailIds.value = filteredEmails.value.map((e) => e.id)
  } else {
    selectedEmailIds.value = []
  }
}

const isAllSelected = computed(() => {
  if (filteredEmails.value.length === 0) return false
  return selectedEmailIds.value.length === filteredEmails.value.length
})

// Actions on single or batch emails
const markSelectedAsRead = () => {
  const ids = selectedEmailIds.value.length ? selectedEmailIds.value : [selectedEmailId.value]
  emails.value.forEach((e) => {
    if (ids.includes(e.id)) e.isRead = true
  })
  selectedEmailIds.value = []
  toast.success('Marked as read')
}

const markSelectedAsUnread = () => {
  if (currentEmail.value) {
    currentEmail.value.isRead = false
    toast.info('Marked as unread')
  }
}

const deleteEmail = (emailId) => {
  const target = emails.value.find((e) => e.id === emailId)
  if (target) {
    target.folder = 'trash'
    toast.warning('Moved conversation to Trash')
    isShowingDetail.value = false
    selectedEmailId.value = null
  }
}

const batchDelete = () => {
  emails.value.forEach((e) => {
    if (selectedEmailIds.value.includes(e.id)) {
      e.folder = 'trash'
    }
  })
  toast.danger(`Deleted ${selectedEmailIds.value.length} conversation(s)`)
  selectedEmailIds.value = []
}

const refreshEmails = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    toast.success('Inbox up to date')
  }, 600)
}

const simulateDownload = (filename) => {
  toast.info(`Downloading ${filename}...`)
  setTimeout(() => {
    toast.success(`Downloaded ${filename}`)
  }, 1000)
}

// Quick reply sender
const handleSendReply = () => {
  if (!quickReplyText.value.trim()) return
  isSendingReply.value = true
  setTimeout(() => {
    isSendingReply.value = false
    quickReplyText.value = ''
    toast.success('Reply sent successfully')
  }, 700)
}

// Compose sender
const handleSendCompose = () => {
  if (!composeForm.value.to.trim() || !composeForm.value.subject.trim()) {
    toast.danger('Please specify a recipient and subject')
    return
  }

  const newEmail = {
    id: Date.now(),
    sender: 'Me (Administrator)',
    email: 'admin@jui.dev',
    avatar: 'ME',
    avatarColor: 'var(--primary)',
    subject: composeForm.value.subject,
    preview: composeForm.value.message.slice(0, 80) + '...',
    body: `<p>${composeForm.value.message.replace(/\n/g, '<br/>')}</p>`,
    date: 'Just now',
    fullDate: 'Just now',
    folder: 'sent',
    labels: ['work'],
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
  }

  emails.value.unshift(newEmail)
  isComposeOpen.value = false
  composeForm.value = { to: '', cc: '', showCc: false, subject: '', priority: 'normal', message: '' }
  toast.success('Email dispatched successfully!')
}

// Helper to get label style
const getLabel = (labelId) => labels.find((l) => l.id === labelId)

onMounted(() => {
  // Start with detail pane hidden
  isShowingDetail.value = false
})
</script>

<template>
  <div class="email-page d-flex flex-column gap-4">
    <!-- ===================================================================== -->
    <!-- TOP PAGE HEADER & METRICS                                            -->
    <!-- ===================================================================== -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2 class="mb-0">Email Workspace</h2>
        <p class="text-secondary mb-0">High-productivity communication suite with intelligent tagging and triage.</p>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- MAIN THREE-PANE EMAIL INTERFACE                                      -->
    <!-- ===================================================================== -->
    <div class="email-layout-card card card-bordered p-0 overflow-hidden">
      <div class="email-container">
        <!-- ================================================================= -->
        <!-- PANE 1: FOLDERS & LABELS SIDEBAR                                  -->
        <!-- ================================================================= -->
        <aside class="email-sidebar border-r">
          <!-- Compose Primary Button -->
          <div class="p-3">
            <JBtn block color="primary" variant="tonal" prepend-icon="✏️" @click="isComposeOpen = true">
              New Message
            </JBtn>
          </div>

          <!-- Folders Section -->
          <div class="email-nav-group">
            <div class="email-nav-title text-xs text-muted text-uppercase px-3 py-1">Mailboxes</div>
            <nav class="d-flex flex-column gap-1 px-2">
              <button v-for="folder in folders" :key="folder.id" type="button" :class="[
                'email-nav-item d-flex align-center justify-between px-3 py-2 rounded transition-all',
                { 'active': activeFolder === folder.id && !activeLabel }
              ]"
                @click="activeFolder = folder.id; activeLabel = null; selectedEmailIds = []; isShowingDetail = false;">
                <div class="d-flex align-center gap-2">
                  <span class="email-nav-icon">{{ folder.icon }}</span>
                  <span class="email-nav-label">{{ folder.name }}</span>
                </div>
                <span v-if="folderCounts[folder.id]" class="badge badge-pill badge-xs"
                  :class="activeFolder === folder.id ? 'badge-primary' : 'badge-tonal-secondary'">
                  {{ folderCounts[folder.id] }}
                </span>
              </button>
            </nav>
          </div>

          <hr class="my-3 opacity-20" />

          <!-- Labels Section -->
          <div class="email-nav-group">
            <div class="email-nav-title text-xs text-muted text-uppercase px-3 py-1">Labels</div>
            <nav class="d-flex flex-column gap-1 px-2">
              <button v-for="label in labels" :key="label.id" type="button" :class="[
                'email-nav-item d-flex align-center justify-between px-3 py-2 rounded transition-all',
                { 'active': activeLabel === label.id }
              ]" @click="activeLabel = label.id; selectedEmailIds = []; isShowingDetail = false;">
                <div class="d-flex align-center gap-2">
                  <span class="label-dot" :style="{ backgroundColor: label.dot }"></span>
                  <span class="email-nav-label">{{ label.name }}</span>
                </div>
              </button>
            </nav>
          </div>

          <!-- Storage Meter Footer -->
          <div class="mt-auto p-3 border-t">
            <div class="d-flex justify-between text-xs mb-1">
              <span class="text-secondary">Storage Used</span>
              <span class="font-medium text-primary">11.4 GB / 15 GB</span>
            </div>
            <div class="progress-bar-track rounded-pill overflow-hidden"
              style="height: 6px; background: var(--bg-hover);">
              <div class="progress-bar-fill bg-primary rounded-pill" style="width: 76%; height: 100%;"></div>
            </div>
          </div>
        </aside>

        <!-- ================================================================= -->
        <!-- PANE 2: EMAIL LIST VIEW (Shown when !isShowingDetail)              -->
        <!-- ================================================================= -->
        <section v-if="!isShowingDetail" class="email-list-pane flex-1 d-flex flex-column">
          <!-- Search and Filter Header -->
          <div class="email-list-header p-3 border-b d-flex flex-column gap-2">
            <JInput v-model="searchQuery" placeholder="Search sender, subject..." pattern="boxed" size="sm"
              prepend-text="🔍" clearable />

            <div class="d-flex align-center justify-between pt-1">
              <div class="d-flex align-center gap-2">
                <JCheckbox :model-value="isAllSelected" size="sm" @update:model-value="toggleSelectAll" />
                <button class="btn btn-xs btn-ghost" title="Refresh inbox" :disabled="isRefreshing"
                  @click="refreshEmails">
                  <span :class="{ 'spin-anim': isRefreshing }">🔄</span>
                </button>

                <template v-if="selectedEmailIds.length">
                  <button class="btn btn-xs btn-tonal-primary" @click="markSelectedAsRead"
                    title="Mark selected as read">
                    ✓ Read
                  </button>
                  <button class="btn btn-xs btn-tonal-danger" @click="batchDelete" title="Delete selected">
                    🗑️
                  </button>
                </template>
              </div>

              <span class="text-xs text-secondary">
                {{ filteredEmails.length }} message{{ filteredEmails.length === 1 ? '' : 's' }}
              </span>
            </div>
          </div>

          <!-- Emails Scrollable List -->
          <div class="email-list-body flex-1 overflow-y-auto">
            <div v-if="filteredEmails.length === 0" class="p-6 text-center text-secondary">
              <div class="text-3xl mb-2">📭</div>
              <h5 class="mb-1">No emails found</h5>
              <p class="text-xs mb-0">Try changing your search term or select another folder.</p>
            </div>

            <article v-for="email in filteredEmails" :key="email.id" :class="[
              'email-item d-flex align-center px-3 py-2 border-b cursor-pointer transition-all',
              { 'active': selectedEmailId === email.id },
              { 'unread': !email.isRead }
            ]" @click="selectEmail(email.id)">
              <!-- Checkbox & Star Action Group -->
              <div class="d-flex align-center gap-2 flex-shrink-0 mr-3" @click.stop>
                <input type="checkbox" :checked="selectedEmailIds.includes(email.id)" class="form-checkbox" @change="(e) => {
                  if (e.target.checked) selectedEmailIds.push(email.id)
                  else selectedEmailIds = selectedEmailIds.filter(id => id !== email.id)
                }" />
                <button type="button" class="star-btn" :class="{ 'starred': email.isStarred }"
                  @click="toggleStar(email, $event)">
                  {{ email.isStarred ? '★' : '☆' }}
                </button>
              </div>

              <!-- Sender Name (fixed width, truncated) -->
              <div class="email-sender-cell flex-shrink-0 truncate mr-3" style="width: 170px;">
                <span class="text-sm truncate"
                  :class="email.isRead ? 'text-secondary font-normal' : 'text-primary font-semibold'">
                  {{ email.sender }}
                </span>
              </div>

              <!-- Single-line Subject + Snippet Preview (flex-1, expanded) -->
              <div class="email-subject-cell flex-1 min-w-0 d-flex align-center truncate mr-4">
                <span class="email-subject text-sm truncate mr-2"
                  :class="email.isRead ? 'text-primary font-normal' : 'text-primary font-semibold'"
                  style="max-width: 65%; flex-shrink: 0;">
                  {{ email.subject }}
                </span>
                <span class="text-xs text-muted mr-2 flex-shrink-0">—</span>
                <span class="email-preview text-xs text-secondary truncate flex-1 min-w-0">
                  {{ email.preview }}
                </span>
              </div>

              <!-- Meta: Labels + Attachment + Date (aligned right) -->
              <div class="email-meta-cell d-flex align-center gap-2 flex-shrink-0 ml-auto">
                <!-- Labels -->

                <!-- Date / Time -->
                <span class="email-time text-xs whitespace-nowrap text-right"
                  :class="email.isRead ? 'text-muted font-normal' : 'text-primary font-semibold'"
                  style="min-width: 65px;">
                  {{ email.date }}
                </span>
              </div>
            </article>
          </div>
        </section>

        <!-- ================================================================= -->
        <!-- PANE 3: READING & DETAIL PANE (Shown when isShowingDetail)        -->
        <!-- ================================================================= -->
        <main v-else class="email-detail-pane flex-1 d-flex flex-column">
          <template v-if="currentEmail">
            <!-- Reading Header Toolbar -->
            <div class="email-detail-header p-3 border-b d-flex align-center justify-between gap-2 flex-wrap">
              <div class="d-flex align-center gap-2">
                <!-- Back arrow button -->
                <button type="button" class="btn btn-sm btn-tonal-secondary d-flex align-center gap-2"
                  title="Back to inbox" @click="goBackToList">
                  <span>←</span>
                  <span class="font-medium">Back</span>
                </button>

                <button class="btn btn-sm btn-ghost" :class="{ 'text-warning': currentEmail.isStarred }"
                  @click="toggleStar(currentEmail)">
                  {{ currentEmail.isStarred ? '★ Starred' : '☆ Star' }}
                </button>
                <button class="btn btn-sm btn-ghost" @click="markSelectedAsUnread">
                  ✉ Mark Unread
                </button>
                <button class="btn btn-sm btn-ghost" @click="deleteEmail(currentEmail.id)">
                  🗑️ Trash
                </button>
              </div>

              <div class="d-flex align-center gap-1 text-xs text-muted">
                <span>{{ currentEmail.fullDate }}</span>
              </div>
            </div>

            <!-- Reading Body Scrollable Area -->
            <div class="email-detail-content flex-1 p-4 overflow-y-auto">
              <!-- Subject line -->
              <h3 class="mb-3">{{ currentEmail.subject }}</h3>

              <!-- Sender Card -->
              <div class="d-flex align-center justify-between p-3 rounded mb-4" style="background: var(--bg-hover);">
                <div class="d-flex align-center gap-3">
                  <div class="avatar-circle font-bold text-white d-flex align-center justify-center rounded-circle"
                    :style="{ background: currentEmail.avatarColor, width: '42px', height: '42px' }">
                    {{ currentEmail.avatar }}
                  </div>
                  <div>
                    <div class="font-semibold text-sm">{{ currentEmail.sender }}</div>
                    <div class="text-xs text-secondary">{{ currentEmail.email }}</div>
                  </div>
                </div>

                <div class="d-flex align-center gap-2">
                  <span class="badge badge-pill badge-xs badge-tonal-secondary">To: me</span>
                </div>
              </div>

              <!-- Formatted Email Body -->
              <div class="email-body-html text-sm leading-relaxed mb-6" v-html="currentEmail.body"></div>

              <!-- Attachments Section -->
              <div v-if="currentEmail.attachments && currentEmail.attachments.length" class="attachments-block mb-6">
                <div class="text-xs font-semibold text-muted text-uppercase mb-2">
                  Attachments ({{ currentEmail.attachments.length }})
                </div>
                <div class="d-flex flex-wrap gap-2">
                  <div v-for="(att, i) in currentEmail.attachments" :key="i"
                    class="attachment-chip d-flex align-center gap-2 p-2 rounded border cursor-pointer hover:border-primary transition-all"
                    style="background: var(--bg-surface-elevated);" @click="simulateDownload(att.name)">
                    <span class="text-lg">📄</span>
                    <div class="text-xs">
                      <div class="font-medium text-primary">{{ att.name }}</div>
                      <div class="text-muted">{{ att.size }}</div>
                    </div>
                    <span class="text-xs text-secondary ml-1">⬇</span>
                  </div>
                </div>
              </div>

              <hr class="my-4 opacity-20" />

              <!-- Quick Reply Inline Card -->
              <div class="quick-reply-box card card-bordered p-3">
                <div class="d-flex align-center gap-2 mb-2 text-xs font-semibold text-secondary">
                  <span>↩ Quick Reply to {{ currentEmail.sender }}</span>
                </div>

                <JTextarea v-model="quickReplyText" placeholder="Type your reply here..." :rows="3" autogrow />

                <div class="d-flex align-center justify-between mt-2 pt-2 border-t">
                  <div class="d-flex align-center gap-2 text-muted text-sm">
                    <button class="btn btn-xs btn-ghost" title="Attach file"
                      @click="toast.info('Attach files via compose modal')">
                      📎 Attach
                    </button>
                  </div>

                  <div class="d-flex align-center gap-2">
                    <JBtn size="sm" color="primary" :loading="isSendingReply" @click="handleSendReply">
                      Send Reply
                    </JBtn>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div v-else class="flex-1 d-flex flex-column align-center justify-center p-6 text-center text-secondary">
            <div class="text-4xl mb-3">✉️</div>
            <h4>Select an email to read</h4>
            <p class="text-sm text-muted">Choose any thread from the list on the left.</p>
          </div>
        </main>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- COMPOSE EMAIL MODAL                                                   -->
    <!-- ===================================================================== -->
    <JModal v-model="isComposeOpen" title="New Message" size="lg" position="center">
      <form class="d-flex flex-column gap-3" @submit.prevent="handleSendCompose">
        <JInput v-model="composeForm.to" label="To" placeholder="recipient@company.com" required />

        <div v-if="composeForm.showCc">
          <JInput v-model="composeForm.cc" label="Cc" placeholder="colleagues@company.com" />
        </div>
        <div v-else class="text-right">
          <button type="button" class="btn btn-xs btn-link p-0 text-xs" @click="composeForm.showCc = true">
            + Add CC
          </button>
        </div>

        <JInput v-model="composeForm.subject" label="Subject" placeholder="Brief summary of discussion" required />

        <div class="d-flex flex-column gap-1">
          <label class="text-xs font-semibold text-secondary">Message Content</label>
          <JTextarea v-model="composeForm.message" placeholder="Write your email body here..." :rows="6" autogrow
            required />
        </div>
      </form>

      <template #footer="{ close }">
        <div class="d-flex align-center justify-between w-full">
          <div class="d-flex align-center gap-2 text-xs text-muted">
            <button type="button" class="btn btn-xs btn-ghost" @click="toast.info('File attachments simulated')">
              📎 Attach Files
            </button>
          </div>
          <div class="d-flex align-center gap-2">
            <JBtn variant="ghost" @click="close">Cancel</JBtn>
            <JBtn color="primary" prepend-icon="🚀" @click="handleSendCompose">Send Message</JBtn>
          </div>
        </div>
      </template>
    </JModal>
  </div>
</template>

<style scoped>
.email-container {
  display: flex;
  height: calc(100vh - 210px);
  min-height: 600px;
  background: var(--bg-surface);
}

.email-sidebar {
  width: 240px;
  min-width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-color);
}

.email-nav-item {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}

.email-nav-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.email-nav-item.active {
  background: var(--primary-tonal);
  color: var(--primary);
  font-weight: 600;
}

.avatar-circle {
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50% !important;
  display: inline-block;
}

.email-list-pane {
  flex: 1;
  min-width: 0;
  background: var(--bg-surface);
}

.email-detail-pane {
  flex: 1;
  min-width: 0;
  background: var(--bg-body);
}

.email-detail-header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
}

.email-item {
  border-left: 3px solid transparent;
  min-height: 44px;
  user-select: none;
  background: var(--bg-surface);
  transition: background-color 0.12s ease, border-left-color 0.12s ease;
}

.email-item:hover {
  background: var(--bg-hover);
}

.email-item.active {
  background: var(--primary-tonal);
  border-left-color: var(--primary);
}

.email-item.unread {
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.04);
}

.star-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, color 0.15s ease;
}

.star-btn:hover {
  transform: scale(1.2);
  color: #f59e0b;
}

.star-btn.starred {
  color: #f59e0b;
}

.spin-anim {
  display: inline-block;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 991px) {
  .email-sidebar {
    display: none;
  }
}
</style>
