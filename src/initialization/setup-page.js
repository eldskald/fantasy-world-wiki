import { getMenuButton, getMenuModal } from "../components/menu.js";
import { getThemeSwitcher } from "../components/theme-switcher.js";
import { getArticleModal } from "../components/article-modal.js";
import { getMapContainer } from "../components/map-container.js";

function setupRoot() {
    document.body.className = "overflow-hidden";
    const contentWrapper = document.createElement("main");
    contentWrapper.className = `
        absolute top-12 left-0 bottom-0 right-0 overflow-scroll bg-bg-light
        dark:bg-bg-dark
    `;
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.className = "min-h-full relative";
    contentWrapper.appendChild(mainContainer);
    contentWrapper.appendChild(getMenuModal());
    document.body.appendChild(contentWrapper);

    return mainContainer;
}

function setupTopbar() {
    const topBar = document.createElement("header");
    topBar.className = `
        absolute top-0 left-0 right-0 h-12 p-1 paper flex
        items-center justify-between lg:px-4
    `;
    document.body.appendChild(topBar);

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
    topBar.appendChild(navContainer);
    if (window.settings.enableCreditsPage) {
        const credits = document.createElement("a");
        credits.setAttribute("tomenu", "credits");
        credits.innerHTML = window.settings.labels.creditsLink;
        navContainer.appendChild(credits);
    }

    // Mobile menu
    const menuButton = getMenuButton();
    topBar.appendChild(menuButton);

    // Theme switcher
    topBar.appendChild(getThemeSwitcher());
}

export function setupPage() {
    // Setup document head
    const title = document.createElement("title");
    title.innerHTML = window.settings.title;
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = `assets/icons/${window.settings.icon}`;
    document.head.appendChild(title);
    document.head.appendChild(icon);

    // Setup document body
    const main = setupRoot();

    setupTopbar();
    main.appendChild(getMapContainer());
    main.appendChild(getArticleModal());
}
