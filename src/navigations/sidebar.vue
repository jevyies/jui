<script setup>
import { navSections } from './index'
import AppLogo from '../@core/components/AppLogo.vue'
import SidebarNavItem from './SidebarNavItem.vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  mobileOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:collapsed', 'update:mobileOpen'])

const toggleCollapse = () => {
  emit('update:collapsed', !props.collapsed)
}

const closeMobile = () => {
  emit('update:mobileOpen', false)
}
</script>

<template>
  <!-- Sidebar Container (Desktop Fixed / Mobile Drawer) -->
  <aside :class="[
    'sidebar',
    {
      'sidebar-collapsed': collapsed,
      'sidebar-mobile-open': mobileOpen
    }
  ]">
    <!-- Brand Header -->
    <div class="sidebar-header">
      <RouterLink to="/overview" class="sidebar-brand" @click="closeMobile" title="JUI Kit Overview">
        <AppLogo :width="30" :height="22" class="sidebar-brand-logo" />
        <span class="sidebar-brand-text">JUI Kit</span>
      </RouterLink>

      <!-- Desktop Collapse Arrow Button (>= 992px) -->
      <button class="btn btn-icon btn-xs btn-tonal-neutral d-none d-lg-flex" @click="toggleCollapse"
        :title="collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline :points="collapsed ? '9 18 15 12 9 6' : '15 18 9 12 15 6'"></polyline>
        </svg>
      </button>

      <!-- Mobile Drawer Close Button (< 992px) -->
      <button class="btn btn-icon btn-xs btn-tonal-neutral d-lg-none" @click="closeMobile" title="Close Sidebar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Navigation Menu (Scrollable inside Sidebar) -->
    <nav class="sidebar-nav">
      <template v-for="section in navSections" :key="section.id">
        <div class="sidebar-nav-header">{{ section.title }}</div>
        <SidebarNavItem
          v-for="item in section.items"
          :key="item.id || item.path || item.name"
          :item="item"
          :level="1"
          :collapsed="collapsed"
          @close-mobile="closeMobile"
        />
      </template>
    </nav>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <div class="stat-icon d-flex justify-center align-center"
        style="width: 2.25rem; height: 2.25rem; font-size: 0.9rem; border-radius: 50%;">
        ⚡
      </div>
      <div class="sidebar-nav-text flex-1" style="min-width: 0;">
        <div class="font-semibold text-sm text-truncate">JUI Framework</div>
        <div class="text-xs text-muted text-truncate">SCSS Architecture</div>
      </div>
    </div>
  </aside>

  <!-- Floating Sidebar Drawer Backdrop on Mobile Screen -->
  <div :class="['sidebar-backdrop', { show: mobileOpen }]" @click="closeMobile"></div>
</template>
