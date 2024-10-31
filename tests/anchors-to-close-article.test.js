import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to close article", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "");
        await initDom([test], { article: "article1" });
        test.click();
    });

    test("should update search params and close article", () => {
        expect(isArticleLoaded(null, "")).toBe(true);
    });
});
