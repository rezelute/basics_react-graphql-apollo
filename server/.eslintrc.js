module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  plugins: [
    'prettier', 'react'
  ],
  rules: {
    "prettier/prettier": "error",

    // React
    'jsx-quotes': ['error', 'prefer-double'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'react/jsx-one-expression-per-line': 'off',

    // Import
    "import/order": [
      "error",
      {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "never"
      }
    ],

    //others
    "no-unused-vars": "warn",
    "no-console": "warn",
    'prefer-template': ['error'],
    'no-var': ['error'],
  },
};
