import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("light mode", () => {
    beforeEach(async () => {
        localStorage.theme = "light";
        await initDom();
    });

    test("should not style body with dark and switch mode when clicked", () => {
        expect(document.body.classList.contains("dark")).toBe(false);
        document.getElementById("theme-switcher").click();
        expect(document.body.classList.contains("dark")).toBe(true);
        expect(localStorage.theme).toBe("dark");
    });
});
