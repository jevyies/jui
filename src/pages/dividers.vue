<script setup>
import { ref, reactive, computed } from 'vue'

const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// 1. Interactive Divider Playground State
// ----------------------------------------------------------------------------
const playground = reactive({
  thickness: 'thin', // 'thin' | 'md' | 'lg' | 'thick' | 'xl'
  style: 'solid', // 'solid' | 'dashed' | 'dotted'
  color: 'default', // 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'secondary'
  hasText: false,
  text: 'OR CONTINUE WITH EMAIL',
  orientation: 'horizontal', // 'horizontal' | 'vertical'
})

const playgroundHrClass = computed(() => {
  const classes = []
  if (playground.thickness !== 'thin') classes.push(`hr-${playground.thickness}`)
  if (playground.style !== 'solid') classes.push(`hr-${playground.style}`)
  if (playground.color !== 'default') classes.push(`hr-${playground.color}`)
  return classes.join(' ')
})

const generatedDividerCode = computed(() => {
  if (playground.orientation === 'vertical') {
    return `<div class="vr${playground.thickness === 'thick' || playground.thickness === 'xl' ? ' vr-thick' : ''}"></div>`
  }
  if (playground.hasText) {
    return `<div class="hr-text${playground.thickness === 'thick' || playground.thickness === 'xl' ? ' hr-thick' : ''}">\n  <span>${playground.text}</span>\n</div>`
  }
  const cls = playgroundHrClass.value
  return cls ? `<hr class="${cls}" />` : `<hr />`
})

// ----------------------------------------------------------------------------
// 2. Code Recipe Snippets
// ----------------------------------------------------------------------------
const snippetHorizontal = `<!-- 1. Default Thin Divider (1px) -->
<hr />

<!-- 2. Medium Thickness (2px) -->
<hr class="hr-md" />

<!-- 3. Dashed & Dotted Dividers -->
<hr class="hr-dashed hr-md" />
<hr class="hr-dotted hr-lg" />

<!-- 4. Colored Accent Dividers -->
<hr class="hr-primary hr-md" />
<hr class="hr-accent hr-lg" />`

const snippetText = `<!-- Labeled Center Text Divider -->
<div class="hr-text">
  <span>OR SIGN IN WITH SSO</span>
</div>

<!-- Labeled Thick Divider -->
<div class="hr-text hr-thick">
  <span>SECTION BREAK</span>
</div>`

const snippetVertical = `<!-- Inline Vertical Divider Bar -->
<div class="d-flex align-center gap-3 p-3 rounded-lg border border-subtle">
  <span>Daily Active: 42,000</span>
  <div class="vr"></div>
  <span>Latency: 14ms</span>
  <div class="vr vr-thick"></div>
  <span>Uptime: 99.99%</span>
</div>`
</script>

<template>
  <div class="d-flex flex-column gap-6">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3">
      <div>
        <h2>Dividers (HR & Vertical VR)</h2>
        <p class="text-secondary mb-0">
          Thin 1px baseline default with customizable thickness scales, dashed/dotted styles, theme colors, center text badges, and vertical dividers.
        </p>
      </div>
      <button class="btn btn-sm btn-tonal-primary" @click="copyToClipboard(snippetHorizontal)">
        <span>📋</span> Copy Divider Snippets
      </button>
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
    <!-- 1. INTERACTIVE DIVIDER PLAYGROUND                                   -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-center justify-between">
          <div class="d-flex align-center gap-2">
            <h3 class="mb-0">⚡ Interactive Divider Playground</h3>
            <span class="badge badge-pill badge-primary">Live Reactive</span>
          </div>
          <button class="btn btn-xs btn-tonal-primary" @click="copyToClipboard(generatedDividerCode)">Copy Active Code</button>
        </div>

        <!-- Controls Grid -->
        <div class="d-grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4 gap-3 p-3 rounded-lg bg-surface-tonal border border-subtle">
          <!-- Thickness -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Thickness Scale</label>
            <select v-model="playground.thickness" class="form-select form-select-sm">
              <option value="thin">thin (1px Base)</option>
              <option value="md">md (2px Medium)</option>
              <option value="lg">lg (3px Large)</option>
              <option value="thick">thick (4px Bold)</option>
              <option value="xl">xl (6px Capsule)</option>
            </select>
          </div>

          <!-- Border Style -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Line Style</label>
            <select v-model="playground.style" class="form-select form-select-sm">
              <option value="solid">solid (Continuous)</option>
              <option value="dashed">dashed (Dashes)</option>
              <option value="dotted">dotted (Dots)</option>
            </select>
          </div>

          <!-- Color -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Color Accent</label>
            <select v-model="playground.color" class="form-select form-select-sm">
              <option value="default">default (Border Subtle)</option>
              <option value="primary">primary (Indigo)</option>
              <option value="accent">accent (Purple/Accent)</option>
              <option value="success">success (Emerald)</option>
              <option value="warning">warning (Amber)</option>
              <option value="danger">danger (Rose)</option>
              <option value="secondary">secondary (Slate)</option>
            </select>
          </div>

          <!-- Orientation -->
          <div class="form-group mb-0">
            <label class="form-label text-xs">Orientation</label>
            <select v-model="playground.orientation" class="form-select form-select-sm">
              <option value="horizontal">horizontal (&lt;hr&gt;)</option>
              <option value="vertical">vertical (.vr)</option>
            </select>
          </div>
        </div>

        <!-- Center Text Toggle -->
        <div v-if="playground.orientation === 'horizontal'" class="d-flex flex-wrap align-center gap-4 text-xs">
          <label class="d-flex align-center gap-2 cursor-pointer">
            <input v-model="playground.hasText" type="checkbox" class="form-check-input" />
            <span>Enable Center Text Badge (<code>.hr-text</code>)</span>
          </label>
          <div v-if="playground.hasText" class="d-flex align-center gap-2 flex-1 min-w-200">
            <span class="text-muted">Label:</span>
            <input v-model="playground.text" type="text" class="form-control form-control-sm" />
          </div>
        </div>

        <!-- Live Preview Stage -->
        <div class="p-4 rounded-lg bg-surface border border-subtle d-flex flex-column align-center justify-center gap-3 min-h-120">
          <div style="width: 100%; max-width: 600px;">
            <div v-if="playground.orientation === 'vertical'" class="d-flex align-center justify-center p-3 gap-3">
              <span>Cluster A (#US-East)</span>
              <div :class="['vr', (playground.thickness === 'thick' || playground.thickness === 'xl') ? 'vr-thick' : '']"></div>
              <span>Cluster B (#EU-Central)</span>
            </div>
            <div v-else-if="playground.hasText" :class="['hr-text', (playground.thickness === 'thick' || playground.thickness === 'xl') ? 'hr-thick' : '']">
              <span>{{ playground.text }}</span>
            </div>
            <hr v-else :class="playgroundHrClass" />
          </div>
          <pre class="font-mono text-xs text-muted mb-0 bg-surface-tonal p-2 rounded border border-subtle"><code>{{ generatedDividerCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 2. VISUAL SHOWCASE SECTIONS                                         -->
    <!-- =================================================================== -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
      <!-- 1. Thickness Scales -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">1. Thickness Scales (1px to 6px)</h4>
          <code>.hr-thin | md | lg | thick | xl</code>
        </div>
        <div class="d-flex flex-column gap-3">
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>1px Base Default</span><code>&lt;hr /&gt; or .hr-thin</code></div>
            <hr class="my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>2px Medium</span><code>.hr-md</code></div>
            <hr class="hr-md my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>3px Large</span><code>.hr-lg</code></div>
            <hr class="hr-lg my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>4px Thick Line</span><code>.hr-thick</code></div>
            <hr class="hr-thick my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>6px Pill Bar</span><code>.hr-xl</code></div>
            <hr class="hr-xl my-1" />
          </div>
        </div>
      </div>

      <!-- 2. Styles & Colors -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">2. Dashed, Dotted & Colors</h4>
          <code>.hr-dashed | .hr-dotted | .hr-{color}</code>
        </div>
        <div class="d-flex flex-column gap-3">
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>Dashed Divider</span><code>.hr-dashed .hr-md</code></div>
            <hr class="hr-dashed hr-md my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>Dotted Divider</span><code>.hr-dotted .hr-lg</code></div>
            <hr class="hr-dotted hr-lg my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>Primary Accent</span><code>.hr-primary .hr-md</code></div>
            <hr class="hr-primary hr-md my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>Success Emerald</span><code>.hr-success .hr-md</code></div>
            <hr class="hr-success hr-md my-1" />
          </div>
          <div>
            <div class="d-flex justify-between text-xs text-muted"><span>Danger Rose</span><code>.hr-danger .hr-md</code></div>
            <hr class="hr-danger hr-md my-1" />
          </div>
        </div>
      </div>

      <!-- 3. Text Dividers -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">3. Labeled Center Text Dividers</h4>
          <code>.hr-text</code>
        </div>
        <p class="text-xs text-secondary mb-3">Useful for auth form boundaries, step separators, and section headers.</p>
        <div class="d-flex flex-column gap-2">
          <div class="hr-text">
            <span>OR PAY WITH DIGITAL ASSETS</span>
          </div>
          <div class="hr-text hr-thick">
            <span>AUDITED SYSTEM LOGS</span>
          </div>
        </div>
      </div>

      <!-- 4. Vertical Dividers (VR) -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-3">
          <h4 class="mb-0">4. Vertical Dividers (VR)</h4>
          <code>.vr / .vr-thick</code>
        </div>
        <p class="text-xs text-secondary mb-3">Inline vertical separators that automatically match the container height.</p>
        <div class="d-flex align-center p-3 rounded-lg border border-subtle gap-3 text-xs">
          <span>Volume: <b>$1,420,000</b></span>
          <div class="vr"></div>
          <span>Tx: <b>8,420</b></span>
          <div class="vr vr-thick"></div>
          <span>Success: <b class="text-success">99.98%</b></span>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- 3. COPYABLE CODE RECIPES                                            -->
    <!-- =================================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-3">
        <h3 class="card-title text-base mb-0">📖 Copyable Code Recipes</h3>
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetHorizontal)">Copy Divider Recipes</button>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-3 gap-4">
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">1. Horizontal Dividers:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 220px;"><code>{{ snippetHorizontal }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">2. Labeled Text Dividers:</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 220px;"><code>{{ snippetText }}</code></pre>
        </div>
        <div>
          <span class="text-xs font-bold text-muted uppercase mb-1 d-block">3. Vertical Dividers (VR):</span>
          <pre class="p-3 rounded-lg font-mono text-xs bg-surface-tonal border border-subtle mb-0 overflow-x-auto" style="font-size: 0.72rem; line-height: 1.4; max-height: 220px;"><code>{{ snippetVertical }}</code></pre>
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
          <p class="text-secondary text-sm mb-0">Complete SCSS design tokens and classes for dividers.</p>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th style="width: 260px;">SCSS Class</th>
                <th style="width: 180px;">Role</th>
                <th>Styling Description & Behaviors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>hr</code> / <code>.hr</code></td>
                <td>Base Divider</td>
                <td>Baseline 1px border-top with subtle border color and 1rem vertical margin.</td>
              </tr>
              <tr>
                <td><code>.hr-thin</code></td>
                <td>1px Thin</td>
                <td>Explicit 1px thin baseline divider.</td>
              </tr>
              <tr>
                <td><code>.hr-md</code></td>
                <td>2px Medium</td>
                <td>2px medium thickness border-top line.</td>
              </tr>
              <tr>
                <td><code>.hr-lg</code></td>
                <td>3px Large</td>
                <td>3px prominent thickness border-top line.</td>
              </tr>
              <tr>
                <td><code>.hr-thick</code></td>
                <td>4px Bold</td>
                <td>4px bold thickness border-top line.</td>
              </tr>
              <tr>
                <td><code>.hr-xl</code></td>
                <td>6px Capsule Bar</td>
                <td>6px thickness with fully rounded capsule ends.</td>
              </tr>
              <tr>
                <td><code>.hr-dashed</code> / <code>.hr-dotted</code></td>
                <td>Line Styles</td>
                <td>Applies dashed or dotted border-top style.</td>
              </tr>
              <tr>
                <td><code>.hr-{color}</code></td>
                <td>Color Themes</td>
                <td>Theme border colors: <code>primary</code>, <code>secondary</code>, <code>accent</code>, <code>success</code>, <code>warning</code>, <code>danger</code>.</td>
              </tr>
              <tr>
                <td><code>.hr-text</code></td>
                <td>Labeled Text Divider</td>
                <td>Flex container with left/right auto-filling horizontal lines and centered text label.</td>
              </tr>
              <tr>
                <td><code>.vr</code> / <code>.vr-thick</code></td>
                <td>Vertical Separator</td>
                <td>Inline-block vertical rule (1px or 3px thick) stretching to match parent flex container height.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
