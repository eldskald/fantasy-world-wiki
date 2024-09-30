import { beforeEach, describe, expect, test } from "@jest/globals";
import { changeSearchParam } from "../src/navigation/change-search-param.js";
import { articles } from "../src/content/articles.js";
import fs from "fs";

describe("article on load", () => {
    beforeEach(async () => {
        document.body.innerHTML = fs.readFileSync("./index.html", {
            encoding: "utf8",
        });
        changeSearchParam("article", articles[0].name);
        await import("../src/main.js");
    });

    test("should load article on start", () => {
        const container = document.getElementById("article-container");
        const params = new URL(document.location.href).searchParams;
        expect(container.innerHTML).toBe(articles[0].content);
        expect(params.get("article")).toBe(articles[0].name);
    });
});
