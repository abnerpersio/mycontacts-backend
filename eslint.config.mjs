import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('airbnb-base', 'prettier'),
  {
    plugins: {
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },

      ecmaVersion: 12,
      sourceType: 'commonjs',
    },

    rules: {
      'class-methods-use-this': 'off',
      'consistent-return': 'off',
      camelcase: 'off',
      'comma-dangle': 'off',

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: 'next',
        },
      ],
    },
  },
];