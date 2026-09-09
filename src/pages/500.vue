<route lang="yaml">
meta:
  layout: blank
</route>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLayout } from '../composables/useLayout'

const router = useRouter()
const { themes, currentTheme, selectTheme } = useLayout()

const showDiagnostics = ref(true)
const copied = ref(false)
const notification = ref(null)

const diagnosticInfo = `[ERROR 500: INTERNAL_SERVER_ERROR]
Trace ID: trc_jui_88a4c10e
Timestamp: ${new Date().toISOString()}
Node: cluster-edge-prod-03.internal
Exception: NullPointerException: Connection pool exhausted at ConnectionPool.acquire()
Resolution: Retry request or fallback to secondary cluster.`

const copyDiagnostics = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(diagnosticInfo)
  }
  copied.value = true
  notification.value = { type: 'success', message: 'Diagnostic logs copied to clipboard.' }
  setTimeout(() => {
    copied.value = false
  }, 2500)
}

const handleReload = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

const handleReport = () => {
  notification.value = { type: 'info', message: 'Error report sent to support telemetry engineers.' }
}
</script>

<template>
  <div class="error-page min-h-screen w-full d-flex flex-column justify-between p-4 p-md-6 position-relative">
    
    <!-- Ambient Background Glows -->
    <div class="error-ambient-glow"></div>
    <div class="error-ambient-glow glow-2"></div>

    <!-- Top Floating Header Bar -->
    <header class="d-flex align-center justify-between w-full max-w-6xl mx-auto position-relative z-10 mb-3">
      <!-- Brand & Back Link -->
      <RouterLink to="/overview" class="btn btn-sm btn-tonal-neutral d-flex align-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Overview</span>
      </RouterLink>

      <!-- Theme Switcher Pills -->
      <div class="d-flex align-center p-1 rounded-full border border-subtle gap-1" style="background: var(--bg-surface-tonal);">
        <button
          v-for="t in themes"
          :key="t.id"
          :class="['btn btn-xs rounded-full', currentTheme === t.id ? 'btn-primary' : 'btn-text']"
          @click="selectTheme(t.id)"
          :title="t.desc"
        >
          <span>{{ t.icon }}</span>
          <span class="d-none d-md-inline">{{ t.name.split(' ')[0] }}</span>
        </button>
      </div>
    </header>

    <!-- Center Error Content -->
    <main class="d-flex align-center justify-center flex-1 position-relative z-10 py-5 text-center">
      <div class="w-full max-w-2xl mx-auto d-flex flex-column align-center gap-4">
        
        <!-- Glowing 500 Headline Graphic -->
        <div class="position-relative">
          <div class="error-number font-black">500</div>
          <div class="error-badge-overlay">
            <span class="badge badge-pill badge-danger shadow-lg px-3 py-1 font-semibold text-xs">
              💥 Internal Server Error
            </span>
          </div>
        </div>

        <!-- Descriptive Copy -->
        <div class="max-w-xl mx-auto">
          <h1 class="text-3xl text-md-4xl font-black mb-2">Something went sideways</h1>
          <p class="text-secondary text-sm text-md-base mb-0">
            Our servers encountered an unexpected condition that prevented them from fulfilling your request. Automated telemetry has logged this incident.
          </p>
        </div>

        <!-- Alert Notification -->
        <div v-if="notification" :class="['alert w-full max-w-md my-1', notification.type === 'success' ? 'alert-success' : 'alert-info']">
          <div class="d-flex align-center gap-2">
            <span>{{ notification.type === 'success' ? '✓' : 'ℹ️' }}</span>
            <span class="text-xs font-medium">{{ notification.message }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex flex-wrap align-center justify-center gap-2 sm-gap-3 my-2">
          <button @click="handleReload" class="btn btn-primary btn-md font-semibold d-flex align-center gap-2 shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Reload Page</span>
          </button>

          <RouterLink to="/overview" class="btn btn-tonal-neutral btn-md font-semibold d-flex align-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Back to Safety</span>
          </RouterLink>

          <button @click="handleReport" class="btn btn-outlined-danger btn-md font-semibold d-flex align-center gap-2">
            <span>🛡️</span>
            <span>Report Incident</span>
          </button>
        </div>

        <!-- Technical Diagnostic Trace Box (Collapsible) -->
        <div class="w-full text-start mt-3">
          <div class="card card-bordered card-elevated overflow-hidden border-subtle">
            <div class="card-header p-2 px-3 d-flex align-center justify-between" style="background: var(--bg-surface-tonal);">
              <div class="d-flex align-center gap-2">
                <span class="badge-dot" style="background: var(--danger, #f43f5e);"></span>
                <span class="text-xs font-mono text-muted">system_trace_dump.log</span>
              </div>
              <div class="d-flex align-center gap-2">
                <button
                  class="btn btn-xs btn-tonal-neutral d-flex align-center gap-1"
                  @click="copyDiagnostics"
                  title="Copy stack trace to clipboard"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span class="text-xs">{{ copied ? 'Copied! ✓' : 'Copy Log' }}</span>
                </button>
                <button
                  class="btn btn-xs btn-text"
                  @click="showDiagnostics = !showDiagnostics"
                >
                  {{ showDiagnostics ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>
            <div v-show="showDiagnostics" class="card-body p-3 font-mono text-xs text-secondary" style="background: var(--bg-surface); line-height: 1.6; white-space: pre-wrap; word-break: break-all;">
{{ diagnosticInfo }}
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Bottom Mini Footer -->
    <footer class="text-center text-xs text-muted position-relative z-10 py-2">
      <span>© 2026 JUI Framework Design System. All rights reserved.</span>
    </footer>

  </div>
</template>

<style scoped>
.error-page {
  background-color: var(--bg-surface);
  min-height: 100vh;
  overflow: hidden;
}

.error-ambient-glow {
  position: absolute;
  top: 5%;
  left: 30%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--danger, #f43f5e) 0%, transparent 70%);
  opacity: 0.12;
  filter: blur(90px);
  pointer-events: none;
  animation: float-ambient 14s ease-in-out infinite alternate;
}

.error-ambient-glow.glow-2 {
  top: auto;
  bottom: 10%;
  right: 25%;
  left: auto;
  background: radial-gradient(circle, var(--warning, #f59e0b) 0%, transparent 70%);
  opacity: 0.1;
  animation: float-ambient 18s ease-in-out infinite alternate-reverse;
}

.error-number {
  font-size: clamp(6rem, 16vw, 12rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, var(--danger, #f43f5e) 0%, var(--warning, #f59e0b) 50%, var(--accent, #a855f7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 10px 25px rgba(244, 63, 94, 0.25));
  user-select: none;
}

.error-badge-overlay {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes float-ambient {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(25px, -35px) scale(1.1);
  }
}
</style>
