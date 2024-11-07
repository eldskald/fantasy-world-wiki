const MENU_ICON =
    '<svg width="32px" viewBox="0 0 24 24" fill="none" class="mx-auto stroke-primary" xmlns="http://www.w3.org/2000/svg"><path d="M4 17H20M4 12H20M4 7H20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';

export function getMenuButton() {
    const menuButton = document.createElement("button");
    menuButton.id = "menu-button";
    menuButton.className = "aspect-square h-full lg:hidden";
    menuButton.innerHTML = MENU_ICON;
    menuButton.onclick = () => {
        const modal = document.getElementById("menu-modal");
        const button = document.getElementById("menu-button");
        modal.classList.toggle("-translate-x-full");
        button.classList.toggle("pressed");
    };
    return menuButton;
}

export function getMenuModal() {
    const outer = document.createElement("div");
    outer.id = "menu-modal";
    outer.className = `
        fixed top-14 z-10 w-fit h-fit px-4 transition-all duration-200
        -translate-x-full
    `;
    const inner = document.createElement("div");
    inner.className = "paper w-fit h-fit px-4 py-2 flex flex-col";
    outer.appendChild(inner);

    const articlesIndex = document.createElement("a");
    articlesIndex.setAttribute("tomenu", "articles-index");
    articlesIndex.innerHTML = window.settings.labels.articlesIndexLink;
    articlesIndex.className = "block";
    const mapsIndex = document.createElement("a");
    mapsIndex.setAttribute("tomenu", "maps-index");
    mapsIndex.innerHTML = window.settings.labels.mapsIndexLink;
    mapsIndex.className = "block";
    inner.appendChild(articlesIndex);
    inner.appendChild(mapsIndex);
    if (window.settings.enableCreditsPage) {
        const credits = document.createElement("a");
        credits.setAttribute("tomenu", "credits");
        credits.innerHTML = window.settings.labels.creditsLink;
        credits.className = "block";
        inner.appendChild(credits);
    }

    return outer;
}
