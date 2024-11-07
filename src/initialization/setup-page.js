import { getMenuButton, getMenuModal } from "../components/menu.js";

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

    // Theme switcher link
    const themeSwitcher = document.createElement("button");
    themeSwitcher.id = "theme-switcher";
    themeSwitcher.className = "aspect-square h-full";
    topBar.appendChild(themeSwitcher);
}

function setupMapContainer() {
    const mainContainer = document.getElementById("main-container");
    const mapContainer = document.createElement("div");
    mapContainer.id = "map-container";
    mapContainer.className = "h-full w-full";
    mainContainer.appendChild(mapContainer);
}

function setupArticleContainer() {
    const mainContainer = document.getElementById("main-container");
    const articleContainerOuter = document.createElement("div");
    articleContainerOuter.id = "article-container-outer";
    articleContainerOuter.className = `
        fixed top-12 bottom-0 w-screen flex flex-col lg:max-w-screen-lg
        transition-all duration-200 data-[hidden=false]:-translate-x-full
        -right-full lg:right-[-1024px]
    `;
    mainContainer.appendChild(articleContainerOuter);
    const articleContainerMid = document.createElement("div");
    articleContainerMid.className = "m-4 grow relative paper";
    articleContainerOuter.appendChild(articleContainerMid);
    const articleContainerInner = document.createElement("article");
    articleContainerInner.id = "article-container-inner";
    articleContainerInner.className =
        "absolute top-8 bottom-0 left-0 right-0 px-4 pb-4 overflow-scroll";
    articleContainerMid.appendChild(articleContainerInner);

    // Container for the close article link
    const articleControlPanel = document.createElement("div");
    articleControlPanel.className =
        "absolute top-0 left-4 right-4 h-8 flex justify-between items-center";
    articleContainerMid.appendChild(articleControlPanel);

    // Close article link
    const closeArticleBtn = document.createElement("a");
    closeArticleBtn.setAttribute("toarticle", "");
    closeArticleBtn.innerHTML = window.settings.labels.closeArticle;
    closeArticleBtn.className = "text-lg font-sans";
    articleControlPanel.appendChild(closeArticleBtn);
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
    setupRoot();
    setupTopbar();
    setupMapContainer();
    setupArticleContainer();
}
