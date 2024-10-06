import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles as articles } from "./mocks/articles.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        document.body.innerHTML = `
                <div id="article-container"></div>
                <div id="map-container"></div>
                <a id="test" toarticle="article1"></a>
            `;
        await import("./mocks/imports.js");
        await import("../src/main.js");
        document.getElementById("test").click();
    });

    test("should update search params and load article", () => {
        const container = document.getElementById("article-container");
        const params = new URL(document.location.href).searchParams;
        expect(container.innerHTML).toBe(articles.article1);
        expect(params.get("article")).toBe("article1");
    });
});
