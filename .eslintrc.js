module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [],
  settings: {},
  rules: {
    // 'no-underscore-dangle': 'off',
    // 'no-param-reassign': ['error', { props: false }],
    // 'no-throw-literal': 0,
  },
  overrides: [
    {
      files: ['test/**/*.*'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-undef': 0,
        'no-unused-expressions': 0,
      },
    },
  ],
  globals: {},
};
