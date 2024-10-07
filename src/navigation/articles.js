import { setAnchors } from "../components/anchor.js";
import { changeSearchParam } from "./change-search-param.js";

// This one detects the article on the URL query strings and loads it
export function detectArticle() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");

    if (window.imports.articles[query]) {
        outer.setAttribute("data-hidden", false);
        inner.innerHTML = window.imports.articles[query];
        return;
    }

    outer.setAttribute("data-hidden", true);
    inner.innerHTML = "";
    changeSearchParam("article", "");
}

// This one changes the article on the URL query strings without reloading
export function toArticle(title) {
    changeSearchParam("article", title);
    detectArticle();
    setAnchors();
}
