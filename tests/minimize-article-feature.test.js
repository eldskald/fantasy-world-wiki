import { beforeEach, describe, expect, test } from "@jest/globals";
import { moddedArticles } from "./mocks/articles.js";
import { initDom } from "./utils/init-dom.js";
import { isArticleLoaded } from "./utils/is-article-loaded.js";
import { sleep } from "./utils/sleep.js";
import { mockFetch } from "./utils/mock-fetch.js";

mockFetch();

const SLEEP_TIME = 15;

function isArticleModalMaximized() {
    const container = document.getElementById("article-container-mid");
    const inner = document.getElementById("article-container-inner");
    const link = document.getElementById("minimize-article-link");
    return (
        !container.classList.contains("h-8") &&
        container.classList.contains("grow") &&
        !inner.classList.contains("opacity-0") &&
        link.innerHTML === window.settings.labels.minimizeArticle
    );
}

function isArticleModalMinimized() {
    const container = document.getElementById("article-container-mid");
    const inner = document.getElementById("article-container-inner");
    const link = document.getElementById("minimize-article-link");
    return (
        container.classList.contains("h-8") &&
        !container.classList.contains("grow") &&
        inner.classList.contains("opacity-0") &&
        link.innerHTML === window.settings.labels.maximizeArticle
    );
}

describe("minimize article feature", () => {
    const a1 = document.createElement("a");
    a1.setAttribute("toarticle", "article1");
    const a2 = document.createElement("a");
    a2.setAttribute("toarticle", "article2");

    beforeEach(async () => {
        await initDom([a1, a2]);
    });

    test("should update state when we minimize/maximize/open articles", async () => {
        const minimize = document.getElementById("minimize-article-link");

        a1.click();
        await sleep(SLEEP_TIME);
        expect(isArticleLoaded("article1", moddedArticles["article1"])).toBe(
            true,
        );
        expect(isArticleModalMaximized()).toBe(true);

        minimize.click();
        await sleep(SLEEP_TIME);
        expect(isArticleModalMinimized()).toBe(true);

        a2.click();
        await sleep(SLEEP_TIME);
        expect(isArticleLoaded("article2", moddedArticles["article2"])).toBe(
            true,
        );
        expect(isArticleModalMaximized()).toBe(true);
    });
});
