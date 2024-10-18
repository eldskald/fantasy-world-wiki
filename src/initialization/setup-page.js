export function setupPage() {
    const title = document.createElement("title");
    title.innerHTML = window.imports.settings.title;
    document.head.appendChild(title);

    document.body.className = "overflow-hidden";
    const contentWrapper = document.createElement("div");
    contentWrapper.className =
        "absolute top-0 left-0 bottom-0 right-0 overflow-scroll";
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.className = "min-h-screen relative";
    contentWrapper.appendChild(mainContainer);
    document.body.appendChild(contentWrapper);

    const mapContainer = document.createElement("div");
    mapContainer.id = "map-container";
    mapContainer.className = "h-full w-full";
    mainContainer.appendChild(mapContainer);

    const articleContainerOuter = document.createElement("div");
    articleContainerOuter.id = "article-container-outer";
    articleContainerOuter.className = `
        fixed top-0 w-screen h-screen flex flex-col lg:max-w-screen-lg
        transition-all duration-200 data-[hidden=false]:-translate-x-full
        -right-full lg:right-[-1024px]
    `;
    mainContainer.appendChild(articleContainerOuter);

    const articleContainerMid = document.createElement("div");
    articleContainerMid.className =
        "m-4 grow relative shadow-black shadow-lg bg-bg-light dark:bg-bg-dark";
    articleContainerOuter.appendChild(articleContainerMid);
    const articleControlPanel = document.createElement("div");
    articleControlPanel.className =
        "absolute top-0 left-4 right-4 h-8 flex justify-between items-center";
    articleContainerMid.appendChild(articleControlPanel);

    const closeArticleBtn = document.createElement("a");
    closeArticleBtn.setAttribute("toarticle", "");
    closeArticleBtn.innerHTML = window.imports.settings.labels.closeArticle;
    articleControlPanel.appendChild(closeArticleBtn);

    const themeSwitcher = document.createElement("a");
    themeSwitcher.id = "theme-switcher";
    themeSwitcher.className = "cursor-pointer";
    articleControlPanel.appendChild(themeSwitcher);

    const articleContainerInner = document.createElement("div");
    articleContainerInner.id = "article-container-inner";
    articleContainerInner.className =
        "absolute top-8 bottom-4 left-0 right-0 px-4 overflow-scroll";
    articleContainerMid.appendChild(articleContainerInner);
}
