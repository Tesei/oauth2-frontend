import globals from 'globals'
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import sonarjs from 'eslint-plugin-sonarjs'
import fsPlugin from './plugins/eslinter-plugin-fs/index.js'
import prettierConfig from '@vue/eslint-config-prettier'

export default defineConfigWithVueTs([
    { files: ['src/**/*.{ts,mts,js,mjs,cjs,vue,tsx}'] },
    globalIgnores([
        '**/dist/**', 
        '**/dist-ssr/**', 
        '**/coverage/**', 
        'plugins/eslinter-plugin-fs/', 
        'vite-lib.config.js', 
        '**/types/**', 
        '**/node_modules/**',
        '**/storybook-static/**',
        '**/storybook-static/**',
        '**/*.min.js',
        '**/*.bundle.js',
        '**/build/**',
        '**/build-ssr/**',
        'old_version_2026_01/**',
    ]),
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    sonarjs.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    ...fsPlugin.configs.recommended,
    vueTsConfigs.recommended,
    {
        ...pluginVitest.configs.recommended,
        files: ['src/*.{test,spec}.{js,ts,jsx,tsx}'],
    },
    {
        plugins: {
            fsPlugin,
        },
        rules: {            
            'sonarjs/slow-regex': 0,
            'vue/html-indent': 0,
            'vue/no-shared-component-data': 'error',
            'vue/no-deprecated-destroyed-lifecycle': 'error',
            'vue/require-v-for-key': 2, //  обязательный key в директиве v-for
            'vue/no-use-v-if-with-v-for': 2, //  запрет применения v-for и v-if к одному элементу
            'vue/no-side-effects-in-computed-properties': 2, //  запрет кода, который приводит к побочным эффектам в выч. свойствах
            'vue/no-unused-components': 2, // запрет на добавление компонентов, которые не используются в шаблоне
            'vue/multi-word-component-names': 0, //  обязательная многословность в названиях кастомных компонентов
            'vue/no-reserved-component-names': 2, //  предотвращение конфликтов имен между кастомными компонентами и html-элементами
            'vue/no-mutating-props': 2, //  запрет на мутирование props
            'vue/valid-v-bind-sync': 2, //  проверка валидности .sync на v-bind
            'vue/no-reserved-props': 2, //  запрет на использование зарезервированных имен в props
            'vue/singleline-html-element-content-newline': [
                0,
                {
                    //  перенос содержимого html-элемента на новую строку ('nэтибудет управлять prettier)
                    ignoreWhenNoAttributes: true,
                    ignoreWhenEmpty: true,
                    externalIgnores: [],
                },
            ],
            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            'no-unused-vars': ['error', { varsIgnorePattern: '^(props|ref|emit|apiClient)$' }],
            'no-undef': 'error',
            'no-useless-escape': 1, //  уведомления о ненужных escape "/" в строках и регулярных выражениях
            'no-case-declarations': 2, //  запрет на объявление переменных в switch case и default
            'no-constant-condition': ['error', { checkLoops: false }], // Позволяет использовать константные выражения (true) в циклах
            '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^(props|ref|emit|apiClient)$' }],
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            '@typescript-eslint/no-explicit-any': 'warn',
            'vue/block-lang': 0, // разрешено не писать lang="ts" в шаблонах скриптов
            'vue/enforce-style-attribute': ['error', { allow: ['scoped'] }], // обязательный scoped атрибут для style
        },
    },
    prettierConfig, // должен быть последним, чтобы отключить конфликтующие правила ESLint
])
