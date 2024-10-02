import { describe, expect, test } from "@jest/globals";
import articles from "../build/articles.js";

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
            const target = a.getAttribute("toarticle");
            if (!Object.hasOwn(articles, target)) {
                badLinks.push(target);
            }
        });

        test("should not have bad links", () => {
            expect(badLinks).toStrictEqual([]);
        });
    });
});
