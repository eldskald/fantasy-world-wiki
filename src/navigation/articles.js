import { changeSearchParam } from "./change-search-param.js";

let current = "";

export function detectArticle() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");

    if (query === current) return;

    if (query === null) {
        current = "";
        outer.setAttribute("data-hidden", true);
        inner.innerHTML = "";
        return;
    }

    if (window.imports.articles[query]) {
        current = query;
        outer.setAttribute("data-hidden", false);
        inner.innerHTML = window.imports.articles[query].data;
        return;
    }

    current = "";
    outer.setAttribute("data-hidden", true);
    inner.innerHTML = "";
    changeSearchParam({ article: "" });
}
