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

const searchQuery = ref('')

const handleSearch = () => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return

  if (query.includes('button')) router.push('/buttons')
  else if (query.includes('form') || query.includes('input')) router.push('/forms')
  else if (query.includes('modal') || query.includes('dialog') || query.includes('drawer')) router.push('/modals')
  else if (query.includes('transact') || query.includes('pay') || query.includes('card')) router.push('/transactional')
  else if (query.includes('badge') || query.includes('alert')) router.push('/badges')
  else if (query.includes('util')) router.push('/utilities')
  else if (query.includes('login') || query.includes('auth')) router.push('/login')
  else if (query.includes('reg')) router.push('/register')
  else router.push('/overview')
}

const quickLinks = [
  { path: '/overview', name: 'Theme & Overview', icon: '❖', desc: 'Design architecture & tokens' },
  { path: '/buttons', name: 'Buttons & Sizes', icon: '🔘', desc: '5 Patterns & size scale' },
  { path: '/forms', name: 'Form Controls', icon: '📝', desc: 'Input variants & validation' },
  { path: '/modals', name: 'Modals & Drawers', icon: '🪟', desc: 'Interactive overlays' },
  { path: '/transactional', name: 'Transactional Suite', icon: '💳', desc: 'Finance & KPI widgets' },
  { path: '/login', name: 'Login Page', icon: '🔑', desc: 'Authentication layout' }
]
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
    <main class="d-flex align-center justify-center flex-1 position-relative z-10 py-6 text-center">
      <div class="w-full max-w-3xl mx-auto d-flex flex-column align-center gap-4">
        
        <!-- Glowing 404 Headline Graphic -->
        <div class="position-relative">
          <div class="error-number font-black">404</div>
          <div class="error-badge-overlay">
            <span class="badge badge-pill badge-warning shadow-lg px-3 py-1 font-semibold text-xs">
              ⚠️ Page Not Found
            </span>
          </div>
        </div>

        <!-- Descriptive Copy -->
        <div class="max-w-xl mx-auto">
          <h1 class="text-3xl text-md-4xl font-black mb-2">Lost in Cyberspace?</h1>
          <p class="text-secondary text-sm text-md-base mb-0">
            The page you are looking for doesn't exist, was moved, or has drifted out of orbit. Let's get you back on track.
          </p>
        </div>

        <!-- Search Bar Input Box -->
        <form @submit.prevent="handleSearch" class="w-full max-w-md mx-auto my-2">
          <div class="input-group input-group-lg shadow-sm">
            <span class="input-group-text">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Search components, forms, modals..."
            />
            <button type="submit" class="btn btn-primary px-4 font-semibold">
              Search
            </button>
          </div>
        </form>

        <!-- Primary Action CTA Buttons -->
        <div class="d-flex flex-wrap align-center justify-center gap-2 sm-gap-3">
          <RouterLink to="/overview" class="btn btn-primary btn-md font-semibold d-flex align-center gap-2 shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Return to Overview</span>
          </RouterLink>

          <RouterLink to="/buttons" class="btn btn-tonal-primary btn-md font-semibold d-flex align-center gap-2">
            <span>🔘</span>
            <span>Browse Components</span>
          </RouterLink>

          <RouterLink to="/login" class="btn btn-outlined-neutral btn-md font-semibold d-flex align-center gap-2">
            <span>🔑</span>
            <span>Sign In</span>
          </RouterLink>
        </div>

        <!-- Quick Jump Links Matrix -->
        <div class="w-full max-w-2xl mt-4 pt-4 border-top border-subtle">
          <p class="text-xs text-muted uppercase font-bold mb-3" style="letter-spacing: 0.05em;">Popular Destinations</p>
          <div class="d-grid grid-cols-2 grid-cols-md-3 gap-2">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="card card-tonal card-hoverable p-3 text-start text-decoration-none transition-all"
            >
              <div class="d-flex align-center gap-2 mb-1">
                <span style="font-size: 1.1rem;">{{ link.icon }}</span>
                <span class="font-bold text-xs text-primary">{{ link.name }}</span>
              </div>
              <p class="text-xs text-muted mb-0 lh-sm">{{ link.desc }}</p>
            </RouterLink>
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
  background: radial-gradient(circle, var(--warning, #f59e0b) 0%, transparent 70%);
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
  background: radial-gradient(circle, var(--primary, #6366f1) 0%, transparent 70%);
  opacity: 0.1;
  animation: float-ambient 18s ease-in-out infinite alternate-reverse;
}

.error-number {
  font-size: clamp(6rem, 16vw, 12rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--accent, #a855f7) 50%, var(--warning, #f59e0b) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 10px 25px rgba(99, 102, 241, 0.25));
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
