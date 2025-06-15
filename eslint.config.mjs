import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

import eslintConfigPrettier from 'eslint-config-prettier/flat';


const noVars = [
  'error',
  {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  },
];

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  
  {
      ignores: ['node_modules', 'lib','bin',"first"],
    },
    {
      extends: [tseslint.configs.recommended],
      rules: {
        'no-var': 'error',
        'no-await-in-loop': 'error',
        'no-empty': 'error',
        'prefer-spread': 'warn',
        curly: 'error',
        'no-func-assign': 'error',
        'no-irregular-whitespace': 'error',
        'require-await': 'error',
        camelcase: 'error',
        'no-magic-numbers': 'error',
        'no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': noVars,
        'no-unused-vars': noVars,
        'no-unused-labels': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
    {
      files: ['cli/**/*.ts'],
      rules: {
        'no-magic-numbers': 'off',
        'no-await-in-loop': 'off',
        'no-console': 'off',
      },
    },

]);
