module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },

  plugins: [],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },

  // add your custom rules here
  rules: {
    semi: [2, 'always'],
    'prettier/prettier': ['error'],
    'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:vue/base',
  ],
};
