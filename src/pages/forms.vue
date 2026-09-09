<script setup>
import { ref, computed } from 'vue'

const copiedSnippet = ref('')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  copiedSnippet.value = text
  setTimeout(() => {
    copiedSnippet.value = ''
  }, 2000)
}

// ----------------------------------------------------------------------------
// 1. Interactive Playground State
// ----------------------------------------------------------------------------
const playgroundComponent = ref('datepicker') // 'input' | 'select' | 'textarea' | 'datepicker' | 'timepicker'
const playgroundValue = ref('jui_developer_mode_active')
const playgroundSelectValue = ref('production')
const playgroundTextareaValue = ref('This is an autogrowing textarea built with <JTextarea autogrow>.\nTry typing additional lines or pressing Enter to see it expand smoothly in real-time!')
const playgroundDatePickerValue = ref('2026-09-09')
const playgroundDatePickerStyle = ref('squircle') // 'rounded' | 'squircle' | 'square'
const playgroundDatePickerMode = ref('single') // 'single' | 'datetime' | 'range' | 'range-time'
const playgroundTimePickerValue = ref('02:30 PM')
const playgroundTimePickerStyle = ref('squircle') // 'rounded' | 'squircle' | 'square'
const playgroundTimeFormat = ref('12h') // '12h' | '24h'
const playgroundTimeShowSeconds = ref(false)
const playgroundPattern = ref('boxed')
const playgroundSize = ref('md')
const playgroundType = ref('text')
const playgroundState = ref('none')
const isClearable = ref(true)
const isPasswordToggle = ref(true)
const isAutogrow = ref(true)
const isAllowInput = ref(true)

const playgroundSelectOptions = [
  { title: 'Production AWS (us-east-1)', id: 'production' },
  { title: 'Staging Kubernetes (eu-west-1)', id: 'staging' },
  { title: 'Development Edge (ap-southeast-1)', id: 'development' },
  { title: 'Legacy Sandbox (Archived)', id: 'legacy', disabled: true },
]

// ----------------------------------------------------------------------------
// 2. Showcase States
// ----------------------------------------------------------------------------
// DatePicker Showcase States
const dateRounded = ref('2026-09-09')
const dateSquircle = ref('2026-09-18')
const dateSquare = ref('2026-09-25')

const dateTimeValue = ref('2026-10-15 14:30')
const dateTimeSeconds = ref('2026-11-20 09:45:00')
const dateTime12h = ref('2026-10-15 02:30 PM')

const dateRangeValue = ref(['2026-09-01', '2026-09-15'])
const dateRangeString = ref('2026-10-01 ~ 2026-10-14')
const dateRangeWithTime = ref(['2026-09-01 09:00', '2026-09-15 18:00'])

const dateDirectInput = ref('2026-12-25')
const dateValidState = ref('2026-09-09')
const dateInvalidState = ref('2026-02-31')
const dateMinMax = ref('2026-09-10')

// TimePicker Showcase States
const time12hValue = ref('09:30 AM')
const time24hValue = ref('14:45')
const timeSecondsValue = ref('08:15:30 AM')
const timeStepValue = ref('10:15 AM')
const timeRounded = ref('09:00 AM')
const timeSquircle = ref('01:30 PM')
const timeSquare = ref('06:00 PM')
const timeDirectInput = ref('11:45 PM')
const timeValidState = ref('09:00 AM')
const timeInvalidState = ref('25:99 PM')

const patternDates = ref({
  boxed: '2026-09-01',
  underlined: '2026-09-05',
  filled: '2026-09-10',
  pill: '2026-09-15',
  notch: '2026-09-20',
  floating: '2026-09-25',
})

// Other Showcase States
const selectedRegion = ref('us')
const regionOptions = [
  { title: 'United States (East / N. Virginia)', id: 'us' },
  { title: 'European Union (Frankfurt / eu-central)', id: 'eu' },
  { title: 'Asia Pacific (Tokyo / ap-northeast)', id: 'jp' },
  { title: 'Legacy Data Center (Decommissioned)', id: 'legacy', disabled: true },
]

const autogrowText = ref('The quick brown fox jumps over the lazy dog.\nAutogrowing dynamically recalculates scroll height as lines are added or removed.')
const checkSizes = ref({ sm: true, md: true, lg: true })
const radioSelection = ref('standard')
const switchToggles = ref({ telemetry: true, notifications: true, autoRenew: false })

// ----------------------------------------------------------------------------
// 3. Tabbed Component API & SCSS State
// ----------------------------------------------------------------------------
const activeApiTab = ref('jinput')

const apiTabs = [
  { id: 'jinput', label: 'JInput', tag: '<JInput />', color: 'primary', icon: '📝' },
  { id: 'jselect', label: 'JSelect', tag: '<JSelect />', color: 'accent', icon: '🔽' },
  { id: 'jtextarea', label: 'JTextarea', tag: '<JTextarea />', color: 'success', icon: '📄' },
  { id: 'jdatepicker', label: 'JDatePicker', tag: '<JDatePicker />', color: 'primary', icon: '📅' },
  { id: 'jtimepicker', label: 'JTimePicker', tag: '<JTimePicker />', color: 'info', icon: '🕒' },
  { id: 'jcheckbox', label: 'JCheckbox', tag: '<JCheckbox />', color: 'warning', icon: '☑️' },
  { id: 'jradio', label: 'JRadio', tag: '<JRadio />', color: 'danger', icon: '🔘' },
  { id: 'jswitch', label: 'JSwitch', tag: '<JSwitch />', color: 'danger', icon: '🎚️' },
  { id: 'scss', label: 'Global SCSS', tag: 'Design Tokens', color: 'secondary', icon: '🎨' },
]

// ----------------------------------------------------------------------------
// 4. Code Snippets
// ----------------------------------------------------------------------------
const snippetDatePicker = `<script setup>
import JDatePicker from '@core/components/JDatePicker.vue'
import { ref } from 'vue'

const singleDate = ref('2026-09-09')
const dateWithTime = ref('2026-09-09 14:30')
const dateRange = ref(['2026-09-01', '2026-09-15'])
<` + `/script>

<template>
  <!-- 1. Selection Styles: 'rounded' | 'squircle' | 'square' -->
  <JDatePicker
    v-model="singleDate"
    selection-style="squircle"
    label="Release Schedule"
    hint="Direct keyboard typing enabled with real-time validation"
    :clearable="true"
  />

  <!-- 2. Date & Time Picker with 24h/12h and Quick Presets -->
  <JDatePicker
    v-model="dateWithTime"
    :show-time="true"
    selection-style="rounded"
    label="Deployment Maintenance Window"
  />

  <!-- 3. Date Range Selection with Live Hover Highlighting -->
  <JDatePicker
    v-model="dateRange"
    :range="true"
    selection-style="square"
    label="Sprint Timeline Range"
    range-separator=" ~ "
  />
</template>`

const snippetTimePicker = `<script setup>
import JTimePicker from '@core/components/JTimePicker.vue'
import { ref } from 'vue'

const time12h = ref('02:30 PM')
const time24h = ref('14:30')
const timeSeconds = ref('09:15:30 AM')
<` + `/script>

<template>
  <!-- 1. 12-Hour AM/PM TimePicker -->
  <JTimePicker
    v-model="time12h"
    time-format="12h"
    selection-style="squircle"
    label="Meeting Time"
    hint="AM/PM switcher, direct typing, and quick presets"
  />

  <!-- 2. 24-Hour Military Format with 15-min step -->
  <JTimePicker
    v-model="time24h"
    time-format="24h"
    :minute-step="15"
    selection-style="rounded"
    label="Flight Departure"
  />

  <!-- 3. High Precision with Seconds -->
  <JTimePicker
    v-model="timeSeconds"
    :show-seconds="true"
    selection-style="square"
    label="Log Entry Timestamp"
  />
</template>`

const snippetInput = `<script setup>
import JInput from '@core/components/JInput.vue'
<` + `/script>

<template>
  <!-- Standard Boxed Input with Prepend Icon and Clearable -->
  <JInput
    v-model="username"
    label="Account Username"
    placeholder="Enter username..."
    prepend-icon="👤"
    :clearable="true"
    required
  />

  <!-- Underlined Pattern with Password Eye Toggle -->
  <JInput
    v-model="password"
    pattern="underlined"
    type="password"
    label="Security Password"
    :password-toggle="true"
  />

  <!-- Notch / Outlined Inset Pattern with Validation -->
  <JInput
    v-model="apiKey"
    pattern="notch"
    label="API Token Key"
    :valid="isValidKey"
    valid-feedback="✓ Token verified."
  />
</template>`

const snippetSelect = `<script setup>
import JSelect from '@core/components/JSelect.vue'

const selectedServer = ref('prod')
const servers = [
  { title: 'US East Production', id: 'prod' },
  { title: 'EU West Staging', id: 'staging' },
]
<` + `/script>

<template>
  <JSelect
    v-model="selectedServer"
    label="Target Deployment"
    :options="servers"
    item-title="title"
    item-value="id"
    prepend-icon="⚡"
    :clearable="true"
  />
</template>`

const snippetTextarea = `<script setup>
import JTextarea from '@core/components/JTextarea.vue'
const note = ref('')
<` + `/script>

<template>
  <JTextarea
    v-model="note"
    label="Release Notes"
    placeholder="Type changelog..."
    :autogrow="true"
    :clearable="true"
    hint="Automatically expands height dynamically"
  />
</template>`
</script>

<template>
  <div class="d-flex flex-column gap-6">

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

    <!-- ======================================================== -->
    <!-- PAGE HEADER                                               -->
    <!-- ======================================================== -->
    <header class="d-flex flex-column flex-sm-row align-start align-sm-center justify-between gap-3">
      <div>
        <h1 class="font-bold mb-1" style="font-size: 1.5rem; letter-spacing: -0.02em;">Form Controls & Pickers</h1>
        <p class="text-secondary text-sm mb-0">
          Complete input and picker suite featuring reactive date/time calendars, 6 design patterns, and validation states.
        </p>
      </div>
      <button class="btn btn-sm btn-tonal-primary flex-shrink-0" @click="copyToClipboard(snippetDatePicker)">
        <span>📋 Copy DatePicker Recipe</span>
      </button>
    </header>

    <!-- ======================================================== -->
    <!-- SECTION 0: INTERACTIVE PLAYGROUND                         -->
    <!-- ======================================================== -->
    <div class="card card-bordered p-4 bg-surface-elevated">
      <!-- Section Title -->
      <div class="section-header mb-4">
        <div class="section-header__left">
          <div class="d-flex align-center gap-2">
            <span class="section-number">⚡</span>
            <h3 class="section-header__title mb-0">Interactive Component Playground</h3>
            <span class="badge badge-xs badge-tonal-success">Live Reactive</span>
          </div>
          <p class="section-header__desc mt-1 mb-0">
            Switch components, change patterns/sizes/styles, and toggle features. All changes reflect instantly.
          </p>
        </div>
        <!-- Pattern selector pills -->
        <div class="d-flex flex-wrap gap-1">
          <button
            v-for="p in ['boxed', 'underlined', 'filled', 'pill', 'notch', 'floating']"
            :key="p"
            :class="['btn btn-xs text-capitalize', playgroundPattern === p ? 'btn-primary' : 'btn-tonal-neutral']"
            @click="playgroundPattern = p"
          >
            {{ p }}
          </button>
        </div>
      </div>

      <div class="d-grid grid-cols-1 grid-cols-lg-3 gap-4 align-center">
        <!-- Live Instance -->
        <div class="grid-cols-lg-span-2 p-4 rounded-lg border border-subtle bg-surface-tonal d-flex flex-column gap-3">
          <!-- JDatePicker Playground -->
          <JDatePicker
            v-if="playgroundComponent === 'datepicker'"
            v-model="playgroundDatePickerValue"
            :pattern="playgroundPattern"
            :size="playgroundSize"
            :selection-style="playgroundDatePickerStyle"
            :show-time="playgroundDatePickerMode === 'datetime' || playgroundDatePickerMode === 'range-time'"
            :range="playgroundDatePickerMode === 'range' || playgroundDatePickerMode === 'range-time'"
            :allow-input="isAllowInput"
            :clearable="isClearable"
            :valid="playgroundState === 'valid'"
            :invalid="playgroundState === 'invalid'"
            label="Interactive Schedule Date & Time"
            hint="Try typing directly into the input or clicking the calendar icon to pick!"
            valid-feedback="✓ Date schedule confirmed."
            invalid-feedback="✕ Invalid date sequence selected."
            required
          />

          <!-- JTimePicker Playground -->
          <JTimePicker
            v-else-if="playgroundComponent === 'timepicker'"
            v-model="playgroundTimePickerValue"
            :pattern="playgroundPattern"
            :size="playgroundSize"
            :selection-style="playgroundTimePickerStyle"
            :time-format="playgroundTimeFormat"
            :show-seconds="playgroundTimeShowSeconds"
            :allow-input="isAllowInput"
            :clearable="isClearable"
            :valid="playgroundState === 'valid'"
            :invalid="playgroundState === 'invalid'"
            label="Interactive Scheduled Time"
            hint="Try typing directly into the input or clicking the clock icon to pick!"
            valid-feedback="✓ Time schedule confirmed."
            invalid-feedback="✕ Invalid time selected."
            required
          />

          <!-- JSelect Playground -->
          <JSelect
            v-else-if="playgroundComponent === 'select'"
            v-model="playgroundSelectValue"
            :pattern="playgroundPattern"
            :size="playgroundSize"
            :options="playgroundSelectOptions"
            item-title="title"
            item-value="id"
            item-disabled="disabled"
            :clearable="isClearable"
            :valid="playgroundState === 'valid'"
            :invalid="playgroundState === 'invalid'"
            label="Dynamic Server Environment"
            placeholder="Select an active cluster..."
            hint="Reactive v-model output linked directly to JSelect component state"
            valid-feedback="✓ Server environment active and verified."
            invalid-feedback="✕ Server cluster requires higher privileges."
            prepend-icon="⚡"
            required
          />

          <!-- JTextarea Playground -->
          <JTextarea
            v-else-if="playgroundComponent === 'textarea'"
            v-model="playgroundTextareaValue"
            :pattern="playgroundPattern"
            :size="playgroundSize"
            :autogrow="isAutogrow"
            :clearable="isClearable"
            :valid="playgroundState === 'valid'"
            :invalid="playgroundState === 'invalid'"
            label="Dynamic Autogrowing Notes"
            placeholder="Type or paste multiple lines..."
            hint="Reactive v-model output with automated dynamic height expansion"
            valid-feedback="✓ Notes formatted and synchronized."
            invalid-feedback="✕ Note exceeds maximum payload length."
            required
          />

          <!-- JInput Playground -->
          <JInput
            v-else
            v-model="playgroundValue"
            :pattern="playgroundPattern"
            :size="playgroundSize"
            :type="playgroundType"
            :clearable="isClearable"
            :password-toggle="isPasswordToggle"
            :valid="playgroundState === 'valid'"
            :invalid="playgroundState === 'invalid'"
            label="Dynamic Workspace Parameter"
            placeholder="Type your parameter value..."
            hint="Reactive v-model output linked directly to JInput component state"
            valid-feedback="✓ Parameter configured and validated."
            invalid-feedback="✕ Parameter syntax error detected."
            prepend-icon="⚙️"
            required
          />

          <!-- Reactive footer -->
          <div class="d-flex flex-wrap align-center justify-between pt-2 border-top border-subtle text-xs text-muted gap-2">
            <div>
              <span class="fw-semibold text-body">Active:</span>
              <code class="ms-1 text-primary">
                {{
                  playgroundComponent === 'datepicker'
                    ? `<JDatePicker selection-style="${playgroundDatePickerStyle}" ${playgroundDatePickerMode.includes('range') ? ':range="true"' : ''} ${playgroundDatePickerMode.includes('time') ? ':show-time="true"' : ''} />`
                    : (playgroundComponent === 'timepicker'
                      ? `<JTimePicker time-format="${playgroundTimeFormat}" selection-style="${playgroundTimePickerStyle}" ${playgroundTimeShowSeconds ? ':show-seconds="true"' : ''} />`
                      : (playgroundComponent === 'select' ? '<JSelect />' : (playgroundComponent === 'textarea' ? '<JTextarea autogrow />' : '<JInput />')))
                }}
              </code>
            </div>
            <div>
              <span class="fw-semibold text-body">v-model:</span>
              <code class="ms-1 text-accent">{{ playgroundComponent === 'datepicker' ? JSON.stringify(playgroundDatePickerValue) : (playgroundComponent === 'timepicker' ? playgroundTimePickerValue : (playgroundComponent === 'select' ? playgroundSelectValue : playgroundValue)) }}</code>
            </div>
          </div>
        </div>

        <!-- Playground Controls -->
        <div class="d-flex flex-column gap-3 p-3 rounded-lg border border-subtle bg-surface">
          <!-- Target Component Selector -->
          <div>
            <span class="ctrl-label">Target Component</span>
            <div class="d-flex flex-wrap gap-1">
              <button :class="['btn btn-xs flex-1', playgroundComponent === 'datepicker' ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundComponent = 'datepicker'">&lt;JDatePicker&gt;</button>
              <button :class="['btn btn-xs flex-1', playgroundComponent === 'timepicker' ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundComponent = 'timepicker'">&lt;JTimePicker&gt;</button>
              <button :class="['btn btn-xs flex-1', playgroundComponent === 'input' ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundComponent = 'input'">&lt;JInput&gt;</button>
              <button :class="['btn btn-xs flex-1', playgroundComponent === 'select' ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundComponent = 'select'">&lt;JSelect&gt;</button>
              <button :class="['btn btn-xs flex-1', playgroundComponent === 'textarea' ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundComponent = 'textarea'">&lt;JTextarea&gt;</button>
            </div>
          </div>

          <!-- DatePicker Specific Controls -->
          <template v-if="playgroundComponent === 'datepicker'">
            <div>
              <span class="ctrl-label">Selection Style</span>
              <div class="d-flex gap-1">
                <button v-for="st in ['rounded', 'squircle', 'square']" :key="st" :class="['btn btn-xs flex-1 text-capitalize', playgroundDatePickerStyle === st ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundDatePickerStyle = st">{{ st }}</button>
              </div>
            </div>
            <div>
              <span class="ctrl-label">Picker Mode</span>
              <div class="d-flex flex-wrap gap-1">
                <button v-for="m in [{ id: 'single', label: 'Date' }, { id: 'datetime', label: 'Date+Time' }, { id: 'range', label: 'Range' }, { id: 'range-time', label: 'Range+Time' }]" :key="m.id" :class="['btn btn-xs flex-1', playgroundDatePickerMode === m.id ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundDatePickerMode = m.id; playgroundDatePickerValue = m.id.includes('range') ? ['2026-09-01', '2026-09-15'] : '2026-09-09'">{{ m.label }}</button>
              </div>
            </div>
          </template>

          <!-- TimePicker Specific Controls -->
          <template v-else-if="playgroundComponent === 'timepicker'">
            <div>
              <span class="ctrl-label">Selection Style</span>
              <div class="d-flex gap-1">
                <button v-for="st in ['rounded', 'squircle', 'square']" :key="st" :class="['btn btn-xs flex-1 text-capitalize', playgroundTimePickerStyle === st ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundTimePickerStyle = st">{{ st }}</button>
              </div>
            </div>
            <div>
              <span class="ctrl-label">Time Format</span>
              <div class="d-flex gap-1">
                <button v-for="tf in [{ id: '12h', label: '12h (AM/PM)' }, { id: '24h', label: '24h (Military)' }]" :key="tf.id" :class="['btn btn-xs flex-1', playgroundTimeFormat === tf.id ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundTimeFormat = tf.id; playgroundTimePickerValue = tf.id === '12h' ? '02:30 PM' : '14:30'">{{ tf.label }}</button>
              </div>
            </div>
            <div>
              <span class="ctrl-label">Seconds Precision</span>
              <div class="d-flex gap-1">
                <button :class="['btn btn-xs flex-1', !playgroundTimeShowSeconds ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundTimeShowSeconds = false">hh:mm</button>
                <button :class="['btn btn-xs flex-1', playgroundTimeShowSeconds ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundTimeShowSeconds = true">hh:mm:ss</button>
              </div>
            </div>
          </template>

          <!-- Input Specific Controls -->
          <template v-else-if="playgroundComponent === 'input'">
            <div>
              <span class="ctrl-label">Input Type</span>
              <div class="d-flex gap-1">
                <button v-for="t in ['text', 'password', 'number']" :key="t" :class="['btn btn-xs flex-1 text-capitalize', playgroundType === t ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundType = t">{{ t }}</button>
              </div>
            </div>
          </template>

          <!-- Size Selector -->
          <div>
            <span class="ctrl-label">Component Size</span>
            <div class="d-flex gap-1">
              <button v-for="sz in ['sm', 'md', 'lg']" :key="sz" :class="['btn btn-xs flex-1 text-uppercase', playgroundSize === sz ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundSize = sz">{{ sz }}</button>
            </div>
          </div>

          <!-- Validation State -->
          <div>
            <span class="ctrl-label">Validation State</span>
            <div class="d-flex gap-1">
              <button :class="['btn btn-xs flex-1', playgroundState === 'none' ? 'btn-primary' : 'btn-tonal-neutral']" @click="playgroundState = 'none'">Default</button>
              <button :class="['btn btn-xs flex-1', playgroundState === 'valid' ? 'btn-success' : 'btn-tonal-success']" @click="playgroundState = 'valid'">Valid</button>
              <button :class="['btn btn-xs flex-1', playgroundState === 'invalid' ? 'btn-danger' : 'btn-tonal-danger']" @click="playgroundState = 'invalid'">Invalid</button>
            </div>
          </div>

          <!-- Feature Toggles -->
          <div class="d-flex align-center justify-between pt-1 border-top border-subtle">
            <JCheckbox v-model="isClearable" size="sm" label="Clearable (✕)" />
            <JCheckbox v-if="playgroundComponent === 'datepicker' || playgroundComponent === 'timepicker'" v-model="isAllowInput" size="sm" label="Direct Typing" />
            <JCheckbox v-if="playgroundComponent === 'input'" v-model="isPasswordToggle" size="sm" label="Password Eye" />
            <JCheckbox v-if="playgroundComponent === 'textarea'" v-model="isAutogrow" size="sm" label="Autogrow" />
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- SECTION 1: JDATEPICKER SUITE                              -->
    <!-- ======================================================== -->
    <div class="card card-bordered p-4">
      <!-- Card Header -->
      <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3 mb-5">
        <div>
          <div class="d-flex align-center gap-2 mb-1">
            <h3 class="mb-0">📅 JDatePicker Suite</h3>
            <span class="badge badge-xs badge-primary">New</span>
          </div>
          <p class="text-secondary text-sm mb-0">
            High-performance calendar with <strong>rounded</strong>, <strong>squircle</strong>, and <strong>square</strong> selection styles, integrated timepicker, range tracking, direct keyboard input, and decade navigation.
          </p>
        </div>
        <button class="btn btn-sm btn-tonal-primary flex-shrink-0" @click="copyToClipboard(snippetDatePicker)">
          📋 Copy Recipe
        </button>
      </div>

      <div class="d-flex flex-column gap-5">

        <!-- Feature 1: Selection Shapes -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">1</span>
              Selection Shapes
            </div>
            <code class="showcase-feature__prop">selection-style="rounded" | "squircle" | "square"</code>
          </div>
          <p class="showcase-feature__desc">Custom cell highlighting geometries that adapt to your brand aesthetic. Click any field below to open the calendar and compare the day-cell shapes.</p>

          <div class="d-grid grid-cols-1 grid-cols-md-3 gap-3">
            <!-- Rounded -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-primary">● Rounded</span>
                <span class="badge badge-xs badge-tonal-primary">Pill / 9999px</span>
              </div>
              <JDatePicker v-model="dateRounded" selection-style="rounded" label="Standard Rounded Style" hint="Circular highlight days & pill presets" />
              <div class="showcase-variant__value">Value: <code class="text-primary">{{ dateRounded }}</code></div>
            </div>

            <!-- Squircle -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-accent">■ Squircle</span>
                <span class="badge badge-xs badge-tonal-accent">8px Smooth Radius</span>
              </div>
              <JDatePicker v-model="dateSquircle" selection-style="squircle" label="Squircle Curve Style" hint="Modern superellipse geometry" />
              <div class="showcase-variant__value">Value: <code class="text-accent">{{ dateSquircle }}</code></div>
            </div>

            <!-- Square -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-success">▪ Square</span>
                <span class="badge badge-xs badge-tonal-success">2px Modern Corners</span>
              </div>
              <JDatePicker v-model="dateSquare" selection-style="square" label="Square Crisp Style" hint="Sharp flat edges and flush tracks" />
              <div class="showcase-variant__value">Value: <code class="text-success">{{ dateSquare }}</code></div>
            </div>
          </div>
        </div>

        <!-- Feature 2: Integrated Time Picker -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">2</span>
              Integrated Time Picker Modes
            </div>
            <code class="showcase-feature__prop">:show-time="true" | :show-seconds="true" | time-format="12h"</code>
          </div>
          <p class="showcase-feature__desc">Precise hour, minute, and second stepper spinners, AM/PM 12-hour toggles, and fast time preset pills (00:00, 09:00, 12:00, 18:00, Now).</p>

          <div class="d-grid grid-cols-1 grid-cols-md-3 gap-3">
            <!-- 24-Hour -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-info">🕒 24-Hour Military</span>
                <code class="text-xs">time-format="24h"</code>
              </div>
              <JDatePicker v-model="dateTimeValue" :show-time="true" selection-style="squircle" label="Scheduled Maintenance" hint="24h clock with quick time presets" />
              <div class="showcase-variant__value">Value: <code class="text-info">{{ dateTimeValue }}</code></div>
            </div>

            <!-- 12-Hour AM/PM -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-warning">☀️ 12-Hour AM/PM</span>
                <code class="text-xs">time-format="12h"</code>
              </div>
              <JDatePicker v-model="dateTime12h" :show-time="true" time-format="12h" selection-style="rounded" label="Customer Consultation" hint="Interactive AM/PM toggle switch" />
              <div class="showcase-variant__value">Value: <code class="text-warning">{{ dateTime12h }}</code></div>
            </div>

            <!-- With Seconds -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-danger">⏱️ High-Precision Seconds</span>
                <code class="text-xs">:show-seconds="true"</code>
              </div>
              <JDatePicker v-model="dateTimeSeconds" :show-time="true" :show-seconds="true" selection-style="square" label="Audit Log Timestamp" hint="Includes HH:mm:ss precision dial" />
              <div class="showcase-variant__value">Value: <code class="text-danger">{{ dateTimeSeconds }}</code></div>
            </div>
          </div>
        </div>

        <!-- Feature 3: Date Range -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">3</span>
              Date Range Selection & Connected Tracking
            </div>
            <code class="showcase-feature__prop">:range="true" | range-separator=" ~ "</code>
          </div>
          <p class="showcase-feature__desc">Select start & end dates with dynamic hover preview highlighting across day rows, plus quick preset shortcuts (Last 7 Days, This Month, etc.).</p>

          <div class="d-grid grid-cols-1 grid-cols-md-2 gap-3">
            <!-- Array Range -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-primary">📅 Array Model Range</span>
                <code class="text-xs">v-model="[start, end]"</code>
              </div>
              <JDatePicker v-model="dateRangeValue" :range="true" selection-style="squircle" label="Fiscal Quarter Billing Period" hint="Click start date then end date to select range" />
              <div class="showcase-variant__value">Array: <code class="text-primary">{{ JSON.stringify(dateRangeValue) }}</code></div>
            </div>

            <!-- Range with Time -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-accent">⚡ Range + Time Selection</span>
                <code class="text-xs">:range="true" :show-time="true"</code>
              </div>
              <JDatePicker v-model="dateRangeWithTime" :range="true" :show-time="true" selection-style="rounded" label="Incident Downtime Interval" hint="Configures start and end timestamp boundaries" />
              <div class="showcase-variant__value">Range+Time: <code class="text-accent">{{ JSON.stringify(dateRangeWithTime) }}</code></div>
            </div>
          </div>
        </div>

        <!-- Feature 4: Direct Keyboard Input & Validation -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">4</span>
              Direct Keyboard Input & Validation States
            </div>
            <code class="showcase-feature__prop">:allow-input="true" | valid | invalid</code>
          </div>
          <p class="showcase-feature__desc">Type directly into the input (e.g. <code>2026-12-25</code>, <code>2026/05/10</code>). Input is parsed in real-time, validated, and the calendar view auto-syncs.</p>

          <div class="d-grid grid-cols-1 grid-cols-md-3 gap-3">
            <!-- Direct Input -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-success">⌨️ Direct Keyboard Entry</span>
              </div>
              <JDatePicker v-model="dateDirectInput" label="Direct Keyboard Entry" placeholder="Try typing 2026-12-25..." hint="Type any date and press Enter or Blur" selection-style="squircle" />
              <div class="showcase-variant__value">Parsed: <code class="text-success">{{ dateDirectInput }}</code></div>
            </div>

            <!-- Valid State -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-primary">✓ Valid State</span>
              </div>
              <JDatePicker v-model="dateValidState" valid valid-feedback="✓ Scheduled release approved." label="Validated Release Window" selection-style="rounded" />
              <div class="showcase-variant__value">Value: <code class="text-primary">{{ dateValidState }}</code></div>
            </div>

            <!-- Invalid State -->
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-danger">✕ Invalid State</span>
              </div>
              <JDatePicker v-model="dateInvalidState" invalid invalid-feedback="✕ Selected date is outside operational quarter." label="Invalid Deadline Target" selection-style="square" />
              <div class="showcase-variant__value">Value: <code class="text-danger">{{ dateInvalidState }}</code></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- SECTION 2: JTIMEPICKER SUITE                              -->
    <!-- ======================================================== -->
    <div class="card card-bordered p-4">
      <!-- Card Header -->
      <div class="d-flex flex-column flex-md-row align-start align-md-center justify-between gap-3 mb-5">
        <div>
          <div class="d-flex align-center gap-2 mb-1">
            <h3 class="mb-0">🕒 JTimePicker Suite</h3>
            <span class="badge badge-xs badge-info">New</span>
          </div>
          <p class="text-secondary text-sm mb-0">
            Standalone time picker supporting <strong>12-hour AM/PM</strong>, <strong>24-hour military format</strong>, <strong>seconds precision</strong>, <strong>interval steps</strong>, dual view mode (steppers & scrollable columns), and fast presets.
          </p>
        </div>
        <button class="btn btn-sm btn-tonal-info flex-shrink-0" @click="copyToClipboard(snippetTimePicker)">
          📋 Copy Recipe
        </button>
      </div>

      <div class="d-flex flex-column gap-5">

        <!-- Feature 1: Selection Shapes -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">1</span>
              Selection Shapes
            </div>
            <code class="showcase-feature__prop">selection-style="rounded" | "squircle" | "square"</code>
          </div>
          <p class="showcase-feature__desc">Adaptive geometries matching your design language across all stepper buttons, AM/PM toggle pills, column selectors, and preset chips.</p>

          <div class="d-grid grid-cols-1 grid-cols-md-3 gap-3">
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-primary">● Rounded Capsule</span>
                <span class="badge badge-xs badge-tonal-primary">Pill / 9999px</span>
              </div>
              <JTimePicker v-model="timeRounded" selection-style="rounded" label="Morning Standup" hint="Pill-shaped steppers & toggles" />
              <div class="showcase-variant__value">Value: <code class="text-primary">{{ timeRounded }}</code></div>
            </div>

            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-accent">■ Squircle (iOS Curve)</span>
                <span class="badge badge-xs badge-tonal-accent">8px Radius</span>
              </div>
              <JTimePicker v-model="timeSquircle" selection-style="squircle" label="Afternoon Meeting" hint="Superellipse curved controls" />
              <div class="showcase-variant__value">Value: <code class="text-accent">{{ timeSquircle }}</code></div>
            </div>

            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-success">▪ Square (Crisp 2px)</span>
                <span class="badge badge-xs badge-tonal-success">Flat 2px</span>
              </div>
              <JTimePicker v-model="timeSquare" selection-style="square" label="Evening Wrapup" hint="Sharp clean corners" />
              <div class="showcase-variant__value">Value: <code class="text-success">{{ timeSquare }}</code></div>
            </div>
          </div>
        </div>

        <!-- Feature 2: Time Formats -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">2</span>
              12-Hour AM/PM vs 24-Hour Military Clock
            </div>
            <code class="showcase-feature__prop">time-format="12h" | "24h"</code>
          </div>
          <p class="showcase-feature__desc">12h mode provides smooth segmented AM/PM toggles and 1–12 hour loops, while 24h mode provides standard military time from 00 to 23.</p>

          <div class="d-grid grid-cols-1 grid-cols-md-2 gap-3">
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-warning">☀️ 12-Hour Clock (AM/PM)</span>
                <code class="text-xs">time-format="12h"</code>
              </div>
              <JTimePicker v-model="time12hValue" time-format="12h" selection-style="squircle" label="Client Consultation Hour" hint="Interactive AM/PM toggle pill" />
              <div class="showcase-variant__value">12h Value: <code class="text-warning">{{ time12hValue }}</code></div>
            </div>

            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-info">🕒 24-Hour Military Format</span>
                <code class="text-xs">time-format="24h"</code>
              </div>
              <JTimePicker v-model="time24hValue" time-format="24h" selection-style="squircle" label="Server Cron Schedule" hint="00:00 to 23:59 military time" />
              <div class="showcase-variant__value">24h Value: <code class="text-info">{{ time24hValue }}</code></div>
            </div>
          </div>
        </div>

        <!-- Feature 3: Seconds & Step Intervals -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">3</span>
              Seconds Precision & Minute Intervals
            </div>
            <code class="showcase-feature__prop">:show-seconds="true" | :minute-step="15"</code>
          </div>
          <p class="showcase-feature__desc">Configure high-precision timestamps with seconds spinners, or step intervals for calendar booking slots (e.g. 15-minute appointment steps).</p>

          <div class="d-grid grid-cols-1 grid-cols-md-2 gap-3">
            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-danger">⏱️ Seconds Precision</span>
                <code class="text-xs">:show-seconds="true"</code>
              </div>
              <JTimePicker v-model="timeSecondsValue" :show-seconds="true" time-format="12h" selection-style="square" label="Transaction Timestamp" hint="Includes hh:mm:ss second spinner" />
              <div class="showcase-variant__value">Seconds Value: <code class="text-danger">{{ timeSecondsValue }}</code></div>
            </div>

            <div class="showcase-variant">
              <div class="showcase-variant__label">
                <span class="text-success">⏳ 15-Minute Step Interval</span>
                <code class="text-xs">:minute-step="15"</code>
              </div>
              <JTimePicker v-model="timeStepValue" :minute-step="15" time-format="12h" selection-style="rounded" label="Appointment Slot" hint="Increments/decrements minutes by 15 mins" />
              <div class="showcase-variant__value">Step Value: <code class="text-success">{{ timeStepValue }}</code></div>
            </div>
          </div>
        </div>

        <!-- Feature 4: Direct Typing & Validation -->
        <div class="showcase-feature">
          <div class="showcase-feature__header">
            <div class="showcase-feature__title">
              <span class="showcase-feature__num">4</span>
              Direct Keyboard Input & Validation States
            </div>
            <code class="showcase-feature__prop">:allow-input="true" | valid | invalid</code>
          </div>
          <p class="showcase-feature__desc">Direct manual keyboard input is enabled by default. The input parses typed times (e.g. <code>11:45 PM</code>, <code>14:30</code>) and syncs the popover dials in real-time.</p>

          <div class="d-grid grid-cols-1 grid-cols-md-3 gap-3">
            <div class="showcase-variant">
              <div class="showcase-variant__label"><span class="text-success">⌨️ Direct Keyboard Entry</span></div>
              <JTimePicker v-model="timeDirectInput" label="Manual Time Entry" placeholder="Type 11:45 PM..." hint="Type time and press Enter or Blur" selection-style="squircle" />
              <div class="showcase-variant__value">Parsed: <code class="text-success">{{ timeDirectInput }}</code></div>
            </div>

            <div class="showcase-variant">
              <div class="showcase-variant__label"><span class="text-primary">✓ Validated Time</span></div>
              <JTimePicker v-model="timeValidState" valid valid-feedback="✓ Operating hours confirmed." label="Business Hours Window" selection-style="rounded" />
              <div class="showcase-variant__value">Value: <code class="text-primary">{{ timeValidState }}</code></div>
            </div>

            <div class="showcase-variant">
              <div class="showcase-variant__label"><span class="text-danger">✕ Invalid Time</span></div>
              <JTimePicker v-model="timeInvalidState" invalid invalid-feedback="✕ Selected time exceeds operational shift." label="Shift Cutoff Time" selection-style="square" />
              <div class="showcase-variant__value">Value: <code class="text-danger">{{ timeInvalidState }}</code></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- SECTION 3: THE 6 DESIGN PATTERNS                          -->
    <!-- ======================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center gap-2 mb-1">
        <h3 class="mb-0">🎨 The 6 Design Patterns</h3>
      </div>
      <p class="text-secondary text-sm mb-4">Every form component supports 6 visual patterns. Mix and match across your forms for a consistent design language.</p>

      <div class="d-grid grid-cols-1 grid-cols-md-2 grid-cols-lg-3 gap-3">
        <!-- Pattern 1: Boxed -->
        <div class="pattern-card">
          <div class="pattern-card__header">
            <span class="text-primary fw-bold">1. Standard Boxed</span>
            <code>pattern="boxed"</code>
          </div>
          <div class="d-flex flex-column gap-2">
            <JDatePicker v-model="patternDates.boxed" label="Boxed DatePicker" hint="Clean 1px border" selection-style="squircle" />
            <JInput label="Boxed Input" placeholder="Standard input..." />
            <JSelect label="Boxed Select" :options="['Option Alpha', 'Option Beta']" />
          </div>
        </div>

        <!-- Pattern 2: Underlined -->
        <div class="pattern-card">
          <div class="pattern-card__header">
            <span class="text-accent fw-bold">2. Underlined</span>
            <code>pattern="underlined"</code>
          </div>
          <div class="d-flex flex-column gap-2">
            <JDatePicker v-model="patternDates.underlined" pattern="underlined" label="Underlined Date" hint="Bottom border only" selection-style="rounded" />
            <JInput pattern="underlined" label="Account Name" placeholder="Underlined input..." />
            <JSelect pattern="underlined" label="Currency" :options="['USD ($)', 'EUR (€)']" />
          </div>
        </div>

        <!-- Pattern 3: Filled -->
        <div class="pattern-card">
          <div class="pattern-card__header">
            <span class="text-success fw-bold">3. Filled Surface</span>
            <code>pattern="filled"</code>
          </div>
          <div class="d-flex flex-column gap-2">
            <JDatePicker v-model="patternDates.filled" pattern="filled" label="Filled Date" hint="Tonal background fill" selection-style="squircle" />
            <JInput pattern="filled" label="Organization" placeholder="Filled input..." />
            <JSelect pattern="filled" label="Tax Region" :options="['North America', 'Europe']" />
          </div>
        </div>

        <!-- Pattern 4: Pill -->
        <div class="pattern-card">
          <div class="pattern-card__header">
            <span class="text-warning fw-bold">4. Pill / Rounded</span>
            <code>pattern="pill"</code>
          </div>
          <div class="d-flex flex-column gap-2">
            <JDatePicker v-model="patternDates.pill" pattern="pill" label="Pill Date" hint="Capsule 50px radius" selection-style="rounded" />
            <JInput pattern="pill" label="Search Query" placeholder="🔍 Search records..." />
            <JSelect pattern="pill" label="Filter Plan" :options="['Pro Tier', 'Enterprise']" />
          </div>
        </div>

        <!-- Pattern 5: Notch -->
        <div class="pattern-card">
          <div class="pattern-card__header">
            <span class="text-info fw-bold">5. Notch Inset</span>
            <code>pattern="notch"</code>
          </div>
          <div class="d-flex flex-column gap-2">
            <JDatePicker v-model="patternDates.notch" pattern="notch" label="Full Legal Date" hint="Animated border notch" selection-style="square" />
            <JInput pattern="notch" label="Full Legal Name" placeholder="Jane Doe" />
            <JSelect pattern="notch" label="Channel" :options="['Direct Deposit', 'Wire']" />
          </div>
        </div>

        <!-- Pattern 6: Floating -->
        <div class="pattern-card">
          <div class="pattern-card__header">
            <span class="text-secondary fw-bold">6. Floating Label</span>
            <code>pattern="floating"</code>
          </div>
          <div class="d-flex flex-column gap-2">
            <JDatePicker v-model="patternDates.floating" pattern="floating" label="Scheduled Launch Date" selection-style="squircle" />
            <JInput pattern="floating" type="email" label="Email address" placeholder="name@domain.com" />
            <JSelect pattern="floating" label="Membership" :options="['Standard', 'Premium']" />
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- SECTION 4: SIZES, VALIDATION & INPUT GROUPS              -->
    <!-- ======================================================== -->
    <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">

      <!-- Sizing Scale -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-1">
          <h4 class="mb-0">Sizing Scale</h4>
          <code class="text-xs">size="sm" | "md" | "lg"</code>
        </div>
        <p class="text-muted text-xs mb-3">Three consistent height tiers across all form components.</p>
        <div class="d-flex flex-column gap-3">
          <JDatePicker size="sm" label="Small (32px)" model-value="2026-09-01" selection-style="squircle" />
          <JDatePicker size="md" label="Medium Default (42px)" model-value="2026-09-15" selection-style="squircle" />
          <JDatePicker size="lg" label="Large (56px)" model-value="2026-09-30" selection-style="squircle" />
        </div>
      </div>

      <!-- Validation States -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-1">
          <h4 class="mb-0">Validation States</h4>
          <code class="text-xs">:valid="true" / :invalid="true"</code>
        </div>
        <p class="text-muted text-xs mb-3">Contextual success and error states with descriptive feedback text.</p>
        <div class="d-flex flex-column gap-3">
          <JInput valid label="Valid Input State" model-value="valid_api_key_8892" valid-feedback="✓ API Key verified and active." />
          <JInput invalid label="Invalid Input State" model-value="invalid_payload_token" invalid-feedback="✕ Please enter a valid 16-character token." />
        </div>
      </div>

      <!-- Input Groups -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-1">
          <h4 class="mb-0">Input Groups & Addons</h4>
          <code class="text-xs">prepend-text="..." / append-text="..."</code>
        </div>
        <p class="text-muted text-xs mb-3">Attach text badges, icons, or action buttons to inputs.</p>
        <div class="d-flex flex-column gap-3">
          <JInput prepend-text="$" append-text="USD" type="number" model-value="2450.00" label="Transaction Amount" />
          <JInput prepend-text="https://" placeholder="api.merchant.com" label="Webhook URL">
            <template #append>
              <button class="btn btn-primary">Connect</button>
            </template>
          </JInput>
        </div>
      </div>

      <!-- Checkboxes, Radios & Switches -->
      <div class="card card-bordered p-4">
        <div class="d-flex align-center justify-between mb-1">
          <h4 class="mb-0">Checkboxes, Radios & Switches</h4>
          <code class="text-xs">&lt;JCheckbox&gt; &lt;JRadio&gt; &lt;JSwitch&gt;</code>
        </div>
        <p class="text-muted text-xs mb-3">Three sizes available across all binary selection components.</p>
        <div class="d-flex flex-column gap-3">
          <div class="d-flex flex-wrap align-center gap-4">
            <JCheckbox v-model="checkSizes.sm" size="sm" label="Small Check" />
            <JCheckbox v-model="checkSizes.md" size="md" label="Medium Check" />
            <JCheckbox v-model="checkSizes.lg" size="lg" label="Large Check" />
          </div>
          <div class="d-flex flex-wrap align-center gap-4">
            <JRadio v-model="radioSelection" value="standard" label="Standard SLA" />
            <JRadio v-model="radioSelection" value="platinum" label="Platinum SLA" />
          </div>
          <div class="d-flex flex-wrap align-center gap-4">
            <JSwitch v-model="switchToggles.telemetry" size="sm" label="Telemetry" />
            <JSwitch v-model="switchToggles.notifications" size="md" label="Live Push" />
            <JSwitch v-model="switchToggles.autoRenew" size="lg" label="Auto-Renew" />
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- SECTION 5: COPYABLE CODE RECIPES                          -->
    <!-- ======================================================== -->
    <div class="card card-bordered p-4">
      <div class="d-flex align-center justify-between mb-1">
        <h3 class="mb-0">📖 Code Recipes</h3>
        <button class="btn btn-xs btn-primary" @click="copyToClipboard(snippetDatePicker)">Copy DatePicker Recipe</button>
      </div>
      <p class="text-secondary text-sm mb-4">Copy-ready usage snippets for each component.</p>

      <div class="d-grid grid-cols-1 grid-cols-lg-2 gap-4">
        <div>
          <div class="recipe-label">&lt;JDatePicker&gt; Suite</div>
          <pre class="recipe-code"><code>{{ snippetDatePicker }}</code></pre>
        </div>
        <div>
          <div class="recipe-label">&lt;JInput&gt; Component</div>
          <pre class="recipe-code"><code>{{ snippetInput }}</code></pre>
        </div>
        <div>
          <div class="recipe-label">&lt;JSelect&gt; Component</div>
          <pre class="recipe-code"><code>{{ snippetSelect }}</code></pre>
        </div>
        <div>
          <div class="recipe-label">&lt;JTextarea&gt; Autogrow</div>
          <pre class="recipe-code"><code>{{ snippetTextarea }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- SECTION 6: COMPONENT API & SCSS REFERENCE                 -->
    <!-- ======================================================== -->
    <div class="card card-bordered p-4">
      <div class="mb-1">
        <h3 class="mb-1">📋 Component API Reference</h3>
        <p class="text-secondary text-sm mb-0">Complete props, events, and SCSS class reference for all form components.</p>
      </div>

      <!-- API Navigation Tabs -->
      <div class="d-flex flex-wrap gap-1 p-1 rounded-lg bg-surface-tonal border border-subtle mt-3 mb-4">
        <button
          v-for="t in apiTabs"
          :key="t.id"
          :class="['btn btn-xs d-flex align-center gap-1', activeApiTab === t.id ? 'btn-primary' : 'btn-ghost']"
          @click="activeApiTab = t.id"
        >
          <span>{{ t.icon }}</span>
          <span>{{ t.label }}</span>
        </button>
      </div>

      <!-- TAB 1: JINPUT -->
      <div v-if="activeApiTab === 'jinput'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-primary">📝</span> &lt;JInput /&gt; — Props, Events & Slots</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event / Slot</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>modelValue</code></td><td><code>String | Number</code></td><td><code>''</code></td><td>v-model binding value.</td></tr>
              <tr><td><code>pattern</code></td><td><code>String</code></td><td><code>'boxed'</code></td><td><code>'boxed'</code> | <code>'underlined'</code> | <code>'filled'</code> | <code>'pill'</code> | <code>'notch'</code> | <code>'floating'</code></td></tr>
              <tr><td><code>size</code></td><td><code>String</code></td><td><code>'md'</code></td><td><code>'sm'</code> (32px) | <code>'md'</code> (42px) | <code>'lg'</code> (56px)</td></tr>
              <tr><td><code>label</code> / <code>placeholder</code> / <code>hint</code></td><td><code>String</code></td><td><code>''</code></td><td>Label, placeholder, and helper caption text.</td></tr>
              <tr><td><code>valid</code> / <code>invalid</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Contextual validation states with success/error styling.</td></tr>
              <tr><td><code>validFeedback</code> / <code>invalidFeedback</code></td><td><code>String</code></td><td><code>''</code></td><td>Feedback text displayed under input.</td></tr>
              <tr><td><code>clearable</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Shows ✕ button when input is populated.</td></tr>
              <tr><td><code>passwordToggle</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Shows eye toggle button for password visibility.</td></tr>
              <tr><td><code>prependInnerIcon</code> / <code>appendInnerIcon</code></td><td><code>String</code></td><td><code>''</code></td><td>Icons placed inside the input borders.</td></tr>
              <tr><td><code>prependIcon</code> / <code>appendIcon</code></td><td><code>String</code></td><td><code>''</code></td><td>Leading or trailing icon character in input group.</td></tr>
              <tr><td><code>prependText</code> / <code>appendText</code></td><td><code>String</code></td><td><code>''</code></td><td>Input group attached text badges (e.g. <code>'$'</code>).</td></tr>
              <tr><td><code>@update:modelValue</code> / <code>@change</code></td><td><code>Event</code></td><td>—</td><td>Value update and native change events.</td></tr>
              <tr><td><code>#prepend-inner</code> / <code>#append-inner</code></td><td><code>Slot</code></td><td>—</td><td>Custom inner slots placed inside the input container.</td></tr>
              <tr><td><code>#prepend</code> / <code>#append</code></td><td><code>Slot</code></td><td>—</td><td>Custom addon slots for external buttons or dropdowns.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 2: JSELECT -->
      <div v-if="activeApiTab === 'jselect'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-accent">🔽</span> &lt;JSelect /&gt; — Props, Events & Slots</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event / Slot</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>options</code></td><td><code>Array</code></td><td><code>[]</code></td><td>Array of primitive strings/numbers or objects.</td></tr>
              <tr><td><code>itemTitle</code> / <code>itemValue</code></td><td><code>String</code></td><td><code>'title' / 'value'</code></td><td>Object key mapping for label and value.</td></tr>
              <tr><td><code>itemDisabled</code></td><td><code>String</code></td><td><code>'disabled'</code></td><td>Object key mapping for disabled options.</td></tr>
              <tr><td><code>pattern</code></td><td><code>String</code></td><td><code>'boxed'</code></td><td><code>'boxed'</code> | <code>'underlined'</code> | <code>'filled'</code> | <code>'pill'</code> | <code>'notch'</code> | <code>'floating'</code></td></tr>
              <tr><td><code>clearable</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Allows clearing selection back to empty.</td></tr>
              <tr><td><code>#option="{ option, index }"</code></td><td><code>Slot</code></td><td>—</td><td>Custom template slot for dropdown options.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 3: JTEXTAREA -->
      <div v-if="activeApiTab === 'jtextarea'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-success">📄</span> &lt;JTextarea /&gt; — Props & Events</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>autogrow</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Automatically resizes textarea height based on content.</td></tr>
              <tr><td><code>rows</code> / <code>maxRows</code></td><td><code>Number</code></td><td><code>3 / null</code></td><td>Initial row height and max autogrow expansion ceiling.</td></tr>
              <tr><td><code>pattern</code></td><td><code>String</code></td><td><code>'boxed'</code></td><td><code>'boxed'</code> | <code>'underlined'</code> | <code>'filled'</code> | <code>'pill'</code> | <code>'notch'</code> | <code>'floating'</code></td></tr>
              <tr><td><code>clearable</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Displays top-right clear button.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 4: JDATEPICKER -->
      <div v-if="activeApiTab === 'jdatepicker'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-primary">📅</span> &lt;JDatePicker /&gt; — Props, Events & Shortcuts</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>modelValue</code></td><td><code>String | Array | Date</code></td><td><code>''</code></td><td>v-model binding. String date, Date object, or Array <code>[start, end]</code> for ranges.</td></tr>
              <tr><td><code>selectionStyle</code> / <code>shape</code></td><td><code>String</code></td><td><code>'rounded'</code></td><td><code>'rounded'</code> (circle cells), <code>'squircle'</code> (smooth 8px curve), or <code>'square'</code> (crisp 2px corners).</td></tr>
              <tr><td><code>showTime</code> / <code>withTime</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Enables integrated timepicker with hour/minute/second steppers and quick presets.</td></tr>
              <tr><td><code>range</code> / <code>isRange</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Enables date range selection mode with connected hover track preview.</td></tr>
              <tr><td><code>timeFormat</code></td><td><code>String</code></td><td><code>'24h'</code></td><td><code>'24h'</code> or <code>'12h'</code> with interactive AM/PM switchers.</td></tr>
              <tr><td><code>showSeconds</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Displays additional seconds stepper spinner.</td></tr>
              <tr><td><code>allowInput</code></td><td><code>Boolean</code></td><td><code>true</code></td><td>Allows users to directly type date/time via keyboard with live parsing and validation.</td></tr>
              <tr><td><code>rangeSeparator</code></td><td><code>String</code></td><td><code>' ~ '</code></td><td>Delimiter used when range is formatted as a single string.</td></tr>
              <tr><td><code>shortcuts</code> / <code>showPresets</code></td><td><code>Boolean | Array</code></td><td><code>true</code></td><td>Displays quick presets (Today, Last 7 Days, This Month, etc.).</td></tr>
              <tr><td><code>pattern</code></td><td><code>String</code></td><td><code>'boxed'</code></td><td><code>'boxed'</code> | <code>'underlined'</code> | <code>'filled'</code> | <code>'pill'</code> | <code>'notch'</code> | <code>'floating'</code></td></tr>
              <tr><td><code>size</code></td><td><code>String</code></td><td><code>'md'</code></td><td><code>'sm'</code> (32px) | <code>'md'</code> (42px) | <code>'lg'</code> (56px)</td></tr>
              <tr><td><code>clearable</code></td><td><code>Boolean</code></td><td><code>true</code></td><td>Shows clear button (✕) inside the input when date is populated.</td></tr>
              <tr><td><code>prependInnerIcon</code> / <code>appendInnerIcon</code></td><td><code>String</code></td><td><code>''</code></td><td>Icons placed inside the input borders on left or right side.</td></tr>
              <tr><td><code>#prepend-inner</code> / <code>#append-inner</code></td><td><code>Slot</code></td><td>—</td><td>Custom slots rendered inside the input field (for badges, icons, action buttons).</td></tr>
              <tr><td><code>@update:modelValue</code> / <code>@change</code></td><td><code>Event</code></td><td>—</td><td>Triggered whenever date, time, or range selection changes.</td></tr>
              <tr><td><code>@select</code></td><td><code>Event</code></td><td>—</td><td>Emits selected Date object or <code>{ start, end }</code> payload.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 5: JTIMEPICKER -->
      <div v-if="activeApiTab === 'jtimepicker'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-info">🕒</span> &lt;JTimePicker /&gt; — Props, Events & Controls</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event / Slot</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>modelValue</code></td><td><code>String | Date</code></td><td><code>''</code></td><td>v-model binding. e.g. <code>'02:30 PM'</code>, <code>'14:30'</code>, or Date object.</td></tr>
              <tr><td><code>timeFormat</code></td><td><code>String</code></td><td><code>'12h'</code></td><td><code>'12h'</code> (with AM/PM switcher) or <code>'24h'</code> (military time).</td></tr>
              <tr><td><code>showSeconds</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Displays seconds stepper / column spinner.</td></tr>
              <tr><td><code>minuteStep</code></td><td><code>Number</code></td><td><code>1</code></td><td>Interval step for minute increment/decrement (e.g. <code>5</code>, <code>15</code>, <code>30</code>).</td></tr>
              <tr><td><code>secondStep</code></td><td><code>Number</code></td><td><code>1</code></td><td>Interval step for second increment/decrement.</td></tr>
              <tr><td><code>selectionStyle</code> / <code>shape</code></td><td><code>String</code></td><td><code>'rounded'</code></td><td><code>'rounded'</code> (circle pills), <code>'squircle'</code> (smooth 8px curve), or <code>'square'</code> (crisp 2px corners).</td></tr>
              <tr><td><code>allowInput</code></td><td><code>Boolean</code></td><td><code>true</code></td><td>Allows users to directly type time with live parsing and format preservation.</td></tr>
              <tr><td><code>presets</code> / <code>showPresets</code></td><td><code>Boolean | Array</code></td><td><code>true</code></td><td>Displays quick time presets sidebar (09:00 AM, 12:00 PM, 05:00 PM, etc.).</td></tr>
              <tr><td><code>pattern</code></td><td><code>String</code></td><td><code>'boxed'</code></td><td><code>'boxed'</code> | <code>'underlined'</code> | <code>'filled'</code> | <code>'pill'</code> | <code>'notch'</code> | <code>'floating'</code></td></tr>
              <tr><td><code>size</code></td><td><code>String</code></td><td><code>'md'</code></td><td><code>'sm'</code> (32px) | <code>'md'</code> (42px) | <code>'lg'</code> (56px)</td></tr>
              <tr><td><code>clearable</code></td><td><code>Boolean</code></td><td><code>true</code></td><td>Shows clear button (✕) inside input when time is selected.</td></tr>
              <tr><td><code>prependInnerIcon</code> / <code>appendInnerIcon</code></td><td><code>String</code></td><td><code>''</code></td><td>Inner prefix or suffix icon.</td></tr>
              <tr><td><code>#prepend-inner</code> / <code>#append-inner</code></td><td><code>Slot</code></td><td>—</td><td>Custom slots rendered inside the input field borders.</td></tr>
              <tr><td><code>@update:modelValue</code> / <code>@change</code></td><td><code>Event</code></td><td>—</td><td>Triggered when time value is selected or typed.</td></tr>
              <tr><td><code>@select</code></td><td><code>Event</code></td><td>—</td><td>Emits payload object with <code>{ formatted, hours, minutes, seconds, ampm }</code>.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 6: JCHECKBOX -->
      <div v-if="activeApiTab === 'jcheckbox'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-warning">☑️</span> &lt;JCheckbox /&gt; — Props & Events</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>modelValue</code></td><td><code>Boolean | Array | Any</code></td><td><code>false</code></td><td>Checked state or selected group values.</td></tr>
              <tr><td><code>value</code></td><td><code>Any</code></td><td><code>null</code></td><td>Value when used in multi-select checkbox array or group.</td></tr>
              <tr><td><code>trueValue</code> / <code>falseValue</code></td><td><code>Any</code></td><td><code>true / false</code></td><td>Custom values bound when checkbox is checked/unchecked.</td></tr>
              <tr><td><code>label</code> / <code>hint</code> / <code>caption</code></td><td><code>String</code></td><td><code>''</code></td><td>Label text, helper description, or sub-caption.</td></tr>
              <tr><td><code>size</code></td><td><code>String</code></td><td><code>'md'</code></td><td><code>'sm'</code> | <code>'md'</code> | <code>'lg'</code> checkbox box and typography scale.</td></tr>
              <tr><td><code>color</code></td><td><code>String</code></td><td><code>'primary'</code></td><td>Theme accent: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, <code>accent</code>.</td></tr>
              <tr><td><code>indeterminate</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Displays intermediate dash indicator for parent/child trees.</td></tr>
              <tr><td><code>disabled</code> / <code>readonly</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Disables interaction or sets read-only mode.</td></tr>
              <tr><td><code>@update:modelValue</code> / <code>@change</code></td><td><code>Event</code></td><td>—</td><td>Emits on state change with new value or array.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 7: JRADIO -->
      <div v-if="activeApiTab === 'jradio'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-danger">🔘</span> &lt;JRadio /&gt; — Props & Events</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>modelValue</code></td><td><code>String | Number | Boolean | Object</code></td><td><code>null</code></td><td>Active selected radio group value.</td></tr>
              <tr><td><code>value</code></td><td><code>String | Number | Boolean | Object</code></td><td><code>null</code></td><td>Unique option value emitted when radio is selected.</td></tr>
              <tr><td><code>label</code> / <code>hint</code> / <code>caption</code></td><td><code>String</code></td><td><code>''</code></td><td>Label text, helper description, or sub-caption.</td></tr>
              <tr><td><code>size</code></td><td><code>String</code></td><td><code>'md'</code></td><td><code>'sm'</code> | <code>'md'</code> | <code>'lg'</code> radio button and label scale.</td></tr>
              <tr><td><code>color</code></td><td><code>String</code></td><td><code>'primary'</code></td><td>Theme accent: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, <code>accent</code>.</td></tr>
              <tr><td><code>disabled</code> / <code>readonly</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Disables radio interaction.</td></tr>
              <tr><td><code>name</code></td><td><code>String</code></td><td><code>null</code></td><td>Optional HTML form group name.</td></tr>
              <tr><td><code>@update:modelValue</code> / <code>@change</code></td><td><code>Event</code></td><td>—</td><td>Emits selected value when radio is picked.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 8: JSWITCH -->
      <div v-if="activeApiTab === 'jswitch'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-danger">🎚️</span> &lt;JSwitch /&gt; — Props & Events</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th>Prop / Event</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>modelValue</code></td><td><code>Boolean | Array</code></td><td><code>false</code></td><td>Toggle state boolean binding.</td></tr>
              <tr><td><code>size</code></td><td><code>String</code></td><td><code>'md'</code></td><td><code>'sm'</code> | <code>'md'</code> | <code>'lg'</code> track and thumb sizes.</td></tr>
              <tr><td><code>color</code></td><td><code>String</code></td><td><code>'primary'</code></td><td>Theme color when switch is in active checked state.</td></tr>
              <tr><td><code>disabled</code></td><td><code>Boolean</code></td><td><code>false</code></td><td>Disables switch toggle.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 9: GLOBAL SCSS -->
      <div v-if="activeApiTab === 'scss'">
        <h5 class="mb-3 d-flex align-center gap-2"><span class="text-secondary">🎨</span> Form SCSS Classes & Design Tokens</h5>
        <div class="table-responsive">
          <table class="table table-clean">
            <thead><tr><th style="width: 280px;">SCSS Class</th><th style="width: 180px;">Target</th><th>Styling Description</th></tr></thead>
            <tbody>
              <tr><td><code>.j-datepicker</code></td><td>DatePicker Root</td><td>Base container for input and floating popover.</td></tr>
              <tr><td><code>.selection-rounded</code></td><td>Rounded Shape</td><td>Circular cell highlights and pill presets.</td></tr>
              <tr><td><code>.selection-squircle</code></td><td>Squircle Shape</td><td>Smooth iOS-style curved squircle corners.</td></tr>
              <tr><td><code>.selection-square</code></td><td>Square Shape</td><td>Sharp crisp 2px modern edge highlights.</td></tr>
              <tr><td><code>.j-datepicker-time-panel</code></td><td>Timepicker Panel</td><td>Integrated stepper controls and quick time presets.</td></tr>
              <tr><td><code>.form-control</code> / <code>.form-select</code></td><td>Boxed (Default)</td><td>Standard bordered input container with focus glow ring.</td></tr>
              <tr><td><code>.form-control-underlined</code> / <code>.form-underlined</code></td><td>Underlined</td><td>Transparent background with crisp bottom border only.</td></tr>
              <tr><td><code>.form-control-filled</code> / <code>.form-filled</code></td><td>Filled</td><td>Tonal surface fill with bottom active indicator line.</td></tr>
              <tr><td><code>.form-control-rounded</code> / <code>.form-pill</code></td><td>Pill</td><td>Capsule shape with full 50px rounded border.</td></tr>
              <tr><td><code>.form-notch</code> / <code>.form-notch-label</code></td><td>Notch Inset</td><td>Cutout container where label animates into the top border.</td></tr>
              <tr><td><code>.form-floating</code></td><td>Floating Label</td><td>Material-style container shifting label upward when active.</td></tr>
              <tr><td><code>.form-control-sm</code> / <code>.form-control-lg</code></td><td>Size Modifiers</td><td>Small (32px) and large (56px) height and typography scale.</td></tr>
              <tr><td><code>.is-valid</code> / <code>.is-invalid</code></td><td>Validation States</td><td>Contextual green success or red error borders and icons.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* ================================================== */
/* PAGE HEADER                                        */
/* ================================================== */
.forms-page-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.forms-page-header__title {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.forms-page-header__desc {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.875rem;
}

/* ================================================== */
/* SECTION HEADER (playground)                        */
/* ================================================== */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 992px) {
  .section-header {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.section-number {
  font-size: 1.1rem;
}

.section-header__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
}

.section-header__desc {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

/* ================================================== */
/* CONTROL LABEL (playground panel)                   */
/* ================================================== */
.ctrl-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

/* ================================================== */
/* SHOWCASE FEATURE BLOCK                             */
/* ================================================== */
.showcase-feature {
  border-top: 1px solid var(--border-color-subtle);
  padding-top: 1.25rem;
}

.showcase-feature:first-child {
  border-top: none;
  padding-top: 0;
}

.showcase-feature__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.showcase-feature__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.showcase-feature__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
}

.showcase-feature__prop {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: monospace;
}

.showcase-feature__desc {
  font-size: 0.825rem;
  color: var(--text-secondary);
  margin: 0 0 0.875rem;
  line-height: 1.55;
}

/* ================================================== */
/* SHOWCASE VARIANT CARD (Dark Mode Optimized)        */
/* ================================================== */
.showcase-variant {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.125rem;
  border-radius: 0.5rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color-subtle);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.showcase-variant:hover {
  border-color: var(--primary);
}

.showcase-variant__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-primary);
}

.showcase-variant__value {
  font-size: 0.75rem;
  color: var(--text-muted);
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color-subtle);
  word-break: break-all;
  font-family: monospace;
}

/* ================================================== */
/* PATTERN CARD (Dark Mode Optimized)                 */
/* ================================================== */
.pattern-card {
  padding: 1.125rem;
  border-radius: 0.5rem;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-color-subtle);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pattern-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color-subtle);
  color: var(--text-primary);
}

.pattern-card__header code {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* ================================================== */
/* CODE RECIPE & DOCUMENTATION                        */
/* ================================================== */
.recipe-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.recipe-code {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.55;
  max-height: 250px;
  overflow-y: auto;
  margin: 0;
  background: var(--bg-surface-tonal);
  border: 1px solid var(--border-color-subtle);
  color: var(--text-secondary);
  white-space: pre;
}

/* Clean Documentation Table */
.table-clean th {
  padding: 0.875rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  background: var(--bg-surface-tonal);
  border-bottom: 1px solid var(--border-color-subtle);
}

.table-clean td {
  padding: 0.95rem 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  vertical-align: middle;
  border-bottom: 1px solid var(--border-color-subtle);
}

.table-clean td code {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  background: var(--bg-surface-tonal);
}

.table-clean tr:last-child td {
  border-bottom: none;
}
</style>
