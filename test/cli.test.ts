import { afterEach, expect, test } from 'bun:test'
import { existsSync, unlinkSync } from 'fs'

import { archiveCommand } from '../src/commands/archive-command'

const testFileName = 'Bun — A fast all-in-one JavaScript runtime.zip'

// // Cleanup after each test.
afterEach(() => {
  if (existsSync(testFileName)) {
    unlinkSync(testFileName) // Remove the file if it exists.
  }
})

test('Test archiveCommand', async () => {
  await archiveCommand('https://bun.sh')
  // Check if the ZIP file exists.
  const fileExists = existsSync(testFileName)
  expect(fileExists).toBe(true) // Assert that the file is present.
}, 25000) // Test must run in < 25000 ms.
