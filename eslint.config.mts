import pluginNext from '@next/eslint-plugin-next';
import eslint from '@eslint/js';
import unusedImports from "eslint-plugin-unused-imports";
import nextVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config'


const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ]
    }
  },
  {
    files: ["**/*.{ts,js,tsx,jsx}"],
    rules: {
      ...eslint.configs.recommended.rules,
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
  }
])

/** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     languageOptions: {
//       // parser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       '@next/next': pluginNext,
//       "unused-imports": unusedImports,
//     },
//     files: ["**/*.{ts,js,tsx,jsx}"],
//     rules: {
//       ...eslint.configs.recommended.rules,
//       ...tseslint.configs.recommended.rules,
//       ...pluginNext.configs.recommended.rules,
//       ...pluginNext.configs['core-web-vitals'].rules,
//       "no-unused-vars": "off",
//       "no-undef": "off",
//       "eqeqeq": "error",
//       "@next/next/no-img-element": "off",
//       "semi": "error",
//       "no-multiple-empty-lines": "error",
//       "no-var": "error",
//       "prefer-const": "warn",
//     },
//   },
// ];

export default eslintConfig;