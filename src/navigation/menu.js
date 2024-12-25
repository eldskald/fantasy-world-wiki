import { setAnchors } from "../components/anchor.js";
import { setArticleModal } from "../components/article-modal.js";

let current = "";

function getMenuTitle(content) {
    const start = content.search(/<h1>/g);
    const end = content.search(/<\/h1>/g);
    if (start === -1 || end === -1) return "";
    return content.substring(start + 4, end);
}

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
        setArticleModal("", "");
        return;
    }

    current = query;
    setArticleModal(`<p>${window.settings.labels.loading}</p>`, "");
    try {
        const res = await fetch(`${window.settings.paths.menu}${query}.html`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.statusText,
            };
        }
        const content = await res.text();
        const title = getMenuTitle(content);
        setArticleModal(content, title);
        const inner = document.getElementById("article-container-inner");
        setAnchors(inner.querySelectorAll("a"));
    } catch (err) {
        setArticleModal(
            `
                <h3>${err.status}</h3>
                <p>${err.message}</p>
            `,
            err.status,
        );
    }
}
