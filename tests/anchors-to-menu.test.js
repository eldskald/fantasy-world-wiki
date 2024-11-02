import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isMenuLoaded } from "./utils/is-menu-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to menu", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomenu", "articles-index");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load articles-index", () => {
        expect(isMenuLoaded("articles-index")).toBe(true);
    });
});
