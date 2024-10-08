import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";
import { initDom } from "./utils/init-dom.js";
import { isMapLoaded } from "./utils/is-map-loaded.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "map2");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load map", () => {
        expect(isMapLoaded("map2", maps["map2"])).toBe(true);
    });
});
