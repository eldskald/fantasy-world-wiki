import { describe, expect, test } from "@jest/globals";
import articles from "../build/articles.js";
import maps from "../build/maps.js";

describe("articles anchor links", () => {
    const scenarios = Object.entries(articles).map((entry) => ({
        name: entry[0],
        content: entry[1],
    }));

    describe.each(scenarios)("$name", ({ content }) => {
        document.body.innerHTML = `${content}`;
        const anchors = document.querySelectorAll("a");
        const badLinks = [];
        anchors.forEach((a) => {
            const targetArticle = a.getAttribute("toarticle");
            if (targetArticle && !Object.hasOwn(articles, targetArticle)) {
                badLinks.push(targetArticle);
            }
            const targetMap = a.getAttribute("tomap");
            if (targetMap && !Object.hasOwn(maps, targetMap)) {
                badLinks.push(targetMap);
            }
        });

        test("should not have bad links", () => {
            expect(badLinks).toStrictEqual([]);
        });
    });
});
