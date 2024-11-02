import { describe, expect, test } from "@jest/globals";
import fs from "fs";

function getAllMapContents(mapsPath) {
    let files = fs.readdirSync(mapsPath);
    files = files.filter((file) => file.split(".").at(-1) === "json");
    const maps = [];
    files.forEach((file) => {
        maps.push({
            name: file.slice(0, -5),
            table: JSON.parse(
                fs.readFileSync(mapsPath + file, {
                    encoding: "utf8",
                }),
            ),
        });
    });
    return maps;
}

// Returns an object that's like an unordered list, each key is a map name
// with an unimportant value, it's just so we can use the `in` operator to
// check if a certain name is in the list;
function getMapList(mapsPath) {
    let files = fs.readdirSync(mapsPath);
    files = files.filter((file) => file.split(".").at(-1) === "json");
    const list = {};
    files.forEach((file) => {
        list[file.slice(0, -5)] = true;
    });
    return list;
}

// Returns an object that's like an unordered list, each key is an article name
// with an unimportant value, it's just so we can use the `in` operator to
// check if a certain name is in the list;
function getArticleList(articlesPath) {
    let files = fs.readdirSync(articlesPath);
    files = files.filter((file) => file.split(".").at(-1) === "html");
    const list = {};
    files.forEach((file) => {
        list[file.slice(0, -5)] = true;
    });
    return list;
}

describe("maps anchor links", () => {
    const articles = getArticleList("assets/articles/");
    const maps = getMapList("assets/maps/");
    const scenarios = getAllMapContents("assets/maps/");

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
            if (link.toarticle && !(link.toarticle in articles)) {
                linksWithBrokenToArticle.push(link.name);
            }
            if (link.tomap && !(link.tomap in maps)) {
                linksWithBrokenToMap.push(link.name);
            }
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
