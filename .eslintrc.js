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
    'sort-imports': 0
  }
};
