module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    NODE_ENV: 'readonly',
    ethereum: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['security'],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:security/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'strict': ['error', 'global'],
    'camelcase': ['error', { 'properties': 'always' }],
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'dot-notation': ['error', { 'allowKeywords': true, 'allowPattern': '' }],
    'eol-last': ['error', 'always'],
    'eqeqeq': ['error', 'smart'],
    'generator-star-spacing': ['error', 'before'],
    'indent': ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-redeclare': ['error', { 'builtinGlobals': true }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
    'no-undef': 'error',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'space-after-keywords': 'off',
    'keyword-spacing': [2, { 'before': true, 'after': true }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': [2, { 'int32Hint': false }],
    'no-multi-spaces': 'error',
    'space-before-blocks': ['error', 'always'],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'security/detect-object-injection': 'off',
    'key-spacing': ['error', { 'afterColon': true }],
  },
};
