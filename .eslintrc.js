module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@ionic', 'react'],
  extends: ['plugin:@ionic/strict', 'plugin:react/recommended'],
  rules: {
    'sort-imports': 0,
    'function-paren-newline': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-function-return-type': 1
  }
};
