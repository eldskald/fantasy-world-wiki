import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "");
        await initDom([test], { article: "article1" });
        test.click();
    });

    test("should update search params and load article", () => {
        const inner = document.getElementById("article-container-inner");
        const outer = document.getElementById("article-container-outer");
        const params = new URL(document.location.href).searchParams;
        expect(inner.innerHTML).toBe("");
        expect(outer.getAttribute("data-hidden")).toBe("true");
        expect(params.get("article")).toBeNull();
    });
});
