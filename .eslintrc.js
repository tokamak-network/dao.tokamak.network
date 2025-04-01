module.exports = {
  root: true,
  env: {
    node: true, // 중요
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-undef': 'off',  // require/module 에러 제거
    'vue/no-deprecated-filter': 'off',  // filter 사용 허용
    'vue/no-deprecated-destroyed-lifecycle': 'off',  // destroyed 사용 허용
    'vue/multi-word-component-names': 'off' // 단일 단어 컴포넌트 이름 허용
  }
};
