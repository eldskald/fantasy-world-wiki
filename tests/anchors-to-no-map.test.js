import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";
import { settings } from "./mocks/settings.js";
import { initDom } from "./utils/init-dom.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "");
        await initDom([test], { map: "map2" });
        test.click();
    });

    test("should update search params and load map", () => {
        const map = maps[settings.defaultMap];
        const params = new URL(document.location.href).searchParams;
        expect(params.get("map")).toBeNull();
        const container = document.getElementById("map-container");
        const children = container.getElementsByTagName("*");
        expect(children[0].tagName).toBe("IMG");
        expect(children[0].src).toBe(
            "http://localhost/assets/images/" + map.image,
        );
        expect(children[0].alt).toBe(map.name);
        expect(children[1].tagName).toBe("A");
        expect(children[1].getAttribute("toarticle")).toBe(
            map.links[0].toarticle,
        );
        expect(children[1].innerHTML).toBe(map.links[0].name);
        expect(children[2].tagName).toBe("A");
        expect(children[2].getAttribute("tomap")).toBe(map.links[1].tomap);
        expect(children[2].innerHTML).toBe(map.links[1].name);
        expect(children[3].tagName).toBe("A");
        expect(children[3].getAttribute("toarticle")).toBe(
            map.links[2].toarticle,
        );
        expect(children[2].getAttribute("tomap")).toBe(map.links[2].tomap);
        expect(children[3].innerHTML).toBe(map.links[2].name);
    });
});
