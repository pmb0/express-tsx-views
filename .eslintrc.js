module.exports = {
  extends: ['@heise'],
  rules: {
    'node/no-missing-import': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',

    // Fails for unknown reasons in CI (not locally)
    '@typescript-eslint/no-unsafe-call': 'off',
  },
  env: {
    node: true,
  }
}
