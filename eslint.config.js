// eslint.config.cjs
const { FlatCompat } = require('@eslint/eslintrc');
const { ESLint } = require("eslint");

// Create an instance of ESLint to use the recommended config
const eslint = new ESLint();
const recommendedConfig = eslint.calculateConfigForFile('test.js'); // replace 'test.js' with any valid JavaScript file in your project

const compat = new FlatCompat({
  baseDirectory: __dirname, // Ensure this is the directory where your project is located
  recommendedConfig,
});

module.exports = [
  {
    ignores: ['node_modules/**']
  },
  ...compat.extends('eslint:recommended'),
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'module'
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': 'off',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'no-console': 'off',
      'no-prototype-builtins': 'off'
    }
  }
];
