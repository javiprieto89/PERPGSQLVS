// detect-unused-vars.cjs
const { ESLint } = require("eslint");

(async function main() {
    const eslint = new ESLint({
        overrideConfig: [
            {
                files: ["**/*.jsx"],
                languageOptions: {
                    ecmaVersion: "latest",
                    sourceType: "module",
                    parserOptions: {
                        ecmaFeatures: {
                            jsx: true,
                        },
                    },
                    globals: {
                        window: true,
                        document: true,
                        console: true,
                    },
                },
                rules: {
                    "no-unused-vars": "error",
                },
            },
        ],
    });

    const results = await eslint.lintFiles(["src/**/*.jsx"]);

    let total = 0;

    for (const result of results) {
        const unused = result.messages.filter((m) => m.ruleId === "no-unused-vars");
        if (unused.length > 0) {
            console.log(`\n Archivo: ${result.filePath}`);
            unused.forEach((m) => {
                const variable = m.message.match(/'([^']+)'/);
                console.log(`  🔸 Línea ${m.line}: '${variable?.[1] || "?"}' no se usa.`);
            });
            total += unused.length;
        }
    }

    console.log(`\n Análisis completo. Variables no usadas detectadas: ${total}`);
})();