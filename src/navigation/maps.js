import { setAnchors } from "../components/anchor.js";
import { changeSearchParam } from "./change-search-param.js";

const imagesPath = "./assets/images/";

// This one detects the article on the URL query strings and loads it
export function detectMap() {
    const container = document.getElementById("map-container");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("map");

    if (window.imports.maps[query]) {
        const map = window.imports.maps[query];
        const img = document.createElement("img");
        img.src = imagesPath + map.image;
        img.alt = map.name;
        img.className = "h-full w-full absolute";
        img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            document.body.style = `aspect-ratio: ${ratio}`;
        };
        container.appendChild(img);
        map.links.forEach((link) => {
            const a = document.createElement("a");
            if (link.size === "large") a.className = "map-large";
            else if (link.size === "medium") a.className = "map-medium";
            else if (link.size === "small") a.className = "map-small";
            if (link.toarticle) a.setAttribute("toarticle", link.toarticle);
            if (link.tomap) a.setAttribute("tomap", link.tomap);
            a.innerHTML = link.name;
            a.style = `top: ${link.pos.y}; left: ${link.pos.x};`;
            container.appendChild(a);
        });
        return;
    }

    container.innerHTML = "";
    changeSearchParam("map", "");
}

// This one changes the map on the URL query strings without reloading
export function toMap(title) {
    changeSearchParam("map", title);
    detectMap();
    setAnchors();
}
