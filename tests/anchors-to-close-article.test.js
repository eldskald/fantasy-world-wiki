import { beforeEach, describe, expect, test } from "@jest/globals";
import { changeSearchParam } from "../src/navigation/change-search-param.js";

describe("anchors to articles", () => {
    beforeEach(async () => {
        document.body.innerHTML = `
            <div id="article-container-inner"></div>
            <div id="article-container-outer"></div>
            <div id="close-article-btn"></div>
            <div id="map-container"></div>
            <a id="test" toarticle=""></a>
        `;
        changeSearchParam("article", "article1");
        await import("./mocks/imports.js");
        await import("../src/main.js");
        document.getElementById("test").click();
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
