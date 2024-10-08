import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles as articles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";

describe("article on load", () => {
    beforeEach(async () => {
        await initDom([], { article: "article1" });
    });

    test("should load article on start", () => {
        const inner = document.getElementById("article-container-inner");
        const outer = document.getElementById("article-container-outer");
        const params = new URL(document.location.href).searchParams;
        expect(outer.getAttribute("data-hidden")).toBe("false");
        expect(inner.innerHTML).toBe(articles.article1);
        expect(params.get("article")).toBe("article1");
    });
});
