import { changeSearchParam } from "./change-search-param.js";

const imagesPath = "./assets/images/";

let current = "";

function loadMap(data) {
    const mainContainer = document.getElementById("main-container");
    const container = document.getElementById("map-container");
    container.innerHTML = "";
    const img = document.createElement("img");
    img.src = imagesPath + data.image;
    img.alt = data.name;
    img.className = "h-full w-full absolute";
    img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        mainContainer.style = `aspect-ratio: ${ratio}`;
    };
    container.appendChild(img);
    data.links.forEach((link) => {
        const a = document.createElement("a");
        if (link.size === "large")
            a.className = `
                text-5xl text-shadow font-fancy font-bold absolute
                -translate-x-1/2 -translate-y-1/2 no-underline
            `;
        else if (link.size === "medium")
            a.className = `
                text-3xl text-shadow font-fancy font-bold absolute
                -translate-x-1/2 -translate-y-1/2 no-underline
            `;
        else if (link.size === "small")
            a.className = `
                text-xl text-shadow-sm font-sans font-bold absolute
                -translate-x-1/2 -translate-y-1/2 no-underline
            `;
        if (link.toarticle) a.setAttribute("toarticle", link.toarticle);
        if (link.tomap) a.setAttribute("tomap", link.tomap);
        a.innerHTML = link.name;
        a.style = `top: ${link.pos.y}; left: ${link.pos.x};`;
        container.appendChild(a);
    });
}

export function detectMap() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("map");

    if (query === current) return;

    if (query === null) {
        const defaultMap = window.imports.settings.defaultMap;
        loadMap(window.imports.maps[defaultMap]);
        return;
    }

    if (window.imports.maps[query]) {
        loadMap(window.imports.maps[query]);
        return;
    }

    const defaultMap = window.imports.settings.defaultMap;
    loadMap(window.imports.maps[defaultMap]);
    changeSearchParam({ map: "" });
}
