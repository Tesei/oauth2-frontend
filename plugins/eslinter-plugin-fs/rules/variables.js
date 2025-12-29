export default {
    // обязать или запретить инициализацию переменных при их объявлении
    'init-declarations': 'off',

    // запретить использование имени параметра catch clause, совпадающего с именем переменной во внешней области видимости
    'no-catch-shadow': 'off',

    // запретить удаление переменных
    'no-delete-var': 'error',

    // запретить использование меток с именем, совпадающим с именем переменной
    // https://eslint.org/docs/rules/no-label-var
    'no-label-var': 'error',

    // запретить использование определенных глобальных переменных
    'no-restricted-globals': [
        'error',
        {
            name: 'isFinite',
            message: 'Используйте Number.isFinite вместо https://github.com/airbnb/javascript#standard-library--isfinite',
        },
        {
            name: 'isNaN',
            message: 'Используйте Number.isNaN вместо https://github.com/airbnb/javascript#standard-library--isnan',
        },
    ],

    // запретить объявление переменных, которые уже объявлены во внешней области видимости
    'no-shadow': 'error',

    // запретить затенение имен, таких как arguments
    'no-shadow-restricted-names': 'error',

    // запретить использование необъявленных переменных, если они не указаны в блоке /*global */
    'no-undef': 'error',

    // запретить использование undefined при инициализации переменных
    'no-undef-init': 'error',

    // запретить использование undefined переменной
    // https://eslint.org/docs/rules/no-undefined
    'no-undefined': 'off',

    // запретить объявление переменных, которые не используются в коде
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    // запретить использование переменных до их определения
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
}
