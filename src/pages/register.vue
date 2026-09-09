<route lang="yaml">
meta:
  layout: blank
</route>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLayout } from '../composables/useLayout'

const router = useRouter()
const { themes, currentTheme, selectTheme } = useLayout()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)
const notification = ref(null)

// Password Strength Evaluation
const passwordStrength = computed(() => {
  const pwd = password.value
  if (!pwd) return { score: 0, label: '', color: 'neutral', percent: 0 }

  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score === 1) return { score: 1, label: 'Weak', color: 'danger', percent: 25 }
  if (score === 2) return { score: 2, label: 'Fair', color: 'warning', percent: 50 }
  if (score === 3) return { score: 3, label: 'Good', color: 'info', percent: 75 }
  if (score === 4) return { score: 4, label: 'Strong', color: 'success', percent: 100 }
  return { score: 0, label: 'Too short', color: 'danger', percent: 10 }
})

const isPasswordMatch = computed(() => {
  if (!confirmPassword.value) return true
  return password.value === confirmPassword.value
})

const handleRegister = () => {
  if (!fullName.value || !email.value || !password.value) {
    notification.value = { type: 'danger', message: 'Please fill in all required fields.' }
    return
  }

  if (password.value !== confirmPassword.value) {
    notification.value = { type: 'danger', message: 'Passwords do not match.' }
    return
  }

  if (!agreeTerms.value) {
    notification.value = { type: 'warning', message: 'You must agree to the Terms of Service to continue.' }
    return
  }

  isLoading.value = true
  notification.value = null

  setTimeout(() => {
    isLoading.value = false
    notification.value = { type: 'success', message: 'Account created successfully! Redirecting...' }
    setTimeout(() => {
      router.push('/overview')
    }, 1000)
  }, 1000)
}
</script>

<template>
  <div class="auth-page min-h-screen w-full d-flex flex-column justify-between p-4 p-md-6 position-relative">

    <!-- Background Ambient Glow & Mesh -->
    <div class="auth-ambient-glow"></div>
    <div class="auth-ambient-glow glow-2"></div>

    <!-- Top Floating Header Bar -->
    <header class="d-flex align-center justify-between w-full max-w-6xl mx-auto position-relative z-10 mb-3">
      <!-- Back to Overview -->
      <RouterLink to="/overview" class="btn btn-sm btn-tonal-neutral d-flex align-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span class="d-none d-sm-inline">Back to Overview</span>
      </RouterLink>

      <!-- Theme Switcher Pills -->
      <div class="d-flex align-center p-1 rounded-full border border-subtle gap-1"
        style="background: var(--bg-surface-tonal);">
        <button v-for="t in themes" :key="t.id"
          :class="['btn btn-xs rounded-full', currentTheme === t.id ? 'btn-primary' : 'btn-text']"
          @click="selectTheme(t.id)" :title="t.desc">
          <span>{{ t.icon }}</span>
          <span class="d-none d-md-inline">{{ t.name.split(' ')[0] }}</span>
        </button>
      </div>
    </header>

    <!-- Center Card Container -->
    <main class="d-flex align-center justify-center flex-1 position-relative z-10 py-3">
      <div class="card card-elevated card-glass w-full max-w-lg p-5 p-sm-6 p-md-7 border border-subtle shadow-xl">

        <!-- Header & Logo -->
        <div class="text-center mb-4">
          <div class="d-inline-flex align-center justify-center mb-2 p-3 rounded-2xl"
            style="background: var(--primary-tonal, rgba(99, 102, 241, 0.15)); border: 1px solid var(--border-color-subtle);">
            <AppLogo :width="44" :height="32" class="d-block" />
          </div>
          <h1 class="text-2xl font-black mb-1">Create an account</h1>
          <p class="text-xs text-secondary mb-0">Join developers building scalable, high-performance web applications
          </p>
        </div>

        <!-- Social OAuth Quick Register -->
        <div class="d-grid grid-cols-2 gap-2 mb-3">
          <button type="button" class="btn btn-sm btn-tonal-neutral d-flex align-center justify-center gap-2"
            @click="handleRegister">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z" />
              <path fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05"
                d="M5.3 14.7c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2L1.6 7.4C.6 9.4 0 10.6 0 12.5s.6 3.1 1.6 5.1l3.7-2.9z" />
              <path fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 17c1.9 3.8 5.8 7 10.4 7z" />
            </svg>
            <span class="font-medium text-xs">Google</span>
          </button>

          <button type="button" class="btn btn-sm btn-tonal-neutral d-flex align-center justify-center gap-2"
            @click="handleRegister">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span class="font-medium text-xs">GitHub</span>
          </button>
        </div>

        <!-- Form Divider -->
        <div class="d-flex align-center gap-3 my-3">
          <div class="flex-1 border-bottom border-subtle"></div>
          <span class="text-xs text-muted font-medium uppercase" style="letter-spacing: 0.05em;">or email</span>
          <div class="flex-1 border-bottom border-subtle"></div>
        </div>

        <!-- Alert / Notification -->
        <div v-if="notification"
          :class="['alert mb-3', notification.type === 'success' ? 'alert-success' : (notification.type === 'warning' ? 'alert-warning' : 'alert-danger')]">
          <div class="d-flex align-center gap-2">
            <span>{{ notification.type === 'success' ? '✓' : '⚠️' }}</span>
            <span class="text-xs font-medium">{{ notification.message }}</span>
          </div>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="d-flex flex-column gap-3">
          <!-- Full Name -->
          <JInput v-model="fullName" type="text" label="Full name" required placeholder="Alex Morgan"
            autocomplete="name">
            <template #prepend>
              <span class="input-group-text">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
            </template>
          </JInput>

          <!-- Email Address -->
          <JInput v-model="email" type="email" label="Work email" required placeholder="alex@company.com"
            autocomplete="email">
            <template #prepend>
              <span class="input-group-text">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
            </template>
          </JInput>

          <!-- Password & Strength Meter -->
          <div>
            <JInput v-model="password" type="password" password-toggle label="Password" required
              placeholder="Create a strong password" autocomplete="new-password">
              <template #prepend>
                <span class="input-group-text">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
              </template>
            </JInput>

            <!-- Strength Visual Progress Indicator -->
            <div v-if="password" class="mt-2">
              <div class="d-flex align-center justify-between text-xs mb-1">
                <span class="text-muted">Password strength:</span>
                <span :class="`font-bold text-${passwordStrength.color}`">{{ passwordStrength.label }}</span>
              </div>
              <div class="d-grid grid-cols-4 gap-1" style="height: 4px;">
                <div v-for="i in 4" :key="i" class="rounded-full transition-all" :style="{
                  background: i <= passwordStrength.score ? `var(--${passwordStrength.color})` : 'var(--border-color, rgba(255,255,255,0.1))'
                }"></div>
              </div>
            </div>
          </div>

          <!-- Confirm Password -->
          <JInput v-model="confirmPassword" type="password" label="Confirm password" required password-toggle
            :invalid="!isPasswordMatch" invalid-feedback="Passwords do not match" placeholder="Repeat password"
            autocomplete="new-password">
            <template #prepend>
              <span class="input-group-text">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </span>
            </template>
          </JInput>

          <!-- Terms & Policy Checkbox -->
          <div class="mt-1">
            <label class="form-check d-flex align-start gap-2 mb-0 cursor-pointer">
              <input type="checkbox" class="form-check-input mt-1" v-model="agreeTerms" required />
              <span class="form-check-label text-xs text-secondary lh-sm">
                I agree to the <a href="javascript:void(0)" class="text-primary font-medium">Terms of Service</a> and <a
                  href="javascript:void(0)" class="text-primary font-medium">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <!-- Submit Button -->
          <button type="submit"
            class="btn btn-primary btn-md w-full font-semibold shadow-md mt-2 d-flex align-center justify-center gap-2"
            :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true">⏳</span>
            <span>{{ isLoading ? 'Creating Account...' : 'Create Free Account →' }}</span>
          </button>
        </form>

        <!-- Footer Sign In Link -->
        <div class="text-center mt-4 pt-3 border-top border-subtle">
          <p class="text-xs text-muted mb-0">
            Already have an account?
            <RouterLink to="/login" class="text-primary font-bold ms-1">Sign In</RouterLink>
          </p>
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
.auth-page {
  background-color: var(--bg-surface);
  min-height: 100vh;
  overflow: hidden;
}

.auth-ambient-glow {
  position: absolute;
  top: -10%;
  left: 20%;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary, #6366f1) 0%, transparent 70%);
  opacity: 0.12;
  filter: blur(80px);
  pointer-events: none;
  animation: float-ambient 12s ease-in-out infinite alternate;
}

.auth-ambient-glow.glow-2 {
  top: auto;
  bottom: -10%;
  right: 15%;
  left: auto;
  background: radial-gradient(circle, var(--success, #10b981) 0%, transparent 70%);
  opacity: 0.1;
  animation: float-ambient 16s ease-in-out infinite alternate-reverse;
}

@keyframes float-ambient {
  0% {
    transform: translate(0, 0) scale(1);
  }

  100% {
    transform: translate(30px, -40px) scale(1.15);
  }
}
</style>
