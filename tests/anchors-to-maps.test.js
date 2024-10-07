import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        document.body.innerHTML = `
                <div id="article-container-inner"></div>
                <div id="article-container-outer"></div>
                <div id="map-container"></div>
                <a id="test" tomap="map1"></a>
            `;
        await import("./mocks/imports.js");
        await import("../src/main.js");
        document.getElementById("test").click();
    });

    test("should update search params and load map", () => {
        const map = maps["map1"];
        const params = new URL(document.location.href).searchParams;
        expect(params.get("map")).toBe("map1");
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
