import { setAnchors } from "../components/anchor.js";
import { changeSearchParam } from "./change-search-param.js";
import { articles } from "../content/articles.js";

// This one detects the article on the URL query strings and loads it
export function detectArticle() {
    const container = document.getElementById("article-container");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");

    if (!query) {
        container.innerHTML = "";
        return;
    }

    for (let i = 0; i < articles.length; i++) {
        if (articles[i].name === query) {
            container.innerHTML = articles[i].content;
            return;
        }
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
