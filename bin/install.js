'use strict'

// Run when package is installed
const path = require('path')
const isCI = require('is-ci')
const installFrom = require('../src/install')
const { name } = require('../package.json')

if (isCI && !process.env.HUSKY_IGNORE_CI && !process.env.YORKIE_IGNORE_CI) {
  console.log('CI detected, skipping Git hooks installation')
  process.exit(0)
}

if (process.env.HUSKY_SKIP_INSTALL || process.env.YORKIE_SKIP_INSTALL) {
  console.log(
    `env variable HUSKY_SKIP_INSTALL is set to ${process.env.HUSKY_SKIP_INSTALL}, skipping Git hooks installation`
  )
  process.exit(0)
}

console.log('setting up Git hooks')

const cwd = process.cwd()
const isPnpm = cwd.includes('.pnpm')

function getPnpmDepDir() {
  const prefix = cwd.split('.pnpm')[0]
  const dir = path.join(prefix, name)
  return dir
}

const depDir = isPnpm ? getPnpmDepDir() : path.join(__dirname, '..')
installFrom(depDir)
