import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to same menu", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "map2");
        await initDom([test], { menu: "maps-index" });
        test.click();
    });

    test("should fetch for menu only once", () => {
        expect(window.fetch).toHaveBeenCalledTimes(3);
        expect(window.fetch).toHaveBeenCalledWith("/assets/maps/map1.json");
        expect(window.fetch).toHaveBeenCalledWith("/assets/maps/map2.json");
        expect(window.fetch).toHaveBeenCalledWith(
            "/build/menu/maps-index.html",
        );
    });
});
