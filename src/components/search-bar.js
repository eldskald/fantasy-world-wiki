export function getSearchBar() {
    const bar = document.createElement("input");
    bar.type = "text";
    bar.placeholder = window.settings.labels.searchBarPlaceholder;
    bar.className = `
        w-full lg:max-w-[320px] my-auto h-8 px-4 bg-black bg-opacity-10
        dark:bg-white dark:bg-opacity-10 shadow-black shadow-sm
        leading-normal font-serif text-lg text-fg-light dark:text-fg-dark
        focus:outline-none focus:bg-opacity-30 dark:focus:bg-opacity-30
    `;

    return bar;
}
