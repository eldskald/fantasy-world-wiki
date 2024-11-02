import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isMenuLoaded } from "./utils/is-menu-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to both article and menu", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomenu", "articles-index");
        test.setAttribute("toarticle", "article1");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load only the menu", () => {
        expect(isMenuLoaded("articles-index")).toBe(true);
    });
});
