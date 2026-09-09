<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useToast } from '../composables/useToast'

const toast = useToast()

// Conversation mode: 'all' | 'channels' | 'direct'
const activeTab = ref('all')
const searchQuery = ref('')
const activeChatId = ref('dm-1')
const isInfoDrawerOpen = ref(false)
const isMobileListVisible = ref(true)

// Input text & typing state
const messageText = ref('')
const isOtherTyping = ref(false)
const messagesContainerRef = ref(null)

// Channels data
const channels = ref([
  {
    id: 'ch-general',
    name: 'general',
    type: 'channel',
    description: 'Company-wide updates, watercooler discussions, and general announcements.',
    membersCount: 48,
    unread: 2,
    topic: 'Official company updates and team discussions',
  },
  {
    id: 'ch-engineering',
    name: 'engineering',
    type: 'channel',
    description: 'Frontend, backend, DevOps architecture, and code review threads.',
    membersCount: 24,
    unread: 0,
    topic: 'Vite 6, Vue 3.5 migration and design token sync',
  },
  {
    id: 'ch-design',
    name: 'design-system',
    type: 'channel',
    description: 'Figma tokens, component aesthetics, accessibility, and UI reviews.',
    membersCount: 16,
    unread: 5,
    topic: 'JUI Component Library Design Tokens v2.0',
  },
])

// Direct messages data
const directMessages = ref([
  {
    id: 'dm-1',
    name: 'Sarah Jenkins',
    type: 'direct',
    role: 'Lead Product Designer',
    email: 'sarah.j@designstudio.io',
    avatar: 'SJ',
    avatarBg: '#6366f1',
    status: 'online', // 'online' | 'away' | 'offline'
    lastMessage: 'I reviewed the Figma tokens, the new glassmorphism cards look incredible!',
    time: '11:24 AM',
    unread: 1,
    bio: 'Designing intuitive interfaces with micro-animations and WCAG AA compliance.',
  },
  {
    id: 'dm-2',
    name: 'Alex Morgan',
    type: 'direct',
    role: 'Senior Fullstack Engineer',
    email: 'alex.m@cloudcorp.net',
    avatar: 'AM',
    avatarBg: '#10b981',
    status: 'online',
    lastMessage: 'The Kanban drag and drop drop-target highlight is working smoothly.',
    time: '10:15 AM',
    unread: 0,
    bio: 'Node.js, Vue 3, Pinia, and cloud native architectures.',
  },
  {
    id: 'dm-3',
    name: 'Elena Rostova',
    type: 'direct',
    role: 'DevOps & Reliability',
    email: 'elena@cybernetics.ai',
    avatar: 'ER',
    avatarBg: '#f59e0b',
    status: 'away',
    lastMessage: 'Prometheus alerts are configured for the API gateway.',
    time: 'Yesterday',
    unread: 0,
    bio: 'Kubernetes, Terraform, observability pipelines, and 99.99% uptime.',
  },
  {
    id: 'dm-4',
    name: 'Marcus Chen',
    type: 'direct',
    role: 'Security Architect',
    email: 'marcus@secureshield.com',
    avatar: 'MC',
    avatarBg: '#f43f5e',
    status: 'offline',
    lastMessage: 'Rotated the staging credentials for AWS us-east-1.',
    time: 'Sep 7',
    unread: 0,
    bio: 'Zero-trust architecture, WebAuthn keys, and crypto hygiene.',
  },
])

// Message threads storage keyed by chatId
const chatThreads = ref({
  'dm-1': [
    {
      id: 1,
      sender: 'Sarah Jenkins',
      senderAvatar: 'SJ',
      senderBg: '#6366f1',
      isMe: false,
      text: 'Good morning! Have you had a chance to check the updated color palettes for the JUI dark mode?',
      time: '11:15 AM',
      reactions: [{ emoji: '👋', count: 1, userReacted: true }],
    },
    {
      id: 2,
      sender: 'Me',
      senderAvatar: 'ME',
      senderBg: 'var(--primary)',
      isMe: true,
      text: 'Yes! The contrast ratio on tonal badges and buttons looks substantially crisper. Checked it across OLED displays.',
      time: '11:18 AM',
      reactions: [{ emoji: '🔥', count: 2, userReacted: false }],
    },
    {
      id: 3,
      sender: 'Sarah Jenkins',
      senderAvatar: 'SJ',
      senderBg: '#6366f1',
      isMe: false,
      text: 'Here is the code snippet for the dynamic CSS variable injection we discussed:',
      time: '11:20 AM',
      isCode: true,
      codeSnippet: `const applyThemeTokens = (theme) => {\n  const root = document.documentElement;\n  root.style.setProperty('--primary', theme.primary);\n  root.style.setProperty('--bg-surface', theme.surface);\n};`,
      reactions: [{ emoji: '🚀', count: 3, userReacted: true }],
    },
    {
      id: 4,
      sender: 'Sarah Jenkins',
      senderAvatar: 'SJ',
      senderBg: '#6366f1',
      isMe: false,
      text: 'I reviewed the Figma tokens, the new glassmorphism cards look incredible!',
      time: '11:24 AM',
      reactions: [{ emoji: '❤️', count: 1, userReacted: true }],
    },
  ],
  'ch-general': [
    {
      id: 101,
      sender: 'Elena Rostova',
      senderAvatar: 'ER',
      senderBg: '#f59e0b',
      isMe: false,
      text: '🚀 Sprint 28 is officially in motion! Make sure to verify your Kanban tasks before standup today.',
      time: '9:00 AM',
      reactions: [{ emoji: '🎉', count: 8, userReacted: true }],
    },
    {
      id: 102,
      sender: 'Alex Morgan',
      senderAvatar: 'AM',
      senderBg: '#10b981',
      isMe: false,
      text: 'All CI/CD regression tests are passing on Vite 6.',
      time: '9:45 AM',
      reactions: [{ emoji: '👍', count: 4, userReacted: true }],
    },
  ],
  'ch-engineering': [
    {
      id: 201,
      sender: 'Alex Morgan',
      senderAvatar: 'AM',
      senderBg: '#10b981',
      isMe: false,
      text: 'We just refactored JInput to support underlined, filled, boxed, and floating patterns seamlessly.',
      time: 'Yesterday',
      reactions: [{ emoji: '✨', count: 3, userReacted: false }],
    },
  ],
  'ch-design': [
    {
      id: 301,
      sender: 'Sarah Jenkins',
      senderAvatar: 'SJ',
      senderBg: '#6366f1',
      isMe: false,
      text: 'Sharing the initial mockups for the Email UI, Kanban Board, and Chat pages.',
      time: 'Sep 6',
      reactions: [{ emoji: '🎨', count: 5, userReacted: true }],
    },
  ],
  'dm-2': [
    {
      id: 401,
      sender: 'Alex Morgan',
      senderAvatar: 'AM',
      senderBg: '#10b981',
      isMe: false,
      text: 'The Kanban drag and drop drop-target highlight is working smoothly.',
      time: '10:15 AM',
      reactions: [],
    },
  ],
})

// Current active conversation object
const currentChat = computed(() => {
  const channel = channels.value.find((c) => c.id === activeChatId.value)
  if (channel) return channel
  return directMessages.value.find((d) => d.id === activeChatId.value) || directMessages.value[0]
})

// Current messages list
const currentMessages = computed(() => {
  return chatThreads.value[activeChatId.value] || []
})

// Filtered lists
const filteredChannels = computed(() => {
  if (activeTab.value === 'direct') return []
  return channels.value.filter((c) => {
    if (!searchQuery.value.trim()) return true
    return c.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  })
})

const filteredDirects = computed(() => {
  if (activeTab.value === 'channels') return []
  return directMessages.value.filter((d) => {
    if (!searchQuery.value.trim()) return true
    return d.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  })
})

// Switch chat conversation
const selectChat = (id) => {
  activeChatId.value = id
  isMobileListVisible.value = false
  // Reset unread count
  const ch = channels.value.find((c) => c.id === id)
  if (ch) ch.unread = 0
  const dm = directMessages.value.find((d) => d.id === id)
  if (dm) dm.unread = 0
  scrollToBottom()
}

// Scroll chat to bottom helper
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainerRef.value) {
    messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight
  }
}

// Sending message
const sendMessage = () => {
  if (!messageText.value.trim()) return

  const newMsg = {
    id: Date.now(),
    sender: 'Me',
    senderAvatar: 'ME',
    senderBg: 'var(--primary)',
    isMe: true,
    text: messageText.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    reactions: [],
  }

  if (!chatThreads.value[activeChatId.value]) {
    chatThreads.value[activeChatId.value] = []
  }

  chatThreads.value[activeChatId.value].push(newMsg)
  const sentText = messageText.value.trim()
  messageText.value = ''
  scrollToBottom()

  // Simulate smart interactive reply
  simulateBotReply(sentText)
}

// Simulated dynamic conversation bot
const simulateBotReply = (userPrompt) => {
  isOtherTyping.value = true

  setTimeout(() => {
    isOtherTyping.value = false
    let replyText = 'That sounds like a great plan! Let me run some quick automated tests to make sure.'

    if (userPrompt.toLowerCase().includes('hello') || userPrompt.toLowerCase().includes('hi')) {
      replyText = `Hey there! Great to collaborate on this. What component or view should we tackle next?`
    } else if (userPrompt.toLowerCase().includes('design') || userPrompt.toLowerCase().includes('ui')) {
      replyText = `The UI tokens and theme customizer work in sync now. We can test any color preset instantly.`
    } else if (userPrompt.toLowerCase().includes('kanban') || userPrompt.toLowerCase().includes('task')) {
      replyText = `Awesome, I see the task cards updating in real time. Velocity is trending upward!`
    }

    const replyMsg = {
      id: Date.now() + 1,
      sender: currentChat.value.name,
      senderAvatar: currentChat.value.avatar || currentChat.value.name.slice(0, 2).toUpperCase(),
      senderBg: currentChat.value.avatarBg || '#6366f1',
      isMe: false,
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [{ emoji: '💡', count: 1, userReacted: false }],
    }

    if (!chatThreads.value[activeChatId.value]) {
      chatThreads.value[activeChatId.value] = []
    }
    chatThreads.value[activeChatId.value].push(replyMsg)
    scrollToBottom()
  }, 1300)
}

// Reaction toggler
const toggleReaction = (msg, emoji) => {
  let reaction = msg.reactions.find((r) => r.emoji === emoji)
  if (reaction) {
    if (reaction.userReacted) {
      reaction.count--
      reaction.userReacted = false
      if (reaction.count <= 0) {
        msg.reactions = msg.reactions.filter((r) => r.emoji !== emoji)
      }
    } else {
      reaction.count++
      reaction.userReacted = true
    }
  } else {
    msg.reactions.push({ emoji, count: 1, userReacted: true })
  }
}

// Copy code helper
const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  toast.success('Code snippet copied to clipboard!')
}

// Simulated action toasts
const simulateVoiceCall = () => {
  toast.primary(`Connecting encrypted voice call with ${currentChat.value.name}...`)
}

const simulateVideoCall = () => {
  toast.info(`Initiating HD video conference with ${currentChat.value.name}...`)
}

// Sidebar Resizable Width State
const sidebarWidth = ref(350)
const minSidebarWidth = 200
const maxSidebarWidth = 520
const isResizingSidebar = ref(false)

const startSidebarResize = (e) => {
  e.preventDefault()
  isResizingSidebar.value = true
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'

  const startX = e.clientX
  const startWidth = sidebarWidth.value

  const onMouseMove = (moveEvent) => {
    const delta = moveEvent.clientX - startX
    const newWidth = Math.min(maxSidebarWidth, Math.max(minSidebarWidth, startWidth + delta))
    sidebarWidth.value = newWidth
  }

  const onMouseUp = () => {
    isResizingSidebar.value = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const resetSidebarWidth = () => {
  sidebarWidth.value = 350
  toast.info('Chat list width reset to default (280px)', { timeout: 1500 })
}

onMounted(() => {
  scrollToBottom()
})

onUnmounted(() => {
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
})
</script>

<template>
  <div class="chat-page d-flex flex-column gap-4">
    <!-- ===================================================================== -->
    <!-- TOP HEADER                                                            -->
    <!-- ===================================================================== -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2 class="mb-0">Real-Time Team Messaging</h2>
        <p class="text-secondary mb-0">Direct messages, multi-channel collaboration, and developer discussion threads.
        </p>
      </div>

      <div class="d-flex align-center gap-2">
        <JBtn color="secondary" variant="outlined" prepend-icon="📞" @click="simulateVoiceCall">
          Audio Call
        </JBtn>
        <JBtn color="primary" variant="solid" prepend-icon="📹" @click="simulateVideoCall">
          Start Video
        </JBtn>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- MAIN THREE-PANE CHAT LAYOUT                                           -->
    <!-- ===================================================================== -->
    <div class="chat-layout-card card card-bordered p-0 overflow-hidden shadow-sm">
      <div class="chat-container">
        <!-- ================================================================= -->
        <!-- PANE 1: CONVERSATIONS & CHANNELS SIDEBAR                          -->
        <!-- ================================================================= -->
        <aside :class="[
          'chat-sidebar d-flex flex-column',
          { 'd-none d-lg-flex': !isMobileListVisible && activeChatId }
        ]" :style="{ width: `${sidebarWidth}px` }">
          <!-- Search input -->
          <div class="p-3 border-b">
            <JInput v-model="searchQuery" placeholder="Search chats, channels..." size="sm" pattern="boxed"
              prepend-text="🔍" clearable />

            <!-- Filter tabs -->
            <div class="d-flex align-center gap-1 mt-2 p-1 rounded bg-surface-tonal">
              <button class="filter-tab-btn btn btn-xs flex-1 rounded" :class="{ 'active': activeTab === 'all' }"
                @click="activeTab = 'all'">
                All
              </button>
              <button class="filter-tab-btn btn btn-xs flex-1 rounded" :class="{ 'active': activeTab === 'channels' }"
                @click="activeTab = 'channels'">
                Channels
              </button>
              <button class="filter-tab-btn btn btn-xs flex-1 rounded" :class="{ 'active': activeTab === 'direct' }"
                @click="activeTab = 'direct'">
                Direct
              </button>
            </div>
          </div>

          <!-- Channels & Users list -->
          <div class="chat-list-scroll flex-1 overflow-y-auto p-2 d-flex flex-column gap-3">
            <!-- Channels Section -->
            <div v-if="filteredChannels.length" class="channel-group">
              <div class="text-xs font-semibold text-muted text-uppercase px-2 mb-1">
                Channels ({{ filteredChannels.length }})
              </div>
              <div class="d-flex flex-column gap-1">
                <button v-for="ch in filteredChannels" :key="ch.id" :class="[
                  'channel-item d-flex align-center justify-between p-2 rounded w-full border-0 transition-all text-left',
                  { 'active': activeChatId === ch.id }
                ]" @click="selectChat(ch.id)">
                  <div class="d-flex align-center gap-2">
                    <span class="channel-hash font-bold text-secondary">#</span>
                    <span class="font-medium text-sm">{{ ch.name }}</span>
                  </div>
                  <span v-if="ch.unread" class="badge badge-pill badge-primary badge-xs">
                    {{ ch.unread }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Direct Messages Section -->
            <div v-if="filteredDirects.length" class="direct-group">
              <div class="text-xs font-semibold text-muted text-uppercase px-2 mb-1">
                Direct Messages ({{ filteredDirects.length }})
              </div>
              <div class="d-flex flex-column gap-1">
                <button v-for="dm in filteredDirects" :key="dm.id" :class="[
                  'dm-item d-flex align-center gap-3 p-2 rounded w-full transition-all text-left',
                  { 'active': activeChatId === dm.id }
                ]" @click="selectChat(dm.id)">
                  <!-- Avatar with presence badge -->
                  <div class="position-relative flex-shrink-0">
                    <div class="dm-avatar text-white font-bold text-xs d-flex align-center justify-center"
                      :style="{ background: dm.avatarBg, width: '38px', height: '38px' }">
                      {{ dm.avatar }}
                    </div>
                    <span class="presence-dot position-absolute" :class="`presence-${dm.status}`"></span>
                  </div>

                  <!-- DM summary -->
                  <div class="flex-1 min-w-0">
                    <div class="d-flex align-center justify-between mb-1">
                      <span class="dm-name font-semibold text-sm truncate">{{ dm.name }}</span>
                      <span class="dm-time text-xs text-muted">{{ dm.time }}</span>
                    </div>
                    <p class="dm-preview text-xs text-secondary truncate mb-0">
                      {{ dm.lastMessage }}
                    </p>
                  </div>

                  <span v-if="dm.unread" class="badge badge-pill badge-primary badge-xs">
                    {{ dm.unread }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- ================================================================= -->
        <!-- DRAGGABLE RESIZE DIVIDER HANDLE                                   -->
        <!-- ================================================================= -->
        <div class="sidebar-resizer d-none d-lg-flex align-center justify-center cursor-col-resize"
          :class="{ 'is-resizing': isResizingSidebar }" title="Drag to resize chat list width, double-click to reset"
          @mousedown="startSidebarResize" @dblclick="resetSidebarWidth">
          <div class="resizer-handle-grip"></div>
        </div>

        <!-- ================================================================= -->
        <!-- PANE 2: ACTIVE CONVERSATION WINDOW                                -->
        <!-- ================================================================= -->
        <main :class="[
          'chat-main-window flex-1 d-flex flex-column',
          { 'd-none d-lg-flex': isMobileListVisible && !activeChatId }
        ]">
          <!-- Active Conversation Header -->
          <div class="chat-header p-3 border-b d-flex align-center justify-between gap-3">
            <div class="d-flex align-center gap-3 min-w-0">
              <!-- Mobile Back Button -->
              <button class="btn btn-sm btn-ghost d-lg-none" @click="isMobileListVisible = true">
                ←
              </button>

              <!-- Channel / User Avatar -->
              <div v-if="currentChat.avatar"
                class="current-chat-avatar text-white font-bold text-xs d-flex align-center justify-center flex-shrink-0"
                :style="{ background: currentChat.avatarBg || '#6366f1', width: '38px', height: '38px' }">
                {{ currentChat.avatar }}
              </div>
              <div v-else
                class="current-chat-avatar bg-primary-tonal text-primary font-bold text-sm d-flex align-center justify-center flex-shrink-0"
                style="width: 38px; height: 38px;">
                #
              </div>

              <!-- Details -->
              <div class="min-w-0">
                <h5 class="mb-0 text-sm font-semibold truncate text-primary-heading">
                  {{ currentChat.type === 'channel' ? `#${currentChat.name}` : currentChat.name }}
                </h5>
                <div class="d-flex align-center gap-2 text-xs text-secondary">
                  <span v-if="isOtherTyping" class="text-primary font-medium animate-pulse">
                    Typing...
                  </span>
                  <span v-else-if="currentChat.type === 'channel'">
                    {{ currentChat.membersCount }} members • {{ currentChat.topic }}
                  </span>
                  <span v-else class="d-flex align-center gap-1">
                    <span :class="currentChat.status === 'online' ? 'text-success' : 'text-muted'">●</span>
                    <span>{{ currentChat.status === 'online' ? 'Active Now' : currentChat.status }}</span>
                    <span>•</span>
                    <span class="text-muted">{{ currentChat.role }}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Header Action Icons -->
            <div class="d-flex align-center gap-1">
              <button class="btn btn-sm btn-ghost" title="Audio Call" @click="simulateVoiceCall">📞</button>
              <button class="btn btn-sm btn-ghost" title="Video Call" @click="simulateVideoCall">📹</button>
              <button class="btn btn-sm btn-ghost" :class="{ 'btn-tonal-primary': isInfoDrawerOpen }"
                title="Toggle details pane" @click="isInfoDrawerOpen = !isInfoDrawerOpen">
                ℹ
              </button>
            </div>
          </div>

          <!-- Messages Scrollable Body -->
          <div ref="messagesContainerRef"
            class="chat-messages-body flex-1 p-4 overflow-y-auto d-flex flex-column gap-3">
            <!-- Date Divider -->
            <div class="date-divider text-center my-2 position-relative d-flex align-center justify-center">
              <span class="date-badge px-3 py-1 text-xs font-medium">Today</span>
            </div>

            <!-- Message Item -->
            <div v-for="msg in currentMessages" :key="msg.id" :class="[
              'message-row d-flex gap-2',
              msg.isMe ? 'justify-end' : 'justify-start'
            ]">
              <!-- Avatar for incoming -->
              <div v-if="!msg.isMe"
                class="msg-avatar text-white font-bold text-xs d-flex align-center justify-center flex-shrink-0"
                :style="{ background: msg.senderBg, width: '34px', height: '34px' }">
                {{ msg.senderAvatar }}
              </div>

              <!-- Message Bubble & Meta -->
              <div :class="['message-content-wrapper d-flex flex-column', msg.isMe ? 'align-end' : 'align-start']">
                <div class="d-flex align-center gap-2 mb-1 text-xs">
                  <span v-if="!msg.isMe" class="sender-name font-semibold">{{ msg.sender }}</span>
                  <span class="msg-timestamp text-muted">{{ msg.time }}</span>
                </div>

                <!-- Bubble -->
                <div :class="[
                  'message-bubble p-3 text-sm transition-all',
                  msg.isMe ? 'msg-me' : 'msg-other'
                ]">
                  <p class="mb-0 leading-relaxed">{{ msg.text }}</p>

                  <!-- Code Block if present -->
                  <div v-if="msg.isCode" class="code-snippet-box rounded-lg mt-2 overflow-hidden border">
                    <div class="code-header d-flex align-center justify-between px-3 py-1">
                      <span class="text-xs font-mono code-lang-tag">javascript</span>
                      <button class="copy-code-btn btn btn-xs btn-ghost text-xs" title="Copy code"
                        @click="copyCode(msg.codeSnippet)">
                        📋 Copy
                      </button>
                    </div>
                    <pre class="m-0 p-3 text-xs font-mono overflow-x-auto"><code>{{ msg.codeSnippet }}</code></pre>
                  </div>
                </div>

                <!-- Reactions Pill Row -->
                <div class="reactions-row d-flex align-center gap-1 mt-1">
                  <button v-for="r in msg.reactions" :key="r.emoji" :class="[
                    'reaction-pill btn btn-xs d-flex align-center gap-1 py-0 px-2',
                    { 'active': r.userReacted }
                  ]" @click="toggleReaction(msg, r.emoji)">
                    <span>{{ r.emoji }}</span>
                    <span class="text-xs font-semibold">{{ r.count }}</span>
                  </button>

                  <!-- Quick Add Reaction -->
                  <button class="add-reaction-btn btn btn-xs text-muted" title="Add reaction"
                    @click="toggleReaction(msg, '👍')">
                    ＋
                  </button>
                </div>
              </div>
            </div>

            <!-- Typing Indicator Bubble -->
            <div v-if="isOtherTyping" class="message-row d-flex gap-2 justify-start align-center">
              <div class="msg-avatar text-white font-bold text-xs d-flex align-center justify-center flex-shrink-0"
                :style="{ background: currentChat.avatarBg || '#6366f1', width: '34px', height: '34px' }">
                {{ currentChat.avatar || '...' }}
              </div>
              <div class="typing-bubble p-2 px-3 rounded-lg d-flex align-center gap-1">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            </div>
          </div>

          <!-- Chat Input Footer -->
          <div class="chat-input-footer p-3 border-t">
            <form class="d-flex align-center gap-2" @submit.prevent="sendMessage">
              <button type="button" class="btn btn-sm btn-ghost text-muted" title="Attach document or image"
                @click="toast.info('File attachment simulation')">
                📎
              </button>

              <div class="flex-1">
                <input v-model="messageText" type="text" class="chat-text-input form-control w-full p-2 px-3 text-sm"
                  placeholder="Type a message... (Press Enter to send)" />
              </div>

              <button type="button" class="btn btn-sm btn-ghost text-muted" title="Insert emoji"
                @click="messageText += ' 🚀'">
                😊
              </button>

              <JBtn type="submit" color="primary" variant="solid" size="sm" :disabled="!messageText.trim()">
                Send
              </JBtn>
            </form>
          </div>
        </main>

        <!-- ================================================================= -->
        <!-- PANE 3: COLLAPSIBLE INFO & MEDIA DRAWER                           -->
        <!-- ================================================================= -->
        <aside v-if="isInfoDrawerOpen" class="chat-info-drawer border-l p-4 d-flex flex-column gap-4 overflow-y-auto">
          <div class="d-flex align-center justify-between">
            <h5 class="mb-0">Profile & Info</h5>
            <button class="btn btn-xs btn-ghost" @click="isInfoDrawerOpen = false">✕</button>
          </div>

          <!-- Profile details -->
          <div class="text-center">
            <div class="drawer-avatar text-white font-bold text-lg d-flex align-center justify-center mx-auto mb-2"
              :style="{ background: currentChat.avatarBg || '#6366f1', width: '64px', height: '64px' }">
              {{ currentChat.avatar || '#' }}
            </div>
            <h4 class="mb-1">{{ currentChat.name }}</h4>
            <p class="text-xs text-secondary mb-2">{{ currentChat.role || currentChat.topic }}</p>
            <span v-if="currentChat.status" class="badge badge-pill badge-xs"
              :class="currentChat.status === 'online' ? 'badge-tonal-success' : 'badge-tonal-secondary'">
              {{ currentChat.status }}
            </span>
          </div>

          <hr class="opacity-20 m-0" />

          <!-- Bio / Description -->
          <div>
            <div class="text-xs font-semibold text-muted text-uppercase mb-1">About</div>
            <p class="text-xs text-secondary mb-0">
              {{ currentChat.bio || currentChat.description }}
            </p>
          </div>

          <!-- Shared Files -->
          <div>
            <div class="text-xs font-semibold text-muted text-uppercase mb-2">Shared Files (3)</div>
            <div class="d-flex flex-column gap-2">
              <div
                class="d-flex align-center gap-2 p-2 rounded border cursor-pointer hover:border-primary transition-all text-xs"
                style="background: var(--bg-hover);" @click="toast.info('Downloading Figma_Tokens_v2.json...')">
                <span>📄</span>
                <div class="flex-1 truncate">
                  <div class="font-medium truncate">Figma_Tokens_v2.json</div>
                  <div class="text-muted">142 KB • 2 days ago</div>
                </div>
              </div>
              <div
                class="d-flex align-center gap-2 p-2 rounded border cursor-pointer hover:border-primary transition-all text-xs"
                style="background: var(--bg-hover);" @click="toast.info('Downloading Sprint_Roadmap.pdf...')">
                <span>📑</span>
                <div class="flex-1 truncate">
                  <div class="font-medium truncate">Sprint_Roadmap.pdf</div>
                  <div class="text-muted">2.4 MB • Sep 5</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: calc(100vh - 210px);
  min-height: 600px;
  background: var(--bg-surface);
  border-radius: var(--radius-lg, 12px);
}

.chat-sidebar {
  flex-shrink: 0;
  background: var(--bg-surface);
  position: relative;
  transition: width 0.05s ease-out;
}

.sidebar-resizer {
  width: 6px;
  cursor: col-resize;
  background: transparent;
  position: relative;
  flex-shrink: 0;
  transition: background-color 0.15s ease;
  z-index: 10;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2px;
    width: 2px;
    background: var(--border-color);
    transition: background-color 0.15s ease, width 0.15s ease, left 0.15s ease;
  }

  &:hover::before,
  &.is-resizing::before {
    background: var(--primary);
    width: 4px;
    left: 1px;
  }

  &:hover,
  &.is-resizing {
    background: var(--primary-tonal);
  }
}

.filter-tab-btn {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  font-weight: 500;
  padding: 4px 8px;
  transition: all 0.15s ease;
}

.filter-tab-btn.active {
  background: var(--primary);
  color: var(--primary-text, #ffffff);
  box-shadow: var(--shadow-sm);
}

.channel-item,
.dm-item {
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md, 8px);
}

.channel-item:hover,
.dm-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.channel-item.active {
  background: var(--primary-tonal);
  color: var(--primary);
  font-weight: 600;
}

.dm-item {
  border: 1px solid transparent;
}

.dm-item.active {
  background: var(--primary-tonal);
  border-color: rgba(var(--primary-rgb, 79, 70, 229), 0.2);

  .dm-name {
    color: var(--primary);
    font-weight: 600;
  }

  .dm-preview {
    color: var(--text-primary);
  }
}

.dm-avatar,
.msg-avatar,
.current-chat-avatar,
.drawer-avatar {
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  user-select: none;
}

.presence-dot {
  width: 11px;
  height: 11px;
  bottom: 0;
  right: 0;
  border-radius: 50% !important;
  border: 2px solid var(--bg-surface);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.presence-online {
  background: #10b981;
}

.presence-away {
  background: #f59e0b;
}

.presence-offline {
  background: #64748b;
}

.chat-main-window {
  background: var(--bg-body);
}

.chat-header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
}

.chat-messages-body {
  background: var(--bg-body);
}

.date-divider {

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border-color);
  }

  .date-badge {
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    margin: 0 12px;
    border-radius: 50rem !important;
  }
}

.sender-name {
  color: var(--text-primary);
  font-size: 0.8125rem;
}

.msg-timestamp {
  font-size: 0.75rem;
}

.message-bubble {
  max-width: 650px;
  word-break: break-word;
}

.msg-me {
  background: var(--primary) !important;
  color: #ffffff !important;
  border-radius: 16px 16px 4px 16px !important;
  box-shadow: 0 2px 6px rgba(var(--primary-rgb, 79, 70, 229), 0.22);

  p {
    color: #ffffff !important;
  }
}

.msg-other {
  background: var(--bg-surface) !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border-radius: 16px 16px 16px 4px !important;

  p {
    color: var(--text-primary) !important;
  }
}

.code-snippet-box {
  background: #0f172a;
  border-color: rgba(255, 255, 255, 0.12) !important;

  .code-header {
    background: #1e293b;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .code-lang-tag {
      color: #94a3b8;
    }

    .copy-code-btn {
      color: #cbd5e1;

      &:hover {
        color: #ffffff;
      }
    }
  }

  pre {
    background: transparent !important;
    border: none !important;
    color: #f1f5f9 !important;
    line-height: 1.5;

    code {
      background: transparent !important;
      border: none !important;
      color: inherit !important;
      padding: 0 !important;
    }
  }
}

.reaction-pill {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 50rem !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.15s ease;

  &:hover {
    background: var(--bg-hover);
    border-color: var(--primary);
  }

  &.active {
    background: var(--primary-tonal);
    border-color: var(--primary);
    color: var(--primary);
  }
}

.add-reaction-btn {
  width: 22px;
  height: 22px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  font-size: 0.75rem;

  &:hover {
    background: var(--bg-hover);
    color: var(--primary);
  }
}

.typing-bubble {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.chat-input-footer {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-color);
}

.chat-text-input {
  background: var(--bg-body);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  outline: none;
  border-radius: var(--radius-md, 8px);

  &:focus {
    background: var(--bg-surface);
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-tonal);
  }
}

.chat-info-drawer {
  width: 280px;
  flex-shrink: 0;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-color);
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--text-secondary);
  border-radius: 50% !important;
  animation: typingBounce 1.2s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingBounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

@media (max-width: 991px) {
  .chat-sidebar {
    width: 100% !important;
  }

  .sidebar-resizer {
    display: none !important;
  }
}
</style>
