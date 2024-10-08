import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles as articles } from "./mocks/articles.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        document.body.innerHTML = `
            <div id="article-container-inner"></div>
            <div id="article-container-outer"></div>
            <div id="close-article-btn"></div>
            <div id="map-container"></div>
            <a id="test" toarticle="article1"></a>
        `;
        await import("./mocks/imports.js");
        await import("../src/main.js");
        document.getElementById("test").click();
    });

    test("should update search params and load article", () => {
        const inner = document.getElementById("article-container-inner");
        const outer = document.getElementById("article-container-outer");
        const params = new URL(document.location.href).searchParams;
        expect(inner.innerHTML).toBe(articles.article1);
        expect(outer.getAttribute("data-hidden")).toBe("false");
        expect(params.get("article")).toBe("article1");
    });
});
