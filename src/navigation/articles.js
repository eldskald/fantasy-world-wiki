import { setLinks } from "./set-links.js";
import articles from "../content/articles.js";

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
}

// This one changes the article on the URL query strings without reloading
export function toArticle(title) {
    const url = new URL(window.location.href);
    if (title) {
        url.searchParams.set("article", title);
    } else {
        url.searchParams.delete("article");
    }
    window.history.pushState(null, "", url.toString());
    detectArticle();
    setLinks();
}
