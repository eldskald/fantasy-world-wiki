import { expect } from "@jest/globals";

export function isMapLoaded(name, data) {
    const params = new URL(document.location.href).searchParams;
    const children = document
        .getElementById("map-container")
        .getElementsByTagName("*");
    const img = children[0];

    let check = true;

    expect(params.get("map")).toBe(name);
    if (params.get("map") !== name) check = false;

    expect(img.tagName).toBe("IMG");
    if (img.tagName !== "IMG") check = false;

    expect(img.src).toBe("http://localhost/assets/images/" + data.image);
    if (img.src !== "http://localhost/assets/images/" + data.image)
        check = false;

    expect(img.alt).toBe(data.name);
    if (img.alt !== data.name) check = false;

    expect(data.links.length).toBe(children.length - 1);
    if (data.links.length !== children.length - 1) check = false;

    for (let i = 1; i < children.length; i++) {
        const elem = children[i];
        const link = data.links[i - 1];

        expect(elem.tagName).toBe("A");
        if (elem.tagName !== "A") check = false;

        if (elem.hasAttribute("toarticle")) {
            const toarticle = elem.getAttribute("toarticle");
            expect(toarticle).toBe(link.toarticle);
            if (toarticle !== link.toarticle) check = false;
        } else {
            expect(Object.hasOwn(link, "toarticle")).toBe(false);
            if (Object.hasOwn(link, "toarticle")) check = false;
        }

        if (elem.hasAttribute("tomap")) {
            const toarticle = elem.getAttribute("tomap");
            expect(toarticle).toBe(link.tomap);
            if (toarticle !== link.tomap) check = false;
        } else {
            expect(Object.hasOwn(link, "tomap")).toBe(false);
            if (Object.hasOwn(link, "tomap")) check = false;
        }

        expect(elem.innerHTML).toBe(link.name);
        if (elem.innerHTML !== link.name) check = false;
    }

    return check;
}
