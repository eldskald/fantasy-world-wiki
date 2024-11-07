import { expect } from "@jest/globals";
import { isArticleModalOpen } from "../../src/components/article-modal.js";

export function isMenuLoaded(name) {
    const inner = document.getElementById("article-container-inner");
    const params = new URL(document.location.href).searchParams;

    let check = true;

    expect(params.get("menu")).toBe(name);
    if (params.get("menu") !== name) check = false;

    expect(inner.innerHTML).toBe(name);
    if (inner.innerHTML !== name) check = false;

    expect(isArticleModalOpen()).toBe(name !== null);
    if (isArticleModalOpen() !== (name !== null)) check = false;

    return check;
}
