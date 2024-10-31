import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";
import { initDom } from "./utils/init-dom.js";
import { isMapLoaded } from "./utils/is-map-loaded.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

describe("map on load", () => {
    beforeEach(async () => {
        await initDom([], { map: "map2" });
    });

    test("should load map on start", () => {
        expect(isMapLoaded("map2", maps["map2"])).toBe(true);
    });
});
