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
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ],
      },
    },
    {
      files: ['*.test.ts', '*.js', '__tests__/**/*.ts'],
      rules: {
        'toplevel/no-toplevel-side-effect': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
}
