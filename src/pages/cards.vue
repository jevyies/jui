<script setup>
import { ref, reactive } from 'vue'
import JCard from '../@core/components/JCard.vue'
import JBtn from '../@core/components/JBtn.vue'

const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// 1. JCard Playground State
// ----------------------------------------------------------------------------
const playground = reactive({
  title: 'Cloud Cluster Analytics',
  subtitle: 'Real-time telemetry and resource provisioning',
  variant: 'elevated', // 'bordered' | 'elevated' | 'tonal' | 'glass' | 'flat'
  size: 'md', // 'sm' | 'md' | 'lg'
  hoverable: true,
})

// ----------------------------------------------------------------------------
// 2. Code Recipe Snippets
// ----------------------------------------------------------------------------
const snippetComponent = `<script setup>
import JCard from '@core/components/JCard.vue'
import JBtn from '@core/components/JBtn.vue'
<` + `/script>

<template>
  <!-- Elevated Interactive Card with Header & Footer Slots -->
  <JCard
    title="Security Policy"
    subtitle="Updated 10 minutes ago"
    variant="elevated"
    :hoverable="true"
  >
    <template #actions>
      <span class="badge badge-success">Active</span>
    </template>

    <p class="text-sm">Enforces TLS 1.3 encryption and automated key rotation.</p>

    <template #footer>
      <span class="text-xs text-muted">Cluster #EU-West</span>
    </template>
    <template #footer-actions>
      <JBtn size="xs" variant="tonal" color="primary">Configure</JBtn>
    </template>
  </JCard>
</template>`

const snippetVanilla = `<!-- 1. Bordered / Flat Card -->
<div class="card card-bordered">
  <div class="card-header">
    <h4 class="card-title">Bordered Card</h4>
  </div>
  <div class="card-body">Card content...</div>
</div>

<!-- 2. Elevated Hoverable Card -->
<div class="card card-elevated card-hoverable">
  <div class="card-body">Elevated interactive card...</div>
</div>

<!-- 3. Glassmorphic Frosted Glass Card -->
<div class="card card-glass">
  <div class="card-body">Translucent glass card...</div>
</div>`
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>Cards & JCard Component</h2>
        <p class="text-secondary mb-0">
          4 Design Patterns (Bordered, Elevated, Tonal, Glassmorphic) + Reusable <code>&lt;JCard /&gt;</code> Component.
        </p>
      </div>
      <JBtn variant="tonal" color="primary" size="sm" @click="copyToClipboard(snippetComponent)">
        <span>📋</span> Copy JCard Recipe
      </JBtn>
    </div>

    <!-- Toast Notification on Snippet Copy -->
    <div
      v-if="copiedSnippet"
      class="alert alert-primary alert-glass shadow-lg position-fixed"
      style="bottom: 1.5rem; right: 1.5rem; z-index: 9999; max-width: 24rem;"
    >
      <div class="alert-icon">📋</div>
      <div class="alert-content">
        <div class="alert-title font-bold">Copied to Clipboard!</div>
        <div class="text-xs text-truncate"><code>{{ copiedSnippet }}</code></div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 1. INTERACTIVE JCard PLAYGROUND                                     -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <h3 class="mb-0">⚡ Interactive JCard Component Playground</h3>
            <span class="badge badge-pill badge-primary">Vue 3 Component</span>
          </div>
          <button class="btn btn-xs btn-tonal-primary" @click="copyToClipboard(snippetComponent)">Copy Code</button>
        </div>

        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <div class="form-group mb-0">
            <label class="form-label text-xs">Card Title</label>
            <input v-model="playground.title" type="text" class="form-control form-control-sm" />
          </div>

          <div class="form-group mb-0">
            <label class="form-label text-xs">Card Subtitle</label>
            <input v-model="playground.subtitle" type="text" class="form-control form-control-sm" />
          </div>

          <div class="form-group mb-0">
            <label class="form-label text-xs">Variant Pattern</label>
            <select v-model="playground.variant" class="form-select form-select-sm">
              <option value="elevated">elevated (Shadowed)</option>
              <option value="bordered">bordered (Flat / 1px Outline)</option>
              <option value="tonal">tonal (Soft Surface Fill)</option>
              <option value="glass">glass (Frosted Translucent)</option>
              <option value="flat">flat (Minimal)</option>
            </select>
          </div>

          <div class="form-group mb-0">
            <label class="form-label text-xs">Size Scale</label>
            <select v-model="playground.size" class="form-select form-select-sm">
              <option value="sm">sm (Compact Padding)</option>
              <option value="md">md (Standard Padding)</option>
              <option value="lg">lg (Spacious Padding)</option>
            </select>
          </div>
        </div>

        <div class="d-flex align-center gap-4 text-xs">
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.hoverable" type="checkbox" class="form-check-input" />
            <span>Hover Lift & Border Glow (<code>:hoverable="true"</code>)</span>
          </label>
        </div>

        <!-- Live Preview Stage -->
        <div class="p-4 rounded-lg bg-surface border border-subtle d-flex justify-center">
          <div style="width: 100%; max-width: 540px;">
            <JCard
              :title="playground.title"
              :subtitle="playground.subtitle"
              :variant="playground.variant"
              :size="playground.size"
              :hoverable="playground.hoverable"
            >
              <template #actions>
                <span class="badge badge-pill badge-success">Online</span>
              </template>

              <p class="mb-2 text-sm">
                Real-time transaction latency is <b>14ms</b> across 8 distributed cloud edge regions.
              </p>
              <div class="d-flex align-center gap-2 text-xs text-muted">
                <span>CPU Load: 24%</span>
                <span>•</span>
                <span>RAM Allocation: 4.2 / 16 GB</span>
              </div>

              <template #footer>
                <span class="text-xs text-muted">Auto-scaled 2 mins ago</span>
              </template>
              <template #footer-actions>
                <JBtn size="xs" variant="tonal" color="primary">Manage Node</JBtn>
              </template>
            </JCard>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 2. VISUAL SHOWCASE SECTIONS                                         -->
    <!-- =================================================================== -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- 1. Bordered Pattern -->
      <div class="card card-bordered">
        <div class="card-header">
          <div>
            <h4 class="card-title text-base">1. Bordered / Flat Card</h4>
            <p class="card-subtitle">Crisp 1px outline for structural dashboard grids</p>
          </div>
          <span class="badge badge-tonal-primary">.card-bordered</span>
        </div>
        <div class="card-body">
          <p class="text-sm mb-0">High readability and contrast, zero drop-shadow elevation. Optimal for dense analytical tables and forms.</p>
        </div>
        <div class="card-footer">
          <span class="text-xs text-muted">Status: Operational</span>
          <JBtn size="xs" color="primary" variant="outlined">View Logs</JBtn>
        </div>
      </div>

      <!-- 2. Elevated Pattern -->
      <div class="card card-elevated card-hoverable">
        <div class="card-header">
          <div>
            <h4 class="card-title text-base">2. Elevated & Hoverable Card</h4>
            <p class="card-subtitle">Smooth ambient shadow with hover lift animation</p>
          </div>
          <span class="badge badge-primary">.card-elevated</span>
        </div>
        <div class="card-body">
          <p class="text-sm mb-0">Hover this card to observe the smooth <code>translateY(-3px)</code> lift, deep shadow transition, and accent border glow.</p>
        </div>
        <div class="card-footer">
          <span class="text-xs text-muted">Interactive Hover Effect</span>
          <JBtn size="xs" color="primary">Select Card</JBtn>
        </div>
      </div>

      <!-- 3. Tonal Surface Pattern -->
      <div class="card card-tonal">
        <div class="card-header">
          <div>
            <h4 class="card-title text-base">3. Tonal Surface Card</h4>
            <p class="card-subtitle">Soft background tint for secondary contextual groupings</p>
          </div>
          <span class="badge badge-tonal-secondary">.card-tonal</span>
        </div>
        <div class="card-body">
          <p class="text-sm mb-0">Blends smoothly into background containers for auxiliary panels, sidebars, and parameter summaries.</p>
        </div>
        <div class="card-footer">
          <span class="text-xs text-muted">Surface Fill</span>
          <JBtn size="xs" color="secondary" variant="tonal">Details</JBtn>
        </div>
      </div>

      <!-- 4. Glassmorphic Pattern -->
      <div class="card card-glass">
        <div class="card-header">
          <div>
            <h4 class="card-title text-base">4. Glassmorphic Card</h4>
            <p class="card-subtitle">Frosted glass backdrop blur with luminous border</p>
          </div>
          <span class="badge badge-tonal-info">.card-glass</span>
        </div>
        <div class="card-body">
          <p class="text-sm mb-0">High-end translucent surface utilizing <code>backdrop-filter: blur(16px)</code> with adaptive theme borders.</p>
        </div>
        <div class="card-footer">
          <span class="text-xs text-muted">Frosted Blur Effect</span>
          <JBtn size="xs" color="info" variant="tonal">Explore</JBtn>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 3. COPYABLE CODE RECIPES                                            -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-3">
        <h3 class="card-title text-base mb-0">📖 Copyable Code Recipes</h3>
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetComponent)">Copy JCard Recipe</button>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">Vue 3 &lt;JCard /&gt; Component Usage:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetComponent }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">Pure Vanilla CSS Card Classes:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 240px;"><code>{{ snippetVanilla }}</code></pre>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 4. COMPONENT API & SCSS REFERENCE                                  -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex flex-column gap-4">
        <div>
          <h3 class="mb-1">📖 Component API & SCSS Classes</h3>
          <p class="text-secondary text-sm mb-0">Full configuration reference and design tokens for cards.</p>
        </div>

        <!-- JCard Props & Slots -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-primary">⚙️</span> 1. &lt;JCard /&gt; Vue Component API
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 220px;">Prop / Slot</th>
                  <th style="width: 130px;">Type</th>
                  <th style="width: 110px;">Default</th>
                  <th>Options & Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>title</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>Card header title text.</td>
                </tr>
                <tr>
                  <td><code>subtitle</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>Card header subtitle / helper caption.</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>String</code></td>
                  <td><code>'bordered'</code></td>
                  <td><code>'bordered'</code> | <code>'elevated'</code> | <code>'tonal'</code> | <code>'glass'</code> | <code>'flat'</code></td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>String</code></td>
                  <td><code>'md'</code></td>
                  <td><code>'sm'</code> (compact) | <code>'md'</code> (standard) | <code>'lg'</code> (spacious)</td>
                </tr>
                <tr>
                  <td><code>hoverable</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Adds lift animation and border glow on hover (<code>.card-hoverable</code>).</td>
                </tr>
                <tr>
                  <td><code>imgTop</code></td>
                  <td><code>String</code></td>
                  <td><code>''</code></td>
                  <td>URL for full-width top media banner image.</td>
                </tr>
                <tr>
                  <td><code>noBody</code></td>
                  <td><code>Boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disables automatic <code>.card-body</code> container padding for custom child layouts.</td>
                </tr>
                <tr>
                  <td><code>#default</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Main card body content slot.</td>
                </tr>
                <tr>
                  <td><code>#header</code> / <code>#title</code> / <code>#subtitle</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Custom header template override slots.</td>
                </tr>
                <tr>
                  <td><code>#actions</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Top-right header action buttons or badges.</td>
                </tr>
                <tr>
                  <td><code>#footer</code> / <code>#footer-actions</code></td>
                  <td><code>Slot</code></td>
                  <td>—</td>
                  <td>Bottom footer description text and action button slots.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Card SCSS Classes -->
        <div>
          <h5 class="mb-2 d-flex align-center gap-2">
            <span class="text-secondary">🎨</span> 2. Card SCSS Classes Reference
          </h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style="width: 260px;">SCSS Class</th>
                  <th style="width: 180px;">Role</th>
                  <th>Styling Description & Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.card</code></td>
                  <td>Base Card</td>
                  <td>Flex column container with border radius, background surface, and overflow hidden.</td>
                </tr>
                <tr>
                  <td><code>.card-bordered</code> / <code>.card-flat</code></td>
                  <td>Bordered Pattern</td>
                  <td>Clean surface background, 1px structural border, zero drop shadow.</td>
                </tr>
                <tr>
                  <td><code>.card-elevated</code></td>
                  <td>Elevated Pattern</td>
                  <td>Elevated surface background with smooth ambient drop shadow (<code>$shadow-lg</code>).</td>
                </tr>
                <tr>
                  <td><code>.card-tonal</code></td>
                  <td>Tonal Pattern</td>
                  <td>Muted surface tonal background fill with borderless styling.</td>
                </tr>
                <tr>
                  <td><code>.card-glass</code></td>
                  <td>Glassmorphic</td>
                  <td>Frosted glass translucency with backdrop blur and luminous border.</td>
                </tr>
                <tr>
                  <td><code>.card-hoverable</code></td>
                  <td>Interactive State</td>
                  <td>Applies <code>translateY(-3px)</code> lift and shadow/border glow transition on hover.</td>
                </tr>
                <tr>
                  <td><code>.card-sm</code> / <code>.card-lg</code></td>
                  <td>Size Scales</td>
                  <td>Compact (0.75rem / 1rem) or spacious (1.25rem / 1.75rem) padding scale.</td>
                </tr>
                <tr>
                  <td><code>.card-header</code></td>
                  <td>Header Area</td>
                  <td>Flex container for title, subtitle, and top-right actions with bottom divider line.</td>
                </tr>
                <tr>
                  <td><code>.card-title</code> / <code>.card-subtitle</code></td>
                  <td>Typography</td>
                  <td>Bold title font (1.125rem) and secondary caption text (0.875rem).</td>
                </tr>
                <tr>
                  <td><code>.card-body</code></td>
                  <td>Content Container</td>
                  <td>Flexible auto-growing padding container for primary card content.</td>
                </tr>
                <tr>
                  <td><code>.card-footer</code> / <code>.card-actions</code></td>
                  <td>Footer & Actions</td>
                  <td>Bottom flex container with top divider line and action buttons.</td>
                </tr>
                <tr>
                  <td><code>.card-img-top</code></td>
                  <td>Media Banner</td>
                  <td>Full-width image clipped to match top card border radius.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
