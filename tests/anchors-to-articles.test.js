import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "article1");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load article", () => {
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);
    });
});
