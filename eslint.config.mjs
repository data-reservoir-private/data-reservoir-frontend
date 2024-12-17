import pluginNext from '@next/eslint-plugin-next';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser'; // optional
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@next/next': pluginNext,
      "unused-imports": unusedImports,
    },
    files: ["**/*.{ts,js,tsx,jsx}"],
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      "no-unused-vars": "off",
      "no-undef": "off",
      "eqeqeq": "error",
      "@next/next/no-img-element": "off",
      "semi": "error",
      "no-multiple-empty-lines": "error",
      "no-var": "error",
      "prefer-const": "warn",
    },
  },
];