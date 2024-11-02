import { describe, expect, test } from "@jest/globals";
import fs from "fs";

function getAllArticleContents(articlesPath) {
    let files = fs.readdirSync(articlesPath);
    files = files.filter((file) => file.split(".").at(-1) === "html");
    const articles = [];
    files.forEach((file) => {
        const data = fs.readFileSync(articlesPath + file, { encoding: "utf8" });
        articles.push({
            name: file.slice(0, -5),
            content: data,
        });
    });
    return articles;
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

describe("articles anchor links", () => {
    const scenarios = getAllArticleContents("assets/articles/");
    const articles = getArticleList("assets/articles/");
    const maps = getMapList("assets/maps/");

    describe.each(scenarios)("$name", ({ content }) => {
        document.body.innerHTML = `${content}`;
        const anchors = document.querySelectorAll("a");
        const badLinks = [];
        anchors.forEach((a) => {
            const targetArticle = a.getAttribute("toarticle");
            if (targetArticle && !(targetArticle in articles))
                badLinks.push(targetArticle);
            const targetMap = a.getAttribute("tomap");
            if (targetMap && !(targetMap in maps)) badLinks.push(targetMap);
        });

        test("should not have bad links", () => {
            expect(badLinks).toStrictEqual([]);
        });
    });
});
