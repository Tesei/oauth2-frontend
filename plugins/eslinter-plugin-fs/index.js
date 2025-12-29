import bestPractice from './rules/best-practice.js'
import style from './rules/style.js'
import variables from './rules/variables.js'
import errors from './rules/errors.js'
import es6 from './rules/es6.js'
import vitest from '@vitest/eslint-plugin'

const plugin = {
    meta: {
        name: '@ui-kits/eslint-plugin-fs',
        version: '0.0.1',
    },
    configs: {},
    rules: {},
    processors: {},
}

export default plugin


Object.assign(plugin.configs, {
    recommended: [{
        plugins: {
            // example: plugin
            vitest,
        },
        rules: {
            ...bestPractice,
            ...style,
            ...variables,
            ...errors,
            ...es6,
            ...vitest.configs.recommended.rules,
        },
        languageOptions: {
            globals: {
                myGlobal: "readonly"
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    }]
});