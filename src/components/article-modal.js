export function setArticleModal(content, articleTitle) {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const panel = document.getElementById("article-control-panel");
    const title = document.getElementById("article-title");
    inner.innerHTML = content;
    title.innerHTML = articleTitle;

    if (content) {
        maximizeArticle();
        outer.classList.add("-translate-x-full");
        inner.classList.remove("hidden");
        panel.classList.remove("hidden");
    } else {
        outer.classList.remove("-translate-x-full");
        inner.classList.add("hidden");
        panel.classList.add("hidden");
    }
    return;
}

function minimizeArticle() {
    const mid = document.getElementById("article-container-mid");
    const link = document.getElementById("minimize-article-link");
    mid.classList.add("h-8");
    mid.classList.remove("grow");
    link.innerHTML = window.settings.labels.maximizeArticle;
    link.onclick = maximizeArticle;
}

function maximizeArticle() {
    const mid = document.getElementById("article-container-mid");
    const link = document.getElementById("minimize-article-link");
    mid.classList.remove("h-8");
    mid.classList.add("grow");
    link.innerHTML = window.settings.labels.minimizeArticle;
    link.onclick = minimizeArticle;
}

// This one is mostly for tests but could be useful in the future
export function isArticleModalOpen() {
    const modal = document.getElementById("article-container-outer");
    return modal.classList.contains("-translate-x-full");
}

export function getArticleModal() {
    const outer = document.createElement("div");
    outer.id = "article-container-outer";
    outer.className = `
        fixed top-12 bottom-0 w-screen flex flex-col lg:max-w-screen-lg
        transition-all duration-200 -right-full lg:right-[-1024px]
    `;

    const mid = document.createElement("div");
    mid.id = "article-container-mid";
    mid.className = "m-4 grow relative paper";
    outer.appendChild(mid);
    const inner = document.createElement("article");
    inner.id = "article-container-inner";
    inner.className = `
        absolute top-8 bottom-0 left-0 right-0 px-4 pb-4 overflow-scroll hidden
    `;
    mid.appendChild(inner);

    // Container for the close article link
    const articleControlPanel = document.createElement("div");
    articleControlPanel.id = "article-control-panel";
    articleControlPanel.className = `
        absolute top-0 left-4 right-4 h-8 flex items-center gap-4 hidden
    `;
    mid.appendChild(articleControlPanel);

    // Close article link
    const closeArticleBtn = document.createElement("a");
    closeArticleBtn.setAttribute("toarticle", "");
    closeArticleBtn.id = "close-article-link";
    closeArticleBtn.innerHTML = window.settings.labels.closeArticle;
    closeArticleBtn.className = "text-lg font-sans";
    articleControlPanel.appendChild(closeArticleBtn);

    // Minimize article link
    const minimizeArticleBtn = document.createElement("a");
    minimizeArticleBtn.id = "minimize-article-link";
    minimizeArticleBtn.innerHTML = window.settings.labels.minimizeArticle;
    minimizeArticleBtn.className = "text-lg font-sans cursor-pointer";
    minimizeArticleBtn.onclick = minimizeArticle;
    articleControlPanel.appendChild(minimizeArticleBtn);

    // Article title
    const articleTitle = document.createElement("div");
    articleTitle.id = "article-title";
    articleTitle.className = "text-lg font-sans text-primary truncate grow";
    articleControlPanel.appendChild(articleTitle);

    return outer;
}
