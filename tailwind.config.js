/** @type {import('tailwindcss').Config} */
import theme from "./assets/theme";

export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js}",
        "./assets/articles/*.html",
    ],
    theme: {
        extend: {
            colors: theme.colors,
            fontFamily: theme.fonts,
        },
    },
    darkMode: "selector",
    plugins: [],
};
