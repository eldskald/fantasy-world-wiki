import { expect } from "@jest/globals";
import { isArticleModalOpen } from "../../src/components/article-modal.js";

function getArticleTitle(content) {
    const start = content.search(/<h1>/g);
    const end = content.search(/<\/h1>/g);
    if (start === -1 || end === -1) return "";
    return content.substring(start + 4, end);
}

export function isArticleLoaded(name, content) {
    const inner = document.getElementById("article-container-inner");
    const title = document.getElementById("article-title");
    const params = new URL(document.location.href).searchParams;

    let check = true;

    expect(params.get("article")).toBe(name);
    if (params.get("article") !== name) check = false;

    expect(inner.innerHTML).toBe(content);
    if (inner.innerHTML !== content) check = false;

    const articleTitle = getArticleTitle(content);
    expect(title.innerHTML).toBe(articleTitle);
    if (title.innerHTML !== articleTitle) check = false;

    expect(isArticleModalOpen()).toBe(name !== null);
    if (isArticleModalOpen() !== (name !== null)) check = false;

    return check;
}
