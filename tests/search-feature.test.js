import { beforeEach, describe, expect, test } from "@jest/globals";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { moddedArticles } from "./mocks/articles.js";
import { sleep } from "./utils/sleep.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

const SLEEP_TIME = 15;

function type(element, text) {
    element.oninput({ target: { value: text } });
    element.value = text;
}

describe("search feature", () => {
    beforeEach(async () => {
        await initDom();
    });

    test("should find content correctly", async () => {
        const bar = document.getElementById("search-bar");
        const input = bar.querySelector("input");
        const result = document.getElementById("search-result");

        expect(result.classList.contains("hidden")).toBe(true);
        expect(bar.classList.contains("h-16")).toBe(false);

        input.focus();
        expect(result.classList.contains("hidden")).toBe(true);
        expect(bar.classList.contains("h-16")).toBe(true);

        type(input, "a");
        expect(result.classList.contains("hidden")).toBe(false);
        expect(result.innerHTML).toBe("article1");
        expect(result.getAttribute("toarticle")).toBe("article1");
        expect(result.href).toBe("http://localhost/?article=article1");
        expect(bar.classList.contains("h-16")).toBe(true);

        type(input, "a2");
        expect(result.classList.contains("hidden")).toBe(false);
        expect(result.innerHTML).toBe("article2");
        expect(result.getAttribute("toarticle")).toBe("article2");
        expect(result.href).toBe("http://localhost/?article=article2");
        expect(bar.classList.contains("h-16")).toBe(true);

        input.blur();
        await sleep(SLEEP_TIME);
        expect(result.classList.contains("hidden")).toBe(true);
        expect(bar.classList.contains("h-16")).toBe(false);

        input.focus();
        expect(result.classList.contains("hidden")).toBe(false);
        expect(result.innerHTML).toBe("article2");
        expect(result.getAttribute("toarticle")).toBe("article2");
        expect(result.href).toBe("http://localhost/?article=article2");
        expect(bar.classList.contains("h-16")).toBe(true);

        result.focus();
        expect(result.classList.contains("hidden")).toBe(false);
        expect(result.innerHTML).toBe("article2");
        expect(result.getAttribute("toarticle")).toBe("article2");
        expect(result.href).toBe("http://localhost/?article=article2");
        expect(bar.classList.contains("h-16")).toBe(true);

        result.click();
        await sleep(SLEEP_TIME);
        expect(isArticleLoaded("article2", moddedArticles.article2)).toBe(true);

        result.blur();
        await sleep(SLEEP_TIME);
        expect(result.classList.contains("hidden")).toBe(true);
        expect(bar.classList.contains("h-16")).toBe(false);

        document.getElementById("close-article-link").click();
        await sleep(SLEEP_TIME);
        input.focus();
        type(input, "");
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        expect(isArticleLoaded(null, "")).toBe(true);

        input.focus();
        type(input, "a1");
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        await sleep(SLEEP_TIME);
        expect(isArticleLoaded("article1", moddedArticles.article1)).toBe(true);
    });
});
