import { describe, expect, test } from "@jest/globals";
import maps from "../build/maps.js";
import articles from "../build/articles.js";

describe("maps anchor links", () => {
    const scenarios = Object.entries(maps).map((entry) => ({
        name: entry[0],
        table: entry[1],
    }));

    describe.each(scenarios)("$name", ({ table }) => {
        test("should have name, image and links", () => {
            expect(table).toHaveProperty("name");
            expect(table).toHaveProperty("image");
            expect(table).toHaveProperty("links");
        });

        const linksWithoutName = [];
        const linksWithoutSize = [];
        const linksWithBadSize = [];
        const linksWithoutPos = [];
        const linksWithBadPos = [];
        const linksWithBrokenToArticle = [];
        const linksWithBrokenToMap = [];
        table.links.forEach((link) => {
            if (!link.name) linksWithoutName.push("link with no name");
            if (!link.size) linksWithoutSize.push(link.name);
            else if (
                link.size != "large" &&
                link.size != "medium" &&
                link.size != "small"
            )
                linksWithBadSize.push(link.name);
            if (!link.pos) linksWithoutPos.push(link.name);
            else if (!link.pos.x || !link.pos.y)
                linksWithBadPos.push(link.name);
            if (link.toarticle && !Object.hasOwn(articles, link.toarticle))
                linksWithBrokenToArticle.push(link.name);
            if (link.tomap && !Object.hasOwn(maps, link.tomap))
                linksWithBrokenToMap.push(link.name);
        });

        test("links should have name", () => {
            expect(linksWithoutName).toStrictEqual([]);
        });

        test("links should have a valid size", () => {
            expect(linksWithoutSize).toStrictEqual([]);
            expect(linksWithBadSize).toStrictEqual([]);
        });

        test("links should have a valid pos", () => {
            expect(linksWithoutPos).toStrictEqual([]);
            expect(linksWithBadPos).toStrictEqual([]);
        });

        test("links should not have broken toarticle", () => {
            expect(linksWithBrokenToArticle).toStrictEqual([]);
        });

        test("links should not have broken tomap", () => {
            expect(linksWithBrokenToMap).toStrictEqual([]);
        });
    });
});
