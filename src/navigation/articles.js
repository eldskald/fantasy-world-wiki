import { setAnchors } from "../components/anchor.js";

let current = "";

export async function detectArticle() {
    const outer = document.getElementById("article-container-outer");
    const inner = document.getElementById("article-container-inner");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("article");

    if (query === current) return;

    if (params.has("menu")) {
        current = "";
        return;
    }

    if (query === null) {
        current = "";
        outer.setAttribute("data-hidden", true);
        inner.innerHTML = "";
        return;
    }

    current = query;
    outer.setAttribute("data-hidden", false);
    inner.innerHTML = `<p>${window.settings.labels.loading}</p>`;
    try {
        const res = await fetch(
            `${window.settings.paths.articles}${query}.html`,
        );
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.statusText,
            };
        }
        inner.innerHTML = await res.text();
        setAnchors(inner.querySelectorAll("a"));
    } catch (err) {
        inner.innerHTML = "";
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        h3.innerHTML = err.status;
        p.innerHTML = err.message;
        inner.appendChild(h3);
        inner.appendChild(p);
    }
}
