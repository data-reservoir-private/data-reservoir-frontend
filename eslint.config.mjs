import unusedImports from "eslint-plugin-unused-imports";

export default [{
  extends: [
    'next',
    "next/core-web-vitals",
    'plugin:@next/next/recommended',
  ],
  plugins: {
    "unused-imports": unusedImports,
  },
  rules: {
    eqeqeq: "error",
    "@next/next/no-img-element": "off",
    semi: 2,
    "no-multiple-empty-lines": 2,
    "unused-imports/no-unused-imports": "error"
  }
}];
