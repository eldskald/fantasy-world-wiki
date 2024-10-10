import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("dark mode", () => {
    beforeEach(async () => {
        localStorage.theme = "dark";
        await initDom();
    });

    test("should style body with dark and switch mode when clicked", () => {
        expect(document.body.classList.contains("dark")).toBe(true);
        document.getElementById("theme-switcher").click();
        expect(document.body.classList.contains("dark")).toBe(false);
        expect(localStorage.theme).toBe("light");
    });
});
