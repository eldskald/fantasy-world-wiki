let current = "";

function articleNotFound() {
    const inner = document.getElementById("article-container-inner");
    const container = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    container.id = "article-not-found";
    h3.innerHTML = "404";
    p.innerHTML = window.imports.settings.labels.articleNotFound;
    container.appendChild(h3);
    container.appendChild(p);
    inner.appendChild(container);
}

export function detectArticle() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");

    if (params.has("menu")) return;

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

    current = query;
    outer.setAttribute("data-hidden", false);
    articleNotFound();
}
