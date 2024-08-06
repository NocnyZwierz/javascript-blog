import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        console: 'readonly',
        window: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['off'],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'no-console': ['off'],
      'no-prototype-builtins': ['off']
    }
  }
];
