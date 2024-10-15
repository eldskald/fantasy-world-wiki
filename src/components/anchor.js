import { changeSearchParam } from "../navigation/change-search-param.js";
import { detectArticle } from "../navigation/articles.js";
import { detectMap } from "../navigation/maps.js";

// This is to override the default behavior of anchors (<a></a> tags). We want
// them to not reload the page, just change search params and re-render. This
// function scans for anchors and does that. We're using the custom attributes
// `toarticle` and `tomap` to move around instead of `href` so we can just
// point to the name of the article/map and it will modify it without changing
// the other.
export function setAnchors() {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((a) => {
        if (!a.hasAttribute("toarticle") && !a.hasAttribute("tomap")) return;

        const newState = {};
        const url = new URL(window.location.href);
        url.hash = "";
        if (a.hasAttribute("toarticle")) {
            const article = a.getAttribute("toarticle");
            newState.article = article;
            if (article === "") {
                url.searchParams.delete("article");
            } else {
                url.searchParams.set("article", article);
            }
        }
        if (a.hasAttribute("tomap")) {
            const map = a.getAttribute("tomap");
            if (map === window.imports.settings.defaultMap || map === "") {
                newState.map = "";
                url.searchParams.delete("map");
            } else {
                newState.map = map;
                url.searchParams.set("map", map);
            }
        }

        a.setAttribute("href", url.toString());
        a.onclick = () => {
            changeSearchParam(newState);
            detectArticle();
            detectMap();
            setAnchors();
            return false;
        };
    });
}
