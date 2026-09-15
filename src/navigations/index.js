// ============================================================================
// NAVIGATION SCHEMA (Single Source of Truth)
// Defines navigation sections, routes, icons, labels, badges, and multi-level hierarchy
// Supports up to 3rd level nesting (Level 1 -> Level 2 -> Level 3)
// ============================================================================

export const navSections = [
  {
    id: 'architecture',
    title: 'Design Architecture',
    shortTitle: 'Architecture',
    icon: '❖',
    items: [
      { path: '/overview', name: 'Dashboard', icon: '❖' }
    ]
  },
  {
    id: 'components',
    title: 'Core Components',
    shortTitle: 'Components',
    icon: '🔘',
    items: [
      { path: '/buttons', name: 'Buttons & Sizes', icon: '🔘' },
      { path: '/forms', name: 'Form Controls', icon: '📝' },
      { path: '/cards', name: 'Cards Gallery', icon: '🗂️' },
      { path: '/tables', name: 'Tables & DataTables', icon: '📊' },
      { path: '/lists', name: 'Lists & Dropdowns', icon: '📋' },
      { path: '/tabs', name: 'Tabs & Navigation', icon: '📑' },
      { path: '/dividers', name: 'Dividers (HR & VR)', icon: '➖' },
      { path: '/modals', name: 'Modals & Drawers', icon: '🪟' },
      { path: '/toasts', name: 'Toasts & Notifications', icon: '🍞' },
      { path: '/paginations', name: 'Paginations & Sizes', icon: '' },
      { path: '/icons', name: 'JUI Icons', icon: '📥' },
    ]
  },
  {
    id: 'nested-menu',
    title: 'Multi-Level Navigation',
    shortTitle: 'Multi-Level',
    icon: '🌲',
    items: [
      {
        id: 'level-1-group',
        name: 'Nested Hierarchy',
        icon: '🗂️',
        children: [
          {
            path: '/tabs',
            name: 'Level 2.1 - Direct Link',
            icon: '📑'
          },
          {
            id: 'level-2-group',
            name: 'Level 2.2 - Submenu',
            icon: '📂',
            children: [
              {
                path: '/overview',
                name: 'Level 3.1 - Theme Details',
                icon: '❖'
              },
              {
                path: '/buttons',
                name: 'Level 3.2 - Button System',
                icon: '🔘'
              },
              {
                path: '/lists',
                name: 'Level 3.3 - Lists & Density',
                icon: '📋'
              }
            ]
          },
          {
            path: '/utilities',
            name: 'Level 2.3 - CSS Utilities',
            icon: '⚡'
          }
        ]
      }
    ]
  },
  {
    id: 'applications',
    title: 'Applications & Workspace',
    shortTitle: 'Workspace',
    icon: '🚀',
    items: [
      { path: '/email', name: 'Email UI', icon: '✉️' },
      { path: '/kanban', name: 'Kanban Board', icon: '📋' },
      { path: '/chat', name: 'Chat UI', icon: '💬' }
    ]
  },
  {
    id: 'apps',
    title: 'Web App & Finance',
    shortTitle: 'Apps & Utilities',
    icon: '⚡',
    items: [
      { path: '/transactional', name: 'Transactional Suite', icon: '💳' },
      { path: '/badges', name: 'Badges & Alerts', icon: '🏷️' },
      { path: '/utilities', name: 'CSS Utilities', icon: '⚡' }
    ]
  },
  {
    id: 'blank-pages',
    title: 'Blank & Error Pages',
    shortTitle: 'Pages',
    icon: '📄',
    items: [
      {
        id: 'pages-group',
        name: 'Authentication & System',
        icon: '🔐',
        children: [
          {
            id: 'auth-group',
            name: 'Auth Flow',
            icon: '🔑',
            children: [
              { path: '/login', name: 'Login (Blank)', icon: '🔑' },
              { path: '/register', name: 'Register (Blank)', icon: '✨' }
            ]
          },
          {
            id: 'error-group',
            name: 'Error Diagnostics',
            icon: '⚠️',
            children: [
              { path: '/404', name: '404 Not Found', icon: '🔍' },
              { path: '/500', name: '500 Server Error', icon: '⚠️' }
            ]
          }
        ]
      }
    ]
  }
]

// ============================================================================
// HELPER UTILITIES FOR HIERARCHICAL NAVIGATION
// ============================================================================

/**
 * Checks if a specific item matches the current active route path
 */
export function isItemActive(item, currentPath) {
  if (!item || !currentPath) return false
  if (item.path) {
    if (item.path === currentPath) return true
    if (item.path === '/overview' && (currentPath === '/' || currentPath === '')) return true
  }
  return false
}

/**
 * Recursively checks if an item or any of its descendants matches the current path
 */
export function hasActiveChild(item, currentPath) {
  if (!item || !item.children || !Array.isArray(item.children)) return false
  return item.children.some(child => {
    if (isItemActive(child, currentPath)) return true
    if (child.children && child.children.length > 0) {
      return hasActiveChild(child, currentPath)
    }
    return false
  })
}

/**
 * Checks if any item in a section is active (direct or nested)
 */
export function isSectionActive(section, currentPath) {
  if (!section || !section.items) return false
  return section.items.some(item => {
    if (isItemActive(item, currentPath)) return true
    if (hasActiveChild(item, currentPath)) return true
    return false
  })
}

export default navSections
