import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { isMapLoaded } from "./utils/is-map-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "article1");
        test.setAttribute("tomap", "map2");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load map and article", () => {
        // Can't use moddedArticles.article1 here because of the aditional map
        // link after setAnchors.
        const moddedArticle = `
        <h1>article1</h1>
        <p>content <a toarticle="article2" href="http://localhost/?article=article2&amp;map=map2">article2</a> more content1</p>
        `;
        expect(isArticleLoaded("article1", moddedArticle)).toBe(true);
        expect(isMapLoaded("map2", maps["map2"])).toBe(true);
    });
});
