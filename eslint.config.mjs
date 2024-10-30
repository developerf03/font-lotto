import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // your custom flat configs go here, for example:
  {
    name: 'JS Eslint',
    files: ['**/*.js'],
    rules: {
      'no-console': 'warn', // allow console.log in TypeScript files
      'no-undef': 'off',
      'vue/no-multiple-template-root': 'off',
      camelcase: ['error'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-empty': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'no-multi-spaces': 'error',
      'keyword-spacing': ['error'],
      'arrow-spacing': ['error'],
      'block-spacing': 'error',
      'space-infix-ops': 'error',
      'comma-spacing': ['error'],
    },
  },
  {
    name: 'Vue Eslint',
    files: ['**/*.vue'],
    rules: {
      'vue/attributes-order': ['error'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/no-multiple-template-root': 'off',
    },
  },
)
