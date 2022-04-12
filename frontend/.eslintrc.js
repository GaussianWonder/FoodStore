module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin', 'react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  root: true,
  env: {
    browser: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-console': 'warn',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
  globals: {
    JSX: 'readonly',
    React: true,
  },
};
