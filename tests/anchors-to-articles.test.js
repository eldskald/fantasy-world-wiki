import { beforeEach, describe, expect, test } from "@jest/globals";
import { articles } from "../src/content/articles.js";

describe("anchors to articles", () => {
    const someArticle = Object.entries(articles)[0];

    beforeEach(async () => {
        document.body.innerHTML = `
            <div id="article-container"></div>
            <a id="test" toarticle="${someArticle[0]}"></a>"
        `;
        await import("../src/main.js");
        document.getElementById("test").click();
    });

    test("should update search params and load article", () => {
        const container = document.getElementById("article-container");
        const params = new URL(document.location.href).searchParams;
        expect(container.innerHTML).toBe(someArticle[1]);
        expect(params.get("article")).toBe(someArticle[0]);
    });
});
