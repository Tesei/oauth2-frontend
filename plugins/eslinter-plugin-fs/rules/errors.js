export default {
    // Наложение правила “for” loop update clause на перемещение счетчика в правильном направлении
    // https://eslint.org/docs/rules/for-direction
    'for-direction': 'error',

    // Обеспечение наличия оператора return в геттерах свойств
    // https://eslint.org/docs/rules/getter-return
    'getter-return': ['error', { allowImplicit: true }],

    // Запрещено использование асинхронной функции в качестве исполнителя обещания
    // https://eslint.org/docs/rules/no-async-promise-executor
    'no-async-promise-executor': 'error',

    // Запрещено использование оператора await внутри циклов
    // https://eslint.org/docs/rules/no-await-in-loop
    'no-await-in-loop': 'error',

    // Запрещается сравнение с отрицательным нулем
    // https://eslint.org/docs/rules/no-compare-neg-zero
    'no-compare-neg-zero': 'error',

    // Запрет на присваивание в условных выражениях
    'no-cond-assign': ['error', 'always'],

    // Запрет использования консоли
    // 'no-console': 'warn',

    // Запрет использования константных выражений в условиях
    'no-constant-condition': 'warn',

    // Запрет управляющих символов в регулярных выражениях
    'no-control-regex': 'error',

    // Запрет использования отладчика
    'no-debugger': 'error',

    // Запрет дублирования аргументов в функциях
    'no-dupe-args': 'error',

    // Запрет дублирования условий в цепочках if-else-if
    // https://eslint.org/docs/rules/no-dupe-else-if
    'no-dupe-else-if': 'error',

    // Запрет дублирования ключей при создании литералов объектов
    'no-dupe-keys': 'error',

    // Запрет дублирования меток case
    'no-duplicate-case': 'error',

    // Запрет пустых операторов
    'no-empty': 'error',

    // Запрет использования пустых символьных классов в регулярных выражениях
    'no-empty-character-class': 'error',

    // Запрет присваивания исключения в блоке catch
    'no-ex-assign': 'error',

    // Запрет двойного отрицания приведения к булевому типу в булевом контексте
    'no-extra-boolean-cast': 'error',

    // Запрещены лишние скобки
    // https://eslint.org/docs/rules/no-extra-parens
    'no-extra-parens': [
        'off',
        'all',
        {
            conditionalAssign: true,
            nestedBinaryExpressions: false,
            returnAssign: false,
            ignoreJSX: 'all', // делегировать eslint-plugin-react
            enforceForArrowConditionals: false,
        },
    ],

    // Запрещены лишние точки с запятой
    'no-extra-semi': 'error',

    // Запрет перезаписывания функций, объявленных как объявления функций (function declarations)
    'no-func-assign': 'error',

    // Запрещено присваивание imports
    // https://eslint.org/docs/rules/no-import-assign
    'no-import-assign': 'error',

    // Запрет функций или переменных во вложенных блоках
    'no-inner-declarations': 'error',

    // Запрет недопустимых строк регулярных выражений в конструкторе RegExp
    'no-invalid-regexp': 'error',

    // Запрет неправильного пробела за пределами строк и комментариев
    'no-irregular-whitespace': 'error',

    // Запрещены числовые литералы, теряющие точность
    'no-loss-of-precision': 'error',

    // Запрет символьных классов, созданных с использованием нескольких кодовых точек в синтаксисе символьных классов
    'no-misleading-character-class': 'error',

    // Запрещено использование свойств объекта глобального объекта (Math и JSON) как функций
    'no-obj-calls': 'error',

    // Запрет использования new операторов с глобальными не-конструкторными функциями
    // https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
    'no-new-native-nonconstructor': 'off',

    // Запрет возвращения значений из функций исполнителей промисов
    'no-promise-executor-return': 'error',

    // Запрет использования свойств Object.prototype напрямую
    'no-prototype-builtins': 'error',

    // Запрет нескольких пробелов в литерале регулярного выражения
    'no-regex-spaces': 'error',

    // Запрет возвращения значений из сеттеров
    'no-setter-return': 'error',

    // Запрет разреженных массивов
    'no-sparse-arrays': 'error',

    // Запрет использования синтаксиса плейсхолдера шаблонной строки в обычных строках
    'no-template-curly-in-string': 'error',

    // Избегайте кода, который выглядит как два выражения, но на самом деле является одним
    'no-unexpected-multiline': 'error',

    // Запрет недостижимых операторов после оператора return, throw, continue или break
    'no-unreachable': 'error',

    // Запрет циклов с телом, позволяющим только одну итерацию
    // https://eslint.org/docs/rules/no-unreachable-loop
    'no-unreachable-loop': [
        'error',
        {
            ignore: [], // WhileStatement, DoWhileStatement, ForStatement, ForInStatement, ForOfStatement
        },
    ],

    // https://eslint.org/docs/latest/rules/no-unused-labels
    'no-unused-labels': "error",

    // Запрет return/throw/break/continue внутри блоков finally
    'no-unsafe-finally': 'error',

    // Запрет отрицания левого операнда операторов отношения
    'no-unsafe-negation': 'error',

    // Запрет использования опциональной цепочки в контекстах, где значение undefined не допускается
    'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

    // Запрет на неиспользуемые частные члены класса
    'no-unused-private-class-members': 'off',

    // Запрет бесполезных обратных ссылок в регулярных выражениях
    'no-useless-backreference': 'error',

    // Запрет отрицания левого операнда в выражении in
    // устарело в пользу no-unsafe-negation
    'no-negated-in-lhs': 'off',

    // Запрет присваиваний, которые могут привести к гонкам из-за использования await или yield
    // https://eslint.org/docs/rules/require-atomic-updates
    // Примечание: не включено, потому что это очень ошибочно
    'require-atomic-updates': 'off',

    // Запрет сравнений со значением NaN
    'use-isnan': 'error',

    // Обеспечьте валидность JSDoc комментариев
    'valid-jsdoc': 'off',

    // Убедитесь, что результаты typeof сравниваются с допустимой строкой
    'valid-typeof': ['error', { requireStringLiterals: true }],
}
