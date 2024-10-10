export function detectTheme() {
    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.body.classList.add("dark");
        updateThemeSwitcher("dark");
    } else {
        document.body.classList.remove("dark");
        updateThemeSwitcher("light");
    }
}

function updateThemeSwitcher(theme) {
    const btn = document.getElementById("theme-switcher");
    if (theme === "dark") {
        btn.innerHTML = window.imports.settings.labels.lightMode;
        btn.onclick = () => {
            localStorage.theme = "light";
            document.body.classList.remove("dark");
            updateThemeSwitcher("light");
        };
    } else if (theme === "light") {
        btn.innerHTML = window.imports.settings.labels.darkMode;
        btn.onclick = () => {
            localStorage.theme = "dark";
            document.body.classList.add("dark");
            updateThemeSwitcher("dark");
        };
    }
}
