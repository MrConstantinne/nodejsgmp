module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['import', 'unused-imports'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        curly: ['error', 'all'],
        'no-var': ['error'],
        'no-eval': ['error'],
        'use-isnan': ['error'],
        'import/no-unresolved': 'off', // TODO: Unable to resolve path to module '@azure/functions'
        'no-empty': ['error'],
        'no-debugger': ['error'],
        'no-trailing-spaces': ['error', { ignoreComments: true }],
        'eol-last': ['error'],
        'spaced-comment': ['error'],
        'one-var-declaration-per-line': ['error', 'initializations'],
        eqeqeq: ['error', 'always'],
        'quote-props': ['error', 'as-needed'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                alphabetize: { order: 'asc', caseInsensitive: true },
                'newlines-between': 'always',
            },
        ],
        'unused-imports/no-unused-imports-ts': 'error',
        'unused-imports/no-unused-vars-ts': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@src', './src']],
                extensions: ['.ts', '.js', '.jsx', '.json'],
            },
        },
    },
};
