// eslint.config.cjs
const js = require('@eslint/js');

module.exports = [
    {
        ...js.configs.recommended,
        files: ['**/*.js', '**/*.jsx'],
    },
];
