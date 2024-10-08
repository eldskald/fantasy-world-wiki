import { expect } from "@jest/globals";

export function isArticleLoaded(name, content) {
    const inner = document.getElementById("article-container-inner");
    const outer = document.getElementById("article-container-outer");
    const params = new URL(document.location.href).searchParams;

    let check = true;

    expect(params.get("article")).toBe(name);
    if (params.get("article") !== name) check = false;

    expect(inner.innerHTML).toBe(content);
    if (inner.innerHTML !== content) check = false;

    expect(outer.getAttribute("data-hidden")).toBe(
        name === null ? "true" : "false",
    );
    if (
        outer.getAttribute("data-hidden") !== (name === null ? "true" : "false")
    )
        check = false;

    return check;
}
