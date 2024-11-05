const MENU_ICON =
    '<svg width="32px" viewBox="0 0 24 24" fill="none" class="mx-auto stroke-primary" xmlns="http://www.w3.org/2000/svg"><path d="M4 17H20M4 12H20M4 7H20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';

export function getMenuButton() {
    const menuButton = document.createElement("button");
    menuButton.id = "menu-button";
    menuButton.className =
        "aspect-square bg-transparent border-transparent px-0 lg:hidden";
    menuButton.innerHTML = MENU_ICON;
    return menuButton;
}
