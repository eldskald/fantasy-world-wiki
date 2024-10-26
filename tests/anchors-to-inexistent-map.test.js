import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("anchors to inexistent map", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.setAttribute("tomap", "nope");
        await initDom([test]);
        test.click();
    });

    test("should update search params and load 404 message", () => {
        const container = document.getElementById("map-container");
        expect(container.querySelector("#map-not-found")).not.toBeNull();
    });
});
