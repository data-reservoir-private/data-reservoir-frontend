import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
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
      "unused-imports": unusedImports,
    },
    files: ["**/*.{ts,js,tsx,jsx}"],
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-undef": "off",
      "eqeqeq": "error",
      "semi": "error",
      "no-multiple-empty-lines": "error",
      "no-var": "error",
      "prefer-const": "warn",
    },
  },
];