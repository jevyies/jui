import fs from 'node:fs'
import path from 'node:path'

const solidDir = path.resolve('src/assets/icons/solid')
const outlinedDir = path.resolve('src/assets/icons/outlined')
const rootDir = path.resolve('src/assets/icons')
const scssPath = path.resolve('src/styles/components/_icons.scss')

// Read all .svg files from solid and outlined directories
const solidFiles = fs.existsSync(solidDir)
  ? fs.readdirSync(solidDir).filter(f => f.endsWith('.svg')).map(f => path.basename(f, '.svg'))
  : []

const outlinedFiles = fs.existsSync(outlinedDir)
  ? fs.readdirSync(outlinedDir).filter(f => f.endsWith('.svg')).map(f => path.basename(f, '.svg'))
  : []

// Unique sorted icon names
const iconNames = Array.from(new Set([...solidFiles, ...outlinedFiles])).sort()

// Ensure root fallback exists for direct url('icons/name.svg') usage
for (const name of iconNames) {
  const rootTarget = path.join(rootDir, `${name}.svg`)
  const solidSource = path.join(solidDir, `${name}.svg`)
  const outlinedSource = path.join(outlinedDir, `${name}.svg`)

  if (!fs.existsSync(rootTarget)) {
    if (fs.existsSync(solidSource)) {
      fs.copyFileSync(solidSource, rootTarget)
    } else if (fs.existsSync(outlinedSource)) {
      fs.copyFileSync(outlinedSource, rootTarget)
    }
  }
}

// Update $jui-icons in _icons.scss
let scssContent = fs.readFileSync(scssPath, 'utf-8')
const formattedList = `$jui-icons: (\n  ${iconNames.map(n => `'${n}'`).join(',\n  ')}\n);`

scssContent = scssContent.replace(/\$jui-icons:\s*\([\s\S]*?\);/, formattedList)
fs.writeFileSync(scssPath, scssContent, 'utf-8')

console.log(`✓ Successfully synced ${iconNames.length} icons into _icons.scss!`)
