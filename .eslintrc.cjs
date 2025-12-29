module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint', ],
    rules: {
        'vue/html-indent': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-unused-components': 2,
        'vue/no-mutating-props': 2,
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^(props|ref|emit)$' }],
        '@typescript-eslint/no-explicit-any': 'warn',
    },
}
