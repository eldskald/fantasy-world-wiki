import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("anchors to inexistent article", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("toarticle", "nope");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load article", () => {
        const inner = document.getElementById("article-container-inner");
        expect(inner.querySelector("#article-not-found")).not.toBeNull();
    });
});
