import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles as articles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "article1");
        await initDom([test]);
        test.click();
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
