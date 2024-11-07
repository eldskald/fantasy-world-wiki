import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";

describe("menu button", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should toggle menu modal when clicked", () => {
        const button = document.getElementById("menu-button");
        const modal = document.getElementById("menu-modal");

        expect(modal.classList.contains("-translate-x-full")).toBe(true);
        expect(button.classList.contains("pressed")).toBe(false);

        button.click();
        expect(modal.classList.contains("-translate-x-full")).toBe(false);
        expect(button.classList.contains("pressed")).toBe(true);

        button.click();
        expect(modal.classList.contains("-translate-x-full")).toBe(true);
        expect(button.classList.contains("pressed")).toBe(false);
    });
});
