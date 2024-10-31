import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to articles clear menu", () => {
    beforeEach(async () => {
        const a1 = document.createElement("a");
        a1.href = "http://localhost/?menu=maps-index";
        const a2 = document.createElement("a");
        a2.setAttribute("toarticle", "article1");
        await initDom([a1, a2]);
        a1.click();
        a2.click();
    });

    test("should go to article1 and close menu", () => {
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);
        expect(new URL(document.location.href).searchParams.has("menu")).toBe(
            false,
        );
    });
});
