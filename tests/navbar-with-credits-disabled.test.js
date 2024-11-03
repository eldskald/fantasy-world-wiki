import { jest, beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { settings } from "./mocks/settings.js";

jest.mock("./mocks/settings.js");

describe("navbar with credits disabled", () => {
    beforeEach(async () => {
        settings.enableCreditsPage = false;
        await initDom();
    });

    test("should have indexes, no credits and theme switcher", () => {
        const topbar = document.querySelector("header");
        const links = topbar.querySelectorAll("a");
        expect(links.length).toBe(2);
        expect(links[0].getAttribute("tomenu")).toBe("articles-index");
        expect(links[1].getAttribute("tomenu")).toBe("maps-index");
        const themeSwitcher = topbar.querySelector("#theme-switcher");
        expect(themeSwitcher).not.toBeNull();
    });
});
