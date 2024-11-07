import { expect } from "@jest/globals";
import { isArticleModalOpen } from "../../src/components/article-modal.js";

export function isArticleLoaded(name, content) {
    const inner = document.getElementById("article-container-inner");
    const params = new URL(document.location.href).searchParams;

    let check = true;

    expect(params.get("article")).toBe(name);
    if (params.get("article") !== name) check = false;

    expect(inner.innerHTML).toBe(content);
    if (inner.innerHTML !== content) check = false;

    expect(isArticleModalOpen()).toBe(name !== null);
    if (isArticleModalOpen() !== (name !== null)) check = false;

    return check;
}
