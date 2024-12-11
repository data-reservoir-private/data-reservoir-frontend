import pluginNext from '@next/eslint-plugin-next';
// import eslint from '@eslint/js';
// import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser'; // optional

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
    },
    files: ["**/*.{ts,js,tsx,jsx}"],
    rules: {
      // ...eslint.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      "eqeqeq": "error",
      "@next/next/no-img-element": "off",
      "semi": "error",
      "no-multiple-empty-lines": "error",
      "no-var": "error",
      "prefer-const": "warn"
      // "unused-imports/no-unused-imports": "error",
    },
  },
];

// -----------------
// import js from "@eslint/js";

// /** @type {import('eslint').Linter.Config[]} */
// const configs = [
//   {
//     ignores: [
//       "**/.next/**",
//       "**/node_modules/**",
//     ],
//   },
//   {
//     ignores: [
//       "**/.next/**",
//       "**/node_modules/**",
//     ],
//     files: ["**/src/**/*.ts", "**/src/**/*.tsx"],
//     languageOptions: {
//       ecmaVersion: 6,
//       sourceType: "module",
//     },
//     rules: {
//       "eqeqeq": "error",
//       "@next/next/no-img-element": "off",
//       "semi": "error",
//       "no-multiple-empty-lines": "error",
//       // "unused-imports/no-unused-imports": "error",
//     }
//   }
// ];

// export default configs;