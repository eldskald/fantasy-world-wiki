import { setAnchors } from "../components/anchor.js";

function setupPreviewContent(content) {
    // Find <preview-content> tag and returns its contents
    let start = content.search(/<preview-content>/g);
    let end = content.search(/<\/preview-content>/g);

    // If there is no <preview-content> tag, just remove the <h1> tag
    if (start === -1 || end === -1) {
        start = content.search(/<h1>/g);
        end = content.search(/<\/h1>/g);
        if (start === -1 || end === -1) return content;
        return content.replace(content.substring(start, end + 5), "");
    }

    return content.substring(start + 17, end);
}

export function getArticlePreview() {
    const preview = document.createElement("div");
    preview.id = "article-preview";
    preview.className = "absolute z-10 w-96 h-60 px-4 paper hidden";

    const inner = document.createElement("div");
    inner.className = "relative h-full w-full";
    preview.appendChild(inner);

    const content = document.createElement("div");
    content.className = `
        absolute top-2 bottom-0 left-0 right-0 overflow-hidden
    `;
    content.id = "article-preview-content";
    inner.appendChild(content);

    const fade = document.createElement("div");
    fade.className = `
        bg-gradient-to-t from-bg-light dark:from-bg-dark
        absolute left-0 right-0 bottom-0 h-4
    `;
    inner.appendChild(fade);

    return preview;
}

export async function showArticlePreview(x, y, article) {
    const header = document.querySelector("header");
    const container = document.getElementById("article-preview");
    const preview = document.getElementById("article-preview-content");

    // Position the popup
    container.classList.remove("hidden");
    preview.innerHTML = "";
    const pos = { x, y };
    if (pos.x + container.offsetWidth > window.innerWidth) {
        pos.x -= container.offsetWidth + 12;
    } else {
        pos.x += 12;
    }
    if (pos.y + container.offsetHeight > window.innerHeight) {
        pos.y -= container.offsetHeight + 12;
    } else {
        pos.y += 12;
    }
    pos.y -= header.offsetHeight;
    container.style = `top: ${pos.y}px; left: ${pos.x}px;`;

    // Fetch the content
    preview.innerHTML = `<p>${window.settings.labels.loading}</p>`;
    try {
        const res = await fetch(
            `${window.settings.paths.articles}${article}.html`,
            { cache: "no-store" },
        );
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.statusText,
            };
        }
        preview.innerHTML = setupPreviewContent(await res.text());
        setAnchors(preview.querySelectorAll("a"));
    } catch (err) {
        preview.innerHTML = `<h3>${err.status}</h3><p>${err.message}</p>`;
    }
}

export function hideArticlePreview() {
    const preview = document.getElementById("article-preview");
    preview.classList.add("hidden");
}
