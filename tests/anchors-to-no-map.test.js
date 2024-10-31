import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";
import { settings } from "./mocks/settings.js";
import { initDom } from "./utils/init-dom.js";
import { isMapLoaded } from "./utils/is-map-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("anchors to no map", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "");
        await initDom([test], { map: "map2" });
        test.click();
    });

    test("should update search params and load map", () => {
        expect(isMapLoaded(null, maps[settings.defaultMap])).toBe(true);
    });
});
