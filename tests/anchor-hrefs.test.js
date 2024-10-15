import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("anchor hrefs", () => {
    const anchors = [];

    beforeEach(async () => {
        anchors.push(document.createElement("a"));
        anchors[0].setAttribute("toarticle", "article2");
        anchors.push(document.createElement("a"));
        anchors[1].setAttribute("tomap", "map2");
        anchors.push(document.createElement("a"));
        anchors[2].setAttribute("toarticle", "");
        anchors[2].setAttribute("tomap", "map1");
        anchors.push(document.createElement("a"));
        anchors[3].setAttribute("toarticle", "article2");
        anchors[3].setAttribute("tomap", "");
        anchors.push(document.createElement("a"));
        anchors[4].setAttribute("toarticle", "");
        anchors[4].setAttribute("tomap", "");
        await initDom(anchors, { article: "article1", map: "map2" });
    });

    test("should have correct hrefs", () => {
        expect(anchors[0].href).toBe(
            "http://localhost/?article=article2&map=map2",
        );
        expect(anchors[1].href).toBe(
            "http://localhost/?article=article1&map=map2",
        );
        expect(anchors[2].href).toBe("http://localhost/");
        expect(anchors[3].href).toBe("http://localhost/?article=article2");
        expect(anchors[4].href).toBe("http://localhost/");
    });
});
