import { jest, beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";
import { settings } from "./mocks/settings.js";

jest.mock("./mocks/settings.js");

mockFetch();

describe("initial article", () => {
    beforeEach(async () => {
        settings.initialArticle = "article1";
        await initDom();
    });

    test("should load article on start", () => {
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);
    });
});
