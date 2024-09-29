import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPrettierPluginRecommended from "eslint-plugin-prettier/recommended";
import jest from "eslint-plugin-jest";

export default [
    { languageOptions: { globals: globals.browser } },
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        plugins: { jest },
        rules: {
            "no-console": "error",
        },
        ignores: ["build/", ".github/", "assets/"],
    },
    {
        files: ["src/**/*.test.js"],
        ...jest.configs["flat/recommended"],
        rules: {
            ...jest.configs["flat/recommended"].rules,
            "jest/prefer-expect-assertions": "off",
        },
    },
    pluginJs.configs.recommended,
    eslintPrettierPluginRecommended,
];
