<script setup>
import { ref, computed } from 'vue'
import { useToast } from '../composables/useToast'

const toast = useToast()

// Filter states
const searchQuery = ref('')
const selectedPriorityFilter = ref('all')
const selectedTagFilter = ref('all')

// Modal states
const isTaskModalOpen = ref(false)
const isColumnModalOpen = ref(false)
const editingTask = ref(null) // null = create new, object = edit

// New column form
const newColumnTitle = ref('')
const newColumnColor = ref('primary')

// Form state for Task
const taskForm = ref({
  title: '',
  description: '',
  columnId: 'todo',
  priority: 'medium',
  tag: 'Frontend',
  assignee: 'Alex M.',
  assigneeInitials: 'AM',
  assigneeBg: 'var(--primary)',
  dueDate: 'Sep 24',
  totalSubtasks: 3,
  completedSubtasks: 1,
})

// Team members for avatar stack
const teamMembers = [
  { name: 'Sarah Jenkins', initials: 'SJ', bg: '#6366f1' },
  { name: 'Alex Morgan', initials: 'AM', bg: '#10b981' },
  { name: 'Elena Rostova', initials: 'ER', bg: '#f59e0b' },
  { name: 'Marcus Chen', initials: 'MC', bg: '#f43f5e' },
  { name: 'David Kim', initials: 'DK', bg: '#0ea5e9' },
]

// Priority options
const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' },
]

// Column definitions
const columns = ref([
  {
    id: 'backlog',
    title: 'Backlog',
    badgeClass: 'badge-tonal-secondary',
    accentColor: 'var(--secondary)',
  },
  {
    id: 'todo',
    title: 'To Do',
    badgeClass: 'badge-tonal-info',
    accentColor: 'var(--info)',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    badgeClass: 'badge-tonal-warning',
    accentColor: 'var(--warning)',
  },
  {
    id: 'in_review',
    title: 'Review & QA',
    badgeClass: 'badge-tonal-primary',
    accentColor: 'var(--primary)',
  },
  {
    id: 'done',
    title: 'Completed',
    badgeClass: 'badge-tonal-success',
    accentColor: 'var(--success)',
  },
])

// Tasks dataset
const tasks = ref([
  {
    id: 101,
    columnId: 'todo',
    title: 'Integrate Webhook Dispatcher with Stripe',
    description: 'Implement HMAC signature verification and exponential backoff retry for failed event notifications.',
    priority: 'high',
    tag: 'Backend',
    tagColor: 'primary',
    assignee: 'Marcus Chen',
    assigneeInitials: 'MC',
    assigneeBg: '#f43f5e',
    dueDate: 'Sep 12',
    isDueSoon: true,
    totalSubtasks: 5,
    completedSubtasks: 2,
    comments: 4,
    attachments: 2,
  },
  {
    id: 102,
    columnId: 'todo',
    title: 'WCAG 2.1 Contrast Audit for Dark Modes',
    description: 'Verify all secondary labels, muted icons, and form inputs meet minimum 4.5:1 ratio.',
    priority: 'medium',
    tag: 'Design',
    tagColor: 'info',
    assignee: 'Sarah Jenkins',
    assigneeInitials: 'SJ',
    assigneeBg: '#6366f1',
    dueDate: 'Sep 15',
    isDueSoon: false,
    totalSubtasks: 4,
    completedSubtasks: 1,
    comments: 1,
    attachments: 0,
  },
  {
    id: 103,
    columnId: 'in_progress',
    title: 'Refactor Reactive JInput Auto-Import',
    description: 'Streamline bundle payload by lazy-loading heavy regex validators in unplugin configuration.',
    priority: 'high',
    tag: 'Frontend',
    tagColor: 'success',
    assignee: 'Alex Morgan',
    assigneeInitials: 'AM',
    assigneeBg: '#10b981',
    dueDate: 'Sep 10',
    isDueSoon: true,
    totalSubtasks: 3,
    completedSubtasks: 2,
    comments: 6,
    attachments: 3,
  },
  {
    id: 104,
    columnId: 'in_progress',
    title: 'Telemetry & Metric Aggregation Pipelines',
    description: 'Hook into Prometheus and Grafana dashboards for cluster-level CPU/memory utilization.',
    priority: 'low',
    tag: 'DevOps',
    tagColor: 'secondary',
    assignee: 'David Kim',
    assigneeInitials: 'DK',
    assigneeBg: '#0ea5e9',
    dueDate: 'Sep 20',
    isDueSoon: false,
    totalSubtasks: 6,
    completedSubtasks: 4,
    comments: 2,
    attachments: 1,
  },
  {
    id: 105,
    columnId: 'in_review',
    title: 'Global Toast Position Alignment Engine',
    description: 'Support multi-stacking and smooth FLIP layout transitions when toasts are dismissed.',
    priority: 'medium',
    tag: 'Frontend',
    tagColor: 'success',
    assignee: 'Elena Rostova',
    assigneeInitials: 'ER',
    assigneeBg: '#f59e0b',
    dueDate: 'Sep 11',
    isDueSoon: false,
    totalSubtasks: 2,
    completedSubtasks: 2,
    comments: 3,
    attachments: 1,
  },
  {
    id: 106,
    columnId: 'done',
    title: 'Setup Vite SSR Build Pipeline & Manifests',
    description: 'Achieved 42% faster initial page loads and seamless pre-rendering of static landing sections.',
    priority: 'medium',
    tag: 'DevOps',
    tagColor: 'secondary',
    assignee: 'David Kim',
    assigneeInitials: 'DK',
    assigneeBg: '#0ea5e9',
    dueDate: 'Sep 05',
    isDueSoon: false,
    totalSubtasks: 4,
    completedSubtasks: 4,
    comments: 8,
    attachments: 4,
  },
  {
    id: 107,
    columnId: 'backlog',
    title: 'Multi-factor Authentication (TOTP & WebAuthn)',
    description: 'Hardware key support (YubiKey) along with standard Authenticator app QR codes.',
    priority: 'low',
    tag: 'Security',
    tagColor: 'danger',
    assignee: 'Marcus Chen',
    assigneeInitials: 'MC',
    assigneeBg: '#f43f5e',
    dueDate: 'Oct 01',
    isDueSoon: false,
    totalSubtasks: 7,
    completedSubtasks: 0,
    comments: 0,
    attachments: 1,
  },
])

// Drag and drop state
const draggedTaskId = ref(null)
const dragOverColumnId = ref(null)

const onDragStart = (e, task) => {
  draggedTaskId.value = task.id
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', task.id)
}

const onDragOver = (e, columnId) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  dragOverColumnId.value = columnId
}

const onDragLeave = (e, columnId) => {
  if (dragOverColumnId.value === columnId) {
    dragOverColumnId.value = null
  }
}

const onDrop = (e, columnId) => {
  e.preventDefault()
  dragOverColumnId.value = null
  if (draggedTaskId.value) {
    const task = tasks.value.find((t) => t.id === draggedTaskId.value)
    if (task && task.columnId !== columnId) {
      const oldColName = columns.value.find((c) => c.id === task.columnId)?.title
      const newColName = columns.value.find((c) => c.id === columnId)?.title
      task.columnId = columnId
      toast.info(`Moved "${task.title.slice(0, 25)}..." to ${newColName}`, { timeout: 2500 })
    }
    draggedTaskId.value = null
  }
}

// Filtered tasks per column
const getColumnTasks = (columnId) => {
  return tasks.value.filter((task) => {
    if (task.columnId !== columnId) return false

    // Search filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchTitle = task.title.toLowerCase().includes(q)
      const matchDesc = task.description.toLowerCase().includes(q)
      const matchTag = task.tag.toLowerCase().includes(q)
      if (!matchTitle && !matchDesc && !matchTag) return false
    }

    // Priority filter
    if (selectedPriorityFilter.value !== 'all') {
      if (task.priority !== selectedPriorityFilter.value) return false
    }

    // Tag filter
    if (selectedTagFilter.value !== 'all') {
      if (task.tag !== selectedTagFilter.value) return false
    }

    return true
  })
}

// Progress metrics
const totalTasksCount = computed(() => tasks.value.length)
const completedTasksCount = computed(() => tasks.value.filter((t) => t.columnId === 'done').length)
const completionPercentage = computed(() => {
  if (totalTasksCount.value === 0) return 0
  return Math.round((completedTasksCount.value / totalTasksCount.value) * 100)
})

// Modal Openers
const openCreateTask = (columnId = 'todo') => {
  editingTask.value = null
  taskForm.value = {
    title: '',
    description: '',
    columnId: columnId,
    priority: 'medium',
    tag: 'Frontend',
    assignee: 'Alex Morgan',
    assigneeInitials: 'AM',
    assigneeBg: '#10b981',
    dueDate: 'Sep 18',
    totalSubtasks: 3,
    completedSubtasks: 0,
  }
  isTaskModalOpen.value = true
}

const openEditTask = (task) => {
  editingTask.value = task
  taskForm.value = { ...task }
  isTaskModalOpen.value = true
}

const saveTask = () => {
  if (!taskForm.value.title.trim()) {
    toast.danger('Task title is required')
    return
  }

  if (editingTask.value) {
    // Update
    const idx = tasks.value.findIndex((t) => t.id === editingTask.value.id)
    if (idx !== -1) {
      tasks.value[idx] = {
        ...tasks.value[idx],
        ...taskForm.value,
      }
      toast.success('Task details updated!')
    }
  } else {
    // Create
    const newTask = {
      id: Date.now(),
      ...taskForm.value,
      comments: 0,
      attachments: 0,
      isDueSoon: false,
    }
    tasks.value.push(newTask)
    toast.success('New task added to board!')
  }

  isTaskModalOpen.value = false
}

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((t) => t.id !== taskId)
  isTaskModalOpen.value = false
  toast.warning('Task removed from board')
}

// Add Column
const addColumn = () => {
  if (!newColumnTitle.value.trim()) return
  const id = newColumnTitle.value.toLowerCase().replace(/\s+/g, '_')
  columns.value.push({
    id,
    title: newColumnTitle.value.trim(),
    badgeClass: 'badge-tonal-primary',
    accentColor: 'var(--primary)',
  })
  newColumnTitle.value = ''
  isColumnModalOpen.value = false
  toast.success('New column created!')
}

// Priority helper
const getPriorityBadge = (p) => {
  if (p === 'high') return { text: 'High', class: 'badge-tonal-danger' }
  if (p === 'medium') return { text: 'Medium', class: 'badge-tonal-warning' }
  return { text: 'Low', class: 'badge-tonal-secondary' }
}
</script>

<template>
  <div class="kanban-page d-flex flex-column gap-4">
    <!-- ===================================================================== -->
    <!-- BOARD HEADER & METRICS SUMMARY                                        -->
    <!-- ===================================================================== -->
    <div class="d-flex flex-column flex-lg-row align-start align-lg-center justify-between gap-3">
      <div>
        <h2 class="mb-0">Product Engineering Roadmap</h2>
        <p class="text-secondary mb-0">Track sprint velocity, backlog prioritization, and cross-functional deliveries.
        </p>
      </div>

      <!-- Header actions & Team Avatars -->
      <div class="d-flex align-center gap-3 flex-wrap">
        <!-- Team avatar stack -->
        <div class="avatar-stack d-flex align-center">
          <div v-for="(member, i) in teamMembers" :key="i"
            class="avatar-member rounded-circle text-white font-bold text-xs d-flex align-center justify-center border-2"
            :style="{ background: member.bg, zIndex: 10 - i }" :title="member.name">
            {{ member.initials }}
          </div>
          <div
            class="avatar-member avatar-more rounded-circle font-bold text-xs d-flex align-center justify-center border-2">
            +3
          </div>
        </div>

        <div class="d-flex align-center gap-2">
          <JBtn color="secondary" variant="outlined" prepend-icon="➕" @click="isColumnModalOpen = true">
            Add Column
          </JBtn>
          <JBtn color="primary" variant="solid" prepend-icon="📋" @click="openCreateTask('todo')">
            Create Task
          </JBtn>
        </div>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- FILTER BAR & SPRINT PROGRESS                                          -->
    <!-- ===================================================================== -->
    <div class="card card-bordered p-3">
      <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
        <!-- Search and filters -->
        <div class="d-flex align-center gap-2 flex-wrap flex-1">
          <div style="min-width: 240px;">
            <JInput v-model="searchQuery" placeholder="Filter tasks, tags, or assignees..." size="sm" pattern="boxed"
              prepend-text="🔍" clearable />
          </div>

          <div class="d-flex align-center gap-1">
            <button v-for="p in priorityOptions" :key="p.value" class="btn btn-xs rounded-pill"
              :class="selectedPriorityFilter === p.value ? 'btn-primary' : 'btn-ghost'"
              @click="selectedPriorityFilter = p.value">
              {{ p.label }}
            </button>
          </div>
        </div>

        <!-- Sprint Stats Bar -->
        <div class="d-flex align-center gap-3">
          <div class="text-right">
            <div class="text-xs text-muted">Completed</div>
            <div class="text-sm font-semibold">{{ completedTasksCount }} / {{ totalTasksCount }} Tasks</div>
          </div>
          <div style="width: 120px; height: 8px; background: var(--bg-hover);" class="rounded-pill overflow-hidden">
            <div class="bg-success rounded-pill transition-all"
              :style="{ width: `${completionPercentage}%`, height: '100%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- KANBAN BOARD DRAGGABLE COLUMNS                                        -->
    <!-- ===================================================================== -->
    <div class="kanban-board-container pb-4">
      <div class="kanban-columns-track d-flex gap-4">
        <!-- Individual Column -->
        <div v-for="column in columns" :key="column.id" :class="[
          'kanban-column d-flex flex-column rounded-lg transition-all',
          { 'drag-over-active': dragOverColumnId === column.id }
        ]" @dragover="onDragOver($event, column.id)" @dragleave="onDragLeave($event, column.id)"
          @drop="onDrop($event, column.id)">
          <!-- Column Header -->
          <div class="column-header d-flex align-center justify-between p-3 border-b">
            <div class="d-flex align-center gap-2">
              <span class="column-accent-dot rounded-circle"
                :style="{ backgroundColor: column.accentColor, width: '8px', height: '8px' }"></span>
              <span class="font-semibold text-sm">{{ column.title }}</span>
              <span class="badge badge-pill badge-xs" :class="column.badgeClass">
                {{ getColumnTasks(column.id).length }}
              </span>
            </div>

            <button class="btn btn-xs btn-ghost text-muted hover:text-primary" title="Add task to this column"
              @click="openCreateTask(column.id)">
              ＋
            </button>
          </div>

          <!-- Tasks List Drop Target -->
          <div class="column-cards-container flex-1 p-3 d-flex flex-column gap-3 overflow-y-auto">
            <!-- Empty state -->
            <div v-if="getColumnTasks(column.id).length === 0"
              class="empty-column-placeholder text-center p-4 border-dashed rounded text-xs text-muted">
              Drop cards here or click ＋ to add
            </div>

            <!-- Task Card -->
            <article v-for="task in getColumnTasks(column.id)" :key="task.id"
              class="kanban-card card card-elevated p-3 cursor-grab transition-all" draggable="true"
              @dragstart="onDragStart($event, task)" @click="openEditTask(task)">
              <!-- Card Top: Tags & Priority -->
              <div class="d-flex align-center justify-between mb-2">
                <span class="badge badge-pill badge-xs" :class="`badge-tonal-${task.tagColor || 'primary'}`">
                  {{ task.tag }}
                </span>
                <span class="badge badge-pill badge-xs" :class="getPriorityBadge(task.priority).class">
                  {{ getPriorityBadge(task.priority).text }}
                </span>
              </div>

              <!-- Card Title -->
              <h5 class="kanban-card-title text-sm font-semibold mb-1">
                {{ task.title }}
              </h5>

              <!-- Card Description snippet -->
              <p class="kanban-card-desc text-xs text-secondary mb-3">
                {{ task.description }}
              </p>

              <!-- Subtasks progress bar -->
              <div v-if="task.totalSubtasks" class="subtasks-wrapper mb-3">
                <div class="d-flex justify-between text-xs text-muted mb-1">
                  <span>Subtasks</span>
                  <span>{{ task.completedSubtasks }}/{{ task.totalSubtasks }}</span>
                </div>
                <div class="progress-bar-track rounded-pill overflow-hidden"
                  style="height: 4px; background: var(--bg-hover);">
                  <div class="bg-primary rounded-pill transition-all" :style="{
                    width: `${(task.completedSubtasks / task.totalSubtasks) * 100}%`,
                    height: '100%'
                  }"></div>
                </div>
              </div>

              <!-- Card Footer: Due date, metrics & Assignee -->
              <div class="card-footer-meta d-flex align-center justify-between pt-2 border-t">
                <div class="d-flex align-center gap-2 text-xs text-muted">
                  <!-- Due date -->
                  <span class="d-flex align-center gap-1" :class="{ 'text-danger font-medium': task.isDueSoon }">
                    📅 {{ task.dueDate }}
                  </span>

                  <!-- Comments & Attachments -->
                  <span v-if="task.comments">💬 {{ task.comments }}</span>
                  <span v-if="task.attachments">📎 {{ task.attachments }}</span>
                </div>

                <!-- Assignee Avatar -->
                <div
                  class="assignee-avatar rounded-circle font-bold text-white text-xs d-flex align-center justify-center"
                  :style="{ background: task.assigneeBg, width: '24px', height: '24px' }" :title="task.assignee">
                  {{ task.assigneeInitials }}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- CREATE / EDIT TASK MODAL                                              -->
    <!-- ===================================================================== -->
    <JModal v-model="isTaskModalOpen" :title="editingTask ? 'Edit Task' : 'Create New Sprint Task'" size="md"
      position="center">
      <form class="d-flex flex-column gap-3" @submit.prevent="saveTask">
        <JInput v-model="taskForm.title" label="Task Title" placeholder="e.g. Implement OAuth 2.0 PKCE flow" required />

        <div class="row g-2">
          <div class="col-6">
            <label class="text-xs font-semibold text-secondary mb-1 d-block">Column</label>
            <select v-model="taskForm.columnId" class="form-select text-sm p-2 rounded w-full border"
              style="background: var(--bg-surface); color: var(--text-primary); border-color: var(--border-color);">
              <option v-for="c in columns" :key="c.id" :value="c.id">{{ c.title }}</option>
            </select>
          </div>

          <div class="col-6">
            <label class="text-xs font-semibold text-secondary mb-1 d-block">Priority</label>
            <select v-model="taskForm.priority" class="form-select text-sm p-2 rounded w-full border"
              style="background: var(--bg-surface); color: var(--text-primary); border-color: var(--border-color);">
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        <div class="row g-2">
          <div class="col-6">
            <JInput v-model="taskForm.tag" label="Tag / Component" placeholder="e.g. Frontend, DevOps" />
          </div>
          <div class="col-6">
            <JInput v-model="taskForm.dueDate" label="Due Date" placeholder="e.g. Sep 22" />
          </div>
        </div>

        <div class="d-flex flex-column gap-1">
          <label class="text-xs font-semibold text-secondary">Description</label>
          <JTextarea v-model="taskForm.description"
            placeholder="Provide architectural context, acceptance criteria, or PR links..." :rows="4" autogrow />
        </div>
      </form>

      <template #footer="{ close }">
        <div class="d-flex align-center justify-between w-full">
          <div>
            <JBtn v-if="editingTask" color="danger" variant="ghost" size="sm" @click="deleteTask(editingTask.id)">
              Delete
            </JBtn>
          </div>
          <div class="d-flex align-center gap-2">
            <JBtn variant="ghost" size="sm" @click="close">Cancel</JBtn>
            <JBtn color="primary" size="sm" @click="saveTask">
              {{ editingTask ? 'Save Changes' : 'Create Task' }}
            </JBtn>
          </div>
        </div>
      </template>
    </JModal>

    <!-- ===================================================================== -->
    <!-- ADD COLUMN MODAL                                                      -->
    <!-- ===================================================================== -->
    <JModal v-model="isColumnModalOpen" title="Add Kanban Column" size="sm" position="center">
      <div class="d-flex flex-column gap-3">
        <JInput v-model="newColumnTitle" label="Column Title" placeholder="e.g. In Testing, Blocked" required />
      </div>

      <template #footer="{ close }">
        <div class="d-flex align-center justify-end gap-2 w-full">
          <JBtn variant="ghost" size="sm" @click="close">Cancel</JBtn>
          <JBtn color="primary" size="sm" @click="addColumn">Add Column</JBtn>
        </div>
      </template>
    </JModal>
  </div>
</template>

<style scoped>
.avatar-stack .avatar-member,
.assignee-avatar {
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-stack .avatar-member {
  width: 32px;
  height: 32px;
  margin-left: -8px;
  box-shadow: 0 0 0 2px var(--bg-surface);
}

.avatar-stack .avatar-member:first-child {
  margin-left: 0;
}

.avatar-more {
  background: var(--bg-surface-elevated);
  color: var(--text-secondary);
}

.column-accent-dot {
  border-radius: 50% !important;
}

.kanban-board-container {
  overflow-x: auto;
  min-height: calc(100vh - 270px);
}

.kanban-columns-track {
  min-width: 1200px;
  align-items: stretch;
}

.kanban-column {
  width: 320px;
  flex-shrink: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  min-height: 550px;
}

.kanban-column.drag-over-active {
  border-color: var(--primary);
  background: var(--primary-tonal);
  box-shadow: 0 0 15px rgba(var(--primary-rgb, 79, 70, 229), 0.2);
}

.kanban-card {
  border: 1px solid var(--border-color);
  user-select: none;
}

.kanban-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

.kanban-card:active {
  cursor: grabbing;
}

.kanban-card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
