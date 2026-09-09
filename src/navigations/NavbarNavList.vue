<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { navSections, isSectionActive, hasActiveChild } from './index'

const route = useRoute()

// Dropdown state
const activeNavbarDropdown = ref(null)
const activeSubmenu = ref(null)

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
}

// Close dropdowns on route change
watch(() => route.path, () => {
  closeAllDropdowns()
})

const handleDocumentClick = (e) => {
  if (!e.target.closest('.navbar-dropdown') && !e.target.closest('.dropdown')) {
    closeAllDropdowns()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

const checkSectionActive = (section) => {
  return isSectionActive(section, route.path)
}
</script>

<template>
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
</template>
