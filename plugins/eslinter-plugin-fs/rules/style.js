export default {
    // накладывать перенос строки после открывающей и перед закрывающей скобками массива
    // https://eslint.org/docs/rules/array-bracket-newline
    // TODO: включить? semver-major
    'array-bracket-newline': ['off', 'consistent'], // альтернатива параметра объекта: { multiline: true, minItems: 3 }

    // накладывать перенос строки между элементами массива
    // https://eslint.org/docs/rules/array-element-newline
    // TODO: включить? semver-major
    'array-element-newline': ['off', { multiline: true, minItems: 3 }],

    // накладывать пробелы внутри скобок массива
    'array-bracket-spacing': ['error', 'never'],

    // накладывать пробелы в однострочных блоках
    // https://eslint.org/docs/rules/block-spacing
    'block-spacing': ['error', 'always'],

    // применять стиль одной скобки
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // требовать имена в стиле camelCase
    camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],

    // требовать или запрещать заглавную букву в начале комментария
    // https://eslint.org/docs/rules/capitalized-comments
    'capitalized-comments': [
        'off',
        'never',
        {
            line: {
                ignorePattern: '.*',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true,
            },
            block: {
                ignorePattern: '.*',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true,
            },
        },
    ],

    // требовать запятые в многострочных объектных литералах
    'comma-dangle': [
        'error',
        {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
        },
    ],

    // накладывать пробелы до и после запятой
    'comma-spacing': ['error', { before: false, after: true }],

    // применять стиль одну запятую
    'comma-style': [
        'error',
        'last',
        {
            exceptions: {
                ArrayExpression: false,
                ArrayPattern: false,
                ArrowFunctionExpression: false,
                CallExpression: false,
                FunctionDeclaration: false,
                FunctionExpression: false,
                ImportDeclaration: false,
                ObjectExpression: false,
                ObjectPattern: false,
                VariableDeclaration: false,
                NewExpression: false,
            },
        },
    ],

    // запрещать добавление пробелов в вычисляемых свойствах
    'computed-property-spacing': ['error', 'never'],
    // ... далее следуют другие правила
}
