import axios from 'axios'

/**
 * ============================================================================
 * AXIOS HTTP CLIENT PLUGIN FOR JUI
 * Configured with request/response interceptors, auth token injection,
 * latency profiling, mock API fallback, and error handling.
 * ============================================================================
 */

// Create primary Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Record request start time for performance tracking
    config.metadata = { startTime: Date.now() }

    // Inject Auth Token if available in localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jui_auth_token') || localStorage.getItem('accessToken')
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Calculate latency
    if (response.config && response.config.metadata) {
      response.config.metadata.endTime = Date.now()
      response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    }
    return response
  },
  (error) => {
    if (error.config && error.config.metadata) {
      error.config.metadata.endTime = Date.now()
      error.duration = error.config.metadata.endTime - error.config.metadata.startTime
    }

    // Standard error normalization
    const status = error.response ? error.response.status : null
    const message = error.response?.data?.message || error.message || 'An unexpected network error occurred'

    // Handle authentication expiration (401)
    if (status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('jui_auth_token')
      // Custom event for session expired
      window.dispatchEvent(new CustomEvent('jui:auth-expired'))
    }

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
      originalError: error,
      duration: error.duration || 0,
    })
  }
)

/**
 * Mock API Handler for demo and prototyping when no backend is running
 */
export const mockApi = {
  async getTransactions() {
    await new Promise((res) => setTimeout(res, 350))
    return {
      status: 200,
      duration: 350,
      data: [
        { id: 'TX-9481', customer: 'Acme Corp', customerEmail: 'billing@acmecorp.com', date: '2026-09-06', amount: 1420.00, status: 'completed', type: 'Subscription', category: 'Enterprise' },
        { id: 'TX-9482', customer: 'Sarah Jenkins', customerEmail: 'sarah.j@gmail.com', date: '2026-09-05', amount: 89.50, status: 'completed', type: 'One-time', category: 'Pro Plan' },
        { id: 'TX-9483', customer: 'CloudFlow Inc', customerEmail: 'ops@cloudflow.io', date: '2026-09-05', amount: 3200.00, status: 'pending', type: 'Invoice', category: 'Custom Cluster' },
        { id: 'TX-9484', customer: 'Devon Miles', customerEmail: 'devon@miles.design', date: '2026-09-04', amount: 49.00, status: 'completed', type: 'One-time', category: 'UI Kit License' },
        { id: 'TX-9485', customer: 'Starlight Tech', customerEmail: 'finance@starlight.co', date: '2026-09-04', amount: 850.00, status: 'failed', type: 'Refund', category: 'Chargeback' },
        { id: 'TX-9486', customer: 'Nexus Labs', customerEmail: 'accounts@nexus.ai', date: '2026-09-03', amount: 2150.00, status: 'completed', type: 'Subscription', category: 'Enterprise Plus' },
      ],
    }
  },

  async getMetrics() {
    await new Promise((res) => setTimeout(res, 280))
    return {
      status: 200,
      duration: 280,
      data: {
        totalRevenue: 128450.00,
        revenueGrowth: '+14.2%',
        activeUsers: 8420,
        userGrowth: '+8.7%',
        successfulRate: 98.4,
        pendingApprovals: 12,
      },
    }
  },

  async login(credentials) {
    await new Promise((res) => setTimeout(res, 600))
    if (!credentials.email || !credentials.password) {
      throw { status: 400, message: 'Email and password are required' }
    }
    const token = 'jui_jwt_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    return {
      status: 200,
      duration: 600,
      data: {
        user: {
          id: 'usr_01',
          name: 'JUI Admin',
          email: credentials.email,
          role: 'Administrator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
        },
        token,
      },
    }
  },
}

/**
 * Composable for easy HTTP API calls with reactive loading, data, and error state
 */
export function useApi() {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const request = async (apiCall) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiCall()
      data.value = response.data
      return response
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    request,
    client: axiosInstance,
    mock: mockApi,
  }
}

export default axiosInstance
