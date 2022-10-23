'use strict'

// Run when package is uninstalled
const path = require('path')
const uninstallFrom = require('../src/uninstall')
const { name } = require('../package.json')

console.log('husky')
console.log('uninstalling Git hooks')

const cwd = process.cwd()
const isPnpm = cwd.includes('.pnpm')

function getPnpmDepDir() {
  const prefix = cwd.split('.pnpm')[0]
  const dir = path.join(prefix, name)
  return dir
}

const depDir = isPnpm ? getPnpmDepDir() : path.join(__dirname, '..')
uninstallFrom(depDir)
