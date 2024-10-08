import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";

describe("article on load", () => {
    beforeEach(async () => {
        await initDom([], { article: "article1" });
    });

    test("should load article on start", () => {
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);
    });
});
