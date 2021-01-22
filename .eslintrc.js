module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    // "max-lines": "error",
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    eqeqeq: "error",
    "no-else-return": ["error", { allowElseIf: false }],
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "prefer-destructuring": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-key": "error",
    "react/jsx-sort-props": "error",
    "no-unsafe-optional-chaining": ["error", { disallowArithmeticOperators: true }],
  },
  parserOptions: {
    tsconfigRootDir: ".",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSXs
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
