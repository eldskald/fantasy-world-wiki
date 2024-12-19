import { setAnchors } from "./anchor.js";

function setResultLink(title, data) {
    const result = document.getElementById("search-result");
    result.innerHTML = title;
    if ("tomap" in data) result.setAttribute("tomap", data.tomap);
    else result.removeAttribute("tomap");
    if ("toarticle" in data) result.setAttribute("toarticle", data.toarticle);
    else result.removeAttribute("toarticle");
    result.classList.remove("hidden");
    setAnchors([result]);
}

function search(input) {
    const result = document.getElementById("search-result");
    result.innerHTML = "";
    result.classList.add("hidden");
    result.classList.remove("block");
    if (!input) return;

    const pattern = new RegExp(input.split("").join(".*"), "i");
    let hit = null;
    for (let i = 0; i < window.search.titles.length; i++) {
        const title = window.search.titles[i];
        if (pattern.test(title)) {
            if (hit) {
                hit = title.length < hit.length ? title : hit;
            } else {
                hit = title;
            }
        }
    }

    if (hit) setResultLink(hit, window.search.table[hit]);
}

export function getSearchBar() {
    const bar = document.createElement("div");
    bar.id = "search-bar";
    bar.className = `
        w-full lg:max-w-[320px] mt-1 h-8 bg-bg-light dark:bg-bg-dark z-20
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
        h-6 mt-1 placeholder:text-fg-light placeholder:dark:text-fg-dark
        placeholder:opacity-50 placeholder:dark:opacity-50
    `;
    input.onfocus = () => {
        const bar = document.getElementById("search-bar");
        bar.classList.remove("h-8");
        bar.classList.add("h-16");
        search(bar.querySelector("input").value);
    };
    input.onblur = () => {
        setTimeout(() => {
            const res = document.getElementById("search-result");
            if (res === document.activeElement) return;

            const bar = document.getElementById("search-bar");
            res.classList.add("hidden");
            res.innerHTML = "";
            bar.classList.add("h-8");
            bar.classList.remove("h-16");
        }, 10);
    };
    input.oninput = (ev) => {
        search(ev.target.value);
    };
    input.addEventListener("keydown", (ev) => {
        const res = document.getElementById("search-result");
        if (ev.key === "Enter" && res.innerHTML) res.click();
    });

    const result = document.createElement("a");
    result.id = "search-result";
    result.className = "block hidden h-6 mt-2";
    result.innerHTML = "";
    result.onblur = () => {
        const res = document.getElementById("search-result");
        const bar = document.getElementById("search-bar");
        res.classList.add("hidden");
        res.innerHTML = "";
        bar.classList.add("h-8");
        bar.classList.remove("h-16");
    };

    barTint.appendChild(input);
    barTint.appendChild(result);
    return bar;
}
