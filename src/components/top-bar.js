import { getThemeSwitcher } from "./theme-switcher.js";
import { getMenuButton } from "./menu.js";
import { getSearchBar } from "./search-bar.js";

export function getTopBar() {
    const topBar = document.createElement("header");
    topBar.className = `
        absolute top-0 left-0 right-0 h-12 p-1 paper flex flex-row gap-2
        lg:px-4
    `;
    const left = document.createElement("div");
    const center = document.createElement("div");
    const right = document.createElement("div");
    left.className = "lg:basis-1/3 h-full flex";
    center.className =
        "grow lg:grow-0 lg:basis-1/3 h-full flex justify-center items-start";
    right.className = "lg:basis-1/3 h-full flex justify-end";
    topBar.appendChild(left);
    topBar.appendChild(center);
    topBar.appendChild(right);

    // PC navbar
    const icon = document.createElement("img");
    icon.src = "assets/icons/favicon.svg";
    icon.className = "h-8 w-8";
    const articlesIndex = document.createElement("a");
    articlesIndex.setAttribute("tomenu", "articles-index");
    articlesIndex.innerHTML = window.settings.labels.articlesIndexLink;
    const mapsIndex = document.createElement("a");
    mapsIndex.setAttribute("tomenu", "maps-index");
    mapsIndex.innerHTML = window.settings.labels.mapsIndexLink;
    const navContainer = document.createElement("div");
    navContainer.className = "hidden lg:flex gap-4 items-center";
    navContainer.appendChild(icon);
    navContainer.appendChild(articlesIndex);
    navContainer.appendChild(mapsIndex);
    left.appendChild(navContainer);
    if (window.settings.enableCreditsPage) {
        const credits = document.createElement("a");
        credits.setAttribute("tomenu", "credits");
        credits.innerHTML = window.settings.labels.creditsLink;
        navContainer.appendChild(credits);
    }

    // Mobile menu
    left.appendChild(getMenuButton());

    // Search bar
    center.appendChild(getSearchBar());

    // Theme switcher
    right.appendChild(getThemeSwitcher());

    return topBar;
}
