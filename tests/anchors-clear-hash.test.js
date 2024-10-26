import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";

describe("anchors to clear hash", () => {
    beforeEach(async () => {
        const a1 = document.createElement("a");
        a1.href = "http://localhost/?article=article1#hash";
        const a2 = document.createElement("a");
        a2.setAttribute("toarticle", "article2");
        await initDom([a1, a2]);
        a1.click();
        a2.click();
    });

    test("should go to article and erase URL hash", () => {
        expect(isArticleLoaded("article2", moddedArticles.article2)).toBe(true);
        expect(new URL(document.location.href).hash).toBe("");
    });
});
