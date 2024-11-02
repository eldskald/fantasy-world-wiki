import { expect } from "@jest/globals";

export function isMenuLoaded(name) {
    const inner = document.getElementById("article-container-inner");
    const outer = document.getElementById("article-container-outer");
    const params = new URL(document.location.href).searchParams;

    let check = true;

    expect(params.get("menu")).toBe(name);
    if (params.get("menu") !== name) check = false;

    expect(inner.innerHTML).toBe(name);
    if (inner.innerHTML !== name) check = false;

    expect(outer.getAttribute("data-hidden")).toBe(
        name === null ? "true" : "false",
    );
    if (
        outer.getAttribute("data-hidden") !== (name === null ? "true" : "false")
    ) {
        check = false;
    }

    return check;
}
