import { setAnchors } from "../components/anchor.js";
import { changeSearchParam } from "./change-search-param.js";

// This one detects the article on the URL query strings and loads it
export function detectArticle() {
    const container = document.getElementById("article-container");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");

    if (window.imports.articles[query]) {
        container.innerHTML = window.imports.articles[query];
        return;
    }

    container.innerHTML = "";
    changeSearchParam("article", "");
}

// This one changes the article on the URL query strings without reloading
export function toArticle(title) {
    changeSearchParam("article", title);
    detectArticle();
    setAnchors();
}
