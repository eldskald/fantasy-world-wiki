import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { mockFetch } from "./utils/mock-fetch.js";
import { sleep } from "./utils/sleep.js";

mockFetch();

const SLEEP_TIME = 15;

function simulateMouseOver(anchor) {
    const event = new MouseEvent("mouseover", { clientX: 100, clientY: 100 });
    anchor.onmouseover(event);
}

function simulateMouseOut(anchor) {
    const event = new MouseEvent("mouseout", { clientX: 200, clientY: 200 });
    anchor.onmouseout(event);
}

describe("article previews", () => {
    beforeEach(async () => {
        const test = document.createElement("a");
        test.id = "test-anchor";
        test.setAttribute("toarticle", "article1");
        await initDom([test]);
    });

    test("should do preview on hover and hide it on mouse out", async () => {
        const a = document.getElementById("test-anchor");
        const popup = document.getElementById("article-preview");
        const preview = document.getElementById("article-preview-content");

        simulateMouseOver(a);
        expect(popup.classList.contains("hidden")).toBe(false);
        expect(preview.innerHTML).toBe("<p>Loading...</p>");

        await sleep(SLEEP_TIME);
        expect(preview.innerHTML.trim()).toBe(
            "<p>preview 1</p>".trim(),
            // '<p>content <a toarticle="article2" href="http://localhost/?article=article2">article2</a> more content1</p>'.trim(),
        );

        simulateMouseOut(a);
        expect(popup.classList.contains("hidden")).toBe(true);
    });
});
