import { setAnchors } from "../components/anchor.js";

export async function detectMenu() {
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

    outer.setAttribute("data-hidden", false);
    inner.innerHTML = `<p>${window.settings.labels.loading}</p>`;
    try {
        const res = await fetch(`${window.settings.paths.menu}${query}.html`);
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
