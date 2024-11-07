export function setArticleModal(content) {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const close = document.getElementById("article-close-link");
    inner.innerHTML = content;

    if (content) {
        outer.classList.add("-translate-x-full");
        inner.classList.remove("hidden");
        close.classList.remove("hidden");
    } else {
        outer.classList.remove("-translate-x-full");
        inner.classList.add("hidden");
        close.classList.add("hidden");
    }
    return;
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
    articleControlPanel.id = "article-close-link";
    articleControlPanel.className = `
        absolute top-0 left-4 right-4 h-8 flex justify-between items-center
        hidden
    `;
    mid.appendChild(articleControlPanel);

    // Close article link
    const closeArticleBtn = document.createElement("a");
    closeArticleBtn.setAttribute("toarticle", "");
    closeArticleBtn.innerHTML = window.settings.labels.closeArticle;
    closeArticleBtn.className = "text-lg font-sans";
    articleControlPanel.appendChild(closeArticleBtn);

    return outer;
}
