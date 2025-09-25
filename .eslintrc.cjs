/* Basic ESLint config for Nuxt/Vue3 projects. If plugins are missing, install:
 *   npm i -D eslint eslint-plugin-vue
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  plugins: ['vue'],
  rules: {
    'vue/no-v-html': 'error',
    // Optional: common hardening rules
    'no-alert': 'error'
  },
  ignorePatterns: ['node_modules/', '.nuxt/', 'dist/', '.output/']
}
