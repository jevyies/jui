<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { navSections, isSectionActive, isItemActive, hasActiveChild } from './index'
import AppLogo from '../@core/components/AppLogo.vue'
import SidebarNavItem from './SidebarNavItem.vue'

const props = defineProps({
  layoutMode: {
    type: String,
    default: 'sidebar'
  },
  currentTheme: {
    type: String,
    default: 'dark'
  },
  themes: {
    type: Array,
    default: () => []
  },
  mobileSidebarOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:mobileSidebarOpen',
  'setLayoutMode',
  'selectTheme'
])

const route = useRoute()

// Dropdown & mobile state
const activeNavbarDropdown = ref(null)
const activeSubmenu = ref(null)
const notificationOpen = ref(false)
const themeDropdownOpen = ref(false)
const isMobileNavOpen = ref(false)

// Close dropdowns on route changes
watch(() => route.path, () => {
  isMobileNavOpen.value = false
  activeNavbarDropdown.value = null
  activeSubmenu.value = null
  notificationOpen.value = false
  themeDropdownOpen.value = false
})

const toggleNavbarDropdown = (name) => {
  activeNavbarDropdown.value = activeNavbarDropdown.value === name ? null : name
  activeSubmenu.value = null
}

const toggleSubmenu = (name) => {
  activeSubmenu.value = activeSubmenu.value === name ? null : name
}

const closeAllDropdowns = () => {
  activeNavbarDropdown.value = null
  activeSubmenu.value = null
  notificationOpen.value = false
  themeDropdownOpen.value = false
}

// Global click listener to close dropdowns
const handleDocumentClick = (e) => {
  if (!e.target.closest('.navbar-dropdown') && !e.target.closest('.dropdown')) {
    closeAllDropdowns()
  }
}

// Check if section is active using helper
const checkSectionActive = (section) => {
  return isSectionActive(section, route.path)
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

const currentRouteTitle = computed(() => {
  const path = route.path.replace('/', '')
  if (!path || path === 'index' || path === 'overview') return 'Theme & Overview'
  return path.charAt(0).toUpperCase() + path.slice(1)
})
</script>

<template>
  <!-- Fixed Top Navbar -->
  <header class="navbar navbar-glass">
    <!-- Left Controls: Hamburger on Mobile + Brand or Breadcrumbs -->
    <div class="d-flex align-center gap-2 gap-md-3 min-w-0">

      <!-- Hamburger Toggle for Sidebar on Mobile/Tablet (< 992px) -->
      <button v-if="layoutMode === 'sidebar'" class="btn btn-icon btn-sm btn-tonal-neutral d-lg-none flex-shrink-0"
        @click="emit('update:mobileSidebarOpen', !mobileSidebarOpen)" title="Open Menu Drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Brand Logo in Top Navbar Mode or on Mobile -->
      <RouterLink to="/overview" class="navbar-brand me-1 flex-shrink-0" title="JUI Kit Overview">
        <AppLogo :width="28" :height="21" class="navbar-brand-logo" />
        <span class="font-bold d-none d-xs-inline text-sm text-md-base">JUI Kit</span>
      </RouterLink>

      <!-- Breadcrumbs (Desktop & Tablet) -->
      <div v-if="layoutMode === 'sidebar'" class="d-none d-md-flex align-center gap-2 text-truncate">
        <span class="text-muted text-sm">Design System</span>
        <span class="text-muted">/</span>
        <span class="font-semibold text-sm text-capitalize text-truncate">{{ currentRouteTitle }}</span>
      </div>

      <!-- =============================================================== -->
      <!-- NAVBAR HORIZONTAL MENUS (When Navbar Mode is active)            -->
      <!-- =============================================================== -->
      <nav v-if="layoutMode === 'navbar'" class="d-none d-lg-flex align-center gap-1 navbar-nav">
        <template v-for="section in navSections" :key="section.id">
          <!-- 1. Single Direct Link Section (e.g. Architecture / Overview) -->
          <RouterLink v-if="section.items.length === 1 && !section.items[0].children" :to="section.items[0].path"
            class="navbar-link" active-class="active">
            <span>{{ section.items[0].icon || section.icon }}</span>
            <span>{{ section.items[0].name.split(' ')[0] || section.shortTitle }}</span>
          </RouterLink>

          <!-- 2. Dropdown Menu Section (e.g. Components, Multi-Level, Apps, Blank Pages) -->
          <div v-else class="navbar-dropdown">
            <button :class="[
              'navbar-dropdown-toggle',
              {
                'is-open': activeNavbarDropdown === section.id,
                'has-active': checkSectionActive(section)
              }
            ]" @click.stop="toggleNavbarDropdown(section.id)">
              <span>{{ section.icon }}</span>
              <span>{{ section.shortTitle || section.title }}</span>
              <span class="dropdown-arrow">▾</span>
            </button>

            <div :class="['dropdown-menu', { show: activeNavbarDropdown === section.id }]" style="min-width: 14.5rem;">
              <div class="dropdown-header">{{ section.title }}</div>
              <template v-for="item in section.items" :key="item.id || item.path || item.name">
                <!-- Level 2 item with Level 3 children (Dropdown Submenu with Flyout) -->
                <div v-if="item.children && item.children.length > 0" class="dropdown-submenu"
                  @mouseenter="activeSubmenu = (item.id || item.name)" @mouseleave="activeSubmenu = null">
                  <button type="button" :class="[
                    'dropdown-item dropdown-submenu-toggle',
                    {
                      'has-active': hasActiveChild(item, route.path),
                      'is-open': activeSubmenu === (item.id || item.name)
                    }
                  ]" @click.stop="toggleSubmenu(item.id || item.name)">
                    <span>{{ item.icon || '📁' }}</span>
                    <span class="flex-1 text-truncate">{{ item.name }}</span>
                    <span v-if="item.badge" :class="['badge badge-xs me-1', item.badgeClass || 'badge-tonal-primary']">
                      {{ item.badge }}
                    </span>
                    <span class="dropdown-submenu-arrow">›</span>
                  </button>

                  <!-- Level 3 Flyout Menu -->
                  <div :class="[
                    'dropdown-menu dropdown-submenu-menu',
                    { show: activeSubmenu === (item.id || item.name) }
                  ]" style="min-width: 14rem;">
                    <div class="dropdown-header">{{ item.name }}</div>
                    <template v-for="child in item.children" :key="child.id || child.path || child.name">
                      <!-- Level 3 item with deeper children (if any) -->
                      <div v-if="child.children && child.children.length > 0" class="dropdown-submenu"
                        @mouseenter="activeSubmenu = (child.id || child.name)" @mouseleave="activeSubmenu = null">
                        <button type="button" class="dropdown-item dropdown-submenu-toggle"
                          @click.stop="toggleSubmenu(child.id || child.name)">
                          <span>{{ child.icon || '📁' }}</span>
                          <span class="flex-1 text-truncate">{{ child.name }}</span>
                          <span class="dropdown-submenu-arrow">›</span>
                        </button>
                        <div :class="[
                          'dropdown-menu dropdown-submenu-menu',
                          { show: activeSubmenu === (child.id || child.name) }
                        ]">
                          <RouterLink v-for="sub in child.children" :key="sub.path" :to="sub.path" class="dropdown-item"
                            active-class="active" @click="closeAllDropdowns">
                            <span>{{ sub.icon || '❖' }}</span>
                            <span class="flex-1 text-truncate">{{ sub.name }}</span>
                            <span v-if="sub.badge" :class="['badge badge-xs', sub.badgeClass || 'badge-tonal-primary']">
                              {{ sub.badge }}
                            </span>
                          </RouterLink>
                        </div>
                      </div>

                      <!-- Standard Level 3 Direct Link -->
                      <RouterLink v-else :to="child.path" class="dropdown-item" active-class="active"
                        @click="closeAllDropdowns">
                        <span>{{ child.icon || '❖' }}</span>
                        <span class="flex-1 text-truncate">{{ child.name }}</span>
                        <span v-if="child.badge" :class="['badge badge-xs', child.badgeClass || 'badge-tonal-primary']">
                          {{ child.badge }}
                        </span>
                      </RouterLink>
                    </template>
                  </div>
                </div>

                <!-- Level 2 Direct Link -->
                <RouterLink v-else :to="item.path" class="dropdown-item" active-class="active"
                  @click="closeAllDropdowns">
                  <span>{{ item.icon }}</span>
                  <span class="flex-1 text-truncate">{{ item.name }}</span>
                  <span v-if="item.badge" :class="['badge badge-xs', item.badgeClass || 'badge-tonal-primary']">
                    {{ item.badge }}
                  </span>
                </RouterLink>
              </template>
            </div>
          </div>
        </template>
      </nav>
    </div>

    <!-- Right Controls: Layout Switcher, Theme Switcher & Actions -->
    <div class="d-flex align-center gap-1 gap-sm-2 flex-shrink-0">

      <!-- 1. Layout Mode Switcher (Pill for >= 640px) -->
      <div class="d-none d-sm-flex align-center p-1 rounded-full border border-subtle gap-1"
        style="background: var(--bg-surface-tonal);" title="Menu Layout Mode">
        <button :class="['btn btn-xs rounded-full', layoutMode === 'sidebar' ? 'btn-primary' : 'btn-text']"
          @click="emit('setLayoutMode', 'sidebar')" title="Sidebar Navigation Mode">
          <span class="d-flex align-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span class="d-none d-xl-inline text-xs font-semibold">Sidebar</span>
          </span>
        </button>
        <button :class="['btn btn-xs rounded-full', layoutMode === 'navbar' ? 'btn-primary' : 'btn-text']"
          @click="emit('setLayoutMode', 'navbar')" title="Top Navbar Navigation Mode">
          <span class="d-flex align-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
            </svg>
            <span class="d-none d-xl-inline text-xs font-semibold">Top Nav</span>
          </span>
        </button>
      </div>

      <!-- 2. Theme Switcher: Full Pills for Desktop & Tablets (>= 768px) -->
      <div class="d-none d-md-flex align-center p-1 rounded-full border border-subtle gap-1"
        style="background: var(--bg-surface-tonal);">
        <button v-for="t in themes" :key="t.id"
          :class="['btn btn-xs rounded-full', currentTheme === t.id ? 'btn-primary' : 'btn-text']"
          @click="emit('selectTheme', t.id)" :title="t.desc">
          <span>{{ t.icon }}</span>
          <span class="d-none d-xxl-inline">{{ t.name.split(' ')[0] }}</span>
        </button>
      </div>

      <!-- 2b. Theme Switcher: Compact Dropdown for Mobile (< 768px) -->
      <div class="dropdown d-md-none">
        <button class="btn btn-icon btn-xs btn-sm-sm btn-tonal-neutral"
          @click.stop="themeDropdownOpen = !themeDropdownOpen" :title="`Active Theme: ${currentTheme}`">
          <span style="font-size: 0.95rem;">{{themes.find(t => t.id === currentTheme)?.icon || '🌙'}}</span>
        </button>
        <div :class="['dropdown-menu dropdown-menu-end', { show: themeDropdownOpen }]" style="min-width: 10.5rem;">
          <div class="dropdown-header">Switch Theme</div>
          <button v-for="t in themes" :key="t.id" :class="['dropdown-item', { active: currentTheme === t.id }]"
            @click="emit('selectTheme', t.id); themeDropdownOpen = false;">
            <span>{{ t.icon }}</span>
            <span>{{ t.name }}</span>
          </button>
        </div>
      </div>

      <!-- 3. Notification Dropdown -->
      <div class="dropdown">
        <button class="btn btn-icon btn-xs btn-sm-sm btn-tonal-neutral position-relative"
          @click.stop="notificationOpen = !notificationOpen" title="Notifications">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="badge-dot"
            style="position: absolute; top: 4px; right: 4px; background: var(--danger, #f43f5e);"></span>
        </button>

        <div :class="['dropdown-menu dropdown-menu-end', { show: notificationOpen }]"
          style="width: 18rem; max-width: 85vw;">
          <div class="dropdown-header">System Notifications</div>
          <div class="p-3 border-bottom border-subtle">
            <div class="d-flex align-center justify-between mb-1">
              <span class="font-semibold text-sm">3rd Level Navigation</span>
              <span class="text-xs text-muted">Active</span>
            </div>
            <p class="text-xs text-secondary mb-0">Multi-level hierarchical navigation with 3-tier accordions and flyout
              submenus is now enabled.
            </p>
          </div>
          <div class="p-2 text-center">
            <button class="btn btn-link btn-xs w-full justify-center" @click="notificationOpen = false">Close</button>
          </div>
        </div>
      </div>

      <!-- 4. User Profile Avatar -->
      <div class="d-flex align-center">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces"
          alt="Avatar" class="rounded-full border border-subtle"
          style="width: 1.85rem; height: 1.85rem; object-fit: cover;" />
      </div>

      <!-- 5. Mobile Menu Button (Only for Top Navbar mode on small screens) -->
      <button v-if="layoutMode === 'navbar'" class="btn btn-icon btn-sm btn-tonal-neutral d-lg-none flex-shrink-0"
        @click="isMobileNavOpen = !isMobileNavOpen" title="Toggle Menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </header>

  <!-- MOBILE DRAWER MENU (For Navbar mode on mobile/tablet) -->
  <div v-if="layoutMode === 'navbar' && isMobileNavOpen" class="p-4 border-bottom border-subtle d-lg-none"
    style="background: var(--bg-surface-elevated); position: fixed; top: 4rem; left: 0; right: 0; z-index: 1020; max-height: calc(100vh - 4rem); overflow-y: auto;">
    <template v-for="section in navSections" :key="section.id">
      <div class="sidebar-nav-header text-xs text-muted font-bold uppercase mb-2 mt-3">{{ section.title }}</div>
      <SidebarNavItem v-for="item in section.items" :key="item.id || item.path || item.name" :item="item" :level="1"
        @close-mobile="isMobileNavOpen = false" />
    </template>
  </div>
</template>
