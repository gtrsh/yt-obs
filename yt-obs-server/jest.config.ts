import type { Config } from 'jest'
import { createDefaultEsmPreset } from 'ts-jest'

const defaultEsmPreset = createDefaultEsmPreset({
  tsconfig: {
    module: 'ESNext',
    target: 'ESNext',
    moduleResolution: 'node',
  },
})

export default {
  ...defaultEsmPreset,
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
  ],
  verbose: true,
} satisfies Config
