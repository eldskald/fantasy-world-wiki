import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to inexistent menu", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomenu", "nope");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load 404 message", () => {
        const contents = document.getElementById(
            "article-container-inner",
        ).children;
        expect(contents.length).toBe(2);
        expect(contents[0].tagName).toBe("H3");
        expect(contents[0].innerHTML).toBe("404");
        expect(contents[1].tagName).toBe("P");
        expect(contents[1].innerHTML).toBe("File not found.");
    });
});
