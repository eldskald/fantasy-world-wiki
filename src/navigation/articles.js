import { changeSearchParam } from "./change-search-param.js";

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
    changeSearchParam({ article: "" });
}
