import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("dark mode on load", () => {
    beforeEach(async () => {
        localStorage.theme = "dark";
        await initDom();
    });

    test("should style body with dark", () => {
        expect(document.body.classList.contains("dark")).toBe(true);
    });
});
