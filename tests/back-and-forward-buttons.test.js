import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { maps } from "./mocks/maps.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { isMapLoaded } from "./utils/is-map-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";
import { sleep } from "./utils/sleep.js";

mockFetch();

// Wait time for window.history.back() or window.history.forward()
const RELOAD_TIME = 20;

describe("back and forward features", () => {
    beforeEach(async () => {
        const a1 = document.createElement("a");
        a1.setAttribute("toarticle", "article1");
        a1.setAttribute("tomap", "map2");
        const a2 = document.createElement("a");
        a2.setAttribute("toarticle", "article2");
        a2.setAttribute("tomap", "map1");
        await initDom([a1, a2]);
        a1.click();
        a2.click();
    });

    // window.history.back() and window.history.forward() are async and don't
    // update the page instantly, so we have to make this test async with short
    // delays after each call of one of them
    test("should update state whenever we press back or forward", async () => {
        // Can't use moddedArticles.article1 here because of the additional map
        // link after setAnchors.
        const moddedArticle = `
        <h1>article1</h1>
        <p>content <a toarticle="article2" href="http://localhost/?article=article2&amp;map=map2">article2</a> more content1</p>
        `;

        expect(isArticleLoaded("article2", moddedArticles["article2"])).toBe(
            true,
        );
        expect(isMapLoaded(null, maps["map1"])).toBe(true);
        window.history.back();
        await sleep(RELOAD_TIME);

        expect(isArticleLoaded("article1", moddedArticle)).toBe(true);
        expect(isMapLoaded("map2", maps["map2"])).toBe(true);
        window.history.back();
        await sleep(RELOAD_TIME);

        expect(isArticleLoaded(null, "")).toBe(true);
        expect(isMapLoaded(null, maps["map1"])).toBe(true);
        window.history.forward();
        await sleep(RELOAD_TIME);

        expect(isArticleLoaded("article1", moddedArticle)).toBe(true);
        expect(isMapLoaded("map2", maps["map2"])).toBe(true);
        window.history.forward();
        await sleep(RELOAD_TIME);

        expect(isArticleLoaded("article2", moddedArticles["article2"])).toBe(
            true,
        );
        expect(isMapLoaded(null, maps["map1"])).toBe(true);
    });
});
