import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "");
        await initDom([test], { article: "article1" });
        test.click();
    });

    test("should update search params and load article", () => {
        expect(isArticleLoaded(null, "")).toBe(true);
    });
});
