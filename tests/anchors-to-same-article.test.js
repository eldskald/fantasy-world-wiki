import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to same article", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "map2");
        await initDom([test], { article: "article1" });
        test.click();
    });

    test("should fetch for article only once", () => {
        expect(window.fetch).toHaveBeenCalledTimes(3);
        expect(window.fetch).toHaveBeenCalledWith("/assets/maps/map1.json", {
            cache: "no-store",
        });
        expect(window.fetch).toHaveBeenCalledWith("/assets/maps/map2.json", {
            cache: "no-store",
        });
        expect(window.fetch).toHaveBeenCalledWith(
            "/assets/articles/article1.html",
            { cache: "no-store" },
        );
    });
});
