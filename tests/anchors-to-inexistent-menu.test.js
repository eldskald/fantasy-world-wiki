import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("anchors to inexistent article", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomenu", "nope");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load 404 message", () => {
        const inner = document.getElementById("article-container-inner");
        expect(inner.querySelector("#menu-not-found")).not.toBeNull();
    });
});
