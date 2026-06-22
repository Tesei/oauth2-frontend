export default {
    // обязательно пары геттеров/сеттеров в объектах
    // https://eslint.org/docs/rules/accessor-pairs
    'accessor-pairs': 'off',

    // обязательно возвращать значения в обратных вызовах методов массивов
    // https://eslint.org/docs/rules/array-callback-return
    'array-callback-return': ['error', { allowImplicit: true }],

    // считать оператор var так, как будто он виден только внутри блока
    // https://eslint.org/docs/rules/block-scoped-var
    'block-scoped-var': 'error',

    // устанавливает максимальную сложность циклической структуры программы
    // https://eslint.org/docs/rules/complexity
    complexity: ['off', 20],

    // требуется использование "this" в методах классов
    // https://eslint.org/docs/rules/class-methods-use-this
    // 'class-methods-use-this': [
    //     'error',
    //     {
    //         exceptMethods: [],
    //     },
    // ],

    // требуется чтобы возвращаемое значение всегда присутствовало в return
    // https://eslint.org/docs/rules/consistent-return
    'consistent-return': 'error',

    // устанавливает стандарт для фигурных скобок в управляющих конструкциях
    // https://eslint.org/docs/rules/curly
    // curly: ['error', 'multi-line'], // многострочно

    // требует наличия default в операторах switch
    // https://eslint.org/docs/rules/default-case
    'default-case': ['error', { commentPattern: '^no default$' }],

    // нужно чтобы default в операторах switch был последним
    // https://eslint.org/docs/rules/default-case-last
    'default-case-last': 'error',

    // https://eslint.org/docs/rules/default-param-last
    'default-param-last': 'error',

    // предпочтение использовать нотацию с точкой, где это возможно
    // https://eslint.org/docs/rules/dot-notation
    'dot-notation': ['error', { allowKeywords: true }],

    // устанавливает консистентные переносы строк до или после точек
    // https://eslint.org/docs/rules/dot-location
    'dot-location': ['error', 'property'],

    // требуется использование === и !==
    // https://eslint.org/docs/rules/eqeqeq
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // требуется сгруппировать пары геттеров/сеттеров в литералах объектов и классах
    // https://eslint.org/docs/rules/grouped-accessor-pairs
    'grouped-accessor-pairs': 'error',

    // убеждается, что циклы for-in содержат оператор if
    // https://eslint.org/docs/rules/guard-for-in
    'guard-for-in': 'error',

    // устанавливает максимальное количество классов в файле
    // https://eslint.org/docs/rules/max-classes-per-file
    // 'max-classes-per-file': ['error', 1],

    // запрещено использование alert, confirm и prompt
    // https://eslint.org/docs/rules/no-alert
    'no-alert': 'warn',

    // запрещено использование arguments.caller или arguments.callee
    // https://eslint.org/docs/rules/no-caller
    'no-caller': 'error',

    // запрещены лексические объявления в конструкциях case/default
    // https://eslint.org/docs/rules/no-case-declarations
    'no-case-declarations': 'error',

    // Запретить возврат значения в конструкторе
    // https://eslint.org/docs/rules/no-constructor-return
    'no-constructor-return': 'error',

    // запрет на явное использование операторов деления в начале регулярных выражений
    // https://eslint.org/docs/rules/no-div-regex
    'no-div-regex': 'off',

    // запрещен else после return в условной конструкции if
    // https://eslint.org/docs/rules/no-else-return
    // 'no-else-return': ['error', { allowElseIf: false }],

    // запрет на пустые функции, за исключением отдельных функций и стрелочных функций
    // https://eslint.org/docs/rules/no-empty-function
    'no-empty-function': [
        'error',
        {
            allow: ['arrowFunctions', 'functions', 'methods'],
        },
    ],
}
