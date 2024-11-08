export function getSearchBar() {
    const bar = document.createElement("div");
    bar.id = "search-bar";
    bar.className = `
        w-full lg:max-w-[320px] mt-1 h-8 bg-bg-light dark:bg-bg-dark
        shadow-black shadow-sm transition-all duration-100 overflow-clip
    `;

    const barTint = document.createElement("div");
    barTint.className = `
        w-full h-full px-4 bg-black bg-opacity-10 dark:bg-white
        dark:bg-opacity-10
    `;
    bar.appendChild(barTint);

    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = window.settings.labels.searchBarPlaceholder;
    input.className = `
        leading-normal font-serif text-lg text-fg-light dark:text-fg-dark
        focus:outline-none bg-transparent dark:bg-transparent min-w-0 w-full
        h-6 mt-1
    `;
    input.onfocus = () => {
        const res = document.getElementById("search-result");
        const bar = document.getElementById("search-bar");
        res.classList.remove("hidden");
        bar.classList.remove("h-8");
        bar.classList.add("h-16");
    };
    input.onblur = () => {
        const res = document.getElementById("search-result");
        const bar = document.getElementById("search-bar");
        res.classList.add("hidden");
        bar.classList.add("h-8");
        bar.classList.remove("h-16");
    };

    const result = document.createElement("a");
    result.id = "search-result";
    result.className = "block hidden h-6 mt-2";
    result.innerHTML = "test";

    barTint.appendChild(input);
    barTint.appendChild(result);
    return bar;
}
