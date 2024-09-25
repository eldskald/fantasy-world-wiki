import articles from "./content/articles.js";

function detectArticle() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");
    if (!query) return;

    let found = false;
    articles.forEach((article) => {
        if (article.name === query) {
            const container = document.getElementById("article-container");
            container.innerHTML = article.content;
            found = true;
        }
    });

    if (!found) {
        params.delete("article");
        window.location.search = params.toString();
    }
}

detectArticle();
