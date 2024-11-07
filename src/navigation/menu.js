import { setAnchors } from "../components/anchor.js";
import { setArticleModal } from "../components/article-modal.js";

let current = "";

export async function detectMenu() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("menu");

    if (query === current) return;

    if (params.has("article") && query === null) {
        current = "";
        return;
    }

    if (query === null) {
        current = "";
        setArticleModal("");
        return;
    }

    current = query;
    setArticleModal(`<p>${window.settings.labels.loading}</p>`);
    try {
        const res = await fetch(`${window.settings.paths.menu}${query}.html`);
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.statusText,
            };
        }
        setArticleModal(await res.text());
        const inner = document.getElementById("article-container-inner");
        setAnchors(inner.querySelectorAll("a"));
    } catch (err) {
        setArticleModal(`
            <h3>${err.status}</h3>
            <p>${err.message}</p>
        `);
    }
}
