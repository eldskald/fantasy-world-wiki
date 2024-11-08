import { jest, beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { settings } from "./mocks/settings.js";

jest.mock("./mocks/settings.js");

describe("navbar with credits enabled", () => {
    beforeEach(async () => {
        settings.enableCreditsPage = true;
        await initDom();
    });

    test("should have indexes, credits and theme switcher", () => {
        const topbar = document.querySelector("header");
        const links = topbar.querySelectorAll("a");
        expect(links.length).toBe(4);
        expect(links[0].getAttribute("tomenu")).toBe("articles-index");
        expect(links[1].getAttribute("tomenu")).toBe("maps-index");
        expect(links[2].getAttribute("tomenu")).toBe("credits");
        const themeSwitcher = topbar.querySelector("#theme-switcher");
        expect(themeSwitcher).not.toBeNull();
    });
});
