import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockApi, axiosInstance } from '../plugins/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(
    typeof window !== 'undefined' && localStorage.getItem('jui_user')
      ? JSON.parse(localStorage.getItem('jui_user'))
      : {
          id: 'usr_01',
          name: 'JUI Admin',
          email: 'admin@jui.dev',
          role: 'Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
        }
  )

  const token = ref(
    typeof window !== 'undefined' ? (localStorage.getItem('jui_auth_token') || 'demo_token_authenticated') : 'demo_token_authenticated'
  )

  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || 'Guest')

  const login = async (credentials) => {
    isLoading.value = true
    error.value = null

    try {
      let res
      try {
        res = await axiosInstance.post('/auth/login', credentials)
      } catch {
        res = await mockApi.login(credentials)
      }

      user.value = res.data.user
      token.value = res.data.token

      if (typeof window !== 'undefined') {
        localStorage.setItem('jui_auth_token', res.data.token)
        localStorage.setItem('jui_user', JSON.stringify(res.data.user))
      }

      return res.data
    } catch (err) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jui_auth_token')
      localStorage.removeItem('jui_user')
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userRole,
    login,
    logout,
  }
})
