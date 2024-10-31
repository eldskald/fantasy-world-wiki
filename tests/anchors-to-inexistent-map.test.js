import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to inexistent map", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "nope");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load 404 message", () => {
        const contents = document.getElementById("map-container").children;
        expect(contents.length).toBe(1);
        const container = contents[0];
        expect(container.children.length).toBe(2);
        expect(container.children[0].tagName).toBe("H3");
        expect(container.children[0].innerHTML).toBe("404");
        expect(container.children[1].tagName).toBe("P");
        expect(container.children[1].innerHTML).toBe("File not found.");
    });
});
