module.exports = {
  extends: ['@heise'],
  rules: {
    'no-unused-vars': 'off',
    'unicorn/no-null': 'off',
  },
  env: {
    node: true,
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
      files: ['*.ts', '*.tsx'],
      extends: ['prettier/@typescript-eslint'],
    },
    {
      files: ['*.test.ts', '*.js', '__tests__/**/*.ts'],
      rules: {
        'toplevel/no-toplevel-side-effect': 'off',
      },
    },
  ],
}
