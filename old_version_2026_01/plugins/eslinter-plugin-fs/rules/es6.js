export default {
    // накладывает ограничение на использование фигурных скобок, когда они могут быть опущены
    // https://eslint.org/docs/rules/arrow-body-style
    // TODO: enable requireReturnForObjectLiteral?
    'arrow-body-style': [
        'error',
        'as-needed',
        {
            requireReturnForObjectLiteral: false,
        },
    ],

    // требует скобки в параметрах стрелочной функции
    // https://eslint.org/docs/rules/arrow-parens
    // 'arrow-parens': ['error', 'always'],

    // требует пробел перед/после стрелки стрелочной функции
    // https://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', { before: true, after: true }],

    // проверяет вызовы super() в конструкторах
    'constructor-super': 'error',

    // настаивает на отступе вокруг * в генераторных функциях
    // https://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': ['error', { before: false, after: true }],

    // запрещает изменение переменных объявленных как class
    // https://eslint.org/docs/rules/no-class-assign
    'no-class-assign': 'error',

    // запрещает использование стрелочных функций там, где они могут быть спутаны с операторами сравнения
    // https://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': [
        'error',
        {
            allowParens: true,
        },
    ],

    // запрещает изменение констант
    'no-const-assign': 'error',

    // запрещает дублирование членов класса
    // https://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': 'error',

    // ?? запрещает импорт из одного и того же пути более одного раза
    // https://eslint.org/docs/rules/no-duplicate-imports
    // заменен на https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    'no-duplicate-imports': 'error',

    // запрещает использование конструктора Symbol
    // https://eslint.org/docs/rules/no-new-symbol
    'no-new-symbol': 'error',

    // Запрещает указанные имена в экспортах
    // https://eslint.org/docs/rules/no-restricted-exports
    'no-restricted-exports': [
        'error',
        {
            restrictedNamedExports: [
                'default', // используйте `export default` для предоставления экспорта по умолчанию
                'then', // это вызовет массу путаницы, когда ваш модуль динамический `import()`ed и сломается в большинстве версий узлов ESM
            ],
        },
    ],

    // запрещает определенные импорты
    // https://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': [
        'off',
        {
            paths: [],
            patterns: [],
        },
    ],

    // запрещает использование this/super до вызова super() в конструкторах.
    // https://eslint.org/docs/rules/no-this-before-super
    'no-this-before-super': 'error',

    // запрещает бесполезные вычисляемые ключи свойств
    // https://eslint.org/docs/rules/no-useless-computed-key
    'no-useless-computed-key': 'error',

    // запрещает ненужные конструкторы
    // https://eslint.org/docs/rules/no-useless-constructor
    'no-useless-constructor': 'error',

    // запрещает переименование импорта, экспорта и деструктурированных присваиваний под тем же именем
    // https://eslint.org/docs/rules/no-useless-rename
    'no-useless-rename': [
        'error',
        {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
        },
    ],

    // требует использование let или const вместо var
    'no-var': 'error',

    // требует краткий синтаксис свойств и методов для литералов объектов
    // https://eslint.org/docs/rules/object-shorthand
    // 'object-shorthand': [
    //     'error',
    //     'always',
    //     {
    //         ignoreConstructors: false,
    //         avoidQuotes: true,
    //     },
    // ],

    // предлагает использование стрелочных функций в качестве обратных вызовов
    'prefer-arrow-callback': [
        'error',
        {
            allowNamedFunctions: false,
            allowUnboundThis: true,
        },
    ],

    // предпочитает использование объявления const для переменных, которые никогда не модифицируются после объявления
    'prefer-const': [
        'error',
        {
            destructuring: 'any',
            ignoreReadBeforeAssign: true,
        },
    ],

    // запрещает использование parseInt() в пользу двоичных, восьмеричных и шестнадцатеричных литералов
    // https://eslint.org/docs/rules/prefer-numeric-literals
    'prefer-numeric-literals': 'error',

    // Используйте параметры остатка вместо arguments
    // https://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': 'error',

    // предлагает использовать синтаксис распространения вместо .apply()
    // https://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',

    // предлагает использовать шаблонные литералы вместо конкатенации строк
    // https://eslint.org/docs/rules/prefer-template
    'prefer-template': 'error',

    // запрещает генераторные функции, не имеющие оператора yield
    // https://eslint.org/docs/rules/require-yield
    'require-yield': 'error',

    // обязательно использование пробелов вокруг объекта rest-spread
    // https://eslint.org/docs/rules/rest-spread-spacing
    'rest-spread-spacing': ['error', 'never'],

    // сортировка импортов
    // https://eslint.org/docs/rules/sort-imports
    'sort-imports': [
        'off',
        {
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
    ],

    // требует описание символа
    // https://eslint.org/docs/rules/symbol-description
    'symbol-description': 'error',

    // обязывает использование пробельного символа внутри строк шаблонов
    // https://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': 'error',

    // обязывает использование пробелов вокруг * в выражениях yield*
    // https://eslint.org/docs/rules/yield-star-spacing
    'yield-star-spacing': ['error', 'after'],
}
