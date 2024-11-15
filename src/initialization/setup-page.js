import { getMenuModal } from "../components/menu.js";
import { getArticleModal } from "../components/article-modal.js";
import { getMapContainer } from "../components/map-container.js";
import { getTopBar } from "../components/top-bar.js";

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
    document.body.className = "overflow-hidden";
    const contentWrapper = document.createElement("main");
    contentWrapper.className = `
        absolute top-12 left-0 bottom-0 right-0 overflow-scroll bg-bg-light
        dark:bg-bg-dark
    `;
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.className = "min-h-full relative overflow-hidden";
    contentWrapper.appendChild(mainContainer);
    contentWrapper.appendChild(getMenuModal());
    document.body.appendChild(contentWrapper);
    document.body.appendChild(getTopBar());
    mainContainer.appendChild(getMapContainer());
    mainContainer.appendChild(getArticleModal());
}
