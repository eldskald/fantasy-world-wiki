import { beforeEach, describe, expect, test } from "@jest/globals";
import { maps } from "./mocks/maps.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "article1");
        test.setAttribute("tomap", "map2");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load map", () => {
        // Can't use moddedArticles.article1 here because of the aditional map
        // link after setAnchors.
        const moddedArticle = `
        <h1>article1</h1>
        <p>content <a toarticle="article2" href="http://localhost/?article=article2&amp;map=map2" onclick="toArticle('article2'); return false;">article2</a> more content1</p>
    `;
        expect(isArticleLoaded("article1", moddedArticle)).toBe(true);

        const params = new URL(document.location.href).searchParams;
        const map = maps["map2"];
        const container = document.getElementById("map-container");
        const children = container.getElementsByTagName("*");
        expect(params.get("map")).toBe("map2");
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
        expect(children[2].getAttribute("tomap")).toBe(map.links[1].tomap);
        expect(children[3].innerHTML).toBe(map.links[2].name);
    });
});
