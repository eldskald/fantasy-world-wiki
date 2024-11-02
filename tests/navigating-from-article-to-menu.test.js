import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { isMenuLoaded } from "./utils/is-menu-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";
import { sleep } from "./utils/sleep.js";

const SLEEP_TIME = 20;

mockFetch();

// This test is because the code made to prevent flickering due to when we
// navigate to any link, causing both maps and articles/menu to refetch at
// some point could get confused and store the wrong values on the "current"
// variable for both articles and menu, causing it to not load the right
// article/menu. This test recreates the conditions that caused it so we
// know if it ever came back.

describe("navigating from article to menu", () => {
    const a1 = document.createElement("a");
    a1.setAttribute("tomenu", "articles-index");
    const a2 = document.createElement("a");
    a2.setAttribute("toarticle", "article1");

    beforeEach(async () => {
        await initDom([a1, a2]);
    });

    test("should be able to go back and forth to the same article and menu", async () => {
        a1.click();
        await sleep(SLEEP_TIME);
        expect(isMenuLoaded("articles-index")).toBe(true);

        a2.click();
        await sleep(SLEEP_TIME);
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);

        a1.click();
        await sleep(SLEEP_TIME);
        expect(isMenuLoaded("articles-index")).toBe(true);

        a2.click();
        await sleep(SLEEP_TIME);
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);

        a1.click();
        await sleep(SLEEP_TIME);
        expect(isMenuLoaded("articles-index")).toBe(true);
    });
});
