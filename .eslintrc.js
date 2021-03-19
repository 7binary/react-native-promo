module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
  },
  'env': {
    'jest/globals': true,
  },
};
