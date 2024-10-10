import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("light mode on load", () => {
    beforeEach(async () => {
        localStorage.theme = "light";
        await initDom();
    });

    test("should not style body with dark", () => {
        expect(document.body.classList.contains("dark")).toBe(false);
    });
});
