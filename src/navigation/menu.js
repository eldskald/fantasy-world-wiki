import { changeSearchParam } from "./change-search-param.js";

function getOrderedArticles() {
    const articles = Object.keys(window.imports.articles).map((article) => ({
        title: window.imports.articles[article].title,
        link: article,
    }));

    const orderedArticles = {};
    articles.forEach((article) => {
        const letter = article.title[0].toUpperCase();
        if (!orderedArticles[letter]) orderedArticles[letter] = [];
        orderedArticles[letter].push(article);
    });
    Object.values(orderedArticles).forEach((articles) => {
        articles.sort((a, b) => a.title > b.title);
    });

    return orderedArticles;
}

function getOrderedMaps() {
    const maps = Object.keys(window.imports.maps).map((map) => ({
        title: window.imports.maps[map].name,
        link: map,
    }));

    const orderedMaps = {};
    maps.forEach((map) => {
        const letter = map.title[0].toUpperCase();
        if (!orderedMaps[letter]) orderedMaps[letter] = [];
        orderedMaps[letter].push(map);
    });
    Object.values(orderedMaps).forEach((maps) => {
        maps.sort((a, b) => a.title > b.title);
    });

    return orderedMaps;
}

function setupArticlesIndex() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    outer.setAttribute("data-hidden", false);
    inner.innerHTML = "";

    // Putting everything inside this container for test purposes
    const container = document.createElement("dev");
    container.id = "menu-container";
    inner.appendChild(container);

    const articleHeader = document.createElement("h1");
    articleHeader.innerHTML = "Articles Index";
    container.appendChild(articleHeader);

    const index = getOrderedArticles();
    Object.keys(index).forEach((letter) => {
        const letterHeader = document.createElement("h3");
        letterHeader.innerHTML = letter;
        container.appendChild(letterHeader);
        const list = document.createElement("ul");
        container.appendChild(list);

        index[letter].forEach((article) => {
            const li = document.createElement("li");
            list.appendChild(li);
            const a = document.createElement("a");
            a.innerHTML = article.title;
            a.setAttribute("toarticle", article.link);
            li.appendChild(a);
        });
    });
}

function setupMapsIndex() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    outer.setAttribute("data-hidden", false);
    inner.innerHTML = "";

    // Putting everything inside this container for test purposes
    const container = document.createElement("dev");
    container.id = "menu-container";
    inner.appendChild(container);

    const mapsHeader = document.createElement("h1");
    mapsHeader.innerHTML = "Maps Index";
    container.appendChild(mapsHeader);

    const index = getOrderedMaps();
    Object.keys(index).forEach((letter) => {
        const letterHeader = document.createElement("h3");
        letterHeader.innerHTML = letter;
        container.appendChild(letterHeader);
        const list = document.createElement("ul");
        container.appendChild(list);

        index[letter].forEach((map) => {
            const li = document.createElement("li");
            list.appendChild(li);
            const a = document.createElement("a");
            a.innerHTML = map.title;
            a.setAttribute("tomap", map.link);
            li.appendChild(a);
        });
    });
}

export function detectMenu() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("menu");

    if (params.has("article")) return;

    if (query === null) {
        outer.setAttribute("data-hidden", true);
        inner.innerHTML = "";
        return;
    }

    if (query === "articles-index") {
        setupArticlesIndex();
        return;
    }

    if (query === "maps-index") {
        setupMapsIndex();
        return;
    }

    outer.setAttribute("data-hidden", true);
    inner.innerHTML = "";
    changeSearchParam({ menu: "" });
}
