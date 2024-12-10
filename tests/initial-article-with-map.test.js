import { jest, beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";
import { settings } from "./mocks/settings.js";

jest.mock("./mocks/settings.js");

mockFetch();

describe("initial article with map", () => {
    beforeEach(async () => {
        settings.initialArticle = "article1";
        await initDom([], { map: "map1" });
    });

    test("should not load article on start", () => {
        expect(isArticleLoaded(null, "")).toBe(true);
    });
});
