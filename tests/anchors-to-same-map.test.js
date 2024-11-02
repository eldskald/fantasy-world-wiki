import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to same map", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "article1");
        await initDom([test], { map: "map2" });
        test.click();
    });

    test("should fetch for maps only once", () => {
        expect(window.fetch).toHaveBeenCalledTimes(2);
        expect(window.fetch).toHaveBeenCalledWith("/assets/maps/map2.json");
        expect(window.fetch).toHaveBeenCalledWith(
            "/assets/articles/article1.html",
        );
    });
});
