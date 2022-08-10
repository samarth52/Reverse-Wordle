module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: [
      'error',
      'never',
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] },
    ],
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
  },
}
