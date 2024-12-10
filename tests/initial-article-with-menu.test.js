import { jest, beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isMenuLoaded } from "./utils/is-menu-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";
import { settings } from "./mocks/settings.js";

jest.mock("./mocks/settings.js");

mockFetch();

describe("initial article with map", () => {
    beforeEach(async () => {
        settings.initialArticle = "article1";
        await initDom([], { menu: "maps-index" });
    });

    test("should not load article on start", () => {
        expect(isMenuLoaded("maps-index")).toBe(true);
    });
});
