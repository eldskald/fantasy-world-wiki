import { describe, expect, test } from "@jest/globals";
import { articles } from "../src/content/articles.js";

describe("articles anchor links", () => {
    describe.each(articles)("$name", ({ content }) => {
        document.body.innerHTML = `${content}`;
        const anchors = document.querySelectorAll("a");
        const badLinks = [];
        anchors.forEach((a) => {
            const target = a.getAttribute("toarticle");
            let found = false;
            if (target) {
                for (let i = 0; i < articles.length; i++) {
                    if (articles[i].name === target) {
                        found = true;
                    }
                }
            }
            if (!found) badLinks.push(target);
        });

        test("should not have bad links", () => {
            expect(badLinks).toStrictEqual([]);
        });
    });
});
