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
    'react/prop-types': 0,
    'sort-imports': 0,
    'no-extra-parens': 1,
    'function-paren-newline': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-function-return-type': 1
  }
};
