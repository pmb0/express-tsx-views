module.exports = {
  extends: ['@heise'],
  rules: {
    'node/no-missing-import': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/expiring-todo-comments': 'off',

    // Fails for unknown reasons in CI (not locally)
    '@typescript-eslint/no-unsafe-call': 'off',

    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
  env: {
    node: true,
  },
  "parserOptions": {
    "tsconfigRootDir": __dirname
  }
}
